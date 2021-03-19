import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadWords, setPage, setGroup } from '../../actions/wordsActions';
import Words from './Words';
import LoadingPage from '../LoadingPage';

function WordsContainer({ loader, wordsList, loadWords, setPage, setGroup, page, group }) {

  useEffect(() => {
    loadWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, group]);

  return (
    <>
      {loader && <LoadingPage />}
      {!loader && <Words wordsList={wordsList} setPage={setPage} setGroup={setGroup} page={page} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    wordsList: state.words.wordsList,
    page: state.words.page,
    group: state.words.group,
    loader: state.words.loader
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWords: () => dispatch(loadWords()),
    setPage: (page) => dispatch(setPage(page)),
    setGroup: (group) => dispatch(setGroup(group)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsContainer);
