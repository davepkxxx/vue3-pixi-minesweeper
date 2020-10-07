import { computed, defineComponent, h } from '@vue/runtime-core';

function getTexture ({ explored, mine, num, flag }) {
  if (explored) {
    if (mine) return 'bomb.png'

    switch (num) {
      case 1: return 'one.png'
      case 2: return 'two.png'
      case 3: return 'three.png'
      case 4: return 'four.png'
      case 5: return 'five.png'
      case 6: return 'six.png'
      case 7: return 'seven.png'
      case 8: return 'eight.png'
      default: return 'blank.png'
    }
  }

  switch (flag) {
    case 'flag': return 'flag.png'
    case 'quest': return 'quest.png'
    default: return 'field.png'
  }
}

export default defineComponent({
  props: ['x', 'y', 'mine', 'num', 'explored', 'flag'],
  setup (props, ctx) {
    return {
      texture: computed(() => getTexture(props)),
      onClick: () => ctx.emit('explore'),
      onRightClick: () => ctx.emit('flag')
    }
  },
  render () {
    return h('sprite', {
      x: this.x * 15, 
      y: this.y * 15, 
      width: 15,
      height: 15, 
      interactive: true,
      texture: this.texture,
      onClick: this.onClick,
      onRightClick: this.onRightClick,
    })
  }
})
