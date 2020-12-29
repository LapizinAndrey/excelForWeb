export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null // Можно пользоваться и group[0], но возможна ошибка
    }

    select($el) {
        this.clear()
        this.current = $el
        this.group.push($el)
        $el.addClass(TableSelection.className).focus()
    }

    clear() {
        this.group.forEach(el=>el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach(el => el.addClass(TableSelection.className))
    }
}
