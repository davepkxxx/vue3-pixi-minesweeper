import { computed, defineComponent, h } from '@vue/runtime-core'
import Num from './num'

function range (value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

function lpad (value, length, padding) {
  value = value.toString()
  while (value.length < length) {
    value = padding + value
  }
  return value
}

export default defineComponent({
  props: ['value', 'x', 'y'],
  setup (props) {
    return {
      values: computed(() => (
        lpad(range(props.value, 0, 999), 3, '0').split('')
      ))
    }
  },
  render () {
    return this.values.map((value, i) => (
      h(Num, {
        value,
        x: 12 * i + this.x,
        y: this.y,
      })
    ))
  }
})