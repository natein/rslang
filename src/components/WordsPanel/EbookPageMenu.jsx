import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { EBOOK_COUNT_PAGES, COUNT_WORDS_ON_PAGE } from '../../constants/index';


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

function EbookPageMenu({ group, page, routeGroupPage, wordsGroupDelete }) {
  const classes = useStyles();
  const [anchorPage, setAnchorPage] = useState(null);

  const handleClickPage = (event) => {
    setAnchorPage(event.currentTarget);
  };

  const handleClosePage = (page, type = '') => {
    setAnchorPage(null);
    if (page >= 1 && page <= EBOOK_COUNT_PAGES) {
      let route = true;
      if (pages[page - 1] === COUNT_WORDS_ON_PAGE) {
        if (type === 'next') {
          if (page !== 30) page += 1;
          else {
            page = 29;
            route = false;
          }
        }
        if (type === 'prev') {
          if (page !== 1) page -= 1;
          else {
            page = 2;
            route = false;
          }
        }
      }
      if (route) routeGroupPage(group, page);
    }
  };

  const pages = wordsGroupDelete.reduce((acc, item) => {
    acc[item.page] = (acc[item.page] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <ButtonGroup className={`${classes.button} ${classes.pageButton}`} variant="contained" aria-label="button group">
        <Button
          startIcon={<ChevronLeftIcon />}
          onClick={() => handleClosePage(page - 1, 'prev')}></Button>
        <Button
          startIcon={<BookmarkBorderIcon />}
          aria-controls="page-menu"
          aria-haspopup="true"
          onClick={handleClickPage}>
          Страница {page}
        </Button>
        <Button
          startIcon={<ChevronRightIcon />}
          onClick={() => handleClosePage(page + 1, 'next')}></Button>
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
              disabled={pages[idx] === COUNT_WORDS_ON_PAGE ? true : false}
              key={idx}
              onClick={() => handleClosePage(idx + 1)}
            >
              Страница {idx + 1}
            </MenuItem>
          )
        }
      </Menu>
    </>
  );
}

export default EbookPageMenu;
