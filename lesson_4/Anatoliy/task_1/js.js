"use strict";

$(document).ready(function () {
  $('.tabs').on('click', 'li', function () {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $(this).parents('.wrap').children('.wrap-content').eq(0).children('.content')
      .removeClass('active').eq($(this).index()).addClass('active');
  })
});
