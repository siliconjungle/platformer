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
  getEntities,
  addEntity,
  updateEntities,
  renderEntities,
  debugRenderEntities,
} from '../entities.mjs'
import { createPlayer } from '../player.mjs'
import { playerTextures } from '../texture-data.mjs'
import { setCollisionMap } from '../collision-map.mjs'
import { createMage } from '../mage.mjs'
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
    src: 'ruins-II-bg.png',
    name: 'background',
  },
  {
    src: 'ruins-II.png',
    name: 'foreground',
  },
  {
    src: 'collision-map-ruins-II.png',
    name: 'collision-map',
  },
  {
    src: 'snow-platform.png',
    name: 'snow-platform',
  },
  {
    src: 'mage3.png',
    name: 'mage',
  },
  {
    src: 'mage3-left.png',
    name: 'mage-left',
  },
]

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const player = createPlayer(64, canvas.height - 164)
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

  // if (player.x + 32 < 0) {
  //   window.location.href = '/night'
  // } else if (player.x + 32 > canvas.width) {
  //   window.location.href = '/shadows'
  // }

  const entities = getEntities()
  entities.forEach(entity => {
    if (player !== entity && rectanglesOverlap(player.getCollider(), entity.getCollider())) {
      if (player.y + player.getCollider().height < entity.y + 28) {
        player.bounce()
        entity.turn()
      } else {
        player.respawn()
      }
    }
  })

  render()

  lastTime = currentTime
}

window.onpageshow = () => {
  player.x = player.startX
  player.y = player.startY
  player.setSprite('idle')
  player.xSpeed = 0
  player.ySpeed = 0
  player.grounded = true
  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  clearKeys()
}

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const spawnMage = () => {
  const mage = createMage(canvas.width - 64 - 26 * 2, canvas.height - 64 - 28 * 2)
  addEntity(mage)
  setTimeout(spawnMage, randomRange(1, 10) * 1000)
}

spawnMage()

const render = () => {
  // const ground = getTextureByName('ground')
  const background = getTextureByName('background')
  const foreground = getTextureByName('foreground')
  const snowPlatform = getTextureByName('snow-platform')
  const mage = getTextureByName('mage')
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

  ctx.drawImage(
    foreground,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  ctx.drawImage(
    snowPlatform,
    canvas.width * 0.5 - snowPlatform.width,
    canvas.height * 0.5 - snowPlatform.height,
    snowPlatform.width * 2,
    snowPlatform.height * 2,
  )

  renderEntities(ctx, canvas)
  // debugRenderEntities(ctx, canvas)
}

init().then(() => {

}).catch(() => {

})
