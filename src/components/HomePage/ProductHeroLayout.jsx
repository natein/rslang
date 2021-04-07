import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 1400,
    },
  },
  container: {
    marginTop: theme.spacing(3),
    // marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function ProductHeroLayout(props) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
      </Container>
    </section>
  );
}

ProductHeroLayout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHeroLayout);