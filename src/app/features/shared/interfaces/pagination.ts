export interface Pagination {
  products: any;
  total: number;
  limit: number;
  page: number;
  skip: number;
}

export interface PageDetails {
  pageIndex: number;
  pageSize: number;
}

