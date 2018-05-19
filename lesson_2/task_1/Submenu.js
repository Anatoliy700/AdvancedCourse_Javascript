"use strict";

/**
 * Описывает объект создающий {HTMLElement} подменю.
 * Наследует класс меню.
 */
class Submenu extends Menu {

  /**
   * Переопределенный конструктор объекта.
   * @param {int} id значение атрибута ID.
   * @param {string} className значение атрибута class.
   * @param {Object[]}items массив объектов эелементов(пунктов) меню.
   * @param {string} title значение innerText родительского элемента <li>.
   */
  constructor(id, className, items, title) {
    super(id, className, items);
    this.title = title;
  }

  /**
   *  Переопределенный метод создает HTML структуру меню и возвращает ее.
   * @return {string} HTML структура меню.
   */
  render() {
    let result = `<li><a href="#">${this.title}</a>`;
    result += super.render();
    result += '</li>';
    return result;
  }

  /**
   * Переопределенный метод удаляет текущий объект меню(в котором вызван)и родительский элемент <li> со траницы.
   */
  remove() {
    let parentElem = document.getElementById(this.id).parentElement;
    parentElem.parentElement.removeChild(parentElem);
  }
}