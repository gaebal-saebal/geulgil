// 전역 상태

export interface SessionStateType {
  name: string;
  setName: (newState: string) => void;
  email: string;
  setEmail: (newState: string) => void;
}

// client props

export interface SearchPropsType {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

export interface ButtonPropsType {
  onClick?(): void;
  children: any;
}

//

export interface BookListOnMainType {
  [key: string]: string;
}

export interface BookDetailType {
  [key: string]: string;
}

export interface SessionType {
  user: { name: string; email: string };
  expires: string;
}

export interface ReviewDataType {
  rate: string;
  content: string;
  date: string;
  likes: number;
  name?: string;
  isbn: string;
}

export interface ReviewsType {
  content: string;
  date: string;
  likes: number;
  name: string;
  rate: string;
}
