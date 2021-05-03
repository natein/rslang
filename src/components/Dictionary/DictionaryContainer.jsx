import { useEffect, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { loadUserWordAgregate, deleteUserWord } from '../../actions/ebookActions';
import Box from '@material-ui/core/Box';
import Words from '../Words';
import LoadingPage from '../LoadingPage';
import GameMenu from '../WordsPanel/GameMenu';
import Settings from '../WordsPanel/Settings';
import DictionaryPageMenu from '../WordsPanel/DictionaryPageMenu';
import DictionarySectionMenu from '../WordsPanel/DictionarySectionMenu';
import DictionaryGroupMenu from '../WordsPanel/DictionaryGroupMenu';
import { COUNT_WORDS_ON_PAGE } from '../../constants/index';
import * as gameActions from '../../actions/gameActions';
import WordsStatsPage from '../WordsStats/WordsStatsPage';

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: '20px',
  },
}));

function DictionaryContainer(props) {
  const classes = useStyles();

  const {
    wordsList,
    loader,
    user,
    loadUserWordAgregate,
    deleteUserWord,
    type,
    group,
    page,
    totalCount,
    onGameStart
  } = props;

  const history = useHistory();

  const routeType = useCallback((typeNext) => history.push(`/dictionary?type=${typeNext}`), [history]);
  const routeGroup = useCallback((groupNext) => history.push(`/dictionary?type=${type}&group=${groupNext}`), [history, type]);
  const routePage = useCallback((pageNext) => history.push(`/dictionary?type=${type}&group=${group}&page=${pageNext}`), [history, type, group]);

  const audio = useRef(new Audio());

  useEffect(() => {
    loadUserWordAgregate(user.userId, user.token, group, null, false, false, type);
  }, [type, group, loadUserWordAgregate, user]);

  const onRecoverWord = (word) => {
    deleteUserWord(user.userId, word._id, user.token);
  }

  const countPages = Math.ceil(totalCount / COUNT_WORDS_ON_PAGE);
  const indexOfLastPost = page * COUNT_WORDS_ON_PAGE;
  const indexOfFirstPost = indexOfLastPost - COUNT_WORDS_ON_PAGE;
  const currentPosts = wordsList.slice(indexOfFirstPost, indexOfLastPost);

  const onGame = useCallback((gameId) => {
    onGameStart(wordsList);
    history.push(`/games/${gameId}`);
  }, [history, onGameStart, wordsList]);

  return (
    <>
      {loader && <LoadingPage />}
      <Box className={classes.section}>
        {<DictionarySectionMenu {...props} routeType={routeType} routePage={routePage} />}
      </Box>
      <Box>
        {<DictionaryGroupMenu {...props} group={group} routeGroup={routeGroup} />}
        {<DictionaryPageMenu countPages={countPages} page={page} routePage={routePage} />}
        {<GameMenu onGame={onGame} />}
        {<Settings />}
        {type === 'study' && <WordsStatsPage words={wordsList} />}
        {!loader && <Words {...props} wordsList={currentPosts} audio={audio} dictionary={true} onRecoverWord={onRecoverWord} />}
      </Box>
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
