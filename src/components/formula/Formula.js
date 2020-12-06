import {ExcelComponent} from '@core/ExcelComponent.JS';

export class Formula extends ExcelComponent {

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'click']
        });
    }

    static className = 'excel__formula'

    toHTML() {
        return `
            <div class="formula-info">fx:</div>
            <div class="formula-input" contenteditable spellcheck="false"></div>`
    }

    onInput(e) {
        console.log(this.$root)
        console.log(e.target.textContent.trim())
    }

    onClick(e) {
        console.log(this.$root)
        console.log('Кликнули')
    }
}
