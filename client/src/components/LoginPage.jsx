import React, { useState } from 'react';
import { auth } from '../firebase'; // Corrected import path
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Authentication failed!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-8">
        <span className="text-white">Sales Coach</span>
        <span className="text-red-600"> AI</span>
      </h1>
      <h1 className="text-4xl mb-4 text-red-600">{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleAuth} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="mt-4 text-red-600 hover:underline"
      >
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default LoginPage;
