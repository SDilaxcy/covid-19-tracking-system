import React from 'react';
import Icon from '@material-ui/core/Icon';

import { Modal } from 'antd';

import { isAuthenticated } from '../../auth';

const { confirm } = Modal;

const { token } = isAuthenticated();

const TableProjectItems = ({ products, deleteApplyVaccine }) => {
  function showPromiseConfirm(id, token) {
    confirm({
      title: 'Do you want to delete these items?',
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      onOk() {
        deleteApplyVaccine(id, token);
      },
      onCancel() {},
    });
  }
  const tableItemsView = products?.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>
          <strong>{item.firstname}</strong>
        </td>
        <td>
          <strong>{item.lastname}</strong>
        </td>
        <td>{item.phone_number}</td>
        <td>{item.age}</td>
        <td>
          <strong>{item.vaccine?.name}</strong>
        </td>
        <td>
          <strong>{new Date(item.createdAt).toLocaleDateString()}</strong>
        </td>
        <td>
          <div className='dropdown-item '>
            <Icon onClick={() => showPromiseConfirm(item._id, token)}>
              delete
            </Icon>
            <Icon className='ml-4'>edit</Icon>
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Vaccine</th>
            <th>Apply Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableItemsView}</tbody>
      </table>
    </div>
  );
};

export default TableProjectItems;
