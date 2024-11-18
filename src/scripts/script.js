export const loadStates = () => {
  return fetch('/json/states.json')
    .then(response => response.json())
    .then(states => states);
};

export const loadDistricts = (stateId) => {
  return fetch('/json/districts.json')
    .then(response => response.json())
    .then(data => data[stateId] || []);
};

export const loadCities = (districtId) => {
  return fetch('/json/cities.json')
    .then(response => response.json())
    .then(data => data[districtId] || []);
};

export const validateForm = (formData) => {
  let isValid = true;

  if (formData.username.trim() === '') {
    isValid = false;
    alert('Username cannot be empty!');
  }

  if (formData.password !== formData.repassword) {
    isValid = false;
    alert('Passwords do not match!');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(formData.email)) {
    isValid = false;
    alert('Invalid email!');
  }

  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(formData.phone)) {
    isValid = false;
    alert('Invalid phone number!');
  }

  return isValid;
};