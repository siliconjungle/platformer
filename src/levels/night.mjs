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
import { playerTextures } from '../texture-data.mjs'
import { setCollisionMap } from '../collision-map.mjs'
import { createSpaceship } from '../spaceship.mjs'

const $ = (id) => document.getElementById(id)

// const startButton = $('start-btn')

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
    src: 'ground.png',
    name: 'ground',
  },
  {
    src: 'stars.png',
    name: 'background',
  },
  {
    src: 'collision-map.png',
    name: 'collision-map',
  },
  {
    src: 'spaceship.png',
    name: 'spaceship',
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
  // {
  //   src: 'man.png',
  //   name: 'man',
  // },
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

// 1800
// const INITIAL_JUMP_SPEED = initialJumpSpeed || -600
// const MAX_Y_SPEED = maxYSpeed || 1200

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const player = createPlayer(64, canvas.height - 245, 400, -400, 400)

const spawnSpaceship = () => {
  const spaceship = createSpaceship(640, randomRange(0, 240))
  addEntity(spaceship)
  setTimeout(spawnSpaceship, randomRange(1, 3) * 1000)
}

spawnSpaceship()
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

  setCollisionMap(getTextureByName('collision-map'))

  // Just know that any lag will make the player fall through the floor.
  lastTime = (new Date()).getTime()
  currentTime = 0
  dt = 0

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
  const spaceship = getTextureByName('spaceship')
  const ground = getTextureByName('ground')
  // const ground2 = getTextureByName('ground2')
  // const ground3 = getTextureByName('ground3')
  // const lava = getTextureByName('lava')
  const background = getTextureByName('background')
  // const shadow = getTextureByName('shadow')
  // const chains = getTextureByName('chains')
  // const spikes = getTextureByName('spikes')
  // const avatar = getTextureByName(player.spriteAvatar)
  // const boss = getTextureByName('boss')
  // const pumpkin = getTextureByName('pumpkin')
  // const redGem = getTextureByName('red-gem')
  // const greenGem = getTextureByName('green-gem')
  // const man = getTextureByName('man')
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

  // ctx.drawImage(
  //   man,
  //   canvas.width - man.width * 3,
  //   canvas.height - ground.height * 2 - man.height * 1.6,
  //   man.width * 2,
  //   man.height * 2,
  // )
  //
  // ctx.drawImage(
  //   man2,
  //   canvas.width - man2.width * 6,
  //   canvas.height - ground.height * 2 - man2.height * 1.6,
  //   man2.width * 2,
  //   man2.height * 2,
  // )

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

  // ctx.drawImage(
  //   lava,
  //   ground2.width + 128,
  //   canvas.height - lava.height * 2,
  //   lava.width * 2,
  //   lava.height * 2,
  // )
  //
  // ctx.drawImage(
  //   shadow,
  //   canvas.width - shadow.width * 3,
  //   canvas.height - ground3.height * 2 - shadow.height * 2 + 15,
  //   shadow.width * 2,
  //   shadow.height * 2,
  // )

  renderEntities(ctx, canvas)

  // ctx.drawImage(
  //   chains,
  //   canvas.width * 0.5 - chains.width,
  //   0,
  //   chains.width * 2,
  //   chains.height * 2,
  // )

  // ctx.drawImage(
  //   spikes,
  //   128,
  //   canvas.height - ground2.height * 2 - 10,
  //   spikes.width * 2,
  //   spikes.height * 2,
  // )

  // ctx.drawImage(
  //   spikes,
  //   256,
  //   canvas.height - ground2.height * 2 - 10,
  //   spikes.width * 2,
  //   spikes.height * 2,
  // )
  //
  ctx.drawImage(
    ground,
    0,
    canvas.height - ground.height * 2,
    ground.width * 2,
    ground.height * 2,
  )
  //
  // ctx.drawImage(
  //   ground3,
  //   ground2.width + 256,
  //   canvas.height - ground3.height * 2,
  //   ground3.width * 2,
  //   ground3.height * 2,
  // )

  // ctx.drawImage(
  //   greenGem,
  //   (canvas.width * 0.5) + greenGem.width,
  //   canvas.height - ground.height * 2 - greenGem.height,
  //   greenGem.width * 2,
  //   greenGem.height * 2,
  // )

  // ctx.drawImage(
  //   mage,
  //   (canvas.width * 0.5) + mage.width * 2,
  //   canvas.height - ground.height * 2 - mage.height,
  //   mage.width * 2,
  //   mage.height * 2,
  // )

  // ctx.drawImage(
  //   mage2,
  //   (canvas.width * 0.5),
  //   canvas.height - ground.height * 2 - mage2.height,
  //   mage2.width * 2,
  //   mage2.height * 2,
  // )

  // ctx.drawImage(
  //   boss,
  //   canvas.width - boss.width * 2,
  //   canvas.height - ground.height * 2 - boss.height * 2,
  //   boss.width * 2,
  //   boss.height * 2,
  // )
}

// startButton.onclick = async () => {
//   if (!running) {
//     running = true
//     await init()
//   }
// }
init().then(() => {

}).catch(() => {

})
