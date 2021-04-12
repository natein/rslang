import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import Difficulty from '../../SavannaGame/Difficulty/Difficulty';
import Timer from '../Timer/Timer';
import Sound from '../../SavannaGame/Hud/Sound';
import Life from '../../SavannaGame/Hud/Life';
import Crystal from '../../Crystal';
import Keynote from '../../SavannaGame/Hud/Keynote';
import { useRef } from 'react';
import SavannaStatistics from '../../GameStatistics';
import ChooseWords from './Gameplay/ChooseWords/ChooseWordsContainer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initLife } from '../../../actions/gameActions';

const [game] = GAMES.list;

const breakpoints = createMuiTheme({});

const Wrapper = styled(Box)`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const SavannaOuter = styled(Box)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    color: white;
    background-size: cover;
    background-position: center;
    background: linear-gradient(0deg, rgb(0 0 0 / 35%), rgb(0 0 0 / 35%)), url(${game.backgroundImage});
    background-repeat: no-repeat;
`;
const GameTitle = styled(Typography)`
    ${({ theme }) => `
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 60px;

  ${theme.breakpoints.down('xs')} {
    font-size: 2rem;
  }
  `}
`;
const GameInner = styled(Box)`
    display: flex;
    max-width: 565px;
    margin: 0 auto 58px;
    padding: 0 15px;
    color: white;
`;
const GameDescriptionText = styled(Typography)`
    ${({ theme }) => `
  color: white;
    font-size: 1.3rem;

  ${theme.breakpoints.down('xs')} {
    font-size: 1rem;
  }
  `}
`;
const StartBtn = styled(Button)`
    margin: 0 15px;
    &:hover {
        border-color: black;
    }
`;

function Savanna({
    initLife = (f) => f,
    setDifficulty = (f) => f,
    difficultyLvl,
    onAddWordToDictionary = (f) => f,
    match,
    wordsList,
}) {
    const statistics = useRef({ words: [], longestSeries: 0 });
    const [isStarted, setIsStarted] = useState(false);
    const [finished, onFinish] = useState(false);

    const [sound, setSound] = React.useState(true);
    const [timer, setTimer] = React.useState(false);

    const onNewGame = () => {
        onFinish(false);
        setIsStarted(false);
        initLife();
        statistics.current = { words: [], longestSeries: 0 };
    };

    function setSoundHandle() {
        setSound(!sound);
    }

    function setTimerHandle() {
        setTimer(true);
        setTimeout(() => {
            setTimer(false);
        }, GAMES.timeout);
    }

    function StartGameHandle() {
        initLife();
        setTimerHandle();
        setIsStarted(true);
        statistics.current = { words: [], longestSeries: 0 };
    }

    return (
        <MuiThemeProvider theme={breakpoints}>
            <ThemeProvider theme={breakpoints}>
                <Wrapper>
                    <SavannaOuter>
                        {timer && <Timer />}
                        {timer && <Keynote />}

                        {!isStarted ? (
                            <>
                                <GameTitle variant="h2" component="h1">
                                    {game.name}
                                </GameTitle>
                                <GameInner>
                                    <GameDescriptionText component="p">{game.description}</GameDescriptionText>
                                </GameInner>
                                <GameInner>
                                    {(match || !wordsList.length) && (
                                        <Difficulty difficultyLvl={difficultyLvl} setDifficulty={setDifficulty} />
                                    )}
                                    <StartBtn onClick={() => StartGameHandle()} variant="outlined" color="inherit">
                                        {GAMES.btnLabel}
                                    </StartBtn>
                                </GameInner>
                            </>
                        ) : (
                            !timer && !finished && (
                                <>
                                    <Sound setSound={setSoundHandle} />
                                    <Life />
                                    <ChooseWords
                                        onAddWordToDictionary={onAddWordToDictionary}
                                        statistics={statistics}
                                        onFinish={onFinish}
                                        sound={sound}
                                        match={match}
                                    />
                                    <Crystal />
                                </>
                            )
                        )}

                        {!timer && finished && <SavannaStatistics statistics={statistics} onNewGame={onNewGame} />}
                    </SavannaOuter>
                </Wrapper>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

Savanna.propTypes = {
    initLife: PropTypes.func.isRequired,
    setDifficulty: PropTypes.func.isRequired,
    difficultyLvl: PropTypes.number,
    onAddWordToDictionary: PropTypes.func.isRequired,
    match: PropTypes.object,
    wordsList: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        gamewords: state.game.savanna.gamewords,
        wordsList: state.game.wordsList,
    };
};

const mapDispatchToProps = (dispatch) => ({
    initLife: () => dispatch(initLife()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Savanna);
