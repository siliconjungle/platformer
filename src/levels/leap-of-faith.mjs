import {
  clearKeys,
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
    src: 'ground4.png',
    name: 'ground4',
  },
  {
    src: 'background.png',
    name: 'background',
  },
  {
    src: 'collision-map-leap-of-faith.png',
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
  {
    name: 'restart',
    keycode: '82',
  },
])

addActionDownListener('jump', () => {
  player.jump()
})

addActionDownListener(('restart'), () => {
  player.respawn()
})

const init = async () => {
  await loadTextures(texturesData)
  setCollisionMap(getTextureByName('collision-map'))

  // Just know that any lag will make the player fall through the floor.
  lastTime = (new Date()).getTime()
  currentTime = 0
  dt = 0

  window.requestAnimationFrame(update)
}

const update = () => {
  window.requestAnimationFrame(update)

  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000

  updateEntities(dt)

  if (player.x + 32 < 0) {
    window.location.href = '/pillars'
  } else if (player.x + 32 > canvas.width) {
    window.location.href = '/night'
  }

  render()

  lastTime = currentTime
}

window.onpageshow = () => {
  player.x = player.startX
  player.y = player.startY
  player.setSprite('idle')
  player.xSpeed = 0
  player.ySpeed = 0
  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  clearKeys()
}

const render = () => {
  const ground4 = getTextureByName('ground4')
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

  renderEntities(ctx, canvas)

  ctx.drawImage(
    ground4,
    0,
    canvas.height - ground4.height * 2,
    ground4.width * 2,
    ground4.height * 2,
  )

  ctx.drawImage(
    ground4,
    canvas.width - ground4.width * 2,
    canvas.height - ground4.height * 2,
    ground4.width * 2,
    ground4.height * 2,
  )
}

init().then(() => {

}).catch(() => {

})
