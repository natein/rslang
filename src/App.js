import { Box, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { useRouteMatch } from 'react-router-dom';
import Savanna from './components/Savanna'
import { Route, Switch } from 'react-router-dom';

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

  const match = useRouteMatch({
    path: '/games/:code',
    strict: true,
    sensitive: true,
  });

  return (
    <Box component="div" className={classes.rootContainer}>

      <Switch>
        <Route path="/games/savanna" component={Savanna} />
      </Switch>

      {!match && <Dashboard />}
      {!match && <Footer />}
    </Box>
  );
}

export default App;
