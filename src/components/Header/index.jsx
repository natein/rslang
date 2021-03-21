import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
    },
  },
  title: {
    flexGrow: 3,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    margin: '0 10px'
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            <Link className={classes.titleLink} to="/">RSLang</Link>
          </Typography>
          <nav>
            <Link to="/" className={classes.link}>
              Главная
            </Link>
            <Link to="/ebook" className={classes.link}>
              Учебник
            </Link>
            <Link to="/" className={classes.link}>
              Словарь
            </Link>
            <Link to="/" className={classes.link}>
              Игры
            </Link>
            <Link to="/" className={classes.link}>
              Статистика
            </Link>
          </nav>
        </Toolbar>
      </Container>
    </AppBar>
  );
}



export default Header;
