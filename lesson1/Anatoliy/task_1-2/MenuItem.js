/**
 * Описывает объект создающий {HTMLElement} пункт(элемент) меню.
 */
class MenuItem {

  /**
   * Конструктор объекта.
   * @param {string} href значение атрибута href элемента <a> (ссылка для перехода при клике по элементу).
   * @param {string} title значение innerText элемента <a>.
   */
  constructor(href, title) {
    this.href = href;
    this.title = title;
  }

  /**
   * Создает HTML структуру елемента пункта меню и возвращает ее.
   * @return {string} HTML структура пункта меню.
   */
  renderItem() {
    return `<li><a href="${this.href}">${this.title}</a></li>`;
  }
}