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
    transform-origin: 50% bottom;
    transition: all 0.3s ease;
    transform: translate(-50%);
    display: inline-block;
    left: 50%;

    ${({ spacing }) =>
        spacing &&
        `
        transition: letter-spacing .6s ease;
        letter-spacing: 100px;
  `}
    ${({ end }) =>
        end &&
        `
        transition: all 0.3s ease;
        letter-spacing: initial;
  `}
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
const WordAnswer = styled(Box)`
    display: flex;
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

// TODO: Вне зависимости от правильного ответа подгружать новые слова, после каждого клика. По таймеру.
// TODO: Подсветка правильного слова если слово было выбрано не правильно
// TODO: Таймер на выбор ответа, если не успеть нажать по таймеру то ответ считается не правильным
// TODO: Выбор ответов с помощью клавиатуры
// TODO: Включение и отключение звуков
// TODO: Снизу добавить анимирующийся камень
// TODO: После падения показать правильное слово и отнять жизнь.

function ChooseWords({ gamewords, answer, getSavannaWords = (f) => f, difficultyLvl }) {
    const answerInnerRef = useRef();
    const answerWordRef = useRef();

    const [isStart, setIsStart] = useState(false);
    const [isFalling, setIsFalling] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const [isSpacing, setIsSpacing] = useState(false);

    console.log(isFalling, 'isFalling');

    function animateAnswerInner() {
        setIsFalling(false);
        setIsStart(true);
        setIsSpacing(true);
    }

    useEffect(() => {
        setIsFalling(true);
    }, []);

    useEffect(() => {
        if (answerInnerRef) {
            const { current } = answerInnerRef;

            function answerInnerTransitionEnd() {
                if (isFalling) {
                    animateAnswerInner();
                }
            }
            current.addEventListener('transitionend', answerInnerTransitionEnd, false);
            return () => current.removeEventListener('transitionend', answerInnerTransitionEnd);
        }
    }, [answerInnerRef, isFalling]);

    function checkWord({ currentTarget }) {
        animateAnswerInner();

        // Метод для получения новых слов
        // getSavannaWords(difficultyLvl, Math.round(Math.random() * 30));

        // Проверка правильности слова
        // const [wordIdx] = currentTarget.children;
        // const check = gamewords[wordIdx.innerText].word;
        // if (check === answer) {
        //     console.log('correct');
        // } else {
        //     console.log('wrong');
        // }
    }

    return (
        <ChooseWordsWrapper>
            <AnswerQuestionInner
                ref={answerInnerRef}
                start={isStart ? 'true' : null}
                falling={isFalling ? 'true' : null}
                end={isEnd ? 'true' : null}
            >
                <AnswerWord ref={answerWordRef} end={isEnd ? 'true' : null} spacing={isSpacing ? 'true' : null}>
                    {answer}
                </AnswerWord>
            </AnswerQuestionInner>
            <WordsOuter>
                {gamewords.map((item, i) => (
                    <WordsInner onClick={(e) => checkWord(e)} key={i}>
                        <WordAnswer>{item.wordTranslate}</WordAnswer>
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

// Исходное состояние inner с Answer
// .ll-leokit__trainings-savannah__question {
//     position: fixed;
//     left: 0;
//     top: 0;
//     font-size: 48px;
//     line-height: 1;
//     font-weight: 300;
//     white-space: nowrap;
//     color: #fff;
//     letter-spacing: 1px;
//     height: 100%;
//     width: 100%;
//     transform: translate(0);
//     transition: transform 5s ease-in
// }

// Переключение в состояние анимации падения
// .ll-leokit__trainings-savannah__question__m-question_fall {
//     transform: translateY(50%);
//     transition: all 5s linear
// }

// Состояние слова Answer после выбора из списка слов
// .ll-leokit__trainings-savannah__question__m-question_success_coin .ll-leokit__trainings-savannah__quest-word {
//     width: 2px;
//     height: 25px;
//     background-color: #fff;
//     border-radius: 5px;
//     transition: color 0s linear;
//     color: transparent
// }

// По идеи прокрутка заднего фона вперед после правильного ответа
// .ll-leokit__trainings-savannah__question__m-question_success_fall {
//     opacity: .5;
//     transform: translateY(85%);
//     transition: all .5s cubic-bezier(.47,0,.745,.715)
// }

// Состояние слова Answer после успешного падения
// .ll-leokit__trainings-savannah__question__m-question_success_fall .ll-leokit__trainings-savannah__quest-word {
//     width: 2px;
//     height: 25px;
//     background-color: #fff;
//     border-radius: 5px;
//     transition: color 0s linear;
//     color: transparent
// }

// Состояние inner Answer после падения слова
// .ll-leokit__trainings-savannah__question__m-question_success_end {
//     opacity: 0;
//     transition: opacity 0s linear
// }

// Начальное состоение inner Answer после падения
// .ll-leokit__trainings-savannah__question__m-question_fail_start {
//     transition: all .5s ease;
//     opacity: 0
// }

// Состояние для слова после успешного падения или после выбора из списка слов
// .ll-leokit__trainings-savannah__question__m-question_fail_start .ll-leokit__trainings-savannah__quest-word {
//     transition: letter-spacing .6s ease;
//     letter-spacing: 100px
// }
