export function getFour(arr) {
    return arr.splice(0, 4).sort(() => Math.random() - 0.5)
}

export function onFullScreen(ref) {
    if (!!document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        ref.current.requestFullscreen();
    }
};