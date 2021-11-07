// Drag
// target elements with the "draggable" class
interact('.draggable')
.draggable({
// enable inertial throwing
inertia: true,
// keep the element within the area of it's parent
modifiers: [
    interact.modifiers.restrictRect({
    restriction: 'parent',
    endOnly: true
    })
],
// enable autoScroll
autoScroll: true,

listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end (event) {
    var textEl = event.target.querySelector('p')

    textEl && (textEl.textContent =
        'moved a distance of ' +
        (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
        .toFixed(2) + 'px')
    }
}
})

function dragMoveListener (event) {
var target = event.target
// keep the dragged position in the data-x/data-y attributes
var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

// translate the element
target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

// update the posiion attributes
target.setAttribute('data-x', x)
target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener



// Drag & Drop
/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

// listen for drop related events:

ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active')
},
ondragenter: function (event) {
    var draggableElement = event.relatedTarget
    var dropzoneElement = event.target

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target')
    draggableElement.classList.add('can-drop')
    draggableElement.textContent = 'Dragged in'
},
ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target')
    event.relatedTarget.classList.remove('can-drop')
    event.relatedTarget.textContent = 'Dragged out'
},
ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped'
},
ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active')
    event.target.classList.remove('drop-target')
}
})

interact('.drag-drop')
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



// Snap
var element = document.getElementById('grid-snap')
var x = 0; var y = 0

interact(element)
.draggable({
modifiers: [
    interact.modifiers.snap({
    targets: [
        interact.snappers.grid({ x: 30, y: 30 })
    ],
    range: Infinity,
    relativePoints: [ { x: 0, y: 0 } ]
    }),
    interact.modifiers.restrict({
    restriction: element.parentNode,
    elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
    endOnly: true
    })
],
inertia: true
})
.on('dragmove', function (event) {
x += event.dx
y += event.dy

event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
})



// Resize
interact('.resize-drag')
.resizable({
// resize from all edges and corners
edges: { left: true, right: true, bottom: true, top: true },

listeners: {
    move (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0)
    var y = (parseFloat(target.getAttribute('data-y')) || 0)

    // update the element's style
    target.style.width = event.rect.width + 'px'
    target.style.height = event.rect.height + 'px'

    // translate when resizing from top or left edges
    x += event.deltaRect.left
    y += event.deltaRect.top

    target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
    target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
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

inertia: true
})
.draggable({
listeners: { move: window.dragMoveListener },
inertia: true,
modifiers: [
    interact.modifiers.restrictRect({
    restriction: 'parent',
    endOnly: true
    })
]
})



// Tap & DoubleTap & Hold
interact('.tap-target')
.on('tap', function (event) {
event.currentTarget.classList.toggle('switch-bg')
event.preventDefault()
})
.on('doubletap', function (event) {
event.currentTarget.classList.toggle('large')
event.currentTarget.classList.remove('rotate')
event.preventDefault()
})
.on('hold', function (event) {
event.currentTarget.classList.toggle('rotate')
event.currentTarget.classList.remove('large')
})