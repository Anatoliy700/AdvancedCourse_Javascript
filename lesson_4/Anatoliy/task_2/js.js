"use strict";

/**
 * Подгружает массив объектов городов с сервера и добавляет их в select.
 */
const selectCity = {
  idSelect: 'city',
  errorMessage: 'Выберите город',

  /**
   * Инициализирует запрос на сервер и добавляет полученные данные городов в select.
   */
  init() {
    $.getJSON('city.json', data => {
      for (let i = 0; i < data.length; i++) {
        $(`#${this.idSelect}`).append(
          $(document.createElement('option')).val(data[i].id).text(data[i].name)
        );
      }
    })
  },

  /**
   * Проводит валидацию поля select.
   * @param {HTMLElement} elem элемент select.
   * @return {boolean} возвращает true если элемент проходит валидацию иначе false.
   */
  validateSelect(elem) {
    return elem.value !== '-1' && elem.value !== '';
  },
};


/**
 * Валидация формы.
 * @property {string} idForm id HTML элемента формы.
 * @property {string} idInputName id HTML элемента input для ввода имени.
 * @property {string} idInputPhone id HTML элемента input для ввода телефона.
 * @property {string} idInputEmail id HTML элемента input для ввода email.
 * @property {string} idInputMessage id HTML элемента input для ввода сообщения.
 * @property {string} idBtnSubmit id HTML элемента button для отправки формы.
 * @property {string} classElemOutErr class HTML элемента div для вывода сообщения об ошибке валидации поля.
 * @property {string} classNoValidateInput class HTML элемента input или textarea
 * для выделения рамкой в случае ошибки валидации поля.
 * @property {string} classValidateInput class HTML элемента input или textarea
 * для выделения рамкой в случае удачной валидации поля.
 * @property {HTMLElement} elemForm элемент формы.
 * @property {HTMLElement} elemBtnSubmit элемент кнопки отправки данных.
 * @property {Object} errorMessage обект с сообщениями об ошибках валидации.
 * @property {string} errorMessage.name содержит сообщение об ошибке валидации для поля "имя".
 * @property {string} errorMessage.phone содержит сообщение об ошибке валидации для поля "телефон".
 * @property {string} errorMessage.message содержит сообщение об ошибке валидации для поля "сообщение".
 * @property {RegExp} regExpName регулярное выражение для валидации поля "имя".
 * @property {RegExp} regExpPhone регулярное выражение для валидации поля "телефон".
 * @property {RegExp} regExpEmail регулярное выражение для валидации поля "email".
 * @property {RegExp} regExpMessage регулярное выражение для валидации поля "сообщение".
 */
const validateForm = {
  idForm: 'form',
  idInputName: 'name',
  idInputPhone: 'phone',
  idInputEmail: 'email',
  idInputMessage: 'message',
  idBtnSubmit: 'send',
  classElemOutErr: 'error-message',
  classNoValidateInput: 'error-input',
  classValidateInput: 'success-input',
  elemForm: null,
  elemBtnSubmit: null,
  errorMessage: {
    name: 'Имя должно содержать только буквы',
    phone: 'Телефон должен быть в формате "+7(000)000-0000"',
    email: 'Не корректный email',
    message: 'Вы забыли написать сообщение',
    city: selectCity.errorMessage,
  },
  regExpName: /^[a-zа-яё]{2,}$/i,
  regExpPhone: /^\+\d\(\d{3}\)\d{3}-\d{4}$/,
  regExpEmail: /^[a-z0-9-_.]+@[a-z]+.[a-z]{2,4}$/i,
  regExpMessage: /[\wа-яё]{3,}/,

  /**
   * Инициализирует процесс валидации.
   */
  init() {
    this.elemForm = document.getElementById(this.idForm);
    this.elemBtnSubmit = document.getElementById(this.idBtnSubmit);
    this.elemBtnSubmit.addEventListener('click', event => this.btnClickHandler(event));
  },

  /**
   * Обработчик клика по кнопке "Отправить".
   * Проходится по всем нужным элементам и запускает для каждого валидацию, первая ошибка валидации отменяет default обработку события "отправки формы".
   * @param {Event} event событие от кнопки.
   */
  btnClickHandler(event) {
    for (let elem of this.elemForm) {
      if (elem.id === this.idBtnSubmit) continue;
      let validateResult = this.validateInput(elem);
      if (!validateResult) {
        this.outMessageFailValidate(elem);
        event.preventDefault();
      } else {
        this.outMessageFailValidate(elem, true);
      }
    }
  },

  /**
   * Валидация каждого поля своим регулярным выражением.
   * @param {HTMLElement} elem элемент, который требуется провалидировать.
   * @return {boolean} возвращает true если элемент проходит валидацию иначе false.
   */
  validateInput(elem) {
    switch (elem.id) {
      case this.idInputName:
        return this.regExpName.test(elem.value.trim());

      case this.idInputPhone:
        return this.regExpPhone.test(elem.value.trim());

      case this.idInputEmail:
        return this.regExpEmail.test(elem.value.trim());

      case this.idInputMessage:
        return this.regExpMessage.test(elem.value.trim());

      case selectCity.idSelect:
        return selectCity.validateSelect(elem);
    }
  },

  /**
   * Организует вывод информации пользователю(валидация прошла или нет)
   * @param {HTMLElement} elem в котором прошла валидация и который надо показать пользователю, если валидация удачна, то зеленый border у элемента, если не удачна, то красный border и сообщение об ошибке.
   * @param {boolean} validate если true то действуем по алгоритму успех, false действуем по алгоритму ошибка.
   */
  outMessageFailValidate(elem, validate = false) {
    let elemError = document.getElementById(`error-${elem.id}`);
    if (!validate) {
      if (!elemError) {
        elemError = document.createElement('div');
        elemError.id = `error-${elem.id}`;
        elemError.classList.add(this.classElemOutErr);
        elem.parentElement.insertBefore(elemError, elem.nextElementSibling);

        elem.classList.remove(this.classValidateInput);
        elem.classList.add(this.classNoValidateInput);
      }
      elemError.innerText = this.errorMessage[elem.id];
      elem.value = '';
    } else {
      if (elemError) {
        elemError.parentElement.removeChild(elemError);
      }
      elem.classList.remove(this.classNoValidateInput);
      elem.classList.add(this.classValidateInput);
      elem.value = elem.value.trim();
    }
  },
};


window.onload = () => {
  validateForm.init();
  selectCity.init();
};