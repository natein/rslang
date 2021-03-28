import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import SprintGame from '../components/SprintGame';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { Box, Button, makeStyles } from '@material-ui/core';
import { common } from '@material-ui/core/colors';
import SprintStatistics from '../components/SprintGame/SprintStatistics';
import SelectComplexityLevel from '../components/SprintGame/SelectComplexityLevel';
import LoadingPage from '../components/LoadingPage';
import * as gameActions from '../actions/gameActions';
import { useHistory, useRouteMatch } from 'react-router';

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

const SprintPage = ({ words = [], loader, onLoadWords }) => {
    const classes = styles();
    const [finished, onFinish] = useState(false);
    const statistics = useRef({ score: 0, words: [] });
    const gameRef = useRef();
    const history = useHistory();

    const match = useRouteMatch({
        path: '/games/sprint/new',
        strict: true,
        sensitive: true,
    });

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

    useEffect(() => {
        if(match) {
            onLoadWords([]);
            history.push('/games/sprint')
        }
    }, [match, onLoadWords, history]);

    return (
        <Box id="sprint-game-board" component="section" ref={gameRef}>
            {loader && <LoadingPage />}
            {!loader && words.length === 0 && <SelectComplexityLevel onLoadWords={onLoadWords} />}
            {!loader && words.length > 0 && !finished && (
                <SprintGame words={words} statistics={statistics} onFinish={onFinish} />
            )}
            {!loader && !!finished && <SprintStatistics statistics={statistics} onNewGame={onNewGame} />}
            <Button className={classes.fullscreen} onClick={onFullScreen}>
                <FullscreenIcon fontSize="large" />
            </Button>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    words: state.game.wordsList,
    loader: state.ebook.loader,
});

const mapDispatchToProps = (dispatch) => ({
    onLoadWords: (group, page) => dispatch(gameActions.loadWords(group, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintPage);
