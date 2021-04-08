import { Button, FormControl, MenuItem, Select, Typography, InputLabel, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { GAMES, SECTIONS_EBOOK } from '../../constants/index';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const breakpoints = createMuiTheme({});

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
const Outer = styled(FormControl)`
    display: flex;
    flex-direction: row;
`;
const DifficultyForm = styled(FormControl)`
    min-width: 120px;
`;
const DifficultyLabel = styled(InputLabel)`
    color: white;
`;
const DifficultySelect = styled(Select)`
    color: white;
    fieldset {
        border-color: white;
    }
    svg {
        color: white;
    }
`;
const GameInner = styled(Box)`
    display: flex;
    max-width: 565px;
    margin: 0 auto 25px;
    padding: 0 15px;
    flex-direction: column;
    ${({ theme }) => `
  color: white;
    font-size: 1.3rem;

  ${theme.breakpoints.down('xs')} {
    font-size: 1rem;
  }
  `}
`;
const GameDescriptionText = styled(Typography)`
    font-size: inherit;
`;
const StartBtn = styled(Button)`
    margin: 0 15px;
    &:hover {
        border-color: black;
    }
`;
const HelpInner = styled(Box)``;
const HelpListItem = styled('li')``;

const HelpList = styled('ul')`
    list-style: initial;
`;

const SelectComplexityLevel = ({ onLoadWords, gameName }) => {
    const [group, setGroup] = useState(2);
    const game = GAMES.list.find((game) => game.code === gameName);

    return (
        <>
            <MuiThemeProvider theme={breakpoints}>
                <ThemeProvider theme={breakpoints}>
                    <GameTitle variant="h2" component="h1">
                        {game.name}
                    </GameTitle>
                    <GameInner>
                        <GameDescriptionText component="p">{game.description}</GameDescriptionText>
                        <HelpInner>
                            <HelpList>
                                {game.help.map((item, i) => {
                                    return <HelpListItem key={i}>{item}</HelpListItem>;
                                })}
                            </HelpList>
                        </HelpInner>
                    </GameInner>
                    <Outer>
                        <DifficultyForm color="primary" variant="outlined">
                            <DifficultyLabel>{GAMES.difficultyTitle}</DifficultyLabel>

                            <DifficultySelect
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                                label={GAMES.difficultyTitle}
                            >
                                {SECTIONS_EBOOK.map((item) => {
                                    return (
                                        <MenuItem key={item.name} value={item.group + 1}>
                                            {item.group + 1}
                                        </MenuItem>
                                    );
                                })}
                            </DifficultySelect>
                        </DifficultyForm>
                        <StartBtn
                            variant="outlined"
                            color="inherit"
                            onClick={() => onLoadWords(group, Math.round(Math.random() * 30))}
                        >
                            {GAMES.btnLabel}
                        </StartBtn>
                    </Outer>
                </ThemeProvider>
            </MuiThemeProvider>
        </>
    );
};

export default SelectComplexityLevel;
