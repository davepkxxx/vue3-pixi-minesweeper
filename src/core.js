import { createRenderer } from '@vue/runtime-core'
import { Container, DisplayObject, Sprite, Texture } from 'pixi.js'

const { render, createApp } = createRenderer({
  createElement (type) {
    switch (type) {
      case 'sprite':
        return Sprite.from('field.png')
    }
  },
  patchProp (el, key, prevValue, nextValue) {
    if (el instanceof Sprite) {
      switch (key) {
        case 'x':
        case 'y':
        case 'width':
        case 'height':
          el[key] = nextValue
          break
      }
    }
  },
  parentNode (node) {
    if (node instanceof DisplayObject) node.parent
  },
  createComment () {},
  insert (el, parent) {
    if (parent instanceof Container) parent.addChild(el)
  },
  remove (el) {
    if (el instanceof DisplayObject) el.parent.removeChild(el)
  },
})

export { render, createApp }