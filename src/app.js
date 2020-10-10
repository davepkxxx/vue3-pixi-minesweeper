import { defineComponent, h, ref } from '@vue/runtime-core'
import Map from './map'
import Reset from './components/reset'
import Nums from './components/nums'

export default defineComponent({
  setup () {
    const status = ref('init')
    const map = ref(null)

    const reset = () => {
      status.value = 'init'
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
        x: 63,
        y: 0,
        status: this.status,
        onReset: this.reset,
      }), 
      h(Nums, { 
        x: 0,
        y: 0,
        value: 0,
      }),
      h(Nums, { 
        x: 114,
        y: 0,
        value: 0,
      }),
      h(Map, { 
        ref: 'map',
        status: this.status,
        onLose: () => this.end('lose'),
      }),
    ]
  }
})