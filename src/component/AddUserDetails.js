import React, { useEffect, useState } from 'react';
import { Alert, Select } from 'antd';
import { isAuthenticated } from '../auth';
import { getAllVaccine, createApplyVaccines } from './core/apiCors';

const { Option } = Select;

const AddUserDetails = () => {
  const [addError, setAddError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [vaccines, setVaccines] = useState([]);

  const { data, token } = isAuthenticated();

  const loadVaccines = () => {
    getAllVaccine().then((data) => {
      if (data.message) {
        setError(data.message);
      } else {
        setVaccines(data.data.vaccine);
      }
    });
  };

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    age: '',
    phone_number: '',
    vaccine: '',
    user: "1001"
  });

  useEffect(() => {
    loadVaccines();
  }, []);

  const onChangeHandler = (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setUserData({ ...userData, [name]: value });
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      userData.phone_number !== '' &&
      userData.firstname !== '' &&
      userData.lastname !== '' &&
      userData.age !== '' &&
      userData.vaccine !== ''
    ) {
      if (
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          userData.phone_number
        )
      ) {
        createApplyVaccines(token, userData).then((data) => {
          if (data.message) {
            setAddError(true);
            setError(data.message);
            setTimeout(() => {
              setAddError(false);
              setError('');
            }, 3000);
          } else {
            setAddError(true);
            setSuccess('added Successfully!');
            setUserData({
              ...userData,
              firstname: '',
              lastname: '',
              age: '',
              phone_number: '',
              vaccine: '',
            });
            setTimeout(() => {
              setAddError(false);
              setSuccess('');
            }, 3000);
          }
        });
      } else {
        setAddError(true);
        setError('Incorrect phone number!');
        setTimeout(() => {
          setAddError(false);
          setError('');
        }, 3000);
      }
    } else {
      setAddError(true);
      setError('all field incorrect!');
      setTimeout(() => {
        setAddError(false);
        setError('');
      }, 3000);
    }
  };

  const handleBrand = (value) => {
    setUserData({ ...userData, vaccine: value });
  };

  return (
    <section className='ps-new-item' style={{ margin: '5em' }}>
      {console.log(data)}
      <div className='ps-form ps-form--new-product'>
        <div className='ps-form__content'>
          {success && <Alert message={success} type='success' />}

          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
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
                      First Name<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='firstname'
                      type='text'
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Last Name<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='lastname'
                      type='text'
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Age<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='age'
                      type='number'
                      min={1}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>
                      Phone Number<sup>*</sup>
                    </label>
                    <input
                      className='form-control'
                      name='phone_number'
                      type='text'
                      required
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </figure>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
              <figure className='ps-block--form-box'>
                <figcaption>Vaacine details</figcaption>
                <div className='ps-block__content'>
                  <div className='form-group form-group--select'>
                    <label>Select Vaccine</label>
                    <div className='form-group__content'>
                      <Select
                        placeholder='Select Brand'
                        className='ps-ant-dropdown'
                        listItemHeight={20}
                        onChange={(value) => handleBrand(value)}
                        allowClear
                        style={{ marginBottom: '1em' }}
                      >
                        {vaccines &&
                          vaccines.map((vacine, index) => (
                            <Option value={vacine._id} key={index}>
                              {vacine.name.toLowerCase()}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>{' '}
                </div>
                <div className='ps-form__bottom'>
                  <button
                    className='ps-btn'
                    onClick={(e) => {
                      submitHandler(e);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddUserDetails;
