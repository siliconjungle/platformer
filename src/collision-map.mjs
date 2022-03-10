let collisionMap = null
let heightMap = []

export const setCollisionMap = (texture) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = texture.width
  canvas.height = texture.height
  ctx.drawImage(texture, 0, 0, texture.width, texture.height)
  const imageData = ctx.getImageData(0, 0, texture.width, texture.height).data
  collisionMap = []
  for (let x = 0; x < texture.width; x++) {
    const row = []
    for (let y = 0; y < texture.height; y++) {
      const index = (Math.floor(y) * texture.width + Math.floor(x)) * 4
      row.push({
        r: imageData[index],
        g: imageData[index + 1],
        b: imageData[index + 2],
        a: imageData[index + 3]
      })
    }
    collisionMap.push(row)
  }

  for (let x = 0; x < texture.width; x++) {
    let height = 639
    for (let y = 0; y < texture.height; y++) {
      const color = collisionMap[x][y]
      if (color.r === 0 && color.g === 0 && color.b === 0 && color.a === 255) {
        height = y
        break
      }
    }
    heightMap[x] = height
  }
}

export const getCollisionMap = () => collisionMap

export const getColorAtPos = (x, y) => {
  if (collisionMap[x][y]) {
    console.log(collisionMap[x][y])
  }
}

export const getGroundHeightByX = x => {
  return heightMap[x] ?? 479
  // console.log('_HEIGHT_', height)
}
