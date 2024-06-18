// src/components/LoginFormModal/LoginFormModal.jsx

import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then((response) => {
        if (response.error) {
          setErrors({ credential: response.error });
        } else {
          closeModal()
        }
      });
  };

  const handleDemoLogin = () => {
    setErrors({});
    const demoCredential = 'FakeUser1'; // Your demo username or email
    const demoPassword = 'password2'; // Your demo password
    dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }))
      .then(() => closeModal());
  };

  const isDisabled = credential.length < 4 || password.length < 6;

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error">{errors.credential}</p>}
        <button type="submit" disabled={isDisabled}>Log In</button>
        <button type="button" onClick={handleDemoLogin}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
