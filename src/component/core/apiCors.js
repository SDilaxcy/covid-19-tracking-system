import { API } from '../../config';

//http://localhost:8000/api
export const getAllVaccine = (sortBy) => {
  return fetch(`${API}/vaccines`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createVaccine = (product) => {
  console.log(JSON.stringify(product), 'vaccine create data');
  return fetch(`${API}/vaccines/createVacc`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteVaccine = (productId) => {
  return fetch(`${API}/vaccines/deleteVacc/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getVaccine = (productId) => {
  return fetch(`${API}/vaccines/getOneVacc/${productId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateVaccine = (product, productId) => {
  return fetch(`${API}/vaccines/updateVacc/${productId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Apply  Vaccine

export const getAllapplyVaccine = () => {
  return fetch(`${API}/applyvaccine`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteApplyVaccines = (productId, token) => {
  return fetch(`${API}/applyvaccine/deleteApplyVaccine/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createApplyVaccines = (token, product) => {
  return fetch(`${API}/applyvaccine/createapplyVaccine`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
