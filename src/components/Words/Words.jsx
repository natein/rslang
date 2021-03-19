
function Words({ wordsList, setPage, setGroup, page }) {
  console.log(page);

  const groupsBtn = [];
  for (let i = 0; i < 6; i++) {
    groupsBtn.push(
      <button key={i} onClick={() => setGroup(i)}>Group {i}</button>
    );
  }

  return (
    <div>
      {groupsBtn.map(group => group)}
      <ul>
        {wordsList.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page + 1)}>next</button>
    </div>
  );
}

export default Words;
