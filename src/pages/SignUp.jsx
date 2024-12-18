import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="https://plus.unsplash.com/premium_photo-1683749810514-860f96ad0735" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" onSubmit={handleSubmit} >
            <div>
              <label className="block text-gray-700">User Name</label>
              <input
                type='text'
                placeholder='username'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#059669] focus:bg-white focus:outline-none'
                id='username'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type='email'
                placeholder='email'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#059669] focus:bg-white focus:outline-none'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type='password'
                placeholder='password'
                className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#059669] focus:bg-white focus:outline-none'
                id='password'
                onChange={handleChange}
              />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-[#059669] focus:text-[#059669]">Forgot Password?</a>
            </div>

            <button
              disabled={loading}
              onClick={handleSubmit}
              className='w-full block bg-[#059669] hover:bg-[#059669] focus:bg-[#059669] text-white font-semibold rounded-lg px-4 py-3 mt-6'
            >
              {loading ? <div className=' items-center flex justify-center'>< svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-live="polite" aria-busy="true" aria-labelledby="title-08a desc-08a" className="w-6 h-6">
                  <path d="M7 8H3V16H7V8Z" className="fill-sky animate animate-bounce " />
                  <path d="M14 8H10V16H14V8Z" className="fill-sky animate animate-bounce  [animation-delay:.2s]" />
                  <path d="M21 8H17V16H21V8Z" className="fill-sky animate animate-bounce  [animation-delay:.4s]" />
                </svg></div> : 'Sign Up'}
            </button>

          </form>


          <hr className="my-6 border-gray-300 w-full" />


          <p className="mt-8">Have an account <Link to={'/login'} className="text-[#059669] hover:text-[#059669] font-semibold">Log In</Link></p>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>

      </div>

    </section>

  );
}