import Component, { ComponentProps } from '../../app/js/component';

export default class Textarea extends Component.Default {
    nTextarea: HTMLTextAreaElement;

    constructor(element: ComponentProps) {
        super(element);

        this.nTextarea = this.nRoot.querySelector('textarea');
        this.nTextarea.addEventListener('input', this.defaultValidate);
    }

    getTarget(){
        return this.nTextarea
    }

    getName = (): string => this.nTextarea.name;

    getValue = (): string => this.nTextarea.value;

    setFill = (value: boolean) => {
        if (value) {
            this.nRoot.classList.add('fill');
        } else {
            this.nRoot.classList.remove('fill');
        }
    }

    defaultValidate = (e: any) => {
        const value = e.target.value;
        const isValid = value && value.length && !!value.length;

        this.setFill(!!isValid);
        return !!isValid
    }

    destroy = () => {
        // Destroy functions
    }
}