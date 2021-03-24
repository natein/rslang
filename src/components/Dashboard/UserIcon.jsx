import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';

const useStyles = makeStyles(() => ({
    loginBtn: {
        marginLeft: '10px',
        color: 'white',
    },
    avatar: {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
    },
}));

const Avatar = ({ src }) => {
    const classes = useStyles();
    return <img src={src} alt="avatar" className={classes.avatar} />;
};

function UserIcon({ user, onLogout }) {
    const classes = useStyles();
    const history = useHistory();

    const onClick = () => {
        if (user) {
            onLogout();
        } else {
            history.push('/login');
        }
    };

    return (
        <>
            <IconButton className={classes.loginBtn} onClick={onClick}>
                {!user && <AccountCircleIcon />}
                {user && !user.avatar && <ExitToAppIcon />}
                {user && user.avatar && <Avatar src={user.avatar} />}
            </IconButton>
        </>
    );
}

UserIcon.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.common.user,
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(userActions.onLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserIcon);
