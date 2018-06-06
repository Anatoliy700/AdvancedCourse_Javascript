"use strict";

const birthdayInput = {
  idInputDatepicker: 'birthday',
  errorMessage: 'Введите дату рождения в формате "дд/мм/гггг"',
  regExpCity: /^[0-3][0-9]\/[01][0-9]\/[12][0-9]{3}$/,

  init() {
    $(`#${this.idInputDatepicker}`).datepicker({
      changeMonth: true,
      changeYear: true,
      firstDay: 1,
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dateFormat: 'dd/mm/yy',
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    });
  },

  validate(elem) {
    return this.regExpCity.test(elem.value.trim());
  },

  effectErrorInput(elem) {
    $(elem).effect('bounce');
  },
};


/**
 * Обрабатывает input для ввода города, при вводе названия города предлагает варианты.
 * @property {string} idInputCity id HTML элемента input.
 * @property {string} errorMessage содержит сообщение об ошибке валидации для поля "Город".
 * @property {string} urlJSON путь к файлу .json с объектами городов.
 * @property {string} idElemListSearchCity id HTML элемента в котором пердлагаются варианты городов.
 * @property {RegExp} regExpCity регулярное выражение для валидации поля "Город".
 */
const inputCity = {
  idInputCity: 'city',
  errorMessage: 'Введите город',
  urlJSON: 'json/city.json',
  idElemListSearchCity: 'search-city',
  regExpCity: /^[a-zа-яё ]{2,}$/i,
  dataCity: [],//

  /**
   * Вешает события на input для ввода города.
   */
  init() {
    $(`#${this.idInputCity}`).on('keyup click', event => this.keyPressHandler(event));
    // .on(' focusout', () => this.outOptionCities(null, true));

    $.getJSON(this.urlJSON, (data) => this.dataCity = data);//
  },

  /**
   * Обработчик события нажатия на кнопки клавиатуры при вводе названия города.
   * Если символов введено меньше 3 то удаляем окно с предлогаемым списком городов, если он есть.
   * Если символов введено 3 и больше, отправляет запрос на получения массива с объектами городов,
   * инициализирует регулярное выражение и вызывает функцию для парсинка массива с городами.
   * @param {Event} event событие произошедшее в поле ввода названия города.
   */
  keyPressHandler(event) {
    const input = event.target;
    const dataUser = input.value;
    if (dataUser.length < 3) {
      this.outOptionCities(null, true);
    } else {
      const regExp = new RegExp(`^${dataUser}[\wа-яё ]{0,}`, 'i');

      this.parsJSON(this.dataCity, regExp);//

      // $.getJSON(this.urlJSON, (data) => this.parsJSON(data, regExp));
    }
  },

  /**
   * Парсит массив с объектами городов проверяя каждое название города на соотвествие регулярному выражению
   * и из тех которые прозодят проверку пр регулярке складывает в отдельный массив.
   * Запускает метод вывода этих городов пользователю.
   * @param {Object[]} data массив объектов городов для проверки регулярным выражением.
   * @param {Object} regExp регулярное выражение.
   */
  parsJSON(data, regExp) {
    let arrSearchObjectCity = [];
    for (const obj of data) {
      if (regExp.test(obj.name)) {
        const objOut = {};
        for (const propName in obj) {
          objOut[propName] = obj[propName];
        }
        if (arrSearchObjectCity.length > 10) break;
        arrSearchObjectCity.push(objOut);
      }
    }
    if (!arrSearchObjectCity.length > 0) {
      this.outOptionCities(arrSearchObjectCity, true);
    } else {
      this.outOptionCities(arrSearchObjectCity);
    }
  },


  /**
   * Выводит предлагаемый список городов пользователю или скрывает этот список.
   * @param {Object[]} arrObjCities массив объектов городов для вывода пользователю.
   * @param {boolean} remove если true то удаляем список городо, false выводим.
   */
  outOptionCities(arrObjCities, remove = false) {
    if (remove) {
      $(`#${this.idElemListSearchCity}`).remove();
    } else {
      const $ulOut = $(document.createElement('ul')).attr('id', this.idElemListSearchCity)
        .click(event => this.clickLiHandler(event));
      for (const obj of arrObjCities) {
        $ulOut.append($(document.createElement('li')).attr('value', obj.id).text(obj.name));
      }
      if ($(`#${this.idElemListSearchCity}`).length > 0) {
        $(`#${this.idElemListSearchCity}`).replaceWith($ulOut);
      }
      $(`#${this.idInputCity}`).after($ulOut);
    }
  },

  clickLiHandler(event) {
    if (event.target.tagName === 'LI') {
      $(`#${this.idInputCity}`).val(event.target.innerText);
    }
    this.outOptionCities(null, true);
  },

  /**
   * Проводит валидацию поля input.
   * @param {HTMLElement} elem элемент input.
   * @return {boolean} возвращает true если элемент проходит валидацию иначе false.
   */
  validateSelect(elem) {
    return this.regExpCity.test(elem.value.trim());
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
  birthdayInput,
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
    city: inputCity.errorMessage,
    birthday: birthdayInput.errorMessage,
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
    this.elemForm.addEventListener('submit', event => this.btnClickHandler(event));
    //
    this.birthdayInput.init();
    //
  },

  /**
   * Обработчик клика по кнопке "Отправить".
   * Проходится по всем нужным элементам и запускает для каждого валидацию, первая ошибка валидации отменяет default обработку события "отправки формы".
   * @param {Event} event событие от кнопки.
   */
  btnClickHandler(event) {
    let arr = $(this.elemForm).find('input, textarea');
    for (let elem of arr) {
      if (elem.id === this.idBtnSubmit) continue;
      let validateResult = this.validateInput(elem);
      if (!validateResult) {
        this.outMessageFailValidate(elem);
        event.preventDefault();
        // break;
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

      case inputCity.idInputCity:
        return inputCity.validateSelect(elem);

      case this.birthdayInput.idInputDatepicker:
        return this.birthdayInput.validate(elem);
    }
  },

  /**
   * Организует вывод информации пользователю(валидация прошла или нет)
   * @param {HTMLElement} elem в котором прошла валидация и который надо показать пользователю, если валидация удачна, то зеленый border у элемента, если не удачна, то красный border и сообщение об ошибке.
   * @param {boolean} validate если true то действуем по алгоритму успех, false действуем по алгоритму ошибка.
   */
  outMessageFailValidate(elem, validate = false) {
    let elemError = document.getElementById(`error-message`);
    if (!validate) {
      if (!elemError) {
        elemError = document.createElement('div');
        elemError.id = `error-message`;
        elemError.classList.add(this.classElemOutErr);
        // elem.parentElement.insertBefore(elemError, elem.nextElementSibling);

        $(elemError).dialog({
          modal: true,
          title: 'Ошибка ввода',
          position: {my: "left top", at: "right+10 top", of: elem},
          draggable: false,
          close: function () {
            $(this).remove();
          }
        });

      }
      elem.classList.remove(this.classValidateInput);
      elem.classList.add(this.classNoValidateInput);
      elemError.innerText += '- ' + this.errorMessage[elem.id] + '\n\n';
      elem.value = '';

      // добавлено вывод диологового окна и эффект к валидируемому input
      this.birthdayInput.effectErrorInput(elem);
      //

    } else {
      /*
            if (elemError) {
              elemError.parentElement.removeChild(elemError);
            }
      */
      elem.classList.remove(this.classNoValidateInput);
      elem.classList.add(this.classValidateInput);
      elem.value = elem.value.trim();
    }
  },


};


window.onload = () => {
  validateForm.init();
  inputCity.init();
};