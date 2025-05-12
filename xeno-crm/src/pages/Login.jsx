import React from 'react';

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Login</h1>

        <a
          href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`}
          target="_self"
          rel="noopener noreferrer"
          aria-label="Continue with Google"
          className="w-full flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          <span className="text-sm sm:text-base">Continue with Google</span>
        </a>
      </div>
    </div>
  );
}

export default Login;
