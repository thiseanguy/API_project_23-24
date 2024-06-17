// src/components/UpdateSpotForm/UpdateSpotForm.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetails, editSpot } from '../../store/spots';
import './UpdateSpotForm.css';

const UpdateSpotForm = () => {
    const { spotId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.currentSpot);
    const [formData, setFormData] = useState({
        country: '',
        address: '',
        city: '',
        state: '',
        description: '',
        price: '',
        previewImage: '',
        name: '',
        imageUrls: ['', '', '', '']
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (spotId) {
            dispatch(fetchSpotDetails(spotId));
        }
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            setFormData({
                country: spot.country || '',
                address: spot.address || '',
                city: spot.city || '',
                state: spot.state || '',
                description: spot.description || '',
                price: spot.price || '',
                previewImage: spot.previewImage || '',
                name: spot.name || '',
                imageUrls: spot.imageUrls || ['', '', '', '']
            });
        }
    }, [spot]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    // const handleImageUrlChange = (index, value) => {
    //     const updatedImageUrls = [...formData.imageUrls];
    //     updatedImageUrls[index] = value;
    //     setFormData({...formData, imageUrls: updatedImageUrls});
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);


    if (Object.keys(newErrors).length === 0) {
        const result = await dispatch(editSpot(spotId, formData));
        if (result) {
            dispatch(fetchSpotDetails(spotId)) // Re-fetch spot details to ensure fresh data
            .then(() => navigate(`/spots/${spotId}`));        }
      }
    };

    const validateForm = () => {
        const newErrors = {};
        // Add your validation logic here similar to the NewSpotForm
        return newErrors;
      };

    return (
        <div className="update-spot-form">
            <h2>Update Your Spot</h2>
            {/* The rest of your form layout here, similar to NewSpotForm */}
            <form onSubmit={handleSubmit}>
            <label>
                Country:
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                />
                {errors.country && <p className="error">{errors.country}</p>}
            </label>
            <label>
                Street Address:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                {errors.address && <p className="error">{errors.address}</p>}
            </label>
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                {errors.city && <p className="error">{errors.city}</p>}
            </label>
            <label>
                State:
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
                {errors.state && <p className="error">{errors.state}</p>}
            </label>
            <label>
                Additional Information:
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </label>
            <label>
                Spot Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                {errors.price && <p className="error">{errors.price}</p>}
            </label>
            {/* More inputs for address, city, state, etc. */}
            <button type="submit">Update Spot</button>
            </form>
        </div>
    );
};

export default UpdateSpotForm;
