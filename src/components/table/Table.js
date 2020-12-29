import {ExcelComponent} from '@core/ExcelComponent.JS';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table-resize';
import {isCell, shouldResize, matrix, nextSelector} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/Dom'

export class Table extends ExcelComponent {

    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options});
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $defaultCell = this.$root.find('[data-id="0:0"]')
        this.selectCell($defaultCell)
        this.$on('Formula:Input', text => {
            this.selection.current.text(text)
        })
        this.$on('Formula:done', () => {
            console.log(`Потеряли фокус на формуле и получили фокус на ячейке ${this.selection.current}`)
            this.selection.current.focus()
        })
    }

    toHTML() {
        return createTable(15, 512)
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('Table:select', $cell)
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(this.$root, e)
        } else if (isCell(e)) {
            const $target = $(e.target)
            if (e.shiftKey) {
                const cells = matrix(this.selection.current, $target)
                    .map(id => this.$root.find(`[data-id="${id}"]`))

                this.selection.selectGroup(cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onInput(e) {
        this.$emit('Table:input', $(e.target))
    }

    onKeydown(e) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = e
        if (keys.includes(key) && !e.shiftKey) {
            e.preventDefault()
            const $next = this.$root.find(nextSelector(key, this.selection.current.id(true)))
            this.selectCell($next)
        }
    }
}


