"use strict";

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 */
class HamburgerException extends Error {

  //TODO: доделать JSDoc
  constructor(message) {
    super(message);
    // this.message = message;
    // this.name = 'Error';
    this.errorOutput = function () {
      console.error(this.message);
    }
  }
}