"use strict";

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 */
class HamburgerException extends Error {

  //TODO: доделать JSDoc
  constructor(message) {
    super(message);
  }

  errorOutput() {
    console.error(this.message);

    let elem = document.getElementById('errorMessage');
    if (!elem) {
      elem = document.createElement('div');
      elem.id = 'errorMessage';
      document.getElementById('container').appendChild(elem);
    }
    elem.innerHTML = this.message;
  }

  removeHtmlElem(){
    let elem = document.getElementById('errorMessage');
    if (elem) {
      elem.parentElement.removeChild(elem);
    }
  }
}