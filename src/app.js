import { defineComponent, h } from '@vue/runtime-core'
import Field from './components/field'

export default defineComponent({
  setup () {
    return () => h(Field)
  }
})
