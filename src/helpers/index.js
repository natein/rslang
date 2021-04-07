export function takeFourWords(arr = []) {
    return arr.slice().sort(() => Math.random() - 0.5).splice(0, 4);
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