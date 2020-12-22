import {$} from '@core/Dom';

export function resizeHandler($root, e) {
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    const resizerSize = `-${$root.getCoords()[type === 'col' ? 'height' : 'width']}px`
    let value

    $resizer.css({
        opacity: 1,
        [sideProp]: resizerSize
    })

    document.onmousemove = event => {
        if (type === 'col') {
            const delta = Math.floor(event.pageX - coords.right)
            value = coords.width + delta + 'px'
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = Math.floor(event.pageY - coords.bottom)
            value = coords.height + delta + 'px'
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {

        if (type === 'col') {
            $root.selectALL(`[data-col="${$parent.data.col}"]`)
                .forEach(el=>el.style.width = value)
        } else {
            $parent.css({height: value})
        }

        $resizer.css({opacity: 0, bottom: 0, right: 0})

        document.onmouseup = null
        document.onmousemove = null
    }
}
