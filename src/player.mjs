import { DIRECTION } from './config.mjs'
import { getTextureByName } from './textures.mjs'
import { getActionState } from './controller.mjs'

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

export const createPlayer = (x, y, gravity, initialJumpSpeed, maxYSpeed) => {
  const GRAVITY = gravity || 35
  const INITIAL_JUMP_SPEED = initialJumpSpeed || -10
  const MAX_Y_SPEED = maxYSpeed || 60
  const GROUND = y

  const player = {
    x,
    y,
    facing: DIRECTION.RIGHT,
    sprite: 'idle',
    xSpeed: 0,
    ySpeed: 0,
    frame: 0,
    accumulator: 0,
    fps: 8,
    grounded: false,
  }

  player.update = (dt) => {
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

    player.ySpeed += GRAVITY * dt

    // if (player.ySpeed < 0 && !getActionState('jump')) {
    //   player.ySpeed -= player.ySpeed * dt * 12
    //   if (player.ySpeed > 0) {
    //     player.ySpeed = 0
    //   }
    // }

    player.ySpeed = Math.min(player.ySpeed, MAX_Y_SPEED)

    player.y += player.ySpeed

    if (player.y >= GROUND) {
      player.ySpeed = 0
      player.y = GROUND
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
      // afkAccumulator = 0
    }
    if (getActionState('right')) {
      player.xSpeed += MOVE_SPEED
      player.facing = RIGHT
      // afkAccumulator = 0
    }

    if (player.xSpeed === 0 && player.sprite === 'running') {
      player.sprite = 'idle'
      player.frame = 0
      player.accumulator = 0
      player.fps = 8
    } else if (player.sprite === 'idle' && player.xSpeed !== 0) {
      player.sprite = 'running'
      player.frame = 0
      player.accumulator = 0
      player.fps = 8
    }

    player.x += player.xSpeed * dt
  }

  player.jump = () => {
    // afkAccumulator = 0
    if (player.grounded) {
      player.ySpeed = INITIAL_JUMP_SPEED
      player.grounded = false
      player.sprite = 'jump'
      player.frame = 0
      player.accumulator = 0
      player.fps = 8
    }
  }

  player.render = (ctx, canvas) => {
    const character = getTextureByName(
      player.facing === DIRECTION.RIGHT ?
        player.sprite :
        `${player.sprite}-left`
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
  }

  return player
}
