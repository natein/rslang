import { connect } from 'react-redux';
import { setWordPlaying } from '../../actions/wordsActions';
import WordsAudio from './WordsAudio';

function WordsAudioContainer({ wordPlaying, setWordPlaying, className, audio, word }) {
  return <WordsAudio wordPlaying={wordPlaying} setWordPlaying={setWordPlaying} className={className} audio={audio} word={word} />;
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
