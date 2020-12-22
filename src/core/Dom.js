class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }
    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        } else {
            return this.innerHTML.trim();
        }
    }
    clear() {
        this.html('')
        return this
    }

    on(evenType, callback) {
        this.$el.addEventListener(evenType, callback)
        return this
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }


    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
        return this
    }

    selectALL(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.keys(styles)
            .forEach(key => this.$el.style[key] = styles[key])
        return this
    }

    get data() {
        return this.$el.dataset
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
