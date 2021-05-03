import Ebook from '../components/Ebook';

function EbookPage({ location }) {
  const query = new URLSearchParams(location.search);
  const groupQuery = +query.get('group');
  const pageQuery = +query.get('page');

  const page = pageQuery > 0 ? pageQuery : 1;
  const group = groupQuery > 0 ? groupQuery : 1;

  return (
    <div>
      <h1>Учебник</h1>
      <Ebook group={group} page={page} />
    </div>
  );
}

export default EbookPage;
