import React, { useCallback, useEffect, useRef, useState } from 'react';
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
const AnswerQuestionInner = styled(Box)`
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: -20px;
    font-size: 48px;
    line-height: 1;
    white-space: nowrap;
    color: #fff;
    letter-spacing: 1px;

    transform: translate(0);
    transition: transform 5s ease-in;

    ${({ start }) =>
        start &&
        `
    transition: all .5s ease;
    opacity: 0;
  `}

    ${({ falling }) =>
        falling &&
        `
    transform: translateY(50%);
    transition: all 5s linear;
  `}
`;

const AnswerWord = styled(Box)`
    position: absolute;
    display: inline-block;
    left: 50%;
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

    ${({ correct }) =>
        correct &&
        `
        &:nth-child(${correct}) {
            background: rgba(80,227,194,.40);
        }
  `}
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

// TODO: !Вне зависимости от правильного ответа подгружать новые слова, после каждого клика и по таймеру.

// TODO: Подсветка правильного слова если слово было выбрано не правильно или не выбрано совсем
// TODO: Правильное слово всегда стоит на первом индексе

// TODO: Выбор ответов с помощью клавиатуры
// TODO: Включение и отключение звуков
// TODO: Снизу добавить анимирующийся камень
// TODO: После падения показать правильное слово и отнять жизнь.

function ChooseWords({ gamewords, answer, getSavannaWords = (f) => f, difficultyLvl }) {
    const TIMER = 2000;
    const answerInnerRef = useRef();

    const [isStart, setIsStart] = useState(false);
    const [isFalling, setIsFalling] = useState(false);

    const [correct, setCorrect] = useState(0);

    const animateOn = useCallback(() => {
        setIsFalling(false);
        setIsStart(true);
    }, []);

    const animateOff = useCallback(() => {
        setIsFalling(true);
        setIsStart(false);
    }, []);

    useEffect(() => {
        setIsFalling(true);
    }, []);

    useEffect(() => {
        if (answerInnerRef) {
            const { current } = answerInnerRef;

            function answerInnerTransitionEnd() {
                if (isFalling) {
                    animateOn();

                    const findAnswerIdx = (words, correct) => words.findIndex((x) => x.word === correct);
                    setCorrect(findAnswerIdx(gamewords, answer) + 1);

                    setTimeout(() => {
                        animateOff();
                        getSavannaWords(difficultyLvl, Math.round(Math.random() * 30));
                        setCorrect(0);
                    }, TIMER);
                }
            }
            current.addEventListener('transitionend', answerInnerTransitionEnd, false);
            return () => current.removeEventListener('transitionend', answerInnerTransitionEnd);
        }
    }, [animateOff, animateOn, answer, answerInnerRef, difficultyLvl, gamewords, getSavannaWords, isFalling]);

    function checkWord({ currentTarget }) {
        animateOn();

        setTimeout(() => {
            animateOff();
            getSavannaWords(difficultyLvl, Math.round(Math.random() * 30));
        }, TIMER);

        const [wordIdx] = currentTarget.children;
        const checkWord = gamewords[wordIdx.innerText].word;

        if (checkWord === answer) {
            console.log('correct');
        } else {
            console.log('wrong');
        }
    }

    return (
        <ChooseWordsWrapper>
            <AnswerQuestionInner
                ref={answerInnerRef}
                start={isStart ? 'true' : null}
                falling={isFalling ? 'true' : null}
            >
                <AnswerWord>{answer}</AnswerWord>
            </AnswerQuestionInner>
            <WordsOuter>
                {gamewords.map((item, i) => (
                    <WordsInner correct={correct} onClick={(e) => checkWord(e)} key={i}>
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
