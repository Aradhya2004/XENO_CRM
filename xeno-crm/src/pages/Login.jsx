import React from 'react'

function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm text-center">
                <h1 className="text-3xl font-bold mb-2 text-gray-800">Login</h1>

                <button
                    className="w-60 mx-auto mt-5 flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-semibold py-3 rounded-lg transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`}
                    >
                        Continue With Google
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Login
