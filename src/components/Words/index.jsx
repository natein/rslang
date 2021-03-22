
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';
import BarChartIcon from '@material-ui/icons/BarChart';
import FolderIcon from '@material-ui/icons/Folder';
import { SECTIONS_EBOOK } from '../../constants';

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
  }
}));

function Words({ wordsList, page, group }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        {wordsList.map((word) => (
          <Grid key={word.id} item xs={12} sm={12} md={12}>
            <Card className={`${classes.root}`} variant="outlined">
              <CardMedia
                className={classes.cover}
                image={`${baseUrl}/${word.image}`}
              />

              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5" className={classes.word}>
                    <Tooltip title={`${SECTIONS_EBOOK[group - 1].name}`}>
                      <FolderIcon className={classes.sectionIcon} style={{ color: `${SECTIONS_EBOOK[group - 1].backgroundBtn}` }} />
                    </Tooltip>
                    {word.word} - {word.transcription}
                    <VolumeUpIcon color="primary" className={classes.volume} />
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
              </div>
              <div className={classes.buttons}>
                <Tooltip title="Добавить в сложные">
                  <IconButton color="default" component="span">
                    <SchoolIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Удалить слово">
                  <IconButton color="default" component="span">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Статистика по слову">
                  <IconButton color="default" component="span">
                    <BarChartIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary">Next</Button>
    </div>
  );
}

export default Words;
