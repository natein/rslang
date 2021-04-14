import { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import BarChartIcon from '@material-ui/icons/BarChart';
import CloseIcon from '@material-ui/icons/Close';

import { GAMES } from '../../constants';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 10px 10px 0',
  },
  modalStats: {
    position: 'absolute',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    border: 'initial',
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  close: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
  },
  menuItemSectionIcon: {
    marginRight: theme.spacing(1)
  },
  pageButton: {
    background: '#b0bec5'
  },
  optionSettings: {
    marginBottom: '20px'
  },
  word: {
    color: '#388e3c'
  }
}));

function WordsStatsPage({ words }) {
  const classes = useStyles();
  const [openModalStats, setOpenModalStats] = useState(false);

  const handleOpenStats = () => {
    setOpenModalStats(true);
  };

  const handleCloseStats = () => {
    setOpenModalStats(false);
  };

  let right = 0;
  let wrong = 0;
  let learn = 0;

  words.forEach(word => {
    if (word?.userWord?.optional?.game) {
      learn += 1;
      GAMES.list.forEach(game => {
        if (word.userWord.optional[game.code]) {
          right += word.userWord.optional[game.code].right;
          wrong += word.userWord.optional[game.code].wrong;
        }
      });
    }
  });

  return (
    <>
      <ButtonGroup>
        <Button
          color="default"
          variant="contained"
          className={classes.button}
          startIcon={<BarChartIcon />}
          onClick={() => handleOpenStats()}
        >
          Результаты
        </Button>
      </ButtonGroup>
      <Modal
        open={openModalStats}
        onClose={handleCloseStats}
      >
        <div className={classes.modalStats}>
          <CloseIcon className={classes.close} onClick={handleCloseStats} />
          <h2>Результаты изучения слов</h2>
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>{`Слов на изучении`}</TableCell>
                  <TableCell>{learn}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{`Правильных ответов`}</TableCell>
                  <TableCell>{right}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{`Неправильных ответов`}</TableCell>
                  <TableCell>{wrong}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
    </>
  );
}

WordsStatsPage.propTypes = {
  words: PropTypes.array
};

export default WordsStatsPage;
