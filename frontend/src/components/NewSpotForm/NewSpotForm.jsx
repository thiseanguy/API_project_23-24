// src/components/NewSpotForm/NewSpotForm.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import './NewSpotForm.css';

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      name,
      address,
      city,
      state,
      country,
      description,
      price,
      previewImage
    };
    dispatch(createSpot(newSpot));
  };

  return (
    <div className="new-spot-form">
      <h2>Create a New Spot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Preview Image URL:
          <input
            type="text"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};

export default NewSpotForm;
