import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../../features/auth/authThunk';
import { useAppDispatch } from '../../app/hooks';
import toast, { Toaster } from 'react-hot-toast';

// TypeScript interface for form values
interface SignUpFormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

// Validation Schema using Yup
const validationSchema = Yup.object({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phone: Yup.string().matches(
    /^[0-9]{10}$/,
    'Phone number must be 10 digits'
  ).required('Phone number is required'),
});

const SignUpForm: React.FC = () => {

  const dispatch = useAppDispatch()
  // const {loading, error}= useAppSelector(state => state.auth)
  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <Toaster />
      <h2 className="text-3xl font-bold text-center mb-8">Create an Account</h2>
      
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: SignUpFormValues, { resetForm }) => {
            try {
               const result = dispatch(signupUser({
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                phone: values.phone,
              }));

              await toast.promise(result, {
                loading: "Creating user Account...",
                success: () => {
                  return " User account created";
                },
                error: (err) => {
                  return err?.message || "Signup failed";
                },
              });
              resetForm()
            } catch (error) {
              console.log(error)
            }
        }}
      >
        <Form className="space-y-6">
          {/* First Name */}
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <Field
              id="firstname"
              name="firstname"
              type="text"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="firstname" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <Field
              id="lastname"
              name="lastname"
              type="text"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="lastname" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <Field
              id="phone"
              name="phone"
              type="text"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="phone" component="div" className="text-red-600 text-sm mt-1" />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
