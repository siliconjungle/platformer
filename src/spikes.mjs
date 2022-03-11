import { getTextureByName } from './textures.mjs'

const SPIKES_WIDTH = 32
const SPIKES_HEIGHT = 11

export const createSpikes = (x, y) => {
  const spikes = {
    x,
    y,
    sprite: 'spikes',
    collider: {
      x: 8,
      y: 0,
      width: SPIKES_WIDTH * 2 - 16,
      height: SPIKES_HEIGHT * 2,
    }
  }

  spikes.getCollider = () => ({
    x: spikes.x + spikes.collider.x,
    y: spikes.y + spikes.collider.y,
    width: spikes.collider.width,
    height: spikes.collider.height,
  })

  spikes.update = (dt) => {}

  spikes.render = (ctx, canvas) => {
    const sprite = getTextureByName(spikes.sprite)
    ctx.drawImage(
      sprite,
      spikes.x,
      spikes.y,
      SPIKES_WIDTH * 2,
      SPIKES_HEIGHT * 2,
    )
  }

  spikes.debugRender = (ctx, canvas) => {
    ctx.beginPath()
    const spikesCollider = spikes.getCollider()
    ctx.rect(spikesCollider.x, spikesCollider.y, spikesCollider.width, spikesCollider.height)
    ctx.stroke()
  }

  return spikes
}
