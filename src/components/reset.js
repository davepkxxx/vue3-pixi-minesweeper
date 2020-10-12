import { computed, defineComponent, h } from '@vue/runtime-core'

function getTexture (status) {
  switch (status) {
    case 'win': return 'win.png'
    case 'lose': return 'lose.png'
    default: return 'start.png'
  }
}

export default defineComponent({
  props: ['status', 'x', 'y'],
  emits: ['click'],
  setup (props, { emit }) {
    return {
      texture: computed(() => getTexture(props.status)),
      click: () => emit('click')
    }
  },
  render () {
    return h('sprite', {
      x: this.x,
      y: this.y,
      width: 23,
      height: 23,
      interactive: true,
      texture: this.texture,
      onClick: this.click,
    })
  }
})