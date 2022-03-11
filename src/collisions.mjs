export const rectanglesOverlap = (rect, rect2) => {
  return (
    rect.x + rect.width >= rect2.x &&
    rect.x < rect2.x + rect2.width &&
    rect.y + rect.height >= rect2.y &&
    rect.y < rect2.y + rect2.height
  )
}
