// 전역 상태

export interface SessionStateType {
  id: string;
  setId: (newState: string) => void;
  name: string;
  setName: (newState: string) => void;
  email: string;
  setEmail: (newState: string) => void;
  setLogout: () => void;
}

// client props

export interface ButtonPropsType {
  onClick?(): void;
  children: any;
}

//

export interface BookListOnMainType {
  [key: string]: string;
}

export interface UserBookImgType {
  [key: string]: string;
}

export interface BookDetailType {
  author: string;
  categoryName: string;
  coverLargeUrl: string;
  description: string;
  isbn: string;
  pubDate: string;
  priceStandard: number;
  publisher: string;
  title: string;
}

export interface SessionType {
  user: { name: string; email: string; _id: string };
  expires: string;
}

export interface ReviewDataType {
  rate: string;
  content: string;
  date: string;
  likes: number;
  name?: string;
  isbn: string;
  userId: string;
}

export interface ReviewsType {
  _id: string;
  content: string;
  date: string;
  likes: number;
  name: string;
  rate: string;
  userId: string;
}
