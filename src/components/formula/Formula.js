import {ExcelComponent} from '@core/ExcelComponent.JS';
import {$} from '@core/Dom'

export class Formula extends ExcelComponent {

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        });
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('Table:select', cell => {
            this.$formula.text(cell.text())
        })

        this.$on('Table:input', cell => {
            this.$formula.text(cell.text())
        })
    }

    static className = 'excel__formula'

    toHTML() {
        return `
            <div class="formula-info">fx:</div>
            <div class="formula-input" id="formula" contenteditable spellcheck="false"></div>`
    }

    onInput(e) {
        this.$emit('Formula:Input', $(e.target).text())
    }

    onKeydown(e) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(e.key)) {
            e.preventDefault()
            this.$root.blur()
            this.$emit('Formula:done')
        }
    }
}
