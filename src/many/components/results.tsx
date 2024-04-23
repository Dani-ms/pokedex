export function Results(props: {
  limit: number;
  offset: number;
  total: number;
  rows: Array<{
    name: string;
    url: string;
  }>;
  setOffset: (offset: number) => void;
}) {
  const currentPage = Math.floor(props.offset / props.limit) + 1;
  const totalPages = Math.ceil(props.total / props.limit);

  const previousPage = currentPage <= 1 ? undefined : currentPage - 1;
  const nextPage = currentPage >= totalPages ? undefined : currentPage + 1;

  const pageToOffset = (page: number) => {
    return (page - 1) * props.limit;
  };

  return (
    <div>
      <h1> Pokedex</h1>
      <ul>
        
        {props.rows.map((row, index) => {
          return (
            <li key={index}>
              <a href={`pokedex/${row.name}`}>{row.name}</a>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button
          onClick={() => {
            if (!previousPage) {
              throw new Error();
            }

            props.setOffset(pageToOffset(previousPage));
          }}
          disabled={!previousPage}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            if (!nextPage) {
              throw new Error();
            }

            props.setOffset(pageToOffset(nextPage));
          }}
          disabled={!nextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
