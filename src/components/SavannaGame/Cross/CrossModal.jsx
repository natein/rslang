import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux';
import { Fade, Backdrop, Modal, Box, Typography, Button } from '@material-ui/core';
import { closeCrossModal } from '../../../actions/gameActions';
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { GAMES } from '../../../constants/index';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const breakpoints = createMuiTheme({});

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
    padding: 36px 15px;
    &:focus {
        outline: none;
    }
`;

const ModalTitle = styled(Typography)`
    font-size: 18px;
    font-weight: 700;
    line-height: 1.22;
    color: #37383c;
`;

const ModalDescription = styled(Typography)`
    font-size: 16px;
    line-height: 1.25;
    margin: 24px 0;
    color: #7e919f;
    text-align: center;
`;
const ModalBtn = styled(Button)`
    margin: 0 15px;
`;

const ModalButtonsInner = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function CrossModal({ open, CrossModalClose = (f) => f }) {
    const history = useHistory();

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
                                <ModalTitle component="span">{GAMES.closeModal.title}</ModalTitle>

                                {/* DESCRIPTION */}
                                <ModalDescription>{GAMES.closeModal.description}</ModalDescription>

                                <ModalButtonsInner>
                                    {/* CANCEL BTN */}
                                    <ModalBtn variant="outlined" onClick={() => CrossModalClose()} color="secondary">
                                        {GAMES.closeModal.cancelBtn}
                                    </ModalBtn>

                                    {/* CLOSE BTN */}
                                    <ModalBtn variant="outlined" onClick={() => history.push('/')} color="primary">
                                        {GAMES.closeModal.closeBtn}
                                    </ModalBtn>
                                </ModalButtonsInner>
                            </ModalInner>
                        </Fade>
                    </ModalOuter>
                </>
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

CrossModal.propTypes = {
    open: PropTypes.bool,
    CrossModalClose: PropTypes.func.isRequired,
};

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
