import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import { SECTIONS_DICTIONARY } from '../../constants';


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

function DictionaryGroupMenu({ type, routeTypePage, setCurrentPage }) {
  const classes = useStyles();
  const [anchorSection, setAnchorSection] = useState(null);

  const handleClickSection = (event) => {
    setAnchorSection(event.currentTarget);
  };

  const handleCloseSection = (type) => {
    setAnchorSection(null);
    if (type) {
      routeTypePage(type);
      setCurrentPage(1);
    }
  };

  return (
    <>
      <ButtonGroup>
        <Button
          startIcon={<FolderOpenIcon />}
          className={classes.button}
          variant="contained"
          color="default"
          aria-controls="section-menu"
          aria-haspopup="true"
          onClick={handleClickSection}>
          {SECTIONS_DICTIONARY.find(item => item.type === type).name}
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
          SECTIONS_DICTIONARY.map(item =>
            <MenuItem
              key={item.type}
              onClick={() => handleCloseSection(item.type)}
            >
              <FolderIcon className={classes.menuItemSectionIcon} /> {item.name}
            </MenuItem>
          )
        }
      </Menu>
    </>
  );
}

export default DictionaryGroupMenu;
