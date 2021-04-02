import React, { useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styled, { ThemeProvider } from 'styled-components';
import { Box } from '@material-ui/core/';
import { TrainOutlined } from '@material-ui/icons';

const TimerWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
`;

const TimeWrapper = styled(Box)`
    position: relative;
    width: 80px;
    height: 60px;
    font-size: 48px;
`;

const Time = styled(Box)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(0);
    opacity: 1;
    transition: all 0.2s;

    ${({ up }) =>
        up &&
        `
    opacity: 0;
    transform: translateY(-100%);
  `}
    ${({ down }) =>
        down &&
        `
    opacity: 0;
    transform: translateY(-100%);
  `}
`;

const RenderTime = ({ remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    if (currentTime.current !== remainingTime) {
        isNewTimeFirstTick.current = TrainOutlined;
        prevTime.current = currentTime.current;
        currentTime.current = remainingTime;
    } else {
        isNewTimeFirstTick.current = false;
    }

    if (remainingTime === 0) {
        setTimeout(() => {
            setOneLastRerender((val) => val + 1);
        }, 20);
    }

    const isTimeUp = isNewTimeFirstTick.current;

    return (
        <TimeWrapper>
            <Time key={remainingTime} up={isTimeUp ? 'true' : null}>
                {remainingTime}
            </Time>
            {prevTime.current !== null && (
                <Time key={prevTime.current} down={!isTimeUp ? 'true' : null}>
                    {prevTime.current}
                </Time>
            )}
        </TimeWrapper>
    );
};

function Timer() {
    return (
        <TimerWrapper>
            <CountdownCircleTimer isPlaying duration={3} colors={[['#FFF', 0.33], ['#FFF', 0.33], ['#FFF']]}>
                {RenderTime}
            </CountdownCircleTimer>
        </TimerWrapper>
    );
}

Timer.propTypes = {};

export default Timer;
