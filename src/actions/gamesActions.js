

export const OPEN_CROSSMODAL = 'OPEN_CROSSMODAL';
export const CLOSE_CROSSMODAL = 'CLOSE_CROSSMODAL';

export const openCrossModal = () => {
    return {
        type: OPEN_CROSSMODAL
    }
}
export const closeCrossModal = () => {
    return {
        type: CLOSE_CROSSMODAL
    }
}