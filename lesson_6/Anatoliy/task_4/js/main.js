$(document).ready(function () {
  let $goods = $('.goods');

  //Создаем товары
  let good1 = new Good(123, 'Коврик для мыши', 300);
  good1.render($goods);

  let good2 = new Good(124, 'Клавиатура', 1000);
  good2.render($goods);

  let good3 = new Good(125, 'Мышь для ПК', 700);
  good3.render($goods);

  //Создаем экземпляр корзины
  let basket = new Basket('basket');
  basket.render($('#basket_wrapper'));

  //Добавление товара в корзину
  $('button.buygood').on('click', function () {
    let idProduct = parseInt($(this).attr('data-id'));
    let price = parseInt($(this).parent().find('span.product-price').text());

    basket.add(idProduct, price);
  });

  //Удаление товара из корзины
  //TODO: ДЗ
  $('button.delgood').click(function () {
    let idProduct = parseInt($(this).attr('data-id'));

    basket.remove(idProduct);
  });
});