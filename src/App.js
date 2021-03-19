import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EbookPage from './pages/EbookPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/ebook" component={EbookPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
