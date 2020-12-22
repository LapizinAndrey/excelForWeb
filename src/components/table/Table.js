import {ExcelComponent} from '@core/ExcelComponent.JS';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table-resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {

    static className = 'excel__table'

    constructor($root) {
        super($root, {listeners: ['click', 'mousedown']});
    }

    toHTML() {
        return createTable(15, 512)
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(this.$root, e)
        }
    }
}
