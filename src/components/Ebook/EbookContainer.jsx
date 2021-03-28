import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loadWords } from '../../actions/ebookActions';
import { createUserWord } from '../../actions/userWordsActions';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import WordsPanel from '../WordsPanel';
import * as gameActions from '../../actions/gameActions';

function EbookContainer({ loader, wordsList, loadWords, page, group, user, createUserWord, userWords, setWordsForGame }) {
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeGroupPage = useCallback((groupNext, pageNext) => history.push(`/ebook/${groupNext}/${pageNext}`), [group]);

  const audio = useRef(new Audio());

  useEffect(() => {
    loadWords(group, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, page]);

  const addUserWord = (wordId, type) => {
    createUserWord(user.userId, wordId, { "difficulty": type }, user.token)
  }

  const onGame = (id) => {
    setWordsForGame(wordsList)
    history.push(`/games/${id}`);
  }

  return (
    <>
      {loader && <LoadingPage />}
      {<WordsPanel group={group} page={page} routeGroupPage={routeGroupPage} onGame={onGame}/>}
      {!loader && <Words wordsList={wordsList} page={page} group={group} audio={audio} addUserWord={addUserWord} userWords={userWords} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    wordsList: state.ebook.wordsList,
    loader: state.ebook.loader,
    user: state.user,
    userWords: state.userWords.word
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWords: (page, group) => dispatch(loadWords(page, group)),
    createUserWord: (userId, wordId, word, token) => dispatch(createUserWord(userId, wordId, word, token)),
    setWordsForGame: (wordList) => dispatch(gameActions.onWordsLoaded(wordList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EbookContainer);
