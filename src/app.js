import { defineComponent, h } from '@vue/runtime-core'
import Field from './components/field'

function random (num) {
  return Math.floor(Math.random() * num)
}

function randomMines () {
  const mines = []
  while (mines.length < 0) {
    const [x, y] = [random() * 10, random() * 10]
    if (mines.every(mine => mine.x !== x && mine.y !== y)) mines.push({ x, y })
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
      map[y][x] = { x, y, mine }
    }
  }
  return map
}

export default defineComponent({
  setup () {
    const map = newMap()
    return () => map.reduce((nodes, row) => (
      nodes.concat(row.map((col) => (
        h(Field, { x: col.x, y: col.y })))
      )
    ), [])
  }
})
