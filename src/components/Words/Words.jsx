
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  wordItem: {
    margin: '20px 0',
    padding: '15px'
  },
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
        <Paper className={classes.wordItem} key={word.id}>{word.word}</Paper>
      ))}
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
}

export default Words;
