import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
    nInput: HTMLInputElement;
    type: string = 'text';
    validate: any = () => { }

    constructor(element: ComponentProps) {
        super(element);

        this.nInput = this.nRoot.querySelector('input');
        this.type = this.nInput.type;

        switch (this.type) {
            case 'email':
                this.validate = this.emailValidate
                break;
            case 'tel':
                this.validate = this.phoneValidate
                break;
            default:
                this.validate = this.defaultValidate
        }

        this.nInput.addEventListener('input', this.validate)
    }

    getTarget() {
        return this.nInput
    }

    getName = (): string => this.nInput.name;

    getValue = (): string => this.nInput.value;

    setFill = (value: boolean) => {
        if (value) {
            this.nRoot.classList.add('fill');
            this.nRoot.classList.remove('error');
        } else {
            this.nRoot.classList.add('error');
            this.nRoot.classList.remove('fill');
        }
    }

    emailValidate = (e: any) => {
        const value = e.target.value;
        const reg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const isValid = reg.test(value);
        this.setError(isValid)
        this.setFill(isValid);
        return isValid;
    }

    phoneValidate = (e: any) => {
        const value = e.target.value;
        const reg = /^\d+$/;
        const isValid = reg.test(value);
        this.setError(isValid)
        this.setFill(isValid);
        return isValid;
    }

    defaultValidate = (e: any) => {
        const value = e.target.value;
        const isValid = value && value.length && !!value.length;
        this.setError(isValid)
        this.setFill(!!isValid);
        return !!isValid
    }

    setError(isError: any) {
        let errorBlock = this.getTarget().parentElement.querySelector('.input__error');
        if (!isError) {
            errorBlock.innerHTML = "Ошибка в поле " + this.getName()
        } else {
            errorBlock.innerHTML = ""
        }
    }

    destroy = () => {
        // Destroy functions
    }
}