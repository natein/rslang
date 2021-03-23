
import { Button, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginPage = ({ user, error, onLogin }) => {
    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    useEffect(() => {
        if (user?.username) {
            history.push('/');
        }
    }, [user, history]);

    const onInputChange = (e) => {
        if (e.target.id === 'username') {
            setUserName(e.target.value);
        } else if (e.target.id === 'password') {
            setPassword(e.target.value);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    {t('labels.user.loginTitle')}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label={t('labels.user.username')}
                        autoFocus
                        value={username}
                        onChange={onInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label={t('labels.user.password')}
                        type="password"
                        id="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {t('labels.user.loginButton')}
                    </Button>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            history.push('/sign-up');
                        }}
                    >
                        {t('labels.user.signUp')}
                    </Link>
                    {error && <Alert severity="error">{error}</Alert>}
                </form>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    error: state.error,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => dispatch(userActions.onLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);