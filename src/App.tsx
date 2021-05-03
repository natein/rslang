import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from './actions/userActions';
import { useEffect } from 'react';

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

const App: React.FC<{onUserTokenUpdate: () => void }> = ({ onUserTokenUpdate }) => {
    const classes = useStyles();
    const location = useLocation();

  const match = useRouteMatch({
    path: '/games/:code',
    strict: true,
    sensitive: true,
  });

    useEffect(() => {
        onUserTokenUpdate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <Box component="div" className={classes.rootContainer}>
            <Dashboard />
            {!match && <Footer />}
        </Box>
    );
}

const mapDispatchToProps = (dispatch: any) => ({
    onUserTokenUpdate: () => dispatch(userActions.updateToken()),
});

export default connect(null, mapDispatchToProps)(App);
