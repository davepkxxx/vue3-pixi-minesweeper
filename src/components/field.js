import { defineComponent, h } from "@vue/runtime-core";

export default defineComponent({
  props: ['x', 'y'],
  setup (props) {
    let { x, y } = props
    x *= 15, y *= 15
    return () => h('sprite', { x, y, width: 15, height: 15 })
  }
})
