export interface SearchPropsType {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export interface ButtonPropsType {
  onClick?(): void;
  children: any;
}

export interface BookListOnMainType {
  coverLargeUrl: string;
  title: string;
  author: string;
  isbn: string;
}
