import {DOMListner} from '@core/DOMListner';

export class ExcelComponent extends DOMListner {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubs = []

        this.prepare()
    }

    prepare() {

    }

    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
        this.unsubs.forEach(fn => fn())
    }

    // Фасад ???

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        this.unsubs.push(this.emitter.subscribe(event, fn))
    }


}
