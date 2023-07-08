export default function WordTable({ wordList }) {
  return (
    <div className="table-container">
      <table className="word-table">
        <tr>
          <th> German</th>
          <th> Ukrainian</th>
        </tr>

        {wordList?.map((wordPair) => (
          <tr>
            <td>{wordPair.ger}</td>
            <td>{wordPair.ukr}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
