export default interface ResultPaginated<T> {
  results: T[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  };
}
