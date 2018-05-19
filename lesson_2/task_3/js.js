"use strict";

/**
 * Объект для вывода и работы с фотогалереей.
 */
const photoGallery = {

  /**
   * Отправляет AJAX запрос, получает JSON с объектами ссылок на картинки и запускает отрисовку галереи.
   */
  init() {
    const request = new XMLHttpRequest();
    request.open('GET', 'img_src.json');
    request.send();
    request.onreadystatechange = () => function (obj) {
      if (request.readyState !== 4) return;

      if (request.status !== 200) {
        console.log('Ошибка: ', request.status, request.statusText);
      } else {
        // console.log(JSON.parse(request.responseText));
        obj.renderImg(JSON.parse(request.responseText), 'gallery_wrap');
      }
    }(this);
  },

  /**
   * Отрисовывает галерею и навешивает собыитие.
   * @param {object[]} srcArr массив объектов с сылками на картинки.
   * @param {string} idWrap id HTML элемента, в котором содираем галерею.
   */
  renderImg(srcArr, idWrap) {
    const elementParent = document.getElementById(idWrap);
    for (let obj of srcArr) {
      let elImg = document.createElement('img');
      elImg.src = obj.min;
      elImg.dataset.maxSrc = obj.max;
      elementParent.appendChild(elImg);
    }
    elementParent.addEventListener('click', event => this.clickHandler(event));
  },

  /**
   * Обрабатывает событие click по обертке и дочерним элементам, выбирая тока click по IMG и обрабатывае его.
   * Открывает картинку по которой был click на весь экран.
   * @param {object} event объект собития click который произошел.
   */
  clickHandler(event) {
    if (event.target.tagName !== "IMG") return;
    const div = document.createElement('div');
    div.classList.add('openImageWrap');
    const img = document.createElement('img');
    img.classList.add('openImage');
    img.src = event.target.dataset.maxSrc;
    div.appendChild(img);
    document.querySelector('body').appendChild(div);
    div.addEventListener('click', () => (function (div) {
      div.parentElement.removeChild(div);
    }(div)))
  }
};


