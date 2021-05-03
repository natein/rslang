import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

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
  },
  pageButton: {
    background: '#b0bec5'
  }
}));

function DictionaryGroupMenu({ group, routeGroup }) {
  const classes = useStyles();
  const [anchorSection, setAnchorSection] = useState(null);

  const handleClickSection = (event) => {
    setAnchorSection(event.currentTarget);
  };

  const handleCloseSection = (group) => {
    setAnchorSection(null);
    if (group >= 1) routeGroup(group)
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
    </>
  );
}

export default DictionaryGroupMenu;
