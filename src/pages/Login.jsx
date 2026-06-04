import React from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import api from '../libs/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object({
    email: yup.string().email().required("email is required"),
    password: yup.string().required("password is required")
})

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex items-center justify-center">
            <Formik validationSchema={loginSchema} initialValues={{ email: "", password: "" }} onSubmit={async (values) => {
                try {
                    const response = await api.post("/auth/login", values);
                    console.log(response.data);
                    toast.success(response?.data?.message);
                    localStorage.setItem("token", response?.data?.token)
                    navigate("/chat")
                } catch (error) {
                    toast.success("login failed");

                    console.log(error, "error");
                }
            }} >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                    <form className="w-96 p-6 border rounded" onSubmit={handleSubmit}>
                        <h1 className="text-2xl mb-4">Login</h1>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 mb-3"
                            name='email'
                            value={values.email}
                            onChange={handleChange}
                        />
                        {
                            errors.email &&
                            touched.email && (
                                <p className="text-red-500">
                                    {errors.email}
                                </p>
                            )
                        }

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 mb-3"
                            name='password'
                            onChange={handleChange}

                        />
                        {
                            errors.email &&
                            touched.email && (
                                <p className="text-red-500">
                                    {errors.email}
                                </p>
                            )
                        }

                        <button className="w-full bg-black text-white p-2">
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default Login;