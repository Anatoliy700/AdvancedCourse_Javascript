"use strict";

const converterString = {
  container: null,
  input: null,
  button: null,
  out: null,

  init() {
    this.container = document.querySelector('body');
    this.input = document.createElement('textarea');
    //width: 330px; height: 64px;"
    this.input.style.width = '330px';
    this.input.style.height = '64px';
    this.input.value = `'Lorem ipsum'dolor sit 'amet'.`;
    this.button = document.createElement('button');
    this.button.style.display = 'block';
    this.button.innerText = 'Конвертировать';
    this.out = document.createElement('p');
    this.container.appendChild(this.input);
    this.container.appendChild(this.button);
    this.container.appendChild(this.out);

    this.button.addEventListener('click', () => this.btnClickHandler());
  },

  btnClickHandler() {
    let data = this.input.value;
    this.out.innerText = data.replace(/(?!\b'\b)'/g, '"');
  },


};

window.onload = () => converterString.init();