class Comment {
  constructor(userId, message, commentId) {
    this.id_user = userId;
    this.text = message;
    this.commentId = commentId;
    this.classContainer = 'comment-item';
    this.classMessage = 'comment-item_message';
    this.classDelBtn = 'comment-item_del-btn';
    this.classApprovelBtn = 'comment-item_approve-btn';
  }

  render($jQueryElement) {
    const $containerComment = $('<div />', {
      class: this.classContainer,
      'data-id': this.commentId,
    });

    const $messageComment = $('<p />', {
      class: this.classMessage,
      text: this.text,
    });

    const $delBtnComment = $('<button />', {
      class: this.classDelBtn,
      'data-id': this.commentId,
      text: 'Удалить',
    });

    const $approveBtnComment = $('<button />', {
      class: this.classApprovelBtn,
      'data-id': this.commentId,
      text: 'Одобрить',
    });

    $containerComment.append($messageComment)
      .append($delBtnComment)
      .append($approveBtnComment)
      .appendTo($jQueryElement);
  }

}