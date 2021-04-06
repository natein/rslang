export function takeFourWords(arr = []) {
    const result = arr.slice();
    return result.splice(0, 4).sort(() => Math.random() - 0.5)
}

export function onFullScreen(ref) {
    if (!!document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        ref.current.requestFullscreen();
    }
};

export const shuffle = (num) => Math.round(Math.random() * num);
export const findAnswerIdx = (words, correct) => words.findIndex((x) => x.word === correct);