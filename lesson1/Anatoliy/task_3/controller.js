"use strict";

/**
 * Объект с ID используемых HTML элементов.
 *
 * @property {string} idElementSize id HTML элемента для вывода размера.
 * @property {string} idElementStuffing id HTML элемента для вывода добавленных начинок.
 * @property {string} idElementTopping id HTML элемента для вывода добавленных добавок.
 * @property {string} idElementPrice id HTML элемента для вывода стоимости.
 * @property {string} idElementCalories id HTML элемента для вывода калорий.
 * @property {string} idElementForm id HTML элемента формы выбора данных.
 * @property {string} idElementOrderBtn id HTML элемента кнопки обработки выбранных данных.
 * @property {string} idElementToppingMayoAddBtn id HTML элемента кнопки добавления добавки.
 * @property {string} idElementToppingMayoDelBtn id HTML элемента кнопки удаления добавки.
 * @property {string} idElementToppingSpiceAddBtn id HTML элемента кнопки добавления добавки.
 * @property {string} idElementToppingSpiceDelBtn id HTML элемента кнопки удаления добавки.
 * @property {string} idElementToppingWrap id HTML элемента обертки блока с добавками.
 */
const settings = {
  idElementSize: 'size',
  idElementStuffing: 'stuffing',
  idElementTopping: 'topping',
  idElementPrice: 'price',
  idElementCalories: 'calories',
  idElementForm: 'form',
  idElementOrderBtn: 'order',
  idElementToppingMayoAddBtn: 'topping_mayo_add',
  idElementToppingMayoDelBtn: 'topping_mayo_del',
  idElementToppingSpiceAddBtn: 'topping_spice_add',
  idElementToppingSpiceDelBtn: 'topping_spice_del',
  idElementToppingWrap: 'topping_wrap',
};

/**
 *
 * @type {{settings: {idElementSize: string, idElementStuffing: string, idElementTopping: string, idElementPrice: string, idElementCalories: string, idElementForm: string, idElementOrderBtn: string, idElementToppingMayoAddBtn: string, idElementToppingMayoDelBtn: string, idElementToppingSpiceAddBtn: string, idElementToppingSpiceDelBtn: string, idElementToppingWrap: string}, sizeElem: null, stuffingElem: null, toppingElem: null, priceElem: null, caloriesElem: null, formElem: null, orderBtnElem: null, toppingWrap: null, hamburger: null, init(): void, toPlaceAnOrder(*): void, addOrDelTopping(*): void, render(*, *=): void}}
 */
const controller = {
  settings,
  sizeElem: null,
  stuffingElem: null,
  toppingElem: null,
  priceElem: null,
  caloriesElem: null,
  formElem: null,
  orderBtnElem: null,
  toppingWrap: null,
  hamburger: null,

  /**
   *
   */
  init() {
    this.sizeElem = document.getElementById(this.settings.idElementSize);
    this.stuffingElem = document.getElementById(this.settings.idElementStuffing);
    this.toppingElem = document.getElementById(this.settings.idElementTopping);
    this.priceElem = document.getElementById(this.settings.idElementPrice);
    this.caloriesElem = document.getElementById(this.settings.idElementCalories);
    this.formElem = document.getElementById(this.settings.idElementForm);
    this.orderBtnElem = document.getElementById(this.settings.idElementOrderBtn);
    this.toppingWrap = document.getElementById(this.settings.idElementToppingWrap);

    // const inputArr = this.formElem.querySelectorAll('input');
    // console.log(inputArr);

    this.orderBtnElem.addEventListener('click', () => this.toPlaceAnOrder(this.formElem));
    this.toppingWrap.addEventListener('click', event => this.addOrDelTopping(event));
  },

  /**
   *
   * @param formElem
   */
  toPlaceAnOrder(formElem) {
    const inputArr = formElem.querySelectorAll('input:checked');

    let orderDetail = [];
    for (let el of inputArr) {
      if (Hamburger[el.id.toUpperCase()] !== Hamburger.TOPPING_MAYO
        && Hamburger[el.id.toUpperCase()] !== Hamburger.TOPPING_SPICE) {
        orderDetail.push(Hamburger[el.id.toUpperCase()]);
      }
    }

    this.hamburger = new Hamburger(orderDetail.shift(), ...orderDetail);

    this.render(this.sizeElem, this.hamburger.getSize());
    this.render(this.stuffingElem, this.hamburger.getStuffing());
    this.render(this.toppingElem, this.hamburger.getToppings());
    this.render(this.priceElem, this.hamburger.calculatePrice());
    this.render(this.caloriesElem, this.hamburger.calculateCalories());
  },

  /**
   *
   * @param event
   */
  addOrDelTopping(event) {

    const elem = event.target;
    if (elem.tagName === 'BUTTON' && this.hamburger !== null) {
      if (elem.dataset.active === 'add') {
        this.hamburger.addTopping(Hamburger[elem.dataset.name]);
      } else if (elem.dataset.active === 'remove') {
        this.hamburger.removeTopping(Hamburger[elem.dataset.name]);
      }
      this.render(this.toppingElem, this.hamburger.getToppings());
      this.render(this.priceElem, this.hamburger.calculatePrice());
      this.render(this.caloriesElem, this.hamburger.calculateCalories());

    }
  },

  /**
   *
   * @param elem
   * @param data
   */
  render(elem, data) {
    if (data !== undefined) elem.innerHTML = data;
  },
};