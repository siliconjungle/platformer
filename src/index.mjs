import {
  registerActions,
  addActionDownListener,
  handleKeyDown,
  handleKeyUp,
  getActionState,
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
const loadSounds = async (soundsData) =>
  new Promise((resolve, reject) => {
    const sounds = {}
    soundsData.forEach(soundData => {
      const sound = new Audio(soundData.src)
      sounds[soundData.name] = sound
      if (Object.keys(sounds).length === soundsData.length) {
        resolve(sounds)
      }
    })
  })

const imagesData = [
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
    name: 'stand',
  },
  {
    src: 'stand-left.png',
    name: 'stand-left',
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
  {
    src: 'pumpkin.png',
    name: 'pumpkin',
  },
  {
    src: 'red-gem.png',
    name: 'red-gem',
  },
  {
    src: 'purple-gem.png',
    name: 'green-gem',
  },
  {
    src: 'green-gem.png',
    name: 'purple-gem',
  },
  {
    src: 'man.png',
    name: 'man',
  },
  {
    src: 'man2.png',
    name: 'man2',
  },
  {
    src: 'mage.png',
    name: 'mage',
  },
  {
    src: 'mage2.png',
    name: 'mage2',
  },
  {
    src: 'slime.png',
    name: 'slime',
  },
  {
    src: 'squid.png',
    name: 'squid',
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
const MOVE_SPEED = 200
const LEFT = -1
const RIGHT = 1

const player = {
  x: PLAYER_WIDTH * 2,
  y: START_Y,
  facing: RIGHT,
  xSpeed: 0,
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
  {
    name: 'left',
    keycode: '65',
  },
  {
    name: 'right',
    keycode: '68',
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

const getSoundByName = name => sounds?.[name] || null

const init = async () => {
  images = await loadImages(imagesData)
  // sounds = await loadSounds(soundsData)

  // const music = getSoundByName('music')

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


  player.xSpeed = 0
  if (getActionState('left')) {
    player.xSpeed -= MOVE_SPEED
    player.facing = LEFT
  }
  if (getActionState('right')) {
    player.xSpeed += MOVE_SPEED
    player.facing = RIGHT
  }

  if (player.xSpeed === 0 && player.sprite === 'running') {
    player.sprite = 'stand'
    player.frame = 0
    player.accumulator = 0
    player.fps = 8
  } else if (player.sprite === 'stand' && player.xSpeed !== 0) {
    player.sprite = 'running'
    player.frame = 0
    player.accumulator = 0
    player.fps = 8
  }

  player.x += player.xSpeed * dt

  render()

  lastTime = currentTime
}

const render = () => {
  const character = getImageByName(player.facing === RIGHT ? player.sprite : `${player.sprite}-left`)
  const ground = getImageByName('ground')
  const background = getImageByName('background')
  const avatar = getImageByName('avatar')
  const boss = getImageByName('boss')
  const pumpkin = getImageByName('pumpkin')
  // const redGem = getImageByName('red-gem')
  // const greenGem = getImageByName('green-gem')
  const man = getImageByName('man')
  const man2 = getImageByName('man2')
  const mage = getImageByName('mage')
  const mage2 = getImageByName('mage2')
  const squid = getImageByName('squid')
  const slime = getImageByName('slime')

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

  // ctx.drawImage(
  //   redGem,
  //   (canvas.width * 0.5) - redGem.width * 2,
  //   canvas.height - ground.height * 2 - redGem.height,
  //   redGem.width * 2,
  //   redGem.height * 2,
  // )

  ctx.drawImage(
    slime,
    (canvas.width * 0.5) - slime.width * 2,
    canvas.height - ground.height * 2 - slime.height,
    slime.width * 2,
    slime.height * 2,
  )

  ctx.drawImage(
    squid,
    (canvas.width * 0.5) - squid.width * 4,
    canvas.height - ground.height * 2 - squid.height,
    squid.width * 2,
    squid.height * 2,
  )

  ctx.drawImage(
    man,
    (canvas.width * 0.5) + man.width,
    canvas.height - ground.height * 2 - man.height * 1.6,
    man.width * 2,
    man.height * 2,
  )

  ctx.drawImage(
    man2,
    canvas.width * 0.5 - man2.width,
    canvas.height - ground.height * 2 - man2.height * 1.6,
    man2.width * 2,
    man2.height * 2,
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
    pumpkin,
    canvas.width - pumpkin.width * 2,
    canvas.height - ground.height * 2 - pumpkin.height * 0.75,
    pumpkin.width * 2,
    pumpkin.height * 2,
  )

  ctx.drawImage(
    ground,
    0,
    canvas.height - ground.height * 2,
    ground.width * 2,
    ground.height * 2,
  )

  // ctx.drawImage(
  //   greenGem,
  //   (canvas.width * 0.5) + greenGem.width,
  //   canvas.height - ground.height * 2 - greenGem.height,
  //   greenGem.width * 2,
  //   greenGem.height * 2,
  // )

  ctx.drawImage(
    mage,
    (canvas.width * 0.5) + mage.width * 2,
    canvas.height - ground.height * 2 - mage.height,
    mage.width * 2,
    mage.height * 2,
  )

  ctx.drawImage(
    mage2,
    (canvas.width * 0.5),
    canvas.height - ground.height * 2 - mage2.height,
    mage2.width * 2,
    mage2.height * 2,
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
