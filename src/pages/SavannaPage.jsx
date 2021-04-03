import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Savanna from '../components/SavannaGame/Savanna/index';
import { loadWords, preloadSavannaTimer } from '../actions/gameActions';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import LoadingPage from '../components/LoadingPage';
import { onFullScreen } from '../helpers';
import styled from 'styled-components';

const SavannaWrapper = styled(Box)`
    display:flex;
`;

const FullScreenOuter = styled(Button)`
    top: 0;
    color: white;
    right: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    min-width: auto;
    margin-right: 30px;
    margin-top: 15px;
`;

function SavannaPage({ onLoadWords = (f) => f, preloadTimer = (f) => f, timer, loader }) {
    const gameRef = useRef();

    useEffect(() => {
        onLoadWords();
    }, [onLoadWords]);

    function onFullScreenHandle() {
        onFullScreen(gameRef);
    }

    return (
        <SavannaWrapper ref={gameRef}>
            {loader && <LoadingPage />}
            {!loader && <Savanna preloadTimer={preloadTimer} onLoadWords={onLoadWords} timer={timer} />}

            <FullScreenOuter onClick={() => onFullScreenHandle()}>
                <FullscreenIcon fontSize="large" />
            </FullScreenOuter>
        </SavannaWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        timer: state.game.timer,
        loader: state.ebook.loader,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onLoadWords: (group, page) => dispatch(loadWords(group, page)),
    preloadTimer: (group, page) => dispatch(preloadSavannaTimer(group, page)),
});

SavannaPage.propTypes = {
    onLoadWords: PropTypes.func,
    preloadTimer: PropTypes.func,
    timer: PropTypes.bool,
    loader: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavannaPage);
