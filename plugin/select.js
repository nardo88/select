const getTemplate = (data = [], placeholder, selectedId) => {
    let text = placeholder ?? 'default placeholder';

    const items = data.map(item => {
        let cls = ''
        if (item.id === selectedId) {
            text = item.value;
            cls = 'selected'
        }

        return `<li data-type="item" data-id="${item.id}" class="select__item ${cls}">${item.value}</li>`;
    })


    return `

        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${text}</span>
            <i class="fa fa-chevron-down" data-type="arrow"></i>
        </div>
        <div  class="select__dropdown">
            <ul class="select__list">
                ${items.join('')}
            </ul>
        </div>
    `;
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;

        this.#render();
        this.#setup();

       
    }


    #render() {
        const {placeholder, data} = this.options;
        this.$el.classList.add('select');
        this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);

    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler.bind(this))
        this.$arrow = this.$el.querySelector('[data-type="arrow"]');
        this.$value = this.$el.querySelector('[data-type="value"]');

    }

    clickHandler(e) {
        const target = e.target.closest('.select__input');
        if (target){
            const {type} = target.dataset;

            if (type === 'input'){
                this.toggle()
            }
        }

        if (e.target.dataset.type === 'item'){
            const id = e.target.dataset.id;
            this.select(id);

        }
        if (e.target.dataset.type === 'backdrop'){
            const id = e.target.dataset.id;
            this.close();

        }
      
    }

    get isOpen(){
        return this.$el.classList.contains('open')
    }

    toggle(){
        if (this.isOpen){
            this.close()
        } else {
            this.open()
        }
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id){
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        this.$el.querySelectorAll('[data-type="item"]').forEach(item => item.classList.remove('selected'));
        this.$el.querySelector(`[data-id="${this.selectedId}"]`).classList.add('selected')

        this.options.onSelect ? this.options.onSelect(this.current) : null;

        this.close();
    }

    open() {
        this.$el.classList.add('open');
        this.$arrow.className = 'fa fa-chevron-up'
    }

    close(){
        this.$el.classList.remove('open');
        this.$arrow.className = 'fa fa-chevron-down'


    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler);
        this.$el.innerHTML = '';

    }


}