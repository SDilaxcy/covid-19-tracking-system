import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import {
  getAllVaccine,
  createVaccine,
  deleteVaccine,
  getVaccine,
  updateVaccine,
} from './core/apiCors';
import VaccineTable from './ui/VaccineTable';

const Vaccine = () => {
  const [applyVaccine, setApplyVaccine] = useState([]);
  const [error, setError] = useState('');
  const [addError, setAddError] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const [updata, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [updataVaccine, setUpdateVaccine] = useState({
    name: '',
    description: '',
    quantity: '',
    manufacturingCountry: '',
  });

  const [vaccine, setVaccine] = useState({
    name: '',
    description: '',
    quantity: '',
    manufacturingCountry: '',
  });

  const loadVaccines = () => {
    getAllVaccine().then((data) => {
      if (data.message) {
        setError(data.message);
      } else {
        setApplyVaccine(data.data.vaccine);
      }
    });
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  const onChangeHandler = (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setVaccine({ ...vaccine, [name]: value });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeHandlerUpdate = (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setUpdateVaccine({ ...updataVaccine, [name]: value });
    } catch (err) {
      console.log(err);
    }
  };

  const submitUpadte = (e) => {
    e.preventDefault();
    if (
      updataVaccine.name === '' ||
      updataVaccine.description === '' ||
      updataVaccine.quantity === 0 ||
      updataVaccine.manufacturingCountry === ''
    ) {
      setAddError(true);
      setError('all feild required');
      setTimeout(() => {
        setAddError(false);
        setError('');
      }, 3000);
    } else {
      updateVaccine(updataVaccine, updateId).then((data) => {
        if (data.message) {
          setAddError(true);
          setError(data.message);
          setTimeout(() => {
            setAddError(false);
            setError('');
          }, 3000);
        } else {
          setAddError(true);
          setError(data.status);
          loadVaccines();
          setUpdate(false);
          setUpdateId('');
          setUpdateVaccine({
            name: '',
            description: '',
            quantity: '',
            manufacturingCountry: '',
          });
          setTimeout(() => {
            setAddError(false);
            setError('');
          }, 3000);
        }
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      vaccine.name === '' ||
      vaccine.description === '' ||
      vaccine.quantity === 0 ||
      vaccine.manufacturingCountry === ''
    ) {
      setAddError(true);
      setError('all feild required');
      setTimeout(() => {
        setAddError(false);
        setError('');
      }, 3000);
    } else {
      createVaccine(vaccine).then((data) => {
        if (data.message) {
          setAddError(true);
          setError(data.message);
          setTimeout(() => {
            setAddError(false);
            setError('');
          }, 3000);
        } else {
          setAddError(true);
          setError(data.message);
          loadVaccines();
          setVaccine({
            name: '',
            description: '',
            quantity: '',
            manufacturingCountry: '',
          });
          setTimeout(() => {
            setAddError(false);
            setError('');
          }, 3000);
        }
      });
    }
  };

  const destroy = (productId) => {
    deleteVaccine(productId).then((data) => {
      if (data.message) {
        console.log(data.error);
      } else {
        loadVaccines();
        setAddError(true);
        setDeleteMessage('delete vaccine Success');
        setTimeout(() => {
          setAddError(false);
          setDeleteMessage('');
        }, 2000);
      }
    });
  };

  const loadProductsById = (id) => {
    getVaccine(id).then((data) => {
      if (data.error) {
        setError(data.message);
      } else {
        setUpdateVaccine({
          ...updataVaccine,
          name: data.data.vaccine.name,
          description: data.data.vaccine.description,
          quantity: data.data.vaccine.quantity,
          manufacturingCountry: data.data.vaccine.manufacturingCountry,
        });
        setUpdate(true);
        setUpdateId(id);
      }
    });
  };

  return (
    <section className='ps-new-item' style={{ margin: '5em' }}>
      <div className='ps-form ps-form--new-product'>
        <div className='ps-form__content'>
          <div className='row'>
            <div className='col-xl-3 col-lg-4 col-md-4 col-sm-4 col-4'>
              <figure className='ps-block--form-box'>
                <figcaption>Add Vaacine</figcaption>
                <div className='ps-block__content'>
                  <div
                    className='alert alert-danger'
                    style={{ display: addError ? '' : 'none' }}
                  >
                    {error}
                  </div>
                  <div className='form-group'>
                    <label>
                      V Name<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='name'
                      type='text'
                      required
                      value={updata ? updataVaccine.name : vaccine.name}
                      onChange={
                        updata ? onChangeHandlerUpdate : onChangeHandler
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      V Description<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='description'
                      type='text'
                      required
                      value={
                        updata ? updataVaccine.description : vaccine.description
                      }
                      onChange={
                        updata ? onChangeHandlerUpdate : onChangeHandler
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      V Qty<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='quantity'
                      type='number'
                      min={1}
                      value={updata ? updataVaccine.quantity : vaccine.quantity}
                      onChange={
                        updata ? onChangeHandlerUpdate : onChangeHandler
                      }
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      V Manufacturing Country<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='manufacturingCountry'
                      type='text'
                      required
                      value={
                        updata
                          ? updataVaccine.manufacturingCountry
                          : vaccine.manufacturingCountry
                      }
                      onChange={
                        updata ? onChangeHandlerUpdate : onChangeHandler
                      }
                    />
                  </div>
                  <div className='ps-form__bottom'>
                    <button
                      className='ps-btn'
                      onClick={(e) => {
                        updata ? submitUpadte(e) : submitHandler(e);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </figure>
            </div>
            <div className='col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9'>
              <figure className='ps-block--form-box'>
                <figcaption>Vaacine details</figcaption>
                <div className='ps-block__content'>
                  {addError && <Alert message={deleteMessage} type='success' />}
                  <VaccineTable
                    applyVaccine={applyVaccine}
                    destroy={destroy}
                    loadProductsById={loadProductsById}
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vaccine;
