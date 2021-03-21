import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import EbookPage from './pages/EbookPage';
import Header from './components/Header';

import Container from '@material-ui/core/Container';
import { Box, makeStyles } from '@material-ui/core';
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  mainContent: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
    flexGrow: 1,
    position: 'relative',
  },
  footer: {
    flex: '0 0 auto',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Box component="div" className={classes.rootContainer}>
        <Header />
        <Container component="main" className={classes.mainContent}>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/ebook" component={EbookPage} />
          </Switch>
        </Container>
        <Footer />
      </Box>
    </BrowserRouter >
  );
}

export default App;
