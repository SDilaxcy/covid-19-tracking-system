import React from 'react';
import Icon from '@material-ui/core/Icon';

import { Modal } from 'antd';
const { confirm } = Modal;
const TableProjectItems = ({ products, destroy, loadProductsById }) => {
  function showPromiseConfirm(id) {
    confirm({
      title: 'Do you want to delete these items?',
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        destroy(id);
      },
      onCancel() {},
    });
  }
  const tableItemsView = products?.map((item, index) => {
    return (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>
          <strong>{item.name}</strong>
        </td>
        <td>
          <strong>{item.description}</strong>
        </td>
        <td>{item.quantity}</td>
        <td>{item.manufacturingCountry}</td>
        <td>
          <div className='dropdown-item '>
            <Icon onClick={() => showPromiseConfirm(item._id)}>delete</Icon>
            <Icon className='ml-4' onClick={() => loadProductsById(item._id)}>
              edit
            </Icon>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className='table-responsive'>
      <table className='table ps-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Manufacturing Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableItemsView}</tbody>
      </table>
    </div>
  );
};

export default TableProjectItems;
