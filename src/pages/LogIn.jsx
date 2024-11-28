import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice.js';

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: 'Spacecoders@gmail.com',
    password: '123456',
  }); // Set default fields here
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 400 || res.status === 401 || res.status === 404) {
        dispatch(signInFailure(data.message || 'Login failed'));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://plus.unsplash.com/premium_photo-1683749810514-860f96ad0735" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Sign In</h1>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#059669] focus:bg-white focus:outline-none"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#059669] focus:bg-white focus:outline-none"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="w-full block bg-[#059669] hover:bg-[#059669] focus:bg-[#059669] text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              {loading ? (
                "Loading..."
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <p className="mt-8">Have an account <Link to="/signup" className="text-[#059669] hover:text-[#059669] font-semibold">Sign up</Link></p>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </section>
  );
}
