import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core/';
import { GAMES_LIST } from '../../constants/index';
import Difficulty from './Difficulty';

const [game] = GAMES_LIST;

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

const GameDescriptionWrap = styled(Box)`
    display: flex;
    max-width: 565px;
    margin: 0 auto 58px;
    padding: 0 15px;
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

const GameControlsWrap = styled(Box)`
    display: flex;
    max-width: 565px;
    margin: 0 auto 58px;
    padding: 0 15px;
`;

function Savanna() {
    return (
        <MuiThemeProvider theme={breakpoints}>
            <ThemeProvider theme={breakpoints}>
                <Wrapper>
                    {/* TITLE */}
                    <GameTitle variant="h2" component="h1">
                        {game.name}
                    </GameTitle>

                    {/* DESCRIPTION */}
                    <GameDescriptionWrap>
                        <GameDescriptionText component="p">{game.description}</GameDescriptionText>
                    </GameDescriptionWrap>
                    <GameControlsWrap>
                        
                        {/* DIFFICULTY */}
                        <Difficulty lvlTitle="Уровень сложности" />

                        {/* STARTBTN */}
                    </GameControlsWrap>
                </Wrapper>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

export default Savanna;
