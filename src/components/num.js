import { computed, defineComponent, h } from '@vue/runtime-core'

export default defineComponent({
  props: ['value', 'x', 'y'],
  setup (props) {
    return {
      texture: computed(() => props.value + '.png')
    }
  },
  render () {
    return h('sprite', {
      x: this.x,
      y: this.y,
      width: 12,
      height: 22,
      texture: this.texture
    })
  }
})