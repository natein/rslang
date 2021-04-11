import Dictionary from '../components/Dictionary';
import { useSelector } from 'react-redux';

function DictionaryPage({ location, match: { params } }) {
  const user = useSelector(state => state.user);

  const query = new URLSearchParams(location.search);
  const groupQuery = query.get('group');
  const typeQuery = query.get('type');
  const pageQuery = query.get('page');

  const type = typeQuery ?? 'study';
  const page = pageQuery ? +pageQuery : 1;
  const group = groupQuery ? +groupQuery : 1;

  return (
    <div>
      <h1>Словарь</h1>
      {user.token && <Dictionary type={type} page={page} group={group} />}
      {!user.token && <div>Необходимо авторизоваться</div>}
    </div>
  );
}

export default DictionaryPage;
