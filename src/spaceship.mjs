import { DIRECTION } from './config.mjs'
import { getTextureByName } from './textures.mjs'

const SPACESHIP_WIDTH = 64
const SPACESHIP_HEIGHT = 32

const MOVE_SPEED = 200

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const createSpaceship = (x, y) => {
  const spaceship = {
    x,
    y,
    facing: DIRECTION.RIGHT,
    sprite: 'spaceship',
    xSpeed: -MOVE_SPEED,
  }

  spaceship.update = (dt) => {
    spaceship.x += spaceship.xSpeed * dt
    if (spaceship.x < -SPACESHIP_WIDTH * 2) {
      spaceship.x = 640
      spaceship.y = randomRange(0, 240)
      spaceship.dead = true
    }
  }

  spaceship.render = (ctx, canvas) => {
    const sprite = getTextureByName(
      spaceship.sprite,
    )
    ctx.drawImage(
      sprite,
      spaceship.x,
      spaceship.y,
      SPACESHIP_WIDTH * 2,
      SPACESHIP_HEIGHT * 2,
    )
  }

  return spaceship
}
