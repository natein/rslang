import { Box, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    footer: {
        flex: '0 0 auto',
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Box component="div" className={classes.rootContainer}>
            <Dashboard />
            <Footer />
        </Box>
    );
}

export default App;
