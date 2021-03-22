import Ebook from '../components/Ebook';

function EbookPage({ match: { params } }) {
  const group = params.group ? +params.group : 1;
  const page = params.page ? +params.page : 1;

  return (
    <div>
      <h1>Учебник</h1>
      <Ebook group={group} page={page} />
    </div>
  );
}

export default EbookPage;
