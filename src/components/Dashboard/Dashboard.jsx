import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import HomePage from '../HomePage/HomePage';
import EbookPage from '../../pages/EbookPage';
import TransitionsModal from './UserIcon';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../LoginPage/SingupPage';
import AboutTeam from '../AboutTeam';
import SprintPage from '../../pages/SprintPage';
import GamesPage from '../../pages/GamesPage';
import AudioCallPage from '../../pages/AudioCallPage';
import SavannaPage from '../../pages/SavannaPage';
import ReviewPage from '../Review';
import StatisticsPage from '../../pages/StatisticsPage';
import DictionaryPage from '../../pages/DictionaryPage';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        justifyContent: 'space-between',
        backgroundColor: 'tomato',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    titleLink: {
        color: 'White',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: '900',
    },
    appBarSpacer: theme.mixins.toolbar,
    main: {
        marginTop: `max(${theme.mixins.toolbar.minHeight}px, 64px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box style={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        <Link className={classes.titleLink} to="/">
                            RSLang
                        </Link>
                    </Typography>
                    <TransitionsModal />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
                style={{
                    margin: '4rem auto 0',
                    width: '100%',
                }}
                className={classes.main}
            >
                <Container maxWidth="lg" style={{ minHeight: '100%', padding: '1rem' }}>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/ebook" component={EbookPage} exact />
                        <Route path="/ebook/:group/:page" component={EbookPage} />
                        <Route path="/dictionary" component={DictionaryPage} exact />
                        <Route path="/dictionary/:type" component={DictionaryPage} />
                        <Route path="/games" component={GamesPage} exact />
                        <Route path="/statistics" component={StatisticsPage} />
                        <Route path="/about" component={AboutTeam} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/sign-up" component={SignupPage} />
                        <Route path="/review" component={ReviewPage} />
                        <Route path="/games/sprint" component={SprintPage} />
                        <Route path="/games/audio" component={AudioCallPage} />
                        <Route path="/games/savanna" component={SavannaPage} />
                    </Switch>
                </Container>
            </Box>
        </Box>
    );
}

export default Dashboard;
