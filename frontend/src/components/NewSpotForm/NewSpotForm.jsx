// src/components/NewSpotForm/NewSpotForm.jsx

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import './NewSpotForm.css';

const NewSpotForm = () => {
  const dispatch = useDispatch();
  const [spotTitle, setSpotTitle] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
      spotTitle,
      streetAddress,
      city,
      state,
      country,
      price,
    //   previewImage,
      imageUrls
    };
    dispatch(createSpot(newSpot));
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
                </label>
                 <label>
                    Street Address:
                    <input
                        type="text"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="Street Address"
                        required
                    />
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
                </label>

                {/* Additional fields for description, price, and preview image */}

                {/* <button type="submit">Create Spot</button> */}
            </form>
        </div>

        <div className="form-section">
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast WiFi or parking, and what you love about the neighborhood.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Additional Information:
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Please write at least 30 characters"
              required
            />
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
              value={spotTitle}
              onChange={(e) => setSpotTitle(e.target.value)}
              placeholder="Name of your spot"
              required
            />
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
              value={imageUrls[0]}
              onChange={(e) => handleImageUrlChange(0, e.target.value)}
              placeholder="Preview Image URL"
              required
            />
          </label>
          {[1, 2, 3, 4].map((index) => (
            <label key={index}>
              Image URL {index}:
              <input
                type="text"
                value={imageUrls[index]}
                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                placeholder="Image URL"
                required
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
