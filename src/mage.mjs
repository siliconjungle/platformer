import { DIRECTION } from './config.mjs'
import { getTextureByName } from './textures.mjs'

const MAGE_WIDTH = 26
const MAGE_HEIGHT = 28

const MOVE_SPEED = 150

export const createMage = (x, y) => {
  const mage = {
    x,
    y,
    facing: DIRECTION.LEFT,
    sprite: 'mage',
    xSpeed: -MOVE_SPEED,
    collider: {
      x: 0,
      y: 0,
      width: MAGE_WIDTH * 2,
      height: MAGE_HEIGHT * 2,
    }
  }

  mage.getCollider = () => ({
    x: mage.x + mage.collider.x,
    y: mage.y + mage.collider.y,
    width: mage.collider.width,
    height: mage.collider.height,
  })

  mage.turn = () => {
    mage.facing *= -1
    mage.xSpeed *= -1
  }

  mage.update = (dt) => {
    mage.x += mage.xSpeed * dt
    if (mage.x < 64) {
      mage.x = 64
      mage.xSpeed = MOVE_SPEED
      mage.facing = DIRECTION.RIGHT
    }

    if (mage.x > 640 - (MAGE_WIDTH * 2 + 64)) {
      mage.x = 640 - (MAGE_WIDTH * 2 + 64)
      mage.xSpeed = -MOVE_SPEED
      mage.facing = DIRECTION.LEFT
    }
  }

  mage.render = (ctx, canvas) => {
    const sprite = getTextureByName(
      mage.facing === DIRECTION.RIGHT ?
        mage.sprite :
        `${mage.sprite}-left`
    )
    ctx.drawImage(
      sprite,
      mage.x,
      mage.y,
      MAGE_WIDTH * 2,
      MAGE_HEIGHT * 2,
    )
  }

  mage.debugRender = (ctx, canvas) => {
    ctx.beginPath()
    const mageCollider = mage.getCollider()
    ctx.rect(mageCollider.x, mageCollider.y, mageCollider.width, mageCollider.height)
    ctx.stroke()
  }

  return mage
}
