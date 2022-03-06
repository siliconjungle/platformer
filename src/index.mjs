import {
  registerActions,
  addActionDownListener,
  handleKeyDown,
  handleKeyUp,
} from './controller.mjs'

const $ = (id) => document.getElementById(id)

const startButton = $('start-btn')

const canvas = $('game')
const ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgb(33, 35, 47)'

ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// This is frail and if an image fails to load will load forever.
const loadImages = async (imagesData) =>
  new Promise((resolve, reject) => {
    const images = {}
    imagesData.forEach(imageData => {
      const image = new Image()
      image.src = imageData.src
      image.onload = () => {
        images[imageData.name] = image
        if (Object.keys(images).length === imagesData.length) {
          resolve(images)
        }
      }
    })
  })

// Does not work on Heroku
// const loadSounds = async (soundsData) =>
//   new Promise((resolve, reject) => {
//     const sounds = {}
//     soundsData.forEach(soundData => {
//       const sound = new Audio(soundData.src)
//       sounds[soundData.name] = sound
//       if (Object.keys(sounds).length === soundsData.length) {
//         resolve(sounds)
//       }
//     })
//   })

const imagesData = [
  {
    src: 'move.png',
    name: 'running',
  },
  {
    src: 'jump.png',
    name: 'jump',
  },
  {
    src: 'fall.png',
    name: 'fall',
  },
  {
    src: 'land.png',
    name: 'land',
  },
  {
    src: 'ground.png',
    name: 'ground',
  },
  {
    src: 'background.png',
    name: 'background',
  },
  {
    src: 'avatar.png',
    name: 'avatar',
  },
  {
    src: 'boss.png',
    name: 'boss',
  },
]

const soundsData = [
  {
    src: 'music.wav',
    name: 'music',
  },
]

let running = false
let images = null
let sounds = null

const PLAYER_WIDTH = 32
const PLAYER_HEIGHT = 50
const AVATAR_WIDTH = 40
const AVATAR_HEIGHT = 40
const FRAMES = 8

const FRAMES_AVATAR = 15

const GRAVITY = 35

let lastTime = (new Date()).getTime()
let currentTime = 0
let dt = 0

const START_Y = canvas.height - PLAYER_HEIGHT * 2 - 145
const MAX_Y_SPEED = 60
const INITIAL_JUMP_SPEED = -10

const player = {
  x: PLAYER_WIDTH * 2,
  y: START_Y,
  ySpeed: 0,
  frame: 0,
  accumulator: 0,
  fps: 8,
  frameAvatar: 0,
  accumulatorAvatar: 0,
  fpsAvatar: 8,
  grounded: false,
  sprite: 'running',
}

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
])

addActionDownListener('jump', () => {
  if (player.grounded) {
    player.ySpeed = INITIAL_JUMP_SPEED
    player.grounded = false
    player.sprite = 'jump'
    player.frame = 0
    player.accumulator = 0
    player.fps = 8
  }
})

const getImageByName = name => images?.[name] || null

// const getSoundByName = name => sounds?.[name] || null

const init = async () => {
  images = await loadImages(imagesData)
  // sounds = await loadSounds(soundsData)

  // const music = getSoundByName('music')
  //
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

  player.accumulator += dt
  while (player.accumulator >= (1 / player.fps)) {
    player.accumulator -= (1 / player.fps)
    player.frame++
  }
  if (player.sprite === 'running') {
    player.frame = player.frame % FRAMES
  } else if (player.sprite === 'land' && player.frame > 1) {
    player.sprite = 'running'
    player.accumulator = 0
    player.frame = 0
    player.fps = 8
  } else if (player.frame > 1) {
    player.frame = 1
  }

  player.accumulatorAvatar += dt
  while (player.accumulatorAvatar >= (1 / player.fpsAvatar)) {
    player.accumulatorAvatar -= (1 / player.fpsAvatar)
    player.frameAvatar++
  }
  player.frameAvatar = player.frameAvatar % FRAMES_AVATAR

  player.ySpeed += GRAVITY * dt
  player.ySpeed = Math.min(player.ySpeed, MAX_Y_SPEED)

  player.y += player.ySpeed

  if (player.y >= START_Y) {
    player.ySpeed = 0
    player.y = START_Y
    player.grounded = true
    if (player.sprite === 'jump' || player.sprite === 'fall') {
      player.sprite = 'land'
      player.frame = 0
      player.accumulator = 0
      player.fps = 16
    }
  }

  if (player.ySpeed > 0 && player.sprite !== 'fall') {
    player.sprite = 'fall'
    player.frame = 0
    player.accumulator = 0
  }

  render()

  lastTime = currentTime
}

const render = () => {
  const character = getImageByName(player.sprite)
  const ground = getImageByName('ground')
  const background = getImageByName('background')
  const avatar = getImageByName('avatar')
  const boss = getImageByName('boss')
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
    avatar,
    player.frameAvatar * AVATAR_WIDTH,
    0,
    AVATAR_WIDTH,
    AVATAR_HEIGHT,
    8,
    8,
    AVATAR_WIDTH * 2,
    AVATAR_HEIGHT * 2,
  )

  if (player.sprite === 'running' || player.sprite === 'fall') {
    ctx.drawImage(
      character,
      player.frame * PLAYER_WIDTH,
      0,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      player.x,
      player.y,
      PLAYER_WIDTH * 2,
      PLAYER_HEIGHT * 2,
    )
  } else {
    ctx.drawImage(
      character,
      player.x,
      player.y,
      PLAYER_WIDTH * 2,
      PLAYER_HEIGHT * 2,
    )
  }

  ctx.drawImage(
    ground,
    0,
    canvas.height - ground.height * 2,
    ground.width * 2,
    ground.height * 2,
  )

  ctx.drawImage(
    boss,
    canvas.width - boss.width * 2,
    canvas.height - ground.height * 2 - boss.height * 2,
    boss.width * 2,
    boss.height * 2,
  )
}

startButton.onclick = async () => {
  if (!running) {
    running = true
    await init()
  }
}
