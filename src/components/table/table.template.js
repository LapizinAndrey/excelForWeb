const CODES = {
    A: 65,
    Z: 90
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizeble" data-col = ${index}>
            ${col}
            <div class="col-resize" data-resize="col"></div>                 
        </div>
    `
}

function toCell(_, col) {
    return `
        <div class="cell" contenteditable data-col = ${col}></div>
    `
}

function createRow(content, index = '') {
    const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
    <div class="row" data-type="resizeble">
        <div class="rowInfo">
            ${index}
            ${index ? resizer: ''}
        </div>
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
        .map((char, index)=>toColumn(char, index))
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
