const textures = {}

export const loadTextures = async (texturesData) =>
  new Promise((resolve, reject) => {
    const images = {}
    texturesData.forEach(textureData => {
      const image = new Image()
      image.src = textureData.src
      image.onload = () => {
        images[textureData.name] = image
        textures[textureData.name] = image
        if (Object.keys(images).length === texturesData.length) {
          resolve(images)
        }
      }
    })
  })

export const getTextureByName = name => textures[name] || null
