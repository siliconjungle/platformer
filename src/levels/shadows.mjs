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
    src: 'shadow-lands.png',
    name: 'ground',
  },
  {
    src: 'background.png',
    name: 'background',
  },
  {
    src: 'shadows.png',
    name: 'man',
  },
  {
    src: 'collision-map-shadows.png',
    name: 'collision-map',
  },
]

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const player = createPlayer(64, canvas.height - 120)
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
  // {
  //   name: 'left',
  //   keycode: '65',
  // },
  // {
  //   name: 'right',
  //   keycode: '68',
  // },
  // {
  //   name: 'down',
  //   keycode: '83',
  // },
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

  render()

  lastTime = currentTime
}

const render = () => {
  const ground = getTextureByName('ground')
  const background = getTextureByName('background')
  const man = getTextureByName('man')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    background,
    0,
    0,
    canvas.width,
    canvas.height * 0.75,
  )

  ctx.drawImage(
    man,
    canvas.width - man.width * 2,
    canvas.height - ground.height - man.height * 0.5,
    man.width * 2,
    man.height * 2,
  )

  renderEntities(ctx, canvas)

  ctx.drawImage(
    ground,
    0,
    canvas.height - ground.height * 2,
    ground.width * 2,
    ground.height * 2,
  )
}

init().then(() => {

}).catch(() => {

})
