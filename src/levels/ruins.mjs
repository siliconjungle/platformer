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
  // debugRenderEntities,
} from '../entities.mjs'
import { createPlayer } from '../player.mjs'
import { playerTextures } from '../texture-data.mjs'
import { setCollisionMap } from '../collision-map.mjs'
import { createSpikes } from '../spikes.mjs'
import { rectanglesOverlap } from '../collisions.mjs'

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
  // {
  //   src: 'ruins.png',
  //   name: 'ground',
  // },
  {
    src: 'ruins.png',
    name: 'background',
  },
  {
    src: 'collision-map-ruins.png',
    name: 'collision-map',
  },
  {
    src: 'spikes.png',
    name: 'spikes',
  },
  // {
  //   src: 'snowman.png',
  //   name: 'snowman',
  // },
]

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const player = createPlayer(8, canvas.height - 286)
addEntity(player)

const spikes = createSpikes(128 + 64, canvas.height - 148)
const spikes2 = createSpikes(256 + 64, canvas.height - 148)
addEntity(spikes)
addEntity(spikes2)

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

  if (player.x + 32 < 0) {
    window.location.href = '/night'
  } else if (player.x + 32 > canvas.width) {
    window.location.href = '/shadows'
  }

  if (rectanglesOverlap(player.getCollider(), spikes.getCollider())) {
    player.respawn()
  }

  if (rectanglesOverlap(player.getCollider(), spikes2.getCollider())) {
    player.respawn()
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
  // const ground = getTextureByName('ground')
  const background = getTextureByName('background')
  // const snowman = getTextureByName('snowman')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(
    background,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  renderEntities(ctx, canvas)
  // debugRenderEntities(ctx, canvas)

  // ctx.drawImage(
  //   snowman,
  //   120,
  //   208,
  //   snowman.width * 2,
  //   snowman.height * 2,
  // )

  // ctx.drawImage(
  //   ground,
  //   0,
  //   canvas.height - ground.height * 2,
  //   ground.width * 2,
  //   ground.height * 2,
  // )
}

init().then(() => {

}).catch(() => {

})
