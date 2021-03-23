import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loadWords } from '../../actions/ebookActions';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import WordsPanel from '../WordsPanel';

function EbookContainer({ loader, wordsList, loadWords, page, group }) {
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeGroupPage = useCallback((groupNext, pageNext) => history.push(`/ebook/${groupNext}/${pageNext}`), [group]);

  const audio = useRef(new Audio());

  useEffect(() => {
    loadWords(group, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, page]);

  return (
    <>
      {loader && <LoadingPage />}
      {<WordsPanel group={group} routeGroupPage={routeGroupPage} />}
      {!loader && <Words wordsList={wordsList} page={page} group={group} audio={audio} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    wordsList: state.ebook.wordsList,
    loader: state.ebook.loader
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWords: (page, group) => dispatch(loadWords(page, group)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EbookContainer);
