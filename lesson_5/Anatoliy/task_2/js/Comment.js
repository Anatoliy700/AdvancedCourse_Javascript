class Comment {
  constructor(commentId, message) {
    // this.id_user = userId;
    this.text = message;
    this.id_comment = commentId;
    this.classContainer = 'comment-item';
    this.classMessage = 'comment-item_message';
    this.classDelBtn = 'comment-item_del-btn';
    this.classApprovelBtn = 'comment-item_approve-btn';
  }

  render($jQueryElement) {
    const $containerComment = $('<div />', {
      class: this.classContainer,
      'data-id': this.id_comment,
      'data-approved': false,
    });

    const $messageComment = $('<p />', {
      class: this.classMessage,
      text: this.text,
    });

    const $delBtnComment = $('<button />', {
      class: this.classDelBtn,
      'data-id': this.id_comment,
      'data-type': 'del',
      text: 'Удалить',
    });

    const $approveBtnComment = $('<button />', {
      class: this.classApprovelBtn,
      'data-id': this.id_comment,
      'data-type': 'app',
      text: 'Одобрить',
    });

    $containerComment.append($messageComment)
      .append($delBtnComment)
      .append($approveBtnComment)
      .appendTo($jQueryElement);
  }

}