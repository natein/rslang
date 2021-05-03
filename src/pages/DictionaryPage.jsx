import Dictionary from '../components/Dictionary';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ebookTitle: {
    marginBottom: '10px'
  },
}));

function DictionaryPage({ location, match: { params } }) {
  const user = useSelector(state => state.user);

  const query = new URLSearchParams(location.search);
  const groupQuery = query.get('group');
  const typeQuery = query.get('type');
  const pageQuery = query.get('page');

  const type = typeQuery ?? 'study';
  const page = pageQuery ? +pageQuery : 1;
  const group = groupQuery ? +groupQuery : 1;

  const classes = useStyles();

  return (
    <>
      <Typography className={classes.ebookTitle} variant="h4" component="h1">
          Словарь
      </Typography>

      {user.token && <Dictionary type={type} page={page} group={group} />}
      {!user.token && <Typography  component="p">Необходимо авторизоваться</Typography>}
    </>
  );
}

export default DictionaryPage;