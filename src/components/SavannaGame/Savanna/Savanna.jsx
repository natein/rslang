import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import Difficulty from '../../SavannaGame/Difficulty/Difficulty';
import Timer from '../Timer/Timer';
import Sound from '../../SavannaGame/Hud/Sound';
import Life from '../../SavannaGame/Hud/Life';
import Crystal from '../../SavannaGame/Hud/Crystal';

import ChooseWords from './Gameplay/ChooseWords/ChooseWordsContainer';
import { shuffle } from '../../../helpers/index';
import PropTypes from 'prop-types';

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

function Savanna({ preloadTimer = (f) => f, timer }) {
    const [isStarted, setIsStarted] = useState(false);
    const [difficultyLvl, setDifficultyLvl] = React.useState(2);
    const [sound, setSound] = React.useState(true);

    function setSoundHandle(e) {
        setSound(!sound);
    }

    function setDifficultyHandle(e) {
        const { target } = e;
        setDifficultyLvl(target.value);
    }

    function StartGameHandle() {
        preloadTimer(difficultyLvl, shuffle(30));
        setIsStarted(true);
    }

    return (
        <MuiThemeProvider theme={breakpoints}>
            <ThemeProvider theme={breakpoints}>
                <Wrapper>
                    <SavannaOuter>
                        {timer && <Timer />}

                        {!isStarted ? (
                            <>
                                <GameTitle variant="h2" component="h1">
                                    {game.name}
                                </GameTitle>
                                <GameInner>
                                    <GameDescriptionText component="p">{game.description}</GameDescriptionText>
                                </GameInner>
                                <GameInner>
                                    <Difficulty difficultyLvl={difficultyLvl} setDifficulty={setDifficultyHandle} />

                                    <StartBtn onClick={() => StartGameHandle()} variant="outlined" color="inherit">
                                        {GAMES.btnLabel}
                                    </StartBtn>
                                </GameInner>
                            </>
                        ) : (
                            <>
                                {!timer && <Sound setSound={setSoundHandle} />}
                                {!timer && <Life />}
                                {!timer && <ChooseWords sound={sound} difficultyLvl={difficultyLvl} />}
                                {!timer && <Crystal />}
                            </>
                        )}
                    </SavannaOuter>
                </Wrapper>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

Savanna.propTypes = {
    timer: PropTypes.bool,
    onLoadWords: PropTypes.func,
    preloadTimer: PropTypes.func,
};

export default Savanna;
