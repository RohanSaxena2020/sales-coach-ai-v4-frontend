import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import ThankYouPage from './ThankYouPage';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import LoginPage from './LoginPage';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phoneNumber: '',
    transcript: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchSubmissions(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const fetchSubmissions = async (userId) => {
    const userDoc = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      setSubmissions(userData.submissions || []);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToken = await user.getIdToken();
  
    try {
      const response = await axios.post(
        'http://localhost:5001/submit',
        { ...formData, userId: user.uid },
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      console.log(response.data.message);
      navigate('/thank-you', { state: { email: formData.email, phoneNumber: formData.phoneNumber } });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to submit form!");
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Error during logout:", error);
    });
  };

  if (!user) {
    return <LoginPage setUser={setUser} />;
  }

  if (submitted) {
    return <ThankYouPage email={formData.email} phoneNumber={formData.phoneNumber} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      <main className="flex-grow bg-gray-100 flex flex-col justify-center items-center py-12">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2">
            <span className="text-black">Sales Coach</span>
            <span className="text-red-600"> AI</span>
          </h1>
          <h3 className="text-2xl text-gray-700 py-4">Upload your sales call transcript and get coaching from an expert AI.</h3>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-3xl mb-4">Previous Submissions</h2>
          <ul className="space-y-2 mb-8">
            {submissions.map((submission, index) => (
              <li key={index} className="bg-gray-200 p-4 rounded-md">
                {submission}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-lg mt-4 max-w-md w-full text-xl"
        >
          New Submission
        </button>
        {isPopupOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <textarea
                  name="transcript"
                  placeholder="Paste your transcript here. This box accepts a LOT of text :)"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows="4"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  Submit
                </button>
              </form>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="mt-4 text-red-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;