import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import background from "../../assets/istockphoto.jpg";

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
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '900',
    textShadow: '2px 3px 3px grey, 0 0 1em blue',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '900',
    margin: '0 10px',
    textShadow: '2px 3px 3px grey, 0 0 1em red',
  },
  mainHeader: {
    backgroundImage: `url(${background})`,
    backgroundPosition: '0% 3%'
  }
}));

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.mainHeader}>
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
            <Link to="/games" className={classes.link}>
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
