// импортируем класс Select
import { Select } from './select/select';

// создаем экземпляр класса. В качестве аргумента передаем id 
const select = new Select('#select', {
    placeholder: 'Выберите элемент',
    selectedId: '2',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Angular'},
        {id: '3', value: 'Vue'},
        {id: '4', value: 'React Native'},
        {id: '5', value: 'Next'},
        {id: '6', value: 'Nest'}
    ], 
    onSelect(item){
        console.log(item);
    }
});


window.s = select;




