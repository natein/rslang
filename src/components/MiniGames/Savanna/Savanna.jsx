import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import Difficulty from '../Difficulty/Difficulty';
import Timer from '../Timer/Timer';
import Cross from '../Cross/Cross';
import CrossModal from '../Cross/CrossModal';
import Sound from '../Hud/Sound';
import Life from '../Hud/Life';
import ChooseWords from './Gameplay/ChooseWords';

import PropTypes from 'prop-types';

const [game] = GAMES.list;

const breakpoints = createMuiTheme({});

const Wrapper = styled(Box)`
    height: 100vh;
    background: linear-gradient(0deg, rgb(0 0 0 / 0%), rgb(0 0 0 / 30%)), url(${game.backgroundImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

function Savanna({ startGame = (f) => f, crossModalOpen = (f) => f, timer }) {
    const [isStarted, setIsStarted] = useState(false);

    function StartGameHandle() {
        startGame();
        setIsStarted(true);
    }

    return (
        <MuiThemeProvider theme={breakpoints}>
            <ThemeProvider theme={breakpoints}>
                <Wrapper>
                    {timer && <Timer />}

                    <Cross onClick={() => crossModalOpen()} />
                    <CrossModal />

                    {!isStarted ? (
                        <>
                            <GameTitle variant="h2" component="h1">
                                {game.name}
                            </GameTitle>
                            <GameInner>
                                <GameDescriptionText component="p">{game.description}</GameDescriptionText>
                            </GameInner>
                            <GameInner>
                                <Difficulty lvlTitle={GAMES.difficultyTitle} />
                                <StartBtn onClick={() => StartGameHandle()} variant="outlined" color="inherit">
                                    {GAMES.btnLabel}
                                </StartBtn>
                            </GameInner>
                        </>
                    ) : (
                        <>
                            {!timer && <Sound />}
                            {!timer && <Life />}
                            {!timer && <ChooseWords />}
                        </>
                    )}
                </Wrapper>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

Savanna.propTypes = {
    crossModalOpen: PropTypes.func.isRequired,
    timer: PropTypes.bool,
    startGame: PropTypes.func.isRequired,
};

export default Savanna;
