import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useEffect, useRef, useState } from 'react';
import ImageUpload from './ImageUpload';
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUpPage = ({ user, error, onUserCreate, loader }) => {
    const classes = useStyles();
    const history = useHistory();
    const avatarRef = useRef(null);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const avatar = avatarRef.current !== null ? avatarRef.current[0] : null;
        onUserCreate(username, password, avatar);
    };

    useEffect(() => {
        if (user?.email) {
            history.push('/login');
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
                    Регистрация
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <ImageUpload ref={avatarRef} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        color="secondary"
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
                        required
                        color="secondary"
                        fullWidth
                        label="пароль"
                        type="password"
                        id="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                        Зарегистрироваться
                    </Button>

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
    onUserCreate: (username, password, avatar) => dispatch(userActions.createNewUser(username, password, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);