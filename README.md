# select

https://nardo88.github.io/select/

## Код HTML

```html
    <div class="app">
        <div class="wrap">
            <div id="select">
                
            </div>
        </div>
    </div>
```

## Код SCSS

```SCSS
$height : 46px;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
}

.app{
    padding-top: 5rem;
    display: flex;
    justify-content: center;
}

.wrap{
    width: 500px;
}

.select {
    width: 100%;
    position: relative;
    z-index: 100;

    &.open {
        .select__dropdown{
            display: block;
        }
        .select__input{
            border-bottom: transparent;
        }

        .select__backdrop{
            display: block;
        }

    }

    // .select__input

    &__input {
        border: 1px solid #ccc;
        border-radius: 5px;
        height: $height;
        display: flex;
        align-items: center;
        padding: 0 1rem;
        cursor: pointer;
        justify-content: space-between;        
    }

    // .select__dropdown

    &__dropdown {
        display: none;
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 5px;
        top: $height;
        right: 0;
        left: 0;
        max-height: 200px;
        overflow-y: auto;
        box-shadow: 2px 3px 5px rgba(0,0,0,0.3);
    }

    &__list{
        list-style-type: none;
    }
    &__item{
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        transition: .15s background-color ease-in;

        &:hover{
            background-color: #eee;
        }

        &.selected{
            background-color: bisque;
        }
    }

    &__backdrop{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: transparent;
        z-index: -1;
        display: none;
    }
}
```


## Код JavaScript

```javascript
// импортируем класс Select
import { Select } from './select/select';

// создаем экземпляр класса. В качестве аргумента передаем id обертки селекта
const select = new Select('#select', {
    // предпочитаемый placeholder
    placeholder: 'Выберите элемент',
    // id выбранного по умолчанию элемента списка 
    // (ВАЖНО передаем не число а строку)
    selectedId: '2',
    // массив с элементами списка
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
        {id: '4', value: 'React Native'},
        {id: '5', value: 'Next'},
        {id: '6', value: 'Nest'}
    ], 
    // callBack которая будет вызываться при каждом выборе элемента списка
    // функция будет передан выбранный элемент списка
    onSelect(item){
        // здесь можем прописать свой код
        console.log(item);
    }
});

// глобальному объекту можем передать наш экземпляр
// класса что бы в любом месте управлять им программно
window.s = select;
```

## Методы класса

* select(id) - если этому методу передать в качестве аргумента строку с id то будет выбран элемент списка с этим id