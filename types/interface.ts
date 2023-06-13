export interface SearchPropsType {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export interface ButtonPropsType {
  onClick?(): void;
  children: any;
}

export interface BookListOnMainType {
  [key: string]: string;
}

export interface BookDetailType {
  [key: string]: string;
}
