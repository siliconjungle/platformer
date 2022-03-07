let entities = []
let deadEntities = []

export const addEntity = entity => {
  entities.push(entity)
}

export const updateEntities = (dt) => {
  entities.forEach(entity => {
    entity.update(dt)
  })
  if (entities.some(entity => entity.dead)) {
    entities = entities.filter(entity => !entity.dead)
    deadEntities = entities.filter(entity => entity.dead)
  }
}

export const renderEntities = (ctx, canvas) => {
  entities.forEach(entity => {
    entity.render(ctx, canvas)
  })
}
