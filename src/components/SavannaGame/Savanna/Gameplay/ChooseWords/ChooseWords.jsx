/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { findAnswerIdx } from '../../../../../helpers/index';
import success from '../../../../../assets/sounds/correct.mp3';
import failed from '../../../../../assets/sounds/wrong.mp3';
import { GAMES } from '../../../../../constants/index';
import { takeWords } from '../../../../../helpers/index';
import Zoom from '@material-ui/core/Zoom';

const [game] = GAMES.list;

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

    ${(props) =>
        props.$start &&
        `
    transition: all .5s ease;
    opacity: 0;
  `}

    ${(props) =>
        props.$falling &&
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

function ChooseWords({
    onFinish = (f) => f,
    setLostLife = (f) => f,
    onAddWordToDictionary = (f) => f,
    sound,
    gamewords,
    statistics,
    match,
    wordsList,
}) {
    const REFRESH = 2000;
    const answerInnerRef = useRef();
    const wordsOuterRef = useRef();

    const [isStart, setIsStart] = useState(false);
    const [isFalling, setIsFalling] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [answer, setAnswer] = useState('');
    const [inGameWords, setInGameWords] = useState([]);

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

    const updateWords = useCallback(() => {
        const isNewWords = match ? gamewords : wordsList;
        const fourWords = takeWords(isNewWords);
        setInGameWords(fourWords);
        const [answerWord] = takeWords(fourWords);
        setAnswer(answerWord?.word);
    }, [inGameWords, answer]);

    const updateLifeCounter = useCallback(() => {
        setCounter(counter + 1);
        setLostLife(counter);
    }, [counter]);

    useEffect(() => {
        setIsFalling(true);
        updateWords();
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
                    checkWordHandle(wordEl, true);
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
                    const answerIdx = findAnswerIdx(inGameWords, answer);
                    setCorrect(answerIdx + 1);
                    statistics.current.words.push({ ...inGameWords[answerIdx], correct: false });
                    statistics.current.longestSeries = 0;

                    setTimeout(() => {
                        animateOff();
                        setCorrect(0);
                        updateWords();
                        updateLifeCounter();

                        const word = inGameWords[answerIdx];
                        onAddWordToDictionary(word.id, word, false, statistics);

                        onFinish(counter === GAMES.lifes || inGameWords.length < game.minWords );
                    }, REFRESH);
                }
            }
            current.addEventListener('transitionend', answerInnerTransitionEnd, false);
            return () => current.removeEventListener('transitionend', answerInnerTransitionEnd);
        }
    }, [
        answerInnerRef,
        isFalling,
        animateOn,
        inGameWords,
        answer,
        correct,
        animateOff,
        updateWords,
        updateLifeCounter,
    ]);

    function checkWordHandle(el, isPress = false) {
        let wordIdx;
        animateOn();

        if (disabled) {
            return;
        }

        setTimeout(() => {
            setDisabled(false);
            animateOff();
            updateWords();
            setCorrect(0);
            setWrong(0);
        }, REFRESH);

        // Condition for click or keypress
        if (isPress) {
            [wordIdx] = el.children;
        } else {
            [wordIdx] = el.currentTarget.children;
        }

        const checkWord = inGameWords[wordIdx.innerText].word;
        const word = inGameWords[wordIdx.innerText];

        const isCorrectClick = checkWord === answer;

        if(isCorrectClick) {
            statistics.current.longestSeries += 1;
        } else {
            statistics.current.longestSeries = 0;
        }

        onAddWordToDictionary(word.id, word, isCorrectClick, statistics.current);

        if (isCorrectClick) {
            setCorrect(parseFloat(wordIdx.innerText) + 1);
            statistics.current.words.push({ ...inGameWords[wordIdx.innerText], correct: true });
            if (sound) {
                new Audio(success).play();
            }
        } else {
            setCorrect(findAnswerIdx(inGameWords, answer) + 1);
            setWrong(parseFloat(wordIdx.innerText) + 1);
            updateLifeCounter();
            onFinish(counter === GAMES.lifes || inGameWords.length < game.minWords);
            statistics.current.words.push({ ...inGameWords[wordIdx.innerText], correct: false });

            if (sound) {
                new Audio(failed).play();
            }
        }
        setDisabled(true);
    }

    return (
        <ChooseWordsWrapper>
            <AnswerQuestionInner ref={answerInnerRef} $start={isStart} $falling={isFalling}>
                <AnswerWord>{answer}</AnswerWord>
            </AnswerQuestionInner>
            <Zoom in={true}>
                <WordsOuter ref={wordsOuterRef}>
                    {inGameWords.map((item, i) => (
                        <WordsInner
                            correct={correct}
                            wrong={wrong}
                            onClick={(e) => checkWordHandle(e)}
                            key={item.id}
                        >
                            {item.wordTranslate}
                            <WordsNumber component="span">{i}</WordsNumber>
                        </WordsInner>
                    ))}
                </WordsOuter>
            </Zoom>
        </ChooseWordsWrapper>
    );
}

ChooseWords.propTypes = {
    onFinish: PropTypes.func.isRequired,
    setLostLife: PropTypes.func.isRequired,
    onAddWordToDictionary: PropTypes.func.isRequired,
    sound: PropTypes.bool,
    gamewords: PropTypes.array,
    statistics: PropTypes.object,
    match: PropTypes.object,
    wordsList: PropTypes.array,
};

export default ChooseWords;
