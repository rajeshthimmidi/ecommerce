import React from 'react'
import './SignupPage.css'
import user from '../../assets/user.webp'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { signup } from '../services/userServices'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    try {
      const response = await signup(formData, profilePic);
      localStorage.setItem('token', response.data.token);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      }
    }
  }

  const [profilePic, setProfilePic] = useState(null)

  return (
    <section className="align-center form_page">
         <form className='signup_form' onSubmit={handleSubmit(onSubmit)}>
                        <h2>SignUp</h2>
        
                        <div className='image_input_section'>
                            <div className='image_preview'>
                                <img src={profilePic ? URL.createObjectURL(profilePic): user } id='file-ip-1-preview' />
                            </div>
                            <label htmlFor='file-ip-1' className='image_label'>
                                Upload Image
                            </label>
                            <input type='file' id='file-ip-1' className='image_input' onChange={(e) => {
                                setProfilePic(e.target.files[0])
                            }} />
                        </div>
        
                        {/* Form Inputs */}
                        <div className='form-inputs signup_form_input'>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    id='name'
                                    className='form-text-input'
                                    type='text'
                                    placeholder='Enter your name'
                                    {...register('name', { required: true, minLength: 3 })}
                                />
                                {errors.name?.type === 'required' && <em className='form_error'>Enter Name</em>}
                                {errors.name?.type === 'minLength' && <em className='form_error'>Name must be at least 3 characters</em>}
                            </div>
        
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input
                                    id='email'
                                    className='form-text-input'
                                    type='email'
                                    placeholder='Enter your email address'
                                    {...register('email', { required: true })}
                                />
                                {errors.email?.type === 'required' && <em className='form_error'>Enter Email Address</em>}
                            </div>
        
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input
                                    id='password'
                                    className='form-text-input'
                                    type='password'
                                    placeholder='Enter your password'
                                    {...register('password', { required: true, minLength: 6 })}
                                />
                                {errors.password?.type === 'required' && <em className='form_error'>Enter Password</em>}
                                {errors.password?.type === 'minLength' && <em className='form_error'>Password must be at least 6 characters</em>}
                            </div>
        
                            <div>
                                <label htmlFor='cpassword'>Confirm Password</label>
                                <input
                                    id='cpassword'
                                    className='form-text-input'
                                    type='password'
                                    placeholder='Enter confirm password'
                                    {...register('confirmPassword', { required: true, minLength: 6 })}
                                />
                                {errors.confirmPassword?.type === 'required' && <em className='form_error'>Enter Password</em>}
                                {errors.confirmPassword?.type === 'minLength' && <em className='form_error'>Password must be at least 6 characters</em>}  
                            </div>
        
                            <div className='signup_textares_section'>
                                <label htmlFor='address'>Delivery Address</label>
                                <textarea
                                    id='address'
                                    className='input_textarea'
                                    placeholder='Enter delivery address'
                                    {...register('address', { required: true })}
                                />
                                {errors.address?.type === 'required' && <em className='form_error'>Enter Delivery Address</em>}
                            </div>
                        </div>
                        {error && <p className='form_error'>{error}</p>}
                        <button className='form-submit' type='submit'>
                            Submit
                        </button>
                    </form>
    </section>
  )
}

export default SignupPage