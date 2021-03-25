import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Fade, Backdrop, Modal, Box, Typography } from '@material-ui/core';
import { closeCrossModal } from '../../../actions/gamesActions';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

const ModalOuter = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalInner = styled(Box)`
    width: 398px;
    border-radius: 8px;
    box-shadow: 1px 0 2px 0 rgb(0 0 0 / 16%);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 0 22px;
`;
const ModalTitle = styled(Typography)`
    ${({ theme }) => `
  color: white;

  ${theme.breakpoints.down('xs')} {
    font-size: 2rem;
  }
  `}
`;

function CrossModal({ open, CrossModalClose }) {
    return (
        <MuiThemeProvider theme={breakpoints}>
            <ThemeProvider theme={breakpoints}>
                <>
                    <ModalOuter
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={CrossModalClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <ModalInner>
                                {/* TITLE */}

                                <ModalTitle variant="h2" component="h1"></ModalTitle>

                                {/* DESCRIPTION */}
                                {/* CLOSE BTN */}
                                {/* CANCEL BTN */}
                            </ModalInner>
                        </Fade>
                    </ModalOuter>
                </>
            </MuiThemeProvider>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        open: state.games.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        CrossModalClose: () => dispatch(closeCrossModal()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrossModal);
