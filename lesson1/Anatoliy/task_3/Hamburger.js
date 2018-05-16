"use strict";

/**
 * Класс, объекты которого описывают параметры гамбургера.
 */
class Hamburger {
  /**
   * Конструктор объекта.
   * @param size        Размер
   * @param stuffing    Начинка
   * @throws {HamburgerException}  При неправильном использовании
   */

  constructor(size, ...stuffing) {
    this.size = '';
    this.stuffing = [];
    this.topping = [];
    try {
      if (size === undefined) {
        throw new HamburgerException('Не передан размер');
      }
      if (size === Hamburger.SIZE_SMALL || size === Hamburger.SIZE_LARGE) {
        this.size = size;
      } else throw new HamburgerException(`Не верный параметр размера, вы передали: ${size.name}`);

      //Проверяем что в stuffing переданы допустимые константы
      stuffing.forEach(
        el => {
          if (el === Hamburger.STUFFING_CHEESE || el === Hamburger.STUFFING_POTATO || el === Hamburger.STUFFING_SALAD) {
            if (this.stuffing.includes(el)) {
              throw new HamburgerException(`Вы добавляете повторно: ${el.name}`);
            } else this.stuffing.push(el);
          } else throw new HamburgerException(`Добавлена не корректная начинка: ${el.name}`);
        }
      );
      //Если в stuffing передано несколько констант, то добавляем их поочереди с проверкой на дубли.
    } catch (e) {
      e.errorOutput();
    }
  }

  /**
   * Добавить добавку к гамбургеру. Можно добавить несколько
   * добавок, при условии, что они разные.
   *
   * @param topping     Тип добавки
   * @throws {HamburgerException}  При неправильном использовании
   */
  addTopping(...topping) {

    try {
      topping.forEach(
        el => {
          if (el === Hamburger.TOPPING_MAYO || el === Hamburger.TOPPING_SPICE) {
            if (this.topping.includes(el)) {
              throw new HamburgerException(`Вы добавляете повторно: ${el.name}`);
            } else this.topping.push(el);
          } else throw new HamburgerException(`Добавлена не корректная добавка: ${el.name}`);
        }
      )
    } catch (e) {
      e.errorOutput();
    }
  };

  /**
   * Убрать добавку, при условии, что она ранее была
   * добавлена.
   *
   * @param topping   Тип добавки
   * @throws {HamburgerException}  При неправильном использовании
   */
  removeTopping(...topping) {
    try {
      topping.forEach(
        el => {
          if (el === Hamburger.TOPPING_MAYO || el === Hamburger.TOPPING_SPICE) {
            let ind = this.topping.indexOf(el);
            if (ind === -1) {
              throw new HamburgerException(`Удаляемой добавки нет: ${el.name}`);
            } else this.topping.splice(ind, 1);
            // if (!this.topping.includes(el)) {
            //   throw new HamburgerException(`Удаляемой добавки нет: ${el.name}`);
            // } else this.topping.splice(topping.indexOf(el), 1);
          } else throw new HamburgerException(`Попытка удалить не корректную добавку: ${el.name}`);
        }
      )
    } catch (e) {
      e.errorOutput();
    }
  };

  /**
   * Получить список добавок.
   *
   * @return {Array} Массив добавленных добавок, содержит константы
   *                 Hamburger.TOPPING_*
   */
  //TODO: дописать JSDoc
  getToppings(obj) {
    if (obj === 'object') return this.topping;
    else return this.getToppings('object').reduce(
      function (outString, itemObj, ind, arr) {
        if (ind + 1 === arr.length) return outString + itemObj.name;
        return outString + itemObj.name + ', ';
      }, '');
  };

  /**
   * Узнать размер гамбургера
   */
  //TODO: дописать JSDoc
  getSize(obj) {
    if (obj === 'object') return this.size;
    else return this.size.name;
  };

  /**
   * Узнать начинку гамбургера
   */
  //TODO: дописать JSDoc
  getStuffing(obj) {
    if (obj === 'object') return this.stuffing;
    else return this.getStuffing('object').reduce(
      function (outString, itemObj, ind, arr) {
        if (ind + 1 === arr.length) return outString + itemObj.name;
        return outString + itemObj.name + ', ';
      }, '');
  };

  /**
   * Узнать цену гамбургера
   * @return {Number} Цена в тугриках
   */
  calculatePrice() {
    let price = 0;
    price = this.stuffing.reduce((akk, el) => akk + el.price, price);
    price = this.topping.reduce((akk, el) => akk + el.price, price);
    return price;
  };

  /**
   * Узнать калорийность
   * @return {Number} Калорийность в калориях
   */
  calculateCalories() {
    let calories = 0;
    calories = this.stuffing.reduce((akk, el) => akk + el.calories, calories);
    calories = this.topping.reduce((akk, el) => akk + el.calories, calories);
    return calories;
  };

}

/* Размеры, виды начинок и добавок */
Hamburger.SIZE_SMALL = {name: 'Маленький',constName: 'SIZE_SMALL',  price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'Большой',constName: 'SIZE_LARGE', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'Сыр',constName: 'STUFFING_CHEESE', price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {name: 'Салат',constName: 'STUFFING_SALAD', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'Кортофель',constName: 'STUFFING_POTATO', price: 15, calories: 10};
Hamburger.TOPPING_MAYO = {name: 'Приправа',constName: 'TOPPING_MAYO', price: 15, calories: 0};
Hamburger.TOPPING_SPICE = {name: 'Майонез',constName: 'TOPPING_SPICE', price: 20, calories: 5};
