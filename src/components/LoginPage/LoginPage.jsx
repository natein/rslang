import { Button, Container, Link, makeStyles, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import * as userActions from '../../actions/userActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import LoaderPage from '../LoadingPage';

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
    button: {
        margin: theme.spacing(3, 0, 2),
        color: 'white',
        minWidth: 150,
        fontWeight: 900,
        boxShadow: '0px 2px 0px white',
        border: '1px double white',
        borderRadius: '10px',
        fontFamily: 'Gilroy, Arial, sans-serif',
        '&:focus': {
            boxShadow: '0px 2px 0px white',
        },
        '&:hover': {
            color: 'white',
            border: '1px double white',
            boxShadow: '0 3px 3px white',
        },
    },
}));

const LoginPage = ({ user, error, onLogin, loader }) => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    useEffect(() => {
        if (user?.token) {
            history.goBack();
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
                <Typography component="h1" variant="h5" style={{ color: 'white' }}>
                    Вход в аккаунт
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        fullWidth
                        id="username"
                        label="пользовательский email"
                        autoFocus
                        value={username}
                        onChange={onInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        color="secondary"
                        required
                        fullWidth
                        label="пароль"
                        type="password"
                        id="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.button}
                        fullWidth
                        type="submit"
                    >
                        Войти
                    </Button>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            history.push('/sign-up');
                        }}
                    >
                        Страница регистрации
                    </Link>
                    {error && <Alert severity="error">{error}</Alert>}
                </form>
            </div>
            {!!loader && <LoaderPage />}
        </Container>
    );
};

const mapStateToProps = (state) => ({
    error: state.common.error,
    user: state.user,
    loader: state.ebook.loader,
});

const mapDispatchToProps = (dispatch) => ({
    onLogin: (username, password) => dispatch(userActions.onLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
