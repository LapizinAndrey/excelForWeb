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

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    focus() {
        this.$el.focus()
        return this
    }

    blur() {
        this.$el.blur()
        return this
    }

    text(text) {
        if (typeof text === 'string') {
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    addClass(classname) {
        this.$el.classList.add(classname)
        return this
    }

    removeClass(classname) {
        this.$el.classList.remove(classname)
        return this
    }

    id(parse) {
        if (parse) {
            const id = this.id()
            if (id) {
                const parsed = id.split(':')
                return {
                    row: +parsed[0],
                    col: +parsed[1]
                }
            } else {
                return id
            }
        }
        return this.data.id || ''
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
