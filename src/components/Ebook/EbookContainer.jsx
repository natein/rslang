import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loadWords, createUserWord, updateUserWord, loadUserWordAgregate } from '../../actions/ebookActions';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import Snackbar from '@material-ui/core/Snackbar';
import EbookGroupMenu from '../WordsPanel/EbookGroupMenu';
import EbookPageMenu from '../WordsPanel/EbookPageMenu';
import GameMenu from '../WordsPanel/GameMenu';
import Settings from '../WordsPanel/Settings';

function EbookContainer(props) {
  const {
    loader,
    loadWords,
    page,
    group,
    user,
    createUserWord,
    updateUserWord,
    error,
    loadUserWordAgregate
  } = props;

  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeGroupPage = useCallback((groupNext, pageNext) => history.push(`/ebook/${groupNext}/${pageNext}`), [group]);

  const audio = useRef(new Audio());

  useEffect(() => {
    if (!user.token) loadWords(group, page);
    else loadUserWordAgregate(user.userId, user.token, group, page, false, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, page]);

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
      {<EbookGroupMenu {...props} routeGroupPage={routeGroupPage} />}
      {<EbookPageMenu {...props} routeGroupPage={routeGroupPage} />}
      {<GameMenu />}
      {<Settings />}
      {!loader && <Words {...props} onChangeDifficulty={onChangeDifficulty} onDeleteWord={onDeleteWord} audio={audio} />}

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
    loadUserWordAgregate: (userId, token, group, page, isHard, isDelete) => dispatch(loadUserWordAgregate(userId, token, group, page, isHard, isDelete)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EbookContainer);
