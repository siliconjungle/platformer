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
// import {
//   loadAudio,
//   getAudioByName,
// } from './audio.mjs'

const $ = (id) => document.getElementById(id)

const startButton = $('start-btn')

const canvas = $('game')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgb(33, 35, 47)'

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const texturesData = [
  {
    src: 'move.png',
    name: 'running',
  },
  {
    src: 'move-left.png',
    name: 'running-left',
  },
  {
    src: 'jump.png',
    name: 'jump',
  },
  {
    src: 'jump-left.png',
    name: 'jump-left',
  },
  {
    src: 'fall.png',
    name: 'fall',
  },
  {
    src: 'fall-left.png',
    name: 'fall-left',
  },
  {
    src: 'land.png',
    name: 'land',
  },
  {
    src: 'land-left.png',
    name: 'land-left',
  },
  {
    src: 'stand.png',
    name: 'idle',
  },
  {
    src: 'stand-left.png',
    name: 'idle-left',
  },
  {
    src: 'shadow-lands.png',
    name: 'ground',
  },
  {
    src: 'background.png',
    name: 'background',
  },
  // {
  //   src: 'avatar.png',
  //   name: 'avatar',
  // },
  // {
  //   src: 'afk.png',
  //   name: 'afk',
  // },
  // {
  //   src: 'boss.png',
  //   name: 'boss',
  // },
  // {
  //   src: 'pumpkin.png',
  //   name: 'pumpkin',
  // },
  // {
  //   src: 'red-gem.png',
  //   name: 'red-gem',
  // },
  // {
  //   src: 'purple-gem.png',
  //   name: 'green-gem',
  // },
  // {
  //   src: 'green-gem.png',
  //   name: 'purple-gem',
  // },
  {
    src: 'shadows.png',
    name: 'man',
  },
  // {
  //   src: 'man2.png',
  //   name: 'man2',
  // },
  // {
  //   src: 'mage3.png',
  //   name: 'mage',
  // },
  // {
  //   src: 'mage2.png',
  //   name: 'mage2',
  // },
  // {
  //   src: 'slime.png',
  //   name: 'slime',
  // },
  // {
  //   src: 'squid.png',
  //   name: 'squid',
  // },
  // {
  //   src: 'boss2.png',
  //   name: 'boss2',
  // },
  // {
  //   src: 'blast.png',
  //   name: 'blast',
  // },
  // {
  //   src: 'blast-left.png',
  //   name: 'blast-left',
  // },
  // {
  //   src: 'leaf.png',
  //   name: 'leaf',
  // },
]

// const soundsData = [
//   {
//     src: 'music.wav',
//     name: 'music',
//   },
// ]

// let running = false

// const AVATAR_WIDTH = 40
// const AVATAR_HEIGHT = 40

// const FRAMES_AVATAR = 15

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

// const AFK_TIME = 10
// let afkAccumulator = 0

const player = createPlayer(64, canvas.height - 120)
addEntity(player)

// const player = {
//   x: PLAYER_WIDTH * 2,
//   y: START_Y,
//   facing: RIGHT,
//   xSpeed: 0,
//   ySpeed: 0,
//   frame: 0,
//   accumulator: 0,
//   fps: 8,
//   frameAvatar: 0,
//   accumulatorAvatar: 0,
//   fpsAvatar: 8,
//   grounded: false,
//   sprite: 'running',
//   spriteAvatar: 'avatar',
// }

// const blasts = []
//
// const createBlast = (x, y) => {
//   const blast = {
//     x,
//     y,
//     xSpeed: player.facing * 300,
//     facing: player.facing,
//   }
//   blasts.push(blast)
//   return blast
// }

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
    keycode: '65',
  },
  {
    name: 'right',
    keycode: '68',
  },
  // {
  //   name: 'shoot',
  //   keycode: '75',
  // },
])

addActionDownListener('jump', () => {
  player.jump()
})

// addActionDownListener('shoot', () => {
// afkAccumulator = 0
// createBlast(player.x + PLAYER_WIDTH, player.y + PLAYER_HEIGHT)
// })

const init = async () => {
  await loadTextures(texturesData)
  // sounds = await loadAudio(soundsData)

  // const music = getAudioByName('music')

  // music.addEventListener('ended', function () {
  //   this.currentTime = 0
  //   this.play()
  // }, false)
  // music.play()

  window.requestAnimationFrame(update)
}

