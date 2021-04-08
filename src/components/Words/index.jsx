import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';
import FolderIcon from '@material-ui/icons/Folder';
import PublishIcon from '@material-ui/icons/Publish';
import { SECTIONS_EBOOK } from '../../constants';
import WordsAudio from '../WordsAudio';
import WordsStats from '../WordsStats';

const baseUrl = process.env.REACT_APP_API || '';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '10px 0',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  content: {
    flex: '1 1 auto',
  },
  cover: {
    width: 300,
    minHeight: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  buttons: {
    textAlign: 'right',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  button: {
    margin: theme.spacing(1, 0),
    [theme.breakpoints.down('sm')]: {
      margin: '0 5px'
    },
  },
  textTranslate: {
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  text: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.8)',
    marginTop: theme.spacing(1)
  },
  word: {
    display: 'flex',
    alignItems: 'center'
  },
  volume: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  sectionIcon: {
    marginRight: theme.spacing(1),
    marginLeft: '-3px',
  },
  iconDeleteButton: {
    '&:hover': {
      color: '#e53935'
    }
  },
  iconStatButton: {
    '&:hover': {
      color: '#3949ab'
    }
  },
  iconHardButton: {
    color: '#4caf50'
  },
  iconRecoverButton: {
    color: '#039be5'
  }
}));

function Words({ wordsList, audio, onChangeDifficulty, onDeleteWord, user, dictionary, onRecoverWord, settings }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        {
          wordsList.length === 0
            ? <Typography component="h5" variant="h5" className={classes.word}>Не найдено слов</Typography>
            : wordsList.map(word => (
              <Grid key={word._id} item xs={12} sm={12} md={12}>
                <Card className={`${classes.root}`} variant="outlined">
                  <CardMedia
                    className={classes.cover}
                    image={`${baseUrl}/${word.image}`}
                  />

                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography component="h5" variant="h5" className={classes.word}>
                        <Tooltip title={`${SECTIONS_EBOOK[word.group].name}`}>
                          <FolderIcon className={classes.sectionIcon} style={{ color: `${SECTIONS_EBOOK[word.group].backgroundBtn}` }} />
                        </Tooltip>
                        {word.word} - {word.transcription}
                        <WordsAudio className={classes.volume} audio={audio} word={word} />
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {settings.viewTranslate && word.wordTranslate}
                      </Typography>
                      <Typography variant="subtitle1" className={classes.text}>
                        <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
                      </Typography>
                      <Typography variant="subtitle1" className={classes.textTranslate}>
                        {settings.viewTranslate && word.textMeaningTranslate}
                      </Typography>
                      <Typography variant="subtitle1" className={classes.text}>
                        <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
                      </Typography>
                      <Typography variant="subtitle1" className={classes.textTranslate}>
                        {settings.viewTranslate && word.textExampleTranslate}
                      </Typography>
                    </CardContent>
                  </div>
                  <div className={classes.buttons}>
                    {
                      (user.token && !dictionary) &&
                      <>
                        {
                          word.userWord?.difficulty === 'hard'
                            ?
                            <Tooltip title="Добавлено в словарь 'Сложные слова'">
                              <IconButton disabled component="span">
                                <SchoolIcon className={classes.iconHardButton} />
                              </IconButton>
                            </Tooltip>
                            :
                            settings.viewButton &&
                            <Tooltip title="Добавить в словарь 'Сложные слова'">
                              <IconButton color="default" component="span" onClick={() => onChangeDifficulty(word, 'hard')}>
                                <SchoolIcon />
                              </IconButton>
                            </Tooltip>
                        }
                        {
                          settings.viewButton &&
                          <Tooltip title="Удалить слово">
                            <IconButton color="default" className={classes.iconDeleteButton} component="span" onClick={() => onDeleteWord(word)}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        {word.userWord && <WordsStats word={word} />}
                      </>
                    }
                    {
                      (user.token && dictionary) &&
                      <>
                        {
                          word.userWord?.difficulty === 'hard' &&
                          <Tooltip title="Добавлено в словарь 'Сложные слова'">
                            <IconButton disabled component="span">
                              <SchoolIcon className={classes.iconHardButton} />
                            </IconButton>
                          </Tooltip>
                        }
                        <Tooltip title="Восстановить слово">
                          <IconButton color="default" className={classes.iconRecoverButton} component="span" onClick={() => onRecoverWord(word)}>
                            <PublishIcon />
                          </IconButton>
                        </Tooltip>
                        <WordsStats word={word} />
                      </>
                    }

                  </div>
                </Card>
              </Grid>
            ))
        }
      </Grid>
    </div>
  );
}

export default Words;
