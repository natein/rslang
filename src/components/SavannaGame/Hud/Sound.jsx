import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import PropTypes from 'prop-types';

const breakpoints = createMuiTheme({});

const SoundWrapper = styled(Box)`
    position: absolute;
    left: 27px;
    top: 27px;
    z-index: 9999;
`;
const SoundInner = styled(Box)`
    width: 23px;
    height: 24px;
    background-image: url(${GAMES.hud.sound});
    ${({ disabled }) =>
        disabled &&
        `
        width: 24px;
        background-image: url(${GAMES.hud.disableSound});
  `}
    background-position: 0;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    position: relative;
`;

function Sound({ setSound = (f) => f }) {
    const [isMuted, setIsMuted] = useState(false);

    function SoundDisableHandle() {
        setIsMuted(!isMuted);
        setSound();
    }

    return (
        <SoundWrapper>
            <SoundInner disabled={isMuted} onClick={() => SoundDisableHandle()} />
        </SoundWrapper>
    );
}

Sound.propTypes = {};

export default Sound;
