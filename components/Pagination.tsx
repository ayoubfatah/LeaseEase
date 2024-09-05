export default function Pagination({
  page,
  pageSize,
  onPageChange,
  totalItems,
}: any) {
  const totalPages = Math.ceil(totalItems / pageSize);

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  }
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page == 1}
        className={`mr-2 px-2 py-1 border border-gray-300 rounded ${
          page === 1 ? "cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`ml-2 px-2 py-1 border border-gray-300 rounded ${
          page === totalPages ? "cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </section>
  );
}
