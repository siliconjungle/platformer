import {
  registerActions,
  addActionDownListener,
  handleKeyDown,
  handleKeyUp,
} from '../controller.mjs'
import {
  loadTextures,
  getTextureByName,
} from '../textures.mjs'
import {
  addEntity,
  updateEntities,
  renderEntities,
} from '../entities.mjs'
import { createPlayer } from '../player.mjs'
import { playerTextures } from '../texture-data.mjs'
import { setCollisionMap } from '../collision-map.mjs'

const $ = (id) => document.getElementById(id)

const canvas = $('game')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgb(33, 35, 47)'

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const texturesData = [
  ...playerTextures,
  {
    src: 'ground3.png',
    name: 'ground3',
  },
  {
    src: 'ground4.png',
    name: 'ground4',
  },
  {
    src: 'ground5.png',
    name: 'ground5',
  },
  {
    src: 'ground6.png',
    name: 'ground6',
  },
  {
    src: 'ground-floating.png',
    name: 'ground-floating',
  },
  {
    src: 'lava.png',
    name: 'lava',
  },
  {
    src: 'spikes.png',
    name: 'spikes',
  },
  {
    src: 'leaf.png',
    name: 'leaf',
  },
  {
    src: 'background.png',
    name: 'background',
  },
  {
    src: 'collision-map-pillars.png',
    name: 'collision-map',
  },
]

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const player = createPlayer(64, canvas.height - 400)
addEntity(player)

document.addEventListener('keydown', (e) => {
  handleKeyDown(e)
}, false)

document.addEventListener('keyup', e => {
  handleKeyUp(e)
}, false)

registerActions([
  {
    name: 'jump',
    keycode: '32',
  },
  {
    name: 'left',
    keycode: '74',
  },
  {
    name: 'right',
    keycode: '76',
  },
  {
    name: 'down',
    keycode: '75',
  },
])

addActionDownListener('jump', () => {
  player.jump()
})

const init = async () => {
  await loadTextures(texturesData)
  setCollisionMap(getTextureByName('collision-map'))

  window.requestAnimationFrame(update)
}

const update = () => {
  window.requestAnimationFrame(update)

  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000

  updateEntities(dt)

  render()

  lastTime = currentTime
}

const render = () => {
  const ground3 = getTextureByName('ground3')
  const ground4 = getTextureByName('ground4')
  const ground5 = getTextureByName('ground5')
  const ground6 = getTextureByName('ground6')
  const groundFloating = getTextureByName('ground-floating')
  // const lava = getTextureByName('lava')
  const spikes = getTextureByName('spikes')
  const leaf = getTextureByName('leaf')
  const background = getTextureByName('background')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    background,
    0,
    0,
    canvas.width,
    canvas.height * 0.75,
  )

  // ctx.drawImage(
  //   lava,
  //   ground4,
  //   canvas.height - lava.height * 2,
  //   lava.width * 2,
  //   lava.height * 2,
  // )

  renderEntities(ctx, canvas)

  ctx.drawImage(
    ground4,
    0,
    canvas.height - ground4.height * 2,
    ground4.width * 2,
    ground4.height * 2,
  )

  ctx.drawImage(
    spikes,
    ground4.width * 2 + 5,
    canvas.height - ground5.height * 2 - spikes.height * 0.5,
    spikes.width * 2,
    spikes.height * 2,
  )

  ctx.drawImage(
    ground5,
    ground4.width * 2,
    canvas.height - ground5.height * 2,
    ground5.width * 2,
    ground5.height * 2,
  )

  ctx.drawImage(
    spikes,
    ground4.width * 2 + 48 + ground5.width * 2 + 64,
    canvas.height - ground6.height * 2 - spikes.height * 0.5,
    spikes.width * 2,
    spikes.height * 2,
  )

  ctx.drawImage(
    ground6,
    ground4.width * 2 + 48 + ground5.width * 2,
    canvas.height - ground6.height * 2,
    ground6.width * 2,
    ground6.height * 2,
  )

  ctx.drawImage(
    ground3,
    ground4.width * 2 + 64 + ground5.width * 2 + ground6.width * 2 + 32,
    canvas.height - ground3.height * 2,
    ground3.width * 2,
    ground3.height * 2,
  )

  ctx.drawImage(
    groundFloating,
    canvas.width * 0.5 - 70,
    35,
    groundFloating.width * 2,
    groundFloating.height * 2,
  )

  ctx.drawImage(
    leaf,
    canvas.width * 0.5 - 70 + groundFloating.width - leaf.width * 0.5,
    15,
    leaf.width,
    leaf.height,
  )
}

init().then(() => {

}).catch(() => {

})
