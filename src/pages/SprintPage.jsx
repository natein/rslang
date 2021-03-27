import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import SprintGame from '../components/SprintGame';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { Box, Button, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import SprintStatistics from '../components/SprintGame/SprintStatistics';
import SelectComplexityLevel from '../components/SprintGame/SelectComplexityLevel';

const styles = makeStyles((theme) => ({
    fullscreen: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: common.white,
        margin: 0,
        padding: 0,
        minWidth: 'auto',
    },
}));

const SprintPage = ({ words = [] }) => {
    const classes = styles();
    const [finished, onFinish] = useState(false);
    const statistics = useRef({ score: 0, words: [] });
    const gameRef = useRef();

    const onFullScreen = () => {
        if (!!document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            gameRef.current.requestFullscreen();
        }
    };

    const onNewGame = () => {
        onFinish(false);
        statistics.current = { score: 0, words: [] };
    };

    return (
        <Box id="sprint-game-board" component="section" ref={gameRef}>
            {(words.length === 0) && <SelectComplexityLevel />}
            {words.length > 0 && !finished && <SprintGame words={words} statistics={statistics} onFinish={onFinish} />}
            {finished && <SprintStatistics statistics={statistics} onNewGame={onNewGame} />}
            <Button className={classes.fullscreen} onClick={onFullScreen}>
                <FullscreenIcon fontSize="large" />
            </Button>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    words: state.ebook.wordsList,
});

export default connect(mapStateToProps)(SprintPage);
