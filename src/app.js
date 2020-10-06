import { defineComponent, h, reactive } from '@vue/runtime-core'
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
      map[y][x] = reactive({ x, y, mine, num, explored: false })
    }
  }
  return map
}

export default defineComponent({
  setup () {
    const map = newMap()
    return () => map.reduce((nodes, row) => (
      nodes.concat(row.map(col => (
        h(Field, {
          x: col.x,
          y: col.y,
          mine: col.mine,
          num: col.num,
          explored: col.explored,
          onExplore: () => { col.explored = true }
        })))
      )
    ), [])
  }
})
