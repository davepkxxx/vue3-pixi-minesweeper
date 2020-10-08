import { defineComponent, h, reactive, ref } from '@vue/runtime-core'
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
      map[y][x] = reactive({ x, y, mine, num, explored: false, flag: 'none' })
    }
  }
  return map
}

export default defineComponent({
  setup () {
    const end = ref(false)
    const map = newMap()

    const explore = (x, y) => {
      if (!end.value) {
        const cell = map[y][x]
        if (!cell.explored && cell.flag === 'none') {
          cell.explored = true
          if (cell.mine) end.value = true
          else if (cell.num === 0)
            for (let row = y - 1; row <= y + 1; row++)
              for (let col = x - 1; col <= x + 1; col++)
                map[row] && map[row][col] && explore(col, row)
        }
      }
    }

    const flag = (x, y) => {
      if (!end.value) {
        const cell = map[y][x]
        if (!cell.explored) {
          switch (cell.flag) {
            case 'none':
              cell.flag = 'flag'
              break
            case 'flag':
              cell.flag = 'quest'
              break
            case 'quest':
              cell.flag = 'none'
              break
          }
        }
      }
    }

    return {
      end,
      map,
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
