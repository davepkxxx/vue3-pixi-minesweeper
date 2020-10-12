import { defineComponent, h, reactive, ref, watch } from '@vue/runtime-core'
import Map from './map'
import Reset from './components/reset'
import Nums from './components/nums'

export default defineComponent({
  setup () {
    const status = ref('init')
    const map = ref(null)
    const flags = ref(0)
    const timer = reactive({ time: 0, interval: null })

    watch(status, value => {
      switch (value) {
        case 'init':
          timer.time = 0
          clearInterval(timer.interval)
          map.value.init()
          break
        case 'start':
          timer.interval = setInterval(() => timer.time++, 1000)
          break
        case 'win':
        case 'lose':
          clearInterval(timer.interval)
      }
    })

    return {
      status,
      flags,
      timer,
      map,
    }
  },
  render () {
    return [
      h(Reset, {
        x: 63,
        y: 0,
        status: this.status,
        onClick: () => { this.status = 'init' },
      }), 
      h(Nums, {
        x: 0,
        y: 0,
        value: this.flags,
      }),
      h(Nums, {
        x: 114,
        y: 0,
        value: this.timer.time,
      }),
      h(Map, {
        ref: 'map',
        status: this.status,
        onFlagsChange: value => this.flags = value,
        onStatusChange: value => this.status = value,
      }),
    ]
  }
})