import { defineComponent, h } from "@vue/runtime-core";

export default defineComponent({
  setup () {
    return () => h('sprite', { x: 0, y: 0, width: 15, height: 15 })
  }
})
