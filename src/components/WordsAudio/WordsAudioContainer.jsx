import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setWordPlaying } from '../../actions/wordsActions';
import WordsAudio from './WordsAudio';

function WordsAudioContainer({ wordPlaying, setWordPlaying, className, audio, word }) {
  const audioCurrent = audio.current;

  useEffect(() => {
    return () => {
      audioCurrent.pause();
      setWordPlaying(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <WordsAudio wordPlaying={wordPlaying} setWordPlaying={setWordPlaying} className={className} audio={audioCurrent} word={word} />;
}

const mapStateToProps = (state) => {
  return {
    wordPlaying: state.words.wordPlaying,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWordPlaying: (wordId) => dispatch(setWordPlaying(wordId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsAudioContainer);
