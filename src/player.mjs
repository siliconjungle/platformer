import { DIRECTION } from './config.mjs'
import { getTextureByName } from './textures.mjs'
import { getActionState } from './controller.mjs'
import { getGroundHeightByX } from './collision-map.mjs'

const PLAYER_WIDTH = 32
const PLAYER_HEIGHT = 50

// const GROUND = 480 - 245
// const MAX_Y_SPEED = 60
// const INITIAL_JUMP_SPEED = -10
const MOVE_SPEED = 200
const LEFT = -1
const RIGHT = 1
// const GRAVITY = 35
const FRAMES = 8
const FALL_TIME = 0.25

export const createPlayer = (x, y, gravity, initialJumpSpeed, maxYSpeed) => {
  const GRAVITY = gravity || 1800
  const INITIAL_JUMP_SPEED = initialJumpSpeed || -600
  const MAX_Y_SPEED = maxYSpeed || 1200
  // const GROUND = y

  const player = {
    x,
    y,
    startX: x,
    startY: y,
    facing: DIRECTION.RIGHT,
    sprite: 'idle',
    xSpeed: 0,
    ySpeed: 0,
    frame: 0,
    accumulator: 0,
    fps: 8,
    grounded: false,
    groundedCounter: 0,
    gravity: true,
  }

  player.setSprite = (sprite) => {
    player.sprite = sprite
    player.accumulator = 0
    player.frame = 0
    player.fps = 8
  }

  player.states = {
    idle: (dt) => {
      if (!player.grounded) {
        player.setSprite('fall')
        return
      }

      if (getActionState('down')) {
        player.crouch()
        return
      }

      if (
        (getActionState('left') || getActionState('right')) &&
        !(getActionState('left') && getActionState('right'))
      ) {
        player.setSprite('running')
      }
    },
    running: (dt) => {
      if (!player.grounded) {
        player.setSprite('fall')
        return
      }

      if (getActionState('down')) {
        player.crouch()
        return
      }

      if (getActionState('left') && getActionState('right')) {
        player.xSpeed = 0
        player.setSprite('idle')
        return
      } else if (!getActionState('left') && !getActionState('right')) {
        player.xSpeed = 0
        player.setSprite('idle')
        return
      }

      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      player.frame = player.frame % FRAMES

      player.move()
    },
    jump: (dt) => {
      if (player.ySpeed >= 0) {
        player.setSprite('fall')
      }

      if (getActionState('left') && !getActionState('right')) {
        player.facing = LEFT
        player.xSpeed = -MOVE_SPEED
      } else if (getActionState('right') && !getActionState('left')) {
        player.facing = RIGHT
        player.xSpeed = MOVE_SPEED
      } else {
        player.xSpeed = 0
      }
    },
    fall: (dt) => {
      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      if (player.frame > 1) {
        player.frame = 1
      }

      if (player.grounded) {
        player.setSprite('land')
        player.fps = 12
      }

      player.move()
    },
    land: (dt) => {
      if (!player.grounded) {
        player.setSprite('fall')
        return
      }

      if (getActionState('down')) {
        player.crouch()
        return
      }

      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      if (player.frame > 0) {
        if (
          (getActionState('left') || getActionState('right')) &&
          !(getActionState('left') && getActionState('right'))
        ) {
          player.setSprite('running')
          return
        } else {
          player.setSprite('idle')
          player.xSpeed = 0
          return
        }
      }

      player.move()
    },
    vault: (dt) => {
      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      if (player.frame > 0) {
        player.frame = 0
        player.setSprite('land')
        player.fps = 12
        const GROUND = getGroundHeightByX(Math.floor(player.x + PLAYER_WIDTH)) - (PLAYER_HEIGHT * 2)
        player.y = GROUND
        player.gravity = true
      }
    },
    crouch: (dt) => {
      if (getActionState('left') && !getActionState('right')) {
        player.facing = LEFT
      } else if (getActionState('right') && !getActionState('left')) {
        player.facing = RIGHT
      }

      if (!player.grounded) {
        player.setSprite('fall')
        return
      }

      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      if (player.frame > 1) {
        player.frame = 1
      }

      if (!getActionState('down')) {
        player.setSprite('crouch-stand')
        player.fps = 32
        return
      }
    },
    ['crouch-stand']: (dt) => {
      if (getActionState('left') && !getActionState('right')) {
        player.facing = LEFT
      } else if (getActionState('right') && !getActionState('left')) {
        player.facing = RIGHT
      }

      if (!player.grounded) {
        player.setSprite('fall')
        return
      }

      player.accumulator += dt
      while (player.accumulator >= (1 / player.fps)) {
        player.accumulator -= (1 / player.fps)
        player.frame++
      }
      if (player.frame > 1) {
        player.setSprite('idle')
      }
    },
  }

  player.update = (dt) => {
    const lastPlayerX = player.x
    player.x += player.xSpeed * dt

    if (player.gravity) {
      player.ySpeed += GRAVITY * dt
      player.ySpeed = Math.min(player.ySpeed, MAX_Y_SPEED)
      player.y += player.ySpeed * dt

      // const nextPlayerX = player.x + player.xSpeed * dt
      // player.x = nextPlayerX

      const GROUND = getGroundHeightByX(Math.floor(player.x + PLAYER_WIDTH)) - (PLAYER_HEIGHT * 2)

      if (player.grounded) {
        if (Math.abs(player.y - GROUND) < 30) {
          player.y = GROUND
        }
      }

      if (player.y >= GROUND) {
        if (player.y > GROUND + 30 && player.y < GROUND + 80) {
          player.ySpeed = 0
          player.grounded = true
          player.vault(GROUND)
        } else if (player.y < GROUND + 30) {
          player.grounded = true
          player.ySpeed = 0
          player.y = GROUND
        } else {
          player.x = lastPlayerX
          const GROUND = getGroundHeightByX(Math.floor(player.x + PLAYER_WIDTH)) - (PLAYER_HEIGHT * 2)
          if (Math.abs(player.y - GROUND) < 30 && player.ySpeed >= 0) {
            player.y = GROUND
            player.ySpeed = 0
            player.grounded = true
          }
        }
      } else {
        if (player.groundedCounter > FALL_TIME) {
          player.grounded = false
          player.groundedCounter = 0
        } else {
          player.groundedCounter += dt
        }
      }
    }

    player.states[player.sprite](dt)
  }

  player.jump = () => {
    if (player.sprite === 'vault') {
      const GROUND = getGroundHeightByX(Math.floor(player.x + PLAYER_WIDTH)) - (PLAYER_HEIGHT * 2)
      player.y = GROUND
      player.grounded = true
    }
    if (player.grounded) {
      player.ySpeed = INITIAL_JUMP_SPEED
      player.grounded = false
      player.sprite = 'jump'
      player.frame = 0
      player.accumulator = 0
      player.fps = 8
      player.gravity = true
    }
  }

  player.respawn = () => {
    player.x = player.startX
    player.y = player.startY
  }

  player.vault = (ground) => {
    player.setSprite('vault')
    player.y = ground + 20
    player.gravity = false
    player.fps = 6
    player.frame = 0
    player.xSpeed = 0
    player.grounded = true
    player.ySpeed = 0
  }

  player.crouch = () => {
    player.setSprite('crouch')
    player.fps = 32
    player.xSpeed = 0
  }

  player.move = () => {
    if (getActionState('left') && !getActionState('right')) {
      player.facing = LEFT
      player.xSpeed = -MOVE_SPEED
    } else if (getActionState('right') && !getActionState('left')) {
      player.facing = RIGHT
      player.xSpeed = MOVE_SPEED
    } else {
      player.xSpeed = 0
    }
  }

  player.render = (ctx, canvas) => {
    const character = getTextureByName(
      player.facing === DIRECTION.RIGHT ?
        player.sprite :
        `${player.sprite}-left`
    )
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
  }

  return player
}
