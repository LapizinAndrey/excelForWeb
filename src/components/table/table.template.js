const CODES = {
    A: 65,
    Z: 90
}

function toColumn(col) {
    return `
        <div class="column">
            ${col}                 
        </div>
    `
}

function toCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createRow(content, index = '') {
    return `
    <div class="row">
        <div class="rowInfo">${index}</div>
        <div class="row-data">${content}</div>
    </div>`
}

function toChar(_, index) {

    let num = ++index
    const base = (CODES.Z - CODES.A) + 1
    let str = ''

    do {
        const mod = num % base
        num = num / base | 0

        str = (mod ? String.fromCharCode(CODES.A + mod - 1) : (--num, 'Z')) + str

    } while (num)

    return str;
}

export function createTable(rowsCount = 15, colsCount = CODES.Z - CODES.A + 1) {
    const rows = []

    const cols = new Array(colsCount).fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell).join('')
        rows.push(createRow(cells, (i+1).toString()))
    }

    return rows.join('')
}
