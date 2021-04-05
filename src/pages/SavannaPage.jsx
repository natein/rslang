import { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Savanna from '../components/SavannaGame/Savanna/Savanna';
import { loadSavannaWords, loadWords } from '../actions/gameActions';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import LoadingPage from '../components/LoadingPage';
import { onFullScreen, shuffle } from '../helpers';
import styled from 'styled-components';

const SavannaWrapper = styled(Box)`
    display: flex;
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

function SavannaPage({ loadSavannaWords = (f) => f, onLoadWords = (f) => f, loader }) {
    const gameRef = useRef();
    const [difficultyLvl, setDifficultyLvl] = useState(2);

    function setDifficultyHandle({ target }) {
        setDifficultyLvl(target.value);
    }

    useEffect(() => {
        onLoadWords(difficultyLvl, shuffle(30));
    }, [difficultyLvl, onLoadWords]);

    return (
        <SavannaWrapper ref={gameRef}>
            {loader && <LoadingPage />}
            {!loader && (
                <Savanna
                    setDifficulty={setDifficultyHandle}
                    difficultyLvl={difficultyLvl}
                    loadSavannaWords={loadSavannaWords}
                />
            )}

            <FullScreenOuter onClick={() => onFullScreen(gameRef)}>
                <FullscreenIcon fontSize="large" />
            </FullScreenOuter>
        </SavannaWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        loader: state.ebook.loader,
    };
};

const mapDispatchToProps = (dispatch) => ({
    loadSavannaWords: (group, page) => dispatch(loadSavannaWords(group, page)),
    onLoadWords: (group, page) => dispatch(loadWords(group, page)),
});

SavannaPage.propTypes = {
    loadSavannaWords: PropTypes.func,
    onLoadWords: PropTypes.func,
    loader: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(SavannaPage);
