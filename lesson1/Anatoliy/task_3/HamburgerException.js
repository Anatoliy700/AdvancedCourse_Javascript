"use strict";

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером.
 * Подробности хранятся в свойстве message.
 * @constructor
 */
class HamburgerException extends Error {

  constructor(message) {
    super(message);
    // this.message = message;
    // this.name = 'Error';
    this.errorOutput = function () {
      console.error(this.message);
    }
  }
}