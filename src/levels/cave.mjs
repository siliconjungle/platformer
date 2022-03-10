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
import { playerTextures, playerTexturesShadow } from '../texture-data.mjs'
import { setCollisionMap } from '../collision-map.mjs'
import { DIRECTION } from '../config.mjs'
import { getGroundHeightByX } from '../collision-map.mjs'

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
  ...playerTexturesShadow,
  {
    src: 'cave.png',
    name: 'ground',
  },
  {
    src: 'cave-bg.png',
    name: 'background',
  },
  {
    src: 'collision-map-cave.png',
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

  ctx.drawImage(
    ground,
    0,
    0,
    ground.width,
    ground.height,
  )

  const character = getTextureByName(
    player.facing === DIRECTION.RIGHT ?
      `${player.sprite}-shadow-left` :
      `${player.sprite}-shadow`
  )
  const shadowX = canvas.width - player.x - 64
  const PLAYER_GROUND = getGroundHeightByX(Math.floor(player.x + 32)) - (50 * 2)
  const SHADOW_GROUND = getGroundHeightByX(Math.floor(shadowX + 32)) - (50 * 2)
  const shadowY = player.y - PLAYER_GROUND + SHADOW_GROUND

  ctx.drawImage(
    character,
    player.frame * 32,
    0,
    32,
    50,
    shadowX,
    shadowY,
    32 * 2,
    50 * 2,
  )
}

init().then(() => {

}).catch(() => {

})
