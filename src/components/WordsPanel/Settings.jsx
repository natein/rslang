import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { setSettings } from '../../actions/ebookActions';

import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';


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
  },
  optionSettings: {
    marginBottom: '20px'
  }
}));

function Settings() {
  const classes = useStyles();
  const [openModalSettings, setOpenModalSettings] = useState(false);

  const dispatch = useDispatch();
  const settings = useSelector(state => state.ebook.settings);

  const handleOpenSettings = () => {
    setOpenModalSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenModalSettings(false);
  };

  const handleSetSettings = (option) => {
    dispatch(setSettings(option));
  };

  return (
    <>
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
              className={classes.optionSettings}
              onChange={() => handleSetSettings({ viewTranslate: !settings.viewTranslate })}
              control={<Checkbox color="default" checked={settings?.viewTranslate ? true : false} />}
              label="Отображать перевод слова и перевод предложений с ним"
            />
            <FormControlLabel
              className={classes.optionSettings}
              onChange={() => handleSetSettings({ viewButton: !settings.viewButton })}
              control={<Checkbox color="default" checked={settings?.viewButton ? true : false} />}
              label="Отображать кнопки 'Сложные слова' и 'Удалённые слова'"
            />
          </FormGroup>
        </div>
      </Modal>
    </>
  );
}

export default Settings;
