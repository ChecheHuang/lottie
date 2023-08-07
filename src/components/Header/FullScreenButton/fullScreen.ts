var document: any = window.document
export function requestFullScreen(element: any) {
  var requestMethod =
    element.requestFullScreen ||
    element.webkitRequestFullScreen ||
    element.msRequestFullScreen ||
    element.mozRequestFullScreen
  if (requestMethod) {
    requestMethod.call(element)
  }
}

export function exitFullScreen() {
  const exitMethod =
    document.exitFullscreen ||
    document.webkitExitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen
  if (exitMethod) {
    exitMethod.call(document)
  }
}
export function isFullscreenElement() {
  const isFull =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullScreenElement ||
    document.mozFullScreenElement
  return !!isFull
}
