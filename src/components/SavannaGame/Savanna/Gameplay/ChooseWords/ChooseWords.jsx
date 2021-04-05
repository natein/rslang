/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { shuffle, findAnswerIdx } from '../../../../../helpers/index';
import success from '../../../../../assets/sounds/correct.mp3';
import failed from '../../../../../assets/sounds/wrong.mp3';
import { GAMES } from '../../../../../constants/index';

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

// Done
// !TODO: После завершения игры показать окно статистики
// !TODO: Иногда не показывает весь список слов

// Active
// TODO: Если слова не меняются значит ошибка в запросе
// TODO: Добавить анимацию появления новых слов
// TODO: Добавлять слова из игры в словарь

// Refactor
// TODO: Не забыть проверить адаптивность
// TODO: Если слово из двух слов то плывет верстка

function ChooseWords({
    onFinish = (f) => f,
    loadSavannaWords = (f) => f,
    setLostLife = (f) => f,
    sound,
    gamewords,
    statistics,
    answer,
    difficultyLvl,
}) {
    const refreshTimer = 2000;
    const answerInnerRef = useRef();
    const wordsOuterRef = useRef();

    const [isStart, setIsStart] = useState(false);
    const [isFalling, setIsFalling] = useState(false);
    const [disabled, setDisabled] = useState(false);

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
                    const answerIdx = findAnswerIdx(gamewords, answer);
                    setCorrect(answerIdx + 1);
                    statistics.current.words.push({ ...gamewords[answerIdx], correct: false });

                    setTimeout(() => {
                        animateOff();
                        loadSavannaWords(difficultyLvl, shuffle(30));
                        setCorrect(0);
                        setCounter(counter + 1);
                        setLostLife(counter);
                        onFinish(counter === GAMES.lifes);
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
        loadSavannaWords,
        isFalling,
        setLostLife,
    ]);

    function checkWordHandle(el, flag = 'no') {
        let wordIdx;
        animateOn();

        if (disabled) {
            return;
        }

        setTimeout(() => {
            setDisabled(false);
            animateOff();
            setCorrect(0);
            loadSavannaWords(difficultyLvl, shuffle(30));
            setWrong(0);
        }, refreshTimer);

        // Condition for click or keypress
        if (flag === 'yes') {
            [wordIdx] = el.children;
        } else {
            [wordIdx] = el.currentTarget.children;
        }

        const checkWord = gamewords[wordIdx.innerText].word;

        if (checkWord === answer) {
            setCorrect(parseFloat(wordIdx.innerText) + 1);
            statistics.current.words.push({ ...gamewords[wordIdx.innerText], correct: true });
            if (sound) {
                new Audio(success).play();
            }
        } else {
            setCorrect(findAnswerIdx(gamewords, answer) + 1);
            setWrong(parseFloat(wordIdx.innerText) + 1);
            setCounter(counter + 1);
            setLostLife(counter);
            onFinish(counter === GAMES.lifes);
            statistics.current.words.push({ ...gamewords[wordIdx.innerText], correct: false });

            if (sound) {
                new Audio(failed).play();
            }
        }
        setDisabled(true);
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
