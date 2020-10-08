import { createApp } from './core'
import App from './app.js'
import { Application } from 'pixi.js'

window.oncontextmenu = e => e.preventDefault()

const app = new Application({
  width: 150,
  height: 150,
})

document.body.appendChild(app.view)

app.loader.add('resources', './resources.json').load(() => {
  createApp(App).mount(app.stage)
})
