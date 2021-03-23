import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

function WordsAudio({ audio, word, className, wordPlaying, setWordPlaying }) {
  const baseUrl = process.env.REACT_APP_API || '';

  const playAudio = (audio, word) => {
    setWordPlaying(word.id);
    const audioList = [
      `${baseUrl}/${word.audio}`,
      `${baseUrl}/${word.audioMeaning}`,
      `${baseUrl}/${word.audioExample}`
    ];

    //audio.current.pause();
    audio.current.src = audioList[0];
    audio.current.play();

    let index = 1;
    audio.current.onended = function () {
      if (index < audioList.length) {
        audio.current.src = audioList[index];
        audio.current.play();
        index++;
      }
    }
  }

  const pauseAudio = (audio) => {
    audio.current.pause();
    setWordPlaying(null);
  }

  if (wordPlaying !== word.id) {
    return <PlayCircleOutlineIcon color="primary" className={className} onClick={() => playAudio(audio, word)} />;
  }
  return <PauseCircleOutlineIcon color="primary" className={className} onClick={() => pauseAudio(audio)} />;
}

export default WordsAudio;
