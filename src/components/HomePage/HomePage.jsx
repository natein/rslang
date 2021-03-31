import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from './Button';
import ModalInfo from './ModalAbout';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import backgroundImage from '../../assets/main_bg.jpg';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
    },
    button: {
        color: 'white',
        minWidth: 150,
        margin: '1rem',
        boxShadow: '0px 2px 0px white',
        border: '1px double white',
        borderRadius: '15px 15px 15px 15px',
        fontFamily: 'Segoe script, cursive',
        '&:focus': {
            boxShadow: '0 0 5px #FFF, 0 0 10px #FFF, 0 0 15px #FFF, 2px 2px 2px rgba(206,179,173,0)',
        },
        '&:hover': {
            color: 'white',
            border: '1px double white',
            boxShadow: '0 5px 5px white',
        },
    },
    h5: {
        fontFamily: 'Segoe script, cursive',
        textShadow: '2px 2px 3px #aba8a8',
    },
    more: {
        fontFamily: 'Segoe script, cursive',
        textShadow: '0 0 10px #FFFFFF',
        marginTop: theme.spacing(2),
    },
    buttonCont: {
        padding: theme.spacing(2),
        paddingTop: '5rem',
    },
    title: {
        fontSize: '5rem',
        fontFamily: 'Segoe script, cursive',
        position: 'relative',
        textShadow: '1px 3px 0 #969696, 2px 7px 5px #aba8a8',
        marginBottom: theme.spacing(10),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function HomePage() {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onRegisterClick = () => {
        history.push('/sign-up');
    };

    return (
        <ProductHeroLayout backgroundClassName={classes.background}>
            {/* Increase the network loading priority of the background image. */}
            <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
            <Typography color="inherit" align="center" variant="h2" marked="center" className={classes.title}>
                RSLang
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Используй быстрый и эффективный способ изучения английского языка.
            </Typography>
            <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
                Все самые лучшие методики в одном месте.
            </Typography>
            <div className={classes.buttonCont}>
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    component="a"
                    onClick={onRegisterClick}
                >
                    Регистрация
                </Button>
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    className={classes.button}
                    component="a"
                    onClick={handleOpen}
                    // href="/premium-themes/onepirate/sign-up/"
                >
                    O проекте
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <ModalInfo />
                        </div>
                    </Fade>
                </Modal>
            </div>
            <Typography variant="body2" color="inherit" className={classes.more}>
                Открывайтесь новому!
            </Typography>
        </ProductHeroLayout>
    );
}

export default HomePage;
