import React from 'react';

interface SearchPropsType {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

const Search = (props: SearchPropsType) => {
  console.log(props);
  return <div>서치디테일 페이지</div>;
};

export default Search;
