import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

import { SECTIONS_EBOOK } from '../../constants';


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
  }
}));

function WordsPanel({ group, routeGroupPage }) {
  const classes = useStyles();
  const [anchorSection, setAnchorSection] = useState(null);
  const [anchorGames, setAnchorGames] = useState(null);
  const [openModalSettings, setOpenModalSettings] = useState(false);


  const handleClickSection = (event) => {
    setAnchorSection(event.currentTarget);
  };

  const handleCloseSection = (group) => {
    setAnchorSection(null);
    if (group >= 0) routeGroupPage(group, 1)
  };

  const handleClickGames = (event) => {
    setAnchorGames(event.currentTarget);
  };

  const handleCloseGame = () => {
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
      {
        <>
          <Button
            style={{ backgroundColor: `${SECTIONS_EBOOK[group].backgroundBtn}` }}
            className={classes.button}
            variant="contained"
            color="default"
            aria-controls="section-menu"
            aria-haspopup="true"
            onClick={handleClickSection}>
            Раздел: {group}
          </Button>
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
                  onClick={() => handleCloseSection(item.group)}
                >
                  <FolderIcon className={classes.menuItemSectionIcon} style={{ color: `${item.backgroundBtn}` }} /> {item.name}
                </MenuItem>
              )
            }
          </Menu>

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
          <Menu
            id="games-menu"
            anchorEl={anchorGames}
            open={Boolean(anchorGames)}
            keepMounted
            color="primary"
            onClose={handleCloseGame}
          >
            <MenuItem onClick={handleCloseGame}>Саванна</MenuItem>
            <MenuItem onClick={handleCloseGame}>Аудиовызов</MenuItem>
            <MenuItem onClick={handleCloseGame}>Своя игра</MenuItem>
          </Menu>

          <Button
            className={classes.button}
            variant="contained"
            color="default"
            startIcon={<SettingsIcon />}
            onClick={handleOpenSettings}
          >
            Настройки
          </Button>
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
      }
    </>
  );
}

export default WordsPanel;
