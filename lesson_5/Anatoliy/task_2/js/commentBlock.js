"use strict";

const settings = {
  idContainer: 'container',
  idCommentBlock: 'comment_wrapper',
  classCommentApproved: 'approved',
  urlGetAllComments: 'json/review.list.json',
  urlDelComment: 'json/review.delete.json',
  urlApprovalComment: 'json/review.submit.json',
  urlAddComment: 'json/review.add.json',
};

/**
 *
 * @type {{settings: {idContainer: string, idCommentBlock: string, classCommentApproved: string, urlGetAllComments: string, urlDelComment: string, urlApprovalComment: string, urlAddComment: string}, $elCommentBlock: null, arrAllComments: Array, init(): void, render(): void, btnClickHandler(*): void, approve(*=): void, remove(*=): void, add(*=): void, ajax(*): void}}
 */
const commentBlock = {
  settings,
  $elCommentBlock: null,
  arrAllComments: [],

  /**
   *
   */
  init() {
    this.$elCommentBlock = $(`#${this.settings.idCommentBlock}`);
    $(`#${this.settings.idContainer}`).on('click', 'button', event => this.btnClickHandler(event));
    this.ajax({
      url: this.settings.urlGetAllComments,
      data: '',
      success: data => {
        if (data.result && data.result === 0) {
          console.error(`Ошибка! Ответ от сервера: ${data.error_message}`);
          return;
        }
        this.arrAllComments = data.comments;

        this.render();
      }
    });
  },

  /**
   *
   */
  render() {
    if (this.arrAllComments.length > 0) {
      for (const obj of this.arrAllComments) {
        const comment = new Comment(obj.id_comment, obj.text);
        comment.render(this.$elCommentBlock);
      }
    }
  },

  /**
   *
   * @param event
   */
  btnClickHandler(event) {
    if (event.target.dataset.type === 'del') {
      this.remove(event.target);
    } else if (event.target.dataset.type === 'app') {
      this.approve(event.target);
    } else if (event.target.dataset.type === 'add') {
      event.preventDefault();
      this.add(event.target);
    }
  },

  /**
   *
   * @param elem
   */
  approve(elem) {
    this.ajax({
      url: this.settings.urlApprovalComment,
      data: {
        id_comment: elem.dataset.id
      },
      success: data => {
        (function (data, elem, obj) {
          if (data.result && data.result === 1) {
            $(elem).parent('.comment-item').addClass(obj.settings.classCommentApproved)
              .attr('data-approved', true);
            $(elem).remove()

          } else if (data.result === 0) {
            alert(`Сервер вернул ошибку: ${data.error_message}`);
          }
        }(data, elem, this))
      }
    });
  },

  /**
   *
   * @param elem
   */
  remove(elem) {
    this.ajax({
      url: this.settings.urlDelComment,
      data: {
        id_comment: elem.dataset.id
      },
      success: data => {
        (function (data, elem) {
          if (data.result && data.result === 1) {
            $(elem).parent(`.comment-item`).remove();
          } else if (data.result === 0) {
            alert(`Сервер вернул ошибку: ${data.error_message}`);
          }
        }(data, elem))
      }
    });
  },

  /**
   *
   * @param elem
   */
  add(elem) {
    let userNameInput = $(elem).siblings(`#nameUser`);
    let userMessageInput = $(elem).siblings(`#commentUser`);
    let userName = userNameInput.val();
    let userMessage = userMessageInput.val();
    if (userName && userMessage) {
      let userId = Math.floor(Math.random() * 10 * userName.length);
      this.ajax({
        url: this.settings.urlAddComment,
        data: {
          id_user: userId,
          text: userMessage
        },
        success: data => {
          (function (data, elem, arrComments) {
            if (data.result && data.result === 1) {
              const newComment = new Comment(userId, userMessage);
              newComment.render(elem);
              arrComments.push({
                "id_comment": userId,
                "text": userMessage
              });
              userNameInput.val('');
              userMessageInput.val('');
            } else if (data.result === 0) {
              alert(`Сервер вернул ошибку: ${data.error_message}`);
            }
          }(data, this.$elCommentBlock, this.arrAllComments))
        }
      });
    }
  },

  /**
   *
   * @param param
   */
  ajax(param) {
    $.ajax({
      url: param.url,
      type: 'GET',
      dataType: 'json',
      data: param.data,
      success: param.success,
      error: (data, textStatus, jqXHR) => console.error(textStatus, jqXHR),
    });
  },

};