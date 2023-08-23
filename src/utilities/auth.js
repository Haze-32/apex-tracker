import React, { useState } from 'react';
import firebase from '../components/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  // Function to handle password reset
  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset link sent to your email address.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="mt-5">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <button onClick={handleSignUp} className="btn btn-success">Sign Up</button>
        <div onClick={handleResetPassword} className="mt-3">Reset Password</div>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <hr />
      <button onClick={handleGoogleLogin} className="btn btn-secondary mt-3">Login with Google</button>


    </div>
  );
};

export default Login;
