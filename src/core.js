import { createRenderer } from '@vue/runtime-core'
import { Application } from 'pixi.js'

const { render, createApp } = createRenderer({
  createElement (type) {
    switch (type) {
      case 'application':
        return new Application({
          width: 250,
          height: 250,
        })
    }
  },
  patchProp () {
    debugger
  },
  parentNode () {
    debugger
  },
  createComment () {},
  insert (el, parent) {
    if (el instanceof Application && parent instanceof Node) parent.appendChild(el.view)
  },
  remove (el) {
    debugger
  },
})

export { render, createApp }