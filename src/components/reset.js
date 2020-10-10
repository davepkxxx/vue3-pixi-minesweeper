import { computed, defineComponent, h } from '@vue/runtime-core'

function getTexture (status) {
  switch (status) {
    case 'lose': return 'lose.png'
    default: return 'start.png'
  }
}

export default defineComponent({
  props: ['status'],
  setup (props, { emit }) {
    return {
      texture: computed(() => getTexture(props.status)),
      reset: () => emit('reset')
    }
  },
  render () {
    return h('sprite', {
      x: 0,
      y: 0,
      width: 23,
      height: 23,
      interactive: true,
      texture: this.texture,
      onClick: this.reset,
    })
  }
})