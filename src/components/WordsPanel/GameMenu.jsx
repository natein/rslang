import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import { GAMES_LIST } from '../../constants';


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

function GameMenu({onGame}) {
  const classes = useStyles();
  const [anchorGames, setAnchorGames] = useState(null);

  const handleClickGames = (event) => {
    setAnchorGames(event.currentTarget);
  };

  const handleCloseGame = () => {
    setAnchorGames(null);
  };

  const onGameSelected = (event) => {
    const code = event.target.getAttribute('value');
    setAnchorGames(code);
    onGame(code);
  };

  return (
    <>
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
          GAMES_LIST.map(item =>
            <MenuItem
              key={item.code}
              value={item.code}
              onClick={onGameSelected}
            >
              {item.name}
            </MenuItem>
          )
        }
      </Menu>
    </>
  );
}

export default GameMenu;
