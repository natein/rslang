import { Container, Box, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const NotFoundWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-top: 40px;
    align-items: center;
`;
const BtnWrapper = styled(Box)`
    display: flex;
    max-width: 150px;
`;

function NotFound({ error }) {
    const history = useHistory();

    return (
        <NotFoundWrapper>
            <ErrorOutlineIcon color='secondary' fontSize='large'/>
            <Container component="h1">Что-то пошло не так. Проверьте url запроса</Container>
            <Container component="span" color='secondary'>
                {error}
            </Container>
            <BtnWrapper>
                <Button onClick={() => history.push('/')} variant="outlined" color="secondary">
                    На главную
                </Button>
            </BtnWrapper>
        </NotFoundWrapper>
    );
}

NotFound.propTypes = {
    error: PropTypes.string,
};

NotFound.defaultProps = {
    error: null,
};

const mapStateToProps = (state) => ({
    error: state.common.error,
});

export default connect(mapStateToProps)(NotFound);
