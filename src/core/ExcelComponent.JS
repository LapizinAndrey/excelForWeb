import {DOMListner} from '@core/DOMListner';

export class ExcelComponent extends DOMListner {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}
