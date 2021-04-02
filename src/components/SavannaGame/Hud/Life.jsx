import React from 'react';
import styled from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core/';
import { GAMES } from '../../../constants/index';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const breakpoints = createMuiTheme({});

const LifeWrapper = styled(Box)`
    position: absolute;
    right: 75px;
    top: 26px;
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

    ${({ lost }) =>
        lost &&
        `
        opacity: .3;
  `}
`;

function Life({ lifes = [] }) {
    return (
        <LifeWrapper>
            {lifes.map((_, i) => (
                <Heart lost={lifes[i]} key={i} />
            ))}
            <Heart />
        </LifeWrapper>
    );
}

Life.propTypes = {
    lifes: PropTypes.array,
};

const mapStateToProps = (state) => {
    return {
        lifes: state.game.savanna.lifes,
    };
};

export default connect(mapStateToProps)(Life);
