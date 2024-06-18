// src/components/NewSpotForm/NewSpotForm.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import './NewSpotForm.css';

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [name, setName] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '']);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

  if (!country) newErrors.country = 'Country is required';
  if (!address) newErrors.Address = 'Street Address is required';
  if (!city) newErrors.city = 'City is required';
  if (!state) newErrors.state = 'State is required';
  if (!description || description.length < 30) newErrors.description = 'Description needs 30 or more characters';
  if (!name) newErrors.name = 'Name of your spot is required';
  if (!price) newErrors.price = 'Price per night is required';
  if (!previewImage) newErrors.previewImage = 'Preview Image URL is required';

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    const newSpot = {
      name,
      city,
      state,
      country,
      previewImage,
      description,
      price,
      address,
    };
    dispatch(createSpot(newSpot));
  }
};

  const handleImageUrlChange = (index, value) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = value;
    setImageUrls(updatedImageUrls);
  };

  return (
    <div className="new-spot-form">
        <div className='form-section'>

            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Country:
                    <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                    required
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                </label>
                 <label>
                    Street Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Street Address"
                        required
                    />
                    {errors.address && <p className="error">{errors.address}</p>}
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                    />
                    {errors.city && <p className="error">{errors.city}</p>}
                </label>
                <label>
                State:
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    required
                />
                {errors.state && <p className="error">{errors.state}</p>}
                </label>
            </form>
        </div>

        <div className="form-section">
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast WiFi or parking, and what you love about the neighborhood.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Additional Information:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please write at least 30 characters"
              required
            />
            {errors.description && <p className="error">{errors.description}</p>}
          </label>
        </form>
      </div>

      <div className="form-section">
        <h2>Create a title for your spot</h2>
        <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Name of your spot:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of your spot"
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </label>

        </form>
      </div>

      <div className="form-section">
        <h2>Set a base price for your spot</h2>
        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Price per night (USD):
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
              required
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </label>
        </form>
      </div>

      <div className="form-section">
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Preview Image URL:
            <input
              type="text"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
              placeholder="Preview Image URL"
              required
            />
            {errors.previewImage && <p className="error">{errors.previewImage}</p>}
          </label>
          {[1, 2, 3, 4].map((index) => (
            <label key={index}>
              Image URL {index}:
              <input
                type="text"
                value={imageUrls[index]}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="Image URL"
              />
            </label>
          ))}
        </form>
      </div>

      <button type="submit" onClick={handleSubmit}>Create Spot</button>
    </div>
  );
};


export default NewSpotForm;
