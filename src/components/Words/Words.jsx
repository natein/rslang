
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';

const baseUrl = process.env.REACT_APP_API || '';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '20px 0',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 251,
  },
  buttons: {
    textAlign: 'right',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(1, 0)
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
  }
}));

function Words({ wordsList, setPage, setGroup, page }) {
  const classes = useStyles();
  console.log(page);

  const groupsBtn = [];
  for (let i = 0; i < 6; i++) {
    groupsBtn.push(
      <Button key={i} onClick={() => setGroup(i)}>Группа {i + 1}</Button>
    );
  }

  return (
    <div>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {groupsBtn.map(group => group)}
      </ButtonGroup>

      {wordsList.map((word) => (
        <Card key={word.id} className={classes.root} variant="outlined">
          <CardMedia
            className={classes.cover}
            image={`${baseUrl}/${word.image}`}
            title="Live from space album cover"
          />

          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5" className={classes.word}>
                {word.word} - {word.transcription} <VolumeUpIcon color="primary" className={classes.volume} />
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {word.wordTranslate}
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                <div dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
              </Typography>
              <Typography variant="subtitle1" className={classes.textTranslate}>
                {word.textMeaningTranslate}
              </Typography>
              <Typography variant="subtitle1" className={classes.text}>
                <div dangerouslySetInnerHTML={{ __html: word.textExample }} />
              </Typography>
              <Typography variant="subtitle1" className={classes.textTranslate}>
                {word.textExampleTranslate}
              </Typography>
            </CardContent>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SchoolIcon />}
              >
                Сложно
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
            </div>
          </div>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>Next</Button>
    </div>
  );
}

export default Words;
