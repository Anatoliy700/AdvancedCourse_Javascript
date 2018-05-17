"use strict";

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
    this.toppingWrap.addEventListener('click', () => this.addOrDelTopping(event));

  },

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


    // console.log(this.hamburger);

  },

  addOrDelTopping(event) {

    // console.log(event);

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


  render(elem, data) {
    if (data !== undefined) elem.innerHTML = data;
  },


};