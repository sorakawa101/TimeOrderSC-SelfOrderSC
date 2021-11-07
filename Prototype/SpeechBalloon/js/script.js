// Speech Balloon

interact('.drag-resize-tap-hold')
.draggable({
    inertia: true,
    modifiers: [
    interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
    })
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener }
})

.resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
        move (event) {
        const target = event.target
        let x = (parseFloat(target.getAttribute('data-x')) || 0)
        let y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
        // target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
        }
    },
    modifiers: [
        // keep the edges inside the parent
        interact.modifiers.restrictEdges({
        outer: 'parent'
        }),

        // minimum size
        interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
        })
    ],

    inertia: false
})

.on('tap', function (event) {
    event.currentTarget.classList.toggle('switch-bg')
    event.preventDefault()
})

// delete機能 undo昨日も付けないと…
.on('doubletap', function (event) {
    event.currentTarget.classList.toggle('delete')
    event.preventDefault()
})

.on('hold', function(event) {
    // メニューを表示（色変更など）
    event.preventDefault()
})


function dragMoveListener (event) {
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    }

    // this function is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener