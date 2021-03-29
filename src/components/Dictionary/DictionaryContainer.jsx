import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loadWords, createUserWord, updateUserWord, loadUserWordAgregate } from '../../actions/ebookActions';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import Snackbar from '@material-ui/core/Snackbar';
import DictionaryGroupMenu from '../WordsPanel/DictionaryGroupMenu';
import EbookPageMenu from '../WordsPanel/EbookPageMenu';
import GameMenu from '../WordsPanel/GameMenu';
import Settings from '../WordsPanel/Settings';

function DictionaryContainer(props) {
  const {
    loader,
    loadWords,
    page,
    group,
    user,
    createUserWord,
    updateUserWord,
    error,
    loadUserWordAgregate,
    type
  } = props;

  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeTypePage = useCallback((typeNext, pageNext) => history.push(`/dictionary/${typeNext}/${pageNext}`), [type]);

  const audio = useRef(new Audio());

  useEffect(() => {
    console.log('type', type);
    loadUserWordAgregate(user.userId, user.token, group, page, false, false, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, page]);

  const onChangeDifficulty = (word, type) => {
    if (word?.userWord) {
      updateUserWord(user.userId, word._id, { difficulty: type }, user.token);
    } else {
      createUserWord(user.userId, word._id, { difficulty: type }, user.token);
    }
  }

  const onDeleteWord = (word) => {
    if (word?.userWord) {
      updateUserWord(user.userId, word._id, { optional: { isDelete: true } }, user.token);
    } else {
      createUserWord(user.userId, word._id, { optional: { isDelete: true } }, user.token);
    }
  }

  return (
    <>
      {loader && <LoadingPage />}
      {<DictionaryGroupMenu {...props} routeTypePage={routeTypePage} />}
      {<GameMenu />}
      {<Settings />}
      {!loader && <Words {...props} onChangeDifficulty={onChangeDifficulty} onDeleteWord={onDeleteWord} audio={audio} dictionary={true} />}

      {error && <Snackbar open={true} message={error} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.common.error,
    wordsList: state.ebook.wordsList,
    loader: state.ebook.loader,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWords: (page, group) => dispatch(loadWords(page, group)),
    createUserWord: (userId, wordId, word, token) => dispatch(createUserWord(userId, wordId, word, token)),
    updateUserWord: (userId, wordId, word, token) => dispatch(updateUserWord(userId, wordId, word, token)),
    loadUserWordAgregate: (userId, token, group, page, isHard, isDelete, type) => dispatch(loadUserWordAgregate(userId, token, group, page, isHard, isDelete, type)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
