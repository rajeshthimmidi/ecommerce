import React from 'react'
import './LoginPage.css'
import { set, useForm } from 'react-hook-form'
import { login } from '../services/userServices'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = React.useState('')
  const navigate = useNavigate()

    const onSubmit = async(formData) => {
      try {
        const {data} =await login(formData)
        localStorage.setItem('token',data.token)
        window.location ="/"

      }
      catch (err) {
        if(err.response && err.response.status === 400) {
          setError(err.response.data.message)
        }
      }
    }


  return (
    <section className="align-center form-page">
        <form  className="authentication-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div className="form-inputs" >
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                     id="email"
                      name="email" 
                      placeholder="Enter your Email" 
                      {...register('email', { required: true})}
                      className='form-text-input' />
                      {errors.email?.type === 'required' && <em className='form_error'>Enter Email address</em>}
                      {errors.email?.type === 'minLength' && <em className='form_error'>Email must be at least 3 characters</em>}
                </div>
               
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    {...register('password', { required: true, minLength: 6 })}
                    className='form-text-input' />
                    {errors.password?.type === 'required' && <em className='form_error'>Enter Password</em>}
                    {errors.password?.type === 'minLength' && <em className='form_error'>Password must be at least 6 characters</em>} 
                </div>
                {error && <p className='form_error'>{error}</p>}
                <button type="submit" className="form-submit">Submit</button>
            </div>
        </form>
    </section>
  )
}

export default LoginPage