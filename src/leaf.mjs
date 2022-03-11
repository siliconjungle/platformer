import { getTextureByName } from './textures.mjs'

const LEAF_WIDTH = 27
const LEAF_HEIGHT = 28

export const createLeaf = (x, y) => {
  const leaf = {
    x,
    y,
    sprite: 'leaf',
    collider: {
      x: 0,
      y: 0,
      width: LEAF_WIDTH,
      height: LEAF_HEIGHT,
    }
  }

  leaf.getCollider = () => ({
    x: leaf.x + leaf.collider.x,
    y: leaf.y + leaf.collider.y,
    width: leaf.collider.width,
    height: leaf.collider.height,
  })

  leaf.update = (dt) => {}

  leaf.render = (ctx, canvas) => {
    const sprite = getTextureByName(leaf.sprite)
    ctx.drawImage(
      sprite,
      leaf.x,
      leaf.y,
      LEAF_WIDTH,
      LEAF_HEIGHT,
    )
  }

  leaf.debugRender = (ctx, canvas) => {
    ctx.beginPath()
    const leafCollider = leaf.getCollider()
    ctx.rect(leafCollider.x, leafCollider.y, leafCollider.width, leafCollider.height)
    ctx.stroke()
  }

  return leaf
}
