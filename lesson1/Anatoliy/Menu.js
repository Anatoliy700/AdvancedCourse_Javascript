class Menu
{
    //Конструктор - метод, который вызывается до создания объекта
    constructor(id, className, items)
    {
        this.id = id;
        this.className = className;
        this.items = items;
    }
    render()
    {
        let result = `<ul class="${this.className}" id="${this.id}">`;

        for(let i = 0; i < this.items.length; i++)
        {
            if (this.items[i] instanceof MenuItem) {
                result += this.items[i].renderItem(); //Если это пункт меню
            }
            if (this.items[i] instanceof Submenu)
            {
                //Необходимо сделать обертку
                result += this.items[i].renderItem();
            }
        }

        result += '</ul>';
        return result;
    }
    remove(){
        let menuElem = document.getElementById(this.id);
        menuElem.parentElement.removeChild(menuElem);
    }
}


/*



 */