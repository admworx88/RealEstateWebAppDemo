import React from 'react';
import SearchBar from '../../pages/SearchBar';
import useProperties from '../../hooks/useProperties';
import './index.css';
import { PuffLoader } from 'react-spinners';

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          height="80"
          width="80"
          color="#4066ff"
          radius={1}
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexCenter paddings innerWidth properties-container">
        <SearchBar />
      </div>
    </div>
  );
};
export default Properties;
