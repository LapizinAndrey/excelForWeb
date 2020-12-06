import {capitalize} from '@core/utils';

export class DOMListner {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('Ничего не знаю о корне для DOMListner')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(
                    `Метод ${method} не существует в компоненте ${this.name}`
                )
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }
    removeDomListeners() {
        this.listeners.forEach(listener => {
            this.$root.off(listener, getMethodName(listener))
        })
    }
}

function getMethodName(eventName) {
    return 'on'+capitalize(eventName)
}


