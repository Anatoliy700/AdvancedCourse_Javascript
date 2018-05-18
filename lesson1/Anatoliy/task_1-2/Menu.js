"use strict";

/**
 * Описывает объект создающий {HTMLElement} меню.
 */
class Menu {
  //Конструктор - метод, который вызывается до создания объекта
  /**
   * Конструктор объекта.
   * @param {int} id значение атрибута ID.
   * @param {string} className значение атрибута class.
   * @param {Object[]}items массив объектов эелементов(пунктов) меню.
   */
  constructor(id, className, items) {
    this.id = id;
    this.className = className;
    this.items = items;
  }

  /**
   * Создает HTML структуру меню и возвращает ее.
   * @return {string} HTML структура меню.
   */
  render() {
    let result = `<ul class="${this.className}" id="${this.id}">`;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem) {
        result += this.items[i].renderItem(); //Если это пункт меню
      }
      if (this.items[i] instanceof Submenu) {
        result += this.items[i].render();
        // //Необходимо сделать обертку
        // result += this.items[i].renderItem();
      }
    }

    // result += `<li><a href="#" onclick="${(function(ttt){return ttt.remove()})(this)}">Удалить</a></li>`;
    result += `<li><a data-name="del" data-id="${this.id}" href="#">Удалить</a></li>`;
    result += '</ul>';
    return result;
  }

  /**
   * Удаляет текущий объект меню(в котором вызван) со траницы.
   */
  remove(e) {
    if (e) {
      const elem = e.target;
      if (elem.dataset.name === "del") {
        let menuElem = document.getElementById(elem.dataset.id);
        menuElem.parentElement.removeChild(menuElem);
      }
    } else {
      let menuElem = document.getElementById(this.id);
      menuElem.parentElement.removeChild(menuElem);
    }
  }
}


/*



 */