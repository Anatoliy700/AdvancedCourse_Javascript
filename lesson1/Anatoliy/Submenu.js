class Submenu extends Menu {
  constructor(id, className, items, title) {
    super(id, className, items);
    this.title = title;
  }

  render() {
    let result = `<li><a href="#">${this.title}</a>`;
    result += super.render();
    result += '</li>';
    return result;
  }

  remove() {
    let parentElem = document.getElementById(this.id).parentElement;
    parentElem.parentElement.removeChild(parentElem);
  }
}