"use strict";

/**
 *
 * @type {{init(): void, getSuccess(): void, getError(): void, sendAJAX(*=): void, handlerResponse(*): undefined}}
 */
const checkAJAX = {

  /**
   *
   */
  init() {
    document.getElementById('success').addEventListener('click', () => this.getSuccess());
    document.getElementById('error').addEventListener('click', () => this.getError());

  },

  /**
   *
   */
  getSuccess() {
    this.sendAJAX('success.json');
  },

  getError() {
    this.sendAJAX('error.json');
  },

  sendAJAX(path) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.send(null);
    xhr.onreadystatechange = () => this.handlerResponse(xhr);
  },


  /**
   *
   * @param response
   */
  handlerResponse(response) {
    if (response.readyState !== 4) return;
    if (response.status !== 200) {
      console.error('Ошибка :', response.status, response.statusText);
      return;
    }
    const responsObj = JSON.parse(response.responseText);
    if (responsObj.result === 'success') {
      console.log('Данные успешно загружены!');
    }
    if (responsObj.result === 'error') {
      console.log('Сервер вернул ошибку!');
    }
  },
};