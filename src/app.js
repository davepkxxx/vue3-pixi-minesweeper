import { defineComponent, h, ref } from '@vue/runtime-core'
import Map from './map'
import Reset from './components/reset'

export default defineComponent({
  setup () {
    const status = ref('start')
    const map = ref(null)

    const reset = () => {
      status.value = 'start'
      map.value.init()
    }

    const end = value => status.value = value

    return {
      status,
      map,
      end,
      reset,
    }
  },
  render () {
    return [
      h(Reset, { 
        status: this.status,
        onReset: this.reset,
      }), 
      h(Map, { 
        ref: 'map',
        status: this.status,
        onLose: () => this.end('lose'),
      }),
    ]
  }
})