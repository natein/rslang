import Dictionary from '../components/Dictionary';
import { useSelector } from 'react-redux';

function DictionaryPage({ match: { params } }) {
  const user = useSelector(state => state.user);

  const type = params.type ? params.type : 'study';
  const page = params.page ? +params.page : 1;

  return (
    <div>
      <h1>Словарь</h1>
      {user.token && <Dictionary type={type} page={page} />}
      {!user.token && <div>Необходимо авторизоваться</div>}
    </div>
  );
}

export default DictionaryPage;