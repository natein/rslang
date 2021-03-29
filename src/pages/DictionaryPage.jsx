import Dictionary from '../components/Dictionary';

function DictionaryPage({ match: { params } }) {
  const type = params.type ? params.type : 'study';
  const page = params.page ? +params.page : 1;

  return (
    <div>
      <h1>Словарь</h1>
      <Dictionary type={type} page={page} />
    </div>
  );
}

export default DictionaryPage;
