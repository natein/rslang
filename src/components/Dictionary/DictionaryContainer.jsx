import { useEffect, useCallback, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { loadUserWordAgregate, deleteUserWord } from '../../actions/ebookActions';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import DictionaryGroupMenu from '../WordsPanel/DictionaryGroupMenu';
import GameMenu from '../WordsPanel/GameMenu';
import Settings from '../WordsPanel/Settings';
import DictionaryPageMenu from '../WordsPanel/DictionaryPageMenu';
import { COUNT_WORDS_ON_PAGE } from '../../constants';
import * as gameActions from '../../actions/gameActions';

function DictionaryContainer(props) {
  const {
    wordsList,
    loader,
    user,
    loadUserWordAgregate,
    deleteUserWord,
    type,
    totalCount,
    onGameStart
  } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routeTypePage = useCallback((typeNext) => history.push(`/dictionary/${typeNext}`), [type]);

  const audio = useRef(new Audio());

  useEffect(() => {
    loadUserWordAgregate(user.userId, user.token, null, null, false, false, type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const onRecoverWord = (word) => {
    deleteUserWord(user.userId, word._id, user.token);
  }

  const countPages = Math.ceil(totalCount / COUNT_WORDS_ON_PAGE);
  const indexOfLastPost = currentPage * COUNT_WORDS_ON_PAGE;
  const indexOfFirstPost = indexOfLastPost - COUNT_WORDS_ON_PAGE;
  const currentPosts = wordsList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const onGame = useCallback((gameId) => {
    onGameStart(wordsList);
    history.push(`/games/${gameId}`);
  }, [history, onGameStart, wordsList]);

  return (
    <>
      {loader && <LoadingPage />}
      {<DictionaryGroupMenu {...props} routeTypePage={routeTypePage} setCurrentPage={setCurrentPage} />}
      {<DictionaryPageMenu countPages={countPages} currentPage={currentPage} paginate={paginate} />}
      {<GameMenu onGame={onGame}/>}
      {<Settings />}
      {!loader && <Words {...props} wordsList={currentPosts} audio={audio} dictionary={true} onRecoverWord={onRecoverWord} />}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    error: state.common.error,
    wordsList: state.ebook.wordsList,
    totalCount: state.ebook.totalCount,
    loader: state.ebook.loader,
    settings: state.ebook.settings,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserWordAgregate: (userId, token, group, page, isHard, isDelete, type) => dispatch(loadUserWordAgregate(userId, token, group, page, isHard, isDelete, type)),
    deleteUserWord: (userId, wordId, token) => dispatch(deleteUserWord(userId, wordId, token)),
    onGameStart: (wordList) => dispatch(gameActions.onWordsLoaded(wordList))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryContainer);