const update = () => {
  window.requestAnimationFrame(update)

  currentTime = (new Date()).getTime()
  dt = (currentTime - lastTime) / 1000

  // afkAccumulator += dt

  // player.accumulatorAvatar += dt
  // while (player.accumulatorAvatar >= (1 / player.fpsAvatar)) {
  //   player.accumulatorAvatar -= (1 / player.fpsAvatar)
  //   player.frameAvatar++
  // }
  // if (player.spriteAvatar === 'avatar') {
  //   player.frameAvatar = player.frameAvatar % FRAMES_AVATAR
  // } else {
  //   if (player.frameAvatar > 7) {
  //     player.frameAvatar = 7
  //   }
  // }

  // blasts.forEach(blast => {
  //   blast.x += blast.xSpeed * dt
  // })
  //
  // if (afkAccumulator > AFK_TIME && player.spriteAvatar === 'avatar') {
  //   player.frameAvatar = 0
  //   player.spriteAvatar = 'afk'
  // }
  updateEntities(dt)

  render()

  lastTime = currentTime
}

const render = () => {
  const ground = getTextureByName('ground')
  const background = getTextureByName('background')
  // const avatar = getTextureByName(player.spriteAvatar)
  // const boss = getTextureByName('boss')
  // const pumpkin = getTextureByName('pumpkin')
  // const redGem = getTextureByName('red-gem')
  // const greenGem = getTextureByName('green-gem')
  const man = getTextureByName('man')
  // const man2 = getTextureByName('man2')
  // const mage = getTextureByName('mage')
  // const mage2 = getTextureByName('mage2')
  // const squid = getTextureByName('squid')
  // const slime = getTextureByName('slime')
  // const boss2 = getTextureByName('boss2')
  // const shot = getTextureByName('blast')
  // const shotLeft = getTextureByName('blast-left')
  // const leaf = getTextureByName('leaf')

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
  //   avatar,
  //   player.frameAvatar * AVATAR_WIDTH,
  //   0,
  //   AVATAR_WIDTH,
  //   AVATAR_HEIGHT,
  //   8,
  //   8,
  //   AVATAR_WIDTH * 2,
  //   AVATAR_HEIGHT * 2,
  // )

  // ctx.drawImage(
  //   redGem,
  //   (canvas.width * 0.5) - redGem.width * 2,
  //   canvas.height - ground.height * 2 - redGem.height,
  //   redGem.width * 2,
  //   redGem.height * 2,
  // )

  // ctx.drawImage(
  //   slime,
  //   (canvas.width * 0.5) - slime.width * 2,
  //   canvas.height - ground.height * 2 - slime.height,
  //   slime.width * 2,
  //   slime.height * 2,
  // )
  //
  // ctx.drawImage(
  //   squid,
  //   (canvas.width * 0.5) - squid.width * 4,
  //   canvas.height - ground.height * 2 - squid.height,
  //   squid.width * 2,
  //   squid.height * 2,
  // )

  // ctx.drawImage(
  //   boss2,
  //   canvas.width * 0.5 - boss2.width,
  //   canvas.height - ground.height * 2 - boss2.height * 2 + 50,
  //   boss2.width * 2,
  //   boss2.height * 2,
  // )

  ctx.drawImage(
    man,
    canvas.width - man.width * 2,
    canvas.height - ground.height - man.height * 0.5,
    man.width * 2,
    man.height * 2,
  )

  // ctx.drawImage(
  //   man2,
  //   canvas.width - man2.width * 6,
  //   canvas.height - ground.height * 2 - man2.height * 1.6,
  //   man2.width * 2,
  //   man2.height * 2,
  // )

  renderEntities(ctx, canvas)

  // blasts.forEach(blast => {
  //   ctx.drawImage(
  //     blast.facing === LEFT ? shotLeft : shot,
  //     blast.x - shot.width * 0.5,
  //     blast.y - shot.height * 0.5,
  //     shot.width,
  //     shot.height,
  //   )
  // })

  // ctx.drawImage(
  //   pumpkin,
  //   canvas.width - pumpkin.width * 2,
  //   canvas.height - ground.height * 2 - pumpkin.height * 0.75,
  //   pumpkin.width * 2,
  //   pumpkin.height * 2,
  // )

  // ctx.drawImage(
  //   leaf,
  //   canvas.width - leaf.width * 6,
  //   canvas.height - ground.height * 2 - leaf.height * 1.6,
  //   leaf.width,
  //   leaf.height,
  // )

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

