import { computed, defineComponent, h } from '@vue/runtime-core'

function getTexture ({ end, explored, mine, num, flag }) {
  if (explored) {
    if (mine) return 'bomb.png'
    return num > 0 ? 'm' + num + '.png' : 'blank.png'
  }

  if (flag) return end && !mine ? 'miss.png' : 'flag.png'
  else return end && mine ? 'mine.png' : 'field.png'
}

export default defineComponent({
  props: ['end', 'x', 'y', 'mine', 'num', 'explored', 'flag'],
  setup (props, { emit }) {
    return {
      texture: computed(() => getTexture(props)),
      explore: () => emit('explore'),
      flag: () => emit('flag'),
    }
  },
  render () {
    return h('sprite', {
      x: this.x * 15, 
      y: this.y * 15 + 23, 
      width: 15,
      height: 15, 
      interactive: true,
      texture: this.texture,
      onClick: this.explore,
      onRightClick: this.flag,
    })
  }
})
