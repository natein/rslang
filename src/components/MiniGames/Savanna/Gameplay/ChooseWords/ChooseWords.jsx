import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../../../constants/index';
import PropTypes from 'prop-types';

const breakpoints = createMuiTheme({});

const ChooseWordsWrapper = styled(Box)`
    position: absolute;
    top: 30%;
    margin-top: -30px;
    right: 0;
    left: 0;
    text-align: center;
    min-height: 50%;
    padding-top: 100px;
`;
const AnswerInner = styled(Box)`
    display: flex;
    justify-content: center;
    color: white;
    font-size: 24px;
    margin: 15px 0;
`;

const WordsOuter = styled(Box)`
    justify-content: center;
`;
const WordsInner = styled(Box)`
    display: inline-block;
    font-size: 24px;
    line-height: 30px;
    max-width: 270px;
    position: relative;
    padding: 20px 15px 20px 30px;
    color: #fff;
    transition: all 0.15s ease;
    cursor: pointer;
    margin: 0 20px;
    user-select: none;
    &:hover {
        background: hsla(0, 0%, 100%, 0.1);
    }
`;
const WordsNumber = styled(Box)`
    position: absolute;
    left: 12px;
    top: 23px;
    font-size: 16px;
    font-weight: bold;
    opacity: 0.79;
    line-height: 28px;
    color: yellow;
`;

function ChooseWords({ gamewords, answer }) {
    return (
        <ChooseWordsWrapper>
            <AnswerInner>{answer}</AnswerInner>
            <WordsOuter>
                {gamewords.map((item, i) => (
                    <WordsInner key={i}>
                        {item.wordTranslate}
                        <WordsNumber component="span">{i}</WordsNumber>
                    </WordsInner>
                ))}
            </WordsOuter>
        </ChooseWordsWrapper>
    );
}

ChooseWords.propTypes = {
    gamewords: PropTypes.array,
    answer: PropTypes.string,
};

export default ChooseWords;
