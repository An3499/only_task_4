import { LogLevels } from '../../../node_modules/@barba/core/dist/core/src/modules/Logger';
import Component, { ComponentProps, getComponents } from '../../app/js/component';
const axios = require('axios');
import Input from '../input/input';
import Textarea from '../textarea/textarea';

export default class FeedbackForm extends Component.Default {
    nInputs: Input[];
    nTextareas: Textarea[];
    nButton: HTMLElement;

    constructor(element: ComponentProps) {
        super(element);

        this.nInputs = getComponents('input').map(input => new Input(input));
        this.nTextareas = getComponents('textarea').map(textarea => new Textarea(textarea));
        this.nButton = this.getElement('button');
        this.nButton.addEventListener('click', this.collectData);
    }

    collectData = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        const elements = Array.from(this.nInputs)

        const isValid = elements
            .map(el => {
                let isValid =  el.validate({ target: el.getTarget() })

                let errorBlock  = el.getTarget().parentElement.querySelector('.input__error');
                if(!isValid){
                   errorBlock.innerHTML = "Ошибка в поле " + el.getName()
                } else {
                    errorBlock.innerHTML = ""
                }

                return isValid
            })
            .find(el => !el);

        if (isValid === false) return alert("Проверте правильность ввода данных!")

        const data: any = {};
        this.nInputs.forEach(link => data[link.getName()] = link.getValue());
        this.nTextareas.forEach(link => data[link.getName()] = link.getValue());
        this.sendData(data);
    }

    sendData = (data: any) => {
        axios.post('/', data)
            .then((response: any) => console.log(response))
            .catch((error: any) => console.log(error))
            .default(()=> {
                alert("Данные отправлены успешно");
                location.reload();
            });
    }

    destroy = () => {
        // Destroy functions
    }
}