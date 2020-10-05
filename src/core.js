import { createRenderer } from '@vue/runtime-core'
import { Container, DisplayObject, Sprite, Texture } from 'pixi.js'

const { render, createApp } = createRenderer({
  createElement (type) {
    switch (type) {
      case 'sprite':
        return new Sprite()
    }
  },
  createComment (text) {
    return document.createComment(text)
  },
  createText (text) {
    return document.createTextNode(text)
  },
  patchProp (el, key, prevValue, nextValue) {
    if (el instanceof Sprite) {
      switch (key) {
        case 'x':
        case 'y':
        case 'width':
        case 'height':
        case 'interactive':
          el[key] = nextValue
          break
        case 'texture':
          el.texture = Texture.from(nextValue)
          break
        case 'onClick':
          el.on('click', nextValue)
          break
      }
    }

    return el
  },
  parentNode (node) {
    if (node instanceof DisplayObject) node.parent
  },
  nextSibling (node) {
    return node.nextSibling
  },
  insert (el, parent) {
    if (parent instanceof Container && el instanceof DisplayObject) parent.addChild(el)
  },
  remove (el) {
    if (el instanceof DisplayObject) el.parent.removeChild(el)
  },
})

export { render, createApp }