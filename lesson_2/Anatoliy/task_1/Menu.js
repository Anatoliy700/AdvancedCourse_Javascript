"use strict";

/**
 * Описывает объект создающий {HTMLElement} меню.
 */
class Menu {
  //Конструктор - метод, который вызывается до создания объекта
  /**
   * Конструктор объекта.
   * @param {string} id значение атрибута ID.
   * @param {string} className значение атрибута class.
   * @param {Object[]}items массив объектов эелементов(пунктов) меню.
   * @param {boolean} delItem если передано true то будет выведен последним элементом, элемент удаления текущего меню,
   * иначе элемент для удаления не будет добавлен.
   */
  constructor(id, className, items, delItem = false) {
    this.id = id;
    this.className = className;
    this.items = items;
    this.delItem = delItem;
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
      }
    }

    if (this.delItem) {
      result += `<li><a data-name="del" data-id="${this.id}" href="#" style="color: red;">Удалить меню</a></li>`;
    }

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
        let parentMenuElem = document.getElementById(elem.dataset.id).parentElement;
        // let parent = menuElem.parentElement;
        parentMenuElem.parentElement.removeChild(parentMenuElem);
      }
    } else {
      let menuElem = document.getElementById(this.id);
      menuElem.parentElement.removeChild(menuElem);
    }
  }
}


/*



 */