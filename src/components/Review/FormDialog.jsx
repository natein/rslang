import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { onSetReview } from '../../actions/commonActions';

const useStyles = makeStyles(() => ({
    button: {
        color: '#0D7E94',
        minWidth: 150,
        margin: '1rem',
        boxShadow: '0px 2px 0px #0D7E94',
        border: '1px double #0D7E94',
        borderRadius: '15px 15px 15px 15px',
        fontFamily: 'Segoe script, cursive',
        '&:focus': {
            boxShadow: '0px 2px 0px #0D7E94',
        },
        '&:hover': {
            color: '#0D7E94',
            border: '1px double #0D7E94',
            boxShadow: '0 5px 5px #0D7E94',
        },
    },
}));

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'dimgray',
        },
    },
})(TextField);

function FormDialog({ setReview, user }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue('');
    };

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    const handleLog = () => {
        setReview({
            review: value,
            date: new Date().toLocaleDateString(),
            name: user.name,
            avatar: user.avatar,
        });
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.button}>
                Оставить свой
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Написать отзыв</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните поле и оставьте отзыв, чтобы каждый смог его увидеть.
                    </DialogContentText>
                    <CssTextField
                        autoFocus
                        fullWidth
                        multiline
                        margin="dense"
                        id="name"
                        label="Пару слов..."
                        type="text"
                        value={value}
                        onChange={handleChangeValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" className={classes.button}>
                        Отмена
                    </Button>
                    <Button onClick={handleLog} color="primary" className={classes.button}>
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    review: state.common.review,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
    setReview: (review) => dispatch(onSetReview(review)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);
