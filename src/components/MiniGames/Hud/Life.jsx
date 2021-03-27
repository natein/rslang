import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import PropTypes from 'prop-types';

const breakpoints = createMuiTheme({});

const LifeWrapper = styled(Box)`
    position: absolute;
    right: 60px;
    top: 29px;
    height: 16px;
    display: flex;
    flex-direction: row;
`;
const Heart = styled(Box)`
    display: inline-block;
    vertical-align: top;
    width: 19px;
    height: 16px;
    margin-left: 2px;
    transition: all 0.15s ease;
    background: url(${GAMES.hud.heart}) no-repeat;
`;

function Life({ lost }) {
    const lifes = [...Array(GAMES.lifes)];

    return (
        <LifeWrapper>
            {lifes.map((_, i) => (
                <Heart key={i} />
            ))}
            <Heart />
        </LifeWrapper>
    );
}

Life.propTypes = {};

export default Life;
