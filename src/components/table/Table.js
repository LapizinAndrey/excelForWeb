import {ExcelComponent} from '@core/ExcelComponent.JS';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {

    static className = 'excel__table'

    toHTML() {
        return createTable(15, 512)
    }
}