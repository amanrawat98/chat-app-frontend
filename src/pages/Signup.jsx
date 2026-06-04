import React from 'react'
import * as yup from "yup";
import { Formik } from "formik"
import api from '../libs/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const signupSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(4).required("Password is reequired"),
    username: yup.string().required("username is required")
})

const Signup = () => {
    const navigate  = useNavigate();
    return (
        <div className="h-screen flex items-center justify-center">
            <Formik initialValues={{ email: "", password: "", username: "" }} validationSchema={signupSchema} onSubmit={async (values) => {
                try {
                    const response = await api.post("/auth/signup", values);
                    console.log(response.data);
                    localStorage.setItem("token", response?.data?.token)
                    toast.success(response?.data?.message);
                    navigate("/login");
                } catch (error) {
                    console.log(error);
                    toast.error("Signup failed")
                }

            }}>
                {({ values, handleChange, errors, touched, handleSubmit, handleBlur }) => (
                    <form className="w-96 p-6 border rounded" onSubmit={handleSubmit}>
                        <h1 className="text-2xl mb-4">Signup</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 mb-3"
                            value={values.email}
                            onChange={handleChange}
                            name='email'
                              onBlur={handleBlur}

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
                            type="text"
                            placeholder="username"
                            className="w-full border p-2 mb-3"
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                              onBlur={handleBlur}


                        />
                        {
                            errors.username &&
                            touched.username && (
                                <p className="text-red-500">
                                    {errors.username}
                                </p>
                            )
                        }

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 mb-3"
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                              onBlur={handleBlur}


                        />
                        {
                            errors.password &&
                            touched.password && (
                                <p className="text-red-500">
                                    {errors.password}
                                </p>
                            )
                        }

                        <button className="w-full bg-black text-white p-2" type='submit'>
                            Signup
                        </button>
                    </form>
                )}
            </Formik>

        </div>
    );
};

export default Signup;