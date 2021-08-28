import React, { useEffect, useState } from 'react';

import Paginator from 'react-hooks-paginator';
import TableVaccineItems from './TableVaccineItem';

const TableCategoryItems = ({ applyVaccine, destroy, loadProductsById }) => {
  const pageLimit = 5;

  const [listProducts, setListProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setListProducts(applyVaccine);
  }, [applyVaccine]);

  useEffect(() => {
    setCurrentData(listProducts?.slice(offset, offset + pageLimit));
  }, [applyVaccine, offset, listProducts]);

  const onSearchProducts = (searchTerm) => {
    if (searchTerm !== '') {
      let output = applyVaccine.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setListProducts(output);
    } else {
      setListProducts(applyVaccine);
    }
  };

  return (
    <section className='ps-items-listing'>
      <div className='ps-section__header'>
        <div className='ps-section__filter'>
          <form className='ps-form--filter' action='index.html' method='get'>
            <div className='ps-form__left'>
              <input
                className='ps-ant-dropdown'
                type='text'
                placeholder='Search'
                onChange={(e) => onSearchProducts(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className='ps-section__search'></div>
      </div>
      <div className='ps-section__content'>
        <TableVaccineItems
          products={currentData}
          destroy={destroy}
          loadProductsById={loadProductsById}
        />
      </div>
      <div className='ps-section__footer'>
        <Paginator
          totalRecords={listProducts ? listProducts.length : 1}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default TableCategoryItems;
