"use strict";

const nav = {
  containerId: 'navWrap',
  pathJSON: 'js/nav.json',
  classUl: 'nav',

  init() {
    this.xhrRequest(this.pathJSON);
  },

  xhrRequest(path) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return false;
      if (xhr.status !== 200) {
        console.error('Ошибка: ', xhr.status, xhr.statusText);
        return false;
      }
      if (!xhr.responseText) {
        console.log('Ответ от сервера пуст :', xhr.responseText);
        return false;
      }
      this.render(this.containerId, JSON.parse(xhr.responseText), this.classUl);
    };
  },

  render(containerId, itemsObj, classUl) {
    const container = document.getElementById(containerId);
    const ul = document.createElement('ul');
    ul.classList.add(classUl);
    container.appendChild(ul);
    for (let i = 0; i < itemsObj.length; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = itemsObj[i].link;
      a.innerText = itemsObj[i].title;
      li.appendChild(a);
      ul.appendChild(li);
    }
  },
};

window.onload = () => nav.init();