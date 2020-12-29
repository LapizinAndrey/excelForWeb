export function shouldResize(event) {
     return event.target.dataset.resize
}

export function isCell(e) {
     return e.target.dataset.type === 'cell'
}

export function range(start, end) {
     if (start > end) {
          [end, start] = [start, end]
     }
     return new Array(end - start + 1)
         .fill('')
         .map((_, index) => start + index)
}

export function matrix($current, $target) {
     const target = $target.id(true)
     const current = $current.id(true)

     const cols = range(current.col, target.col)
     const rows = range(current.row, target.row)

     return cols.reduce((acc, col) => {
          rows.forEach(row => acc.push(`${row}:${col}`))
          return acc
     }, [])
}

export function nextSelector(key, {col, row}) {
     switch (key) {
          case 'Enter':
          case 'ArrowDown':
               row++
               break;
          case 'Tab':
          case 'ArrowRight':
               col++
               break;
          case 'ArrowUp':
               row > 0 ? row-- : row
               break;
          case 'ArrowLeft':
               col > 0 ? col-- : col
               break;
     }
     return `[data-id="${row}:${col}"]`
}
