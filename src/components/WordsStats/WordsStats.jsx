import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

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

function WordsStats({ word }) {
  const classes = useStyles();
  const [openModalStats, setOpenModalStats] = useState(false);
  const [modalData, setModalData] = useState('');

  const handleOpenStats = (word) => {
    setOpenModalStats(true);
    setModalData(
      <>
        <h2>Статистика по слову: <span className={classes.word}>{word.word}</span></h2>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Мини-игра</TableCell>
                <TableCell align="center">Правильно</TableCell>
                <TableCell align="center">Неправильно</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                GAMES.list.map(item =>
                  <TableRow key={item.code}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">{word.userWord.optional[item.code]?.right ?? 0}</TableCell>
                    <TableCell align="center">{word.userWord.optional[item.code]?.wrong ?? 0}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const handleCloseStats = () => {
    setOpenModalStats(false);
  };

  return (
    <>
      <Tooltip title="Статистика по слову">
        <IconButton color="default" className={classes.iconStatButton} component="span" onClick={() => handleOpenStats(word)}>
          <BarChartIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={openModalStats}
        onClose={handleCloseStats}
      >
        <div className={classes.modalStats}>
          <CloseIcon className={classes.close} onClick={handleCloseStats} />
          {modalData}
        </div>
      </Modal>
    </>
  );
}

export default WordsStats;
