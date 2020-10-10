import { computed, defineComponent, h, reactive, ref, watch } from '@vue/runtime-core'
import Field from './components/field'

function random (num) {
  return Math.floor(Math.random() * num)
}

function randomMines () {
  const mines = []
  while (mines.length < 10) {
    const [x, y] = [random(10), random(10)]
    if (mines.every(mine => mine.x !== x || mine.y !== y)) mines.push({ x, y })
  }
  return mines
}

function newMap () {
  const mines = randomMines()
  const map = []
  for (let y = 0; y < 10; y++) {
    map[y] = []
    for (let x = 0; x < 10; x++) {
      const mine = mines.some(e => e.x === x && e.y === y)
      const num = mines
        .map(e => (Math.abs(e.x - x) <= 1 && Math.abs(e.y - y) <= 1) ? 1 : 0)
        .reduce((count, n) => (count + n), 0)
      map[y][x] = reactive({ x, y, mine, num, explored: false, flag: false })
    }
  }
  return map
}

export default defineComponent({
  props: ['status'],
  emits: ['lose', 'flagsChange'],
  setup (props, { emit }) {
    const map = ref(null)
    const flags = ref(0)
    const end = computed(() => props.status === 'win' || props.status === 'lose')

    watch(flags, value => emit('flagsChange', value))

    const init = () => {
      map.value = newMap()
      flags.value = 10
    }

    init()

    const explore = (x, y) => {
      if (!end.value) {
        const cell = map.value[y][x]
        if (!cell.explored && !cell.flag) {
          cell.explored = true
          if (cell.mine) emit('lose')
          else if (cell.num === 0)
            for (let row = y - 1; row <= y + 1; row++)
              for (let col = x - 1; col <= x + 1; col++)
                map.value[row] && map.value[row][col] && explore(col, row)
        }
      }
    }

    const flag = (x, y) => {
      if (!end.value) {
        const cell = map.value[y][x]
        if (!cell.explored && (cell.flag || flags.value > 0)) {
          flags.value += (cell.flag ? 1 : -1)
          cell.flag = !cell.flag
        }
      }
    }

    return {
      end,
      map,
      init,
      explore,
      flag,
    }
  },
  render () {
    return this.map.reduce((nodes, row) => (
      nodes.concat(row.map(cell => (
        h(Field, {
          end: this.end,
          x: cell.x,
          y: cell.y,
          mine: cell.mine,
          num: cell.num,
          explored: cell.explored,
          flag: cell.flag,
          onExplore: () => this.explore(cell.x, cell.y),
          onFlag: () => this.flag(cell.x, cell.y),
        })))
      )
    ), [])
  }
})
