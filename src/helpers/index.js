export function takeWords(arr = [], num = 4) {
    return arr.slice().sort(() => Math.random() - 0.5).splice(0, num);
}

export function onFullScreen(ref) {
    if (!!document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        ref.current.requestFullscreen();
    }
};

export const findAnswerIdx = (words, correct) => words.findIndex((x) => x.word === correct);