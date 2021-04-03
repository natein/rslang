/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { shuffle, findAnswerIdx } from '../../../../../helpers/index';
import success from '../../../../../assets/sounds/correct.mp3';
import failed from '../../../../../assets/sounds/wrong.mp3';

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
    ${({ wrong }) =>
        wrong &&
        `
        &:nth-child(${wrong}) {
            background: rgba(255,109,127,.40)
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

// Question: Два event listener и изменение стейта в последнем

// Done
// !TODO: Вне зависимости от правильного ответа подгружать новые слова, после каждого клика и по таймеру.
// !TODO: Правильное слово всегда стоит на первом индексе
// !TODO: Подсветка правильного слова если слово было выбрано не правильно или не выбрано совсем
// !TODO: После падения показать правильное слово и отнять жизнь, так же отнять жизнь если не правильно кликнул.
// !TODO: Выбор ответов с помощью клавиатуры
// !TODO: Включение и отключение звуков
// !TODO: Снизу добавить анимирующийся камень
// !TODO: Добавить к таймеру текст что можно управлять с клавиатуры

// Active
// TODO: После завершения игры показать окно статистики

// Refactor
// TODO: Иногда не показывает весь список слов
// TODO: Иногда не срабатывает изменение слов после падения
// TODO: Не забыть проверить адаптивность
// TODO: Если слово из двух слов то плывет верстка

function ChooseWords({ sound, gamewords, answer, difficultyLvl, setLostLife = (f) => f, getSavannaWords = (f) => f }) {
    const refreshTimer = 2000;
    const answerInnerRef = useRef();
    const wordsOuterRef = useRef();

    const [isStart, setIsStart] = useState(false);
    const [isFalling, setIsFalling] = useState(false);

    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [counter, setCounter] = useState(0);

    const animateOn = useCallback(() => {
        setIsFalling(false);
        setIsStart(true);
    }, []);

    const animateOff = useCallback(() => {
        setIsFalling(true);
        setIsStart(false);
    }, []);

    useEffect(() => {
        // Becouse preloadSavannaTimer async
        setTimeout(() => {
            setIsFalling(true);
        }, 0);
    }, []);

    useEffect(() => {
        const keyHandler = (e) => {
            if (e.defaultPrevented) {
                return;
            }
            switch (e.key) {
                case '0':
                case '1':
                case '2':
                case '3':
                    const wordEl = wordsOuterRef.current.children[parseFloat(e.key)];
                    checkWordHandle(wordEl, 'yes');
                    break;
                default:
                    return;
            }
            e.preventDefault();
        };
        window.addEventListener('keydown', keyHandler, true);

        return () => {
            window.removeEventListener('keydown', keyHandler, true);
        };
    }, [checkWordHandle]);

    useEffect(() => {
        if (answerInnerRef) {
            const { current } = answerInnerRef;

            function answerInnerTransitionEnd() {
                if (isFalling) {
                    animateOn();

                    setCorrect(findAnswerIdx(gamewords, answer) + 1);

                    setTimeout(() => {
                        animateOff();
                        getSavannaWords(difficultyLvl, shuffle(30));
                        setCorrect(0);
                        setCounter(counter + 1);
                        setLostLife(counter);
                    }, refreshTimer);
                }
            }
            current.addEventListener('transitionend', answerInnerTransitionEnd, false);
            return () => current.removeEventListener('transitionend', answerInnerTransitionEnd);
        }
    }, [
        animateOff,
        animateOn,
        answer,
        answerInnerRef,
        counter,
        difficultyLvl,
        gamewords,
        getSavannaWords,
        isFalling,
        setLostLife,
    ]);

    function checkWordHandle(el, flag = 'no') {
        let wordIdx;
        animateOn();

        // Condition for click or keypress
        if (flag === 'yes') {
            [wordIdx] = el.children;
        } else {
            [wordIdx] = el.currentTarget.children;
        }

        const checkWord = gamewords[wordIdx.innerText].word;

        if (checkWord === answer) {
            setCorrect(parseFloat(wordIdx.innerText) + 1);
            if (sound) {
                new Audio(success).play();
            }
        } else {
            setCorrect(findAnswerIdx(gamewords, answer) + 1);
            setWrong(parseFloat(wordIdx.innerText) + 1);
            setCounter(counter + 1);
            setLostLife(counter);
            if (sound) {
                new Audio(failed).play();
            }
        }

        setTimeout(() => {
            animateOff();
            setCorrect(0);
            getSavannaWords(difficultyLvl, shuffle(30));
            setWrong(0);
        }, refreshTimer);
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
            <WordsOuter ref={wordsOuterRef}>
                {gamewords.map((item, i) => (
                    <WordsInner correct={correct} wrong={wrong} onClick={(e) => checkWordHandle(e)} key={i}>
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
