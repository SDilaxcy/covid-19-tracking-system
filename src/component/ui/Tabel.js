import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Paginator from 'react-hooks-paginator';
import TableProjectItems from './TableProjectItems';

const TableCategoryItems = ({ applyVaccine, deleteApplyVaccine }) => {
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
        product.firstname?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setListProducts(output);
    } else {
      setListProducts(applyVaccine);
    }
  };

  return (
    <section className='ps-items-listing'>
      <div className='ps-section__actions'>
        <div className='ps-btn success'>
          <Link to='/Vaccines'>
            <i className='icon icon-plus mr-2' />
            Vaccine
          </Link>
        </div>
        <div className='ps-btn success'>
          <Link to='/AddUserDetails'>
            <i className='icon icon-plus mr-2' />
            Add Patient
          </Link>
        </div>
      </div>

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
        <TableProjectItems
          products={currentData}
          deleteApplyVaccine={deleteApplyVaccine}
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
