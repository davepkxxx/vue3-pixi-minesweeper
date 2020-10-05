import { computed, defineComponent, h } from "@vue/runtime-core";

export default defineComponent({
  props: ['x', 'y', 'mine', 'explored'],
  setup (props, ctx) {
    const texture = computed(() => (
      props.explored ? 'blank.png' : 'field.png'
    ))
    return {
      texture,
      onClick: () => ctx.emit('explore')
    }
  },
  render (props) {
    return h('sprite', {
      x: this.x * 15, 
      y: this.y * 15, 
      width: 15,
      height: 15, 
      interactive: true,
      texture: this.texture,
      onClick: this.onClick
    })
  }
})
