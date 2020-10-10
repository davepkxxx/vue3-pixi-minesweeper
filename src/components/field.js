import { computed, defineComponent, h } from '@vue/runtime-core'

function getTexture ({ end, explored, mine, num, flag }) {
  if (explored) {
    if (mine) return 'bomb.png'

    switch (num) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8: return 'm' + num + '.png'
      default: return 'blank.png'
    }
  }

  switch (flag) {
    case 'flag': return end && !mine ? 'miss.png' : 'flag.png'
    case 'quest': return 'quest.png'
    case 'none': return end && mine ? 'mine.png' : 'field.png'
  }
}

export default defineComponent({
  props: ['end', 'x', 'y', 'mine', 'num', 'explored', 'flag'],
  setup (props, ctx) {
    return {
      texture: computed(() => getTexture(props)),
      explore: () => ctx.emit('explore'),
      flag: () => ctx.emit('flag')
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
