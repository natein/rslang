import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import SettingsIcon from '@material-ui/icons/Settings';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { SECTIONS_EBOOK, GAMES, EBOOK_COUNT_PAGES } from '../../constants';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 10px 10px 0',
  },
  modalSettings: {
    position: 'absolute',
    width: 400,
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
  }
}));

function WordsPanel({ group, page, routeGroupPage, onGame }) {
  const classes = useStyles();
  const [anchorSection, setAnchorSection] = useState(null);
  const [anchorGames, setAnchorGames] = useState(null);
  const [anchorPage, setAnchorPage] = useState(null);
  const [openModalSettings, setOpenModalSettings] = useState(false);

  const handleClickSection = (event) => {
    setAnchorSection(event.currentTarget);
  };

  const handleCloseSection = (group) => {
    setAnchorSection(null);
    if (group >= 1) routeGroupPage(group, 1)
  };

  const handleClickPage = (event) => {
    setAnchorPage(event.currentTarget);
  };

  const handleClosePage = (page) => {
    setAnchorPage(null);
    if (page >= 1 && page <= EBOOK_COUNT_PAGES) routeGroupPage(group, page)
  };

  const handleClickGames = (event) => {
    setAnchorGames(event.currentTarget);
  };

  const handleCloseGame = (id) => {
    if(id) {
      onGame(id);
    }       
    setAnchorGames(null);
  };

  const handleOpenSettings = () => {
    setOpenModalSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenModalSettings(false);
  };

  return (
    <>
      <ButtonGroup>
        <Button
          style={{ backgroundColor: `${SECTIONS_EBOOK[group - 1].backgroundBtn}` }}
          startIcon={<FolderOpenIcon />}
          className={classes.button}
          variant="contained"
          color="default"
          aria-controls="section-menu"
          aria-haspopup="true"
          onClick={handleClickSection}>
          {`${SECTIONS_EBOOK[group - 1].name}`}
        </Button>
      </ButtonGroup>
      <Menu
        id="section-menu"
        anchorEl={anchorSection}
        open={Boolean(anchorSection)}
        keepMounted
        color="primary"
        onClose={() => handleCloseSection()}
      >
        {
          SECTIONS_EBOOK.map(item =>
            <MenuItem
              key={item.group}
              onClick={() => handleCloseSection(item.group + 1)}
            >
              <FolderIcon className={classes.menuItemSectionIcon} style={{ color: `${item.backgroundBtn}` }} /> {item.name}
            </MenuItem>
          )
        }
      </Menu>


      <ButtonGroup className={`${classes.button} ${classes.pageButton}`} variant="contained" aria-label="button group">
        <Button
          startIcon={<ChevronLeftIcon />}
          onClick={() => handleClosePage(page - 1)}></Button>
        <Button
          startIcon={<BookmarkBorderIcon />}
          aria-controls="page-menu"
          aria-haspopup="true"
          onClick={handleClickPage}>
          Страница {page}
        </Button>
        <Button
          startIcon={<ChevronRightIcon />}
          onClick={() => handleClosePage(page + 1)}></Button>
      </ButtonGroup>
      <Menu
        id="page-menu"
        anchorEl={anchorPage}
        open={Boolean(anchorPage)}
        keepMounted
        color="primary"
        onClose={() => handleClosePage()}
      >
        {
          Array.apply(null, { length: EBOOK_COUNT_PAGES }).map((_, idx) =>
            <MenuItem
              key={idx}
              onClick={() => handleClosePage(idx + 1)}
            >
              Страница {idx + 1}
            </MenuItem>
          )
        }
      </Menu>

      <ButtonGroup>
        <Button
          className={classes.button}
          startIcon={<SportsEsportsIcon />}
          variant="contained"
          color="default"
          aria-controls="games-menu"
          aria-haspopup="true"
          onClick={handleClickGames}>
          Мини-игры
          </Button>
      </ButtonGroup>
      <Menu
        id="games-menu"
        anchorEl={anchorGames}
        open={Boolean(anchorGames)}
        keepMounted
        color="primary"
        onClose={handleCloseGame}
      >
        {
          GAMES.list.map(item =>
            <MenuItem
              key={item.code}
              onClick={() => handleCloseGame(item.code)}
            >
              {item.name}
            </MenuItem>
          )
        }
      </Menu>

      <ButtonGroup>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          startIcon={<SettingsIcon />}
          onClick={handleOpenSettings}
        >
          Настройки
          </Button>
      </ButtonGroup>
      <Modal
        open={openModalSettings}
        onClose={handleCloseSettings}
      >
        <div className={classes.modalSettings}>
          <CloseIcon className={classes.close} onClick={handleCloseSettings} />
          <h2>Настройки</h2>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="default" checked={true} name="checkedA" />}
              label="Отображать перевод слова и перевод предложений с ним"
            />
            <FormControlLabel
              control={<Checkbox color="default" checked={true} name="checkedB" />}
              label="Отображать кнопки Сложные слова и Удалённые слова"
            />
          </FormGroup>
        </div>
      </Modal>
    </>
  );
}

export default WordsPanel;
