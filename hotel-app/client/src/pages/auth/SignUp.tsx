import Form from '../../components/auth/Form'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import { Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from '../../schema/auth.zod'
import { z } from 'zod'
import { createUser } from '../../util/auth.fetch'


const SignUp = () => {
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [checkPassword, setCheckPassword] = useState(false)
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch, reset} = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode:"all",
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  useEffect(() => {
    if(errors.password?.message){
      setCheckPassword(true)
     }else{
      setCheckPassword(false)
     }
  }, [errors.password, checkPassword])


  useEffect(() => {
    if(errors.confirmPassword){
      setCheckConfirmPassword(true)
     }else{
      setCheckConfirmPassword(false)
     }
  }, [errors.confirmPassword, checkConfirmPassword])


  const onSubmit = async(values: z.infer<typeof SignupSchema>) => {
    const { username, email, password } = values
    await createUser({
      username,
      email,
      password
    })
    navigate({
      to:'/sign-in',
      replace:true
    })
    reset({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <main className="w-full min-h-[calc(100vh-4rem)] py-8 grid place-items-center">
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl animate-text bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-black">Create Your Account</h1>
        <p className='text-sm text-slate-500 w-full max-w-xl text-center'>Welcome to KnixxTrav! Wishing you endless happiness on your journey. Explore, discover, and create unforgettable memories. Enjoy every moment and make the most of your adventures!</p>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg flex flex-col gap-6">
          {/* Username Input */}
          <label htmlFor="username" className="flex flex-col gap-2">
            <span className="text-slate-200 text-lg">Username<span className="text-red-400">*</span></span>
            <Input {...register('username')} id='username' name="username" type="text" placeholder="johndoe" minLength={3} className="pl-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4 focus:ring-green-500 invalid:focus:ring-pink-700" />
          </label>
          
          {/* Email Input */}
          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="text-slate-200 text-lg">Email<span className="text-red-400">*</span></span>
            <Input {...register('email')} id="email" name="email" type="email" placeholder="jKd0H@example.com" className="pl-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4 focus:ring-green-500 invalid:focus:ring-pink-700" />
          </label>
          
          {/* Password Input */}
          <label htmlFor="password" className="relative flex flex-col gap-2">
            <span className="text-slate-200 text-lg">Password<span className="text-red-400">*</span></span>
            <Input {...register('password')} minLength={8} id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder={showPassword ? 'Ex@mple123' : '********'} className={`${errors.password?"focus:ring-pink-700":"focus:ring-green-500"} px-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4`} />
            {(checkPassword && watch('password').length>0)&&(
              <p className='text-xs text-pink-500'>Password at Least 8 characters, contains at least one uppercase, number, character</p>
            )}            
            {/* Toggle Password Visibility */}
            <Button onClick={() => setShowPassword(!showPassword)} type="button"  className={`text-slate-200 absolute right-2 text-xl z-10 ${errors.password?.message?"bottom-9":"bottom-3"}`}>
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </Button>
          </label>
          
           {/* confirm Password Input */}
            <label htmlFor="confirmPassword" className="relative flex flex-col gap-2">
              <span className="text-slate-200 text-lg">Confirm password<span className="text-red-400">*</span></span>
              <Input {...register('confirmPassword')} minLength={8} id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder={showConfirmPassword ? 'Ex@mple123' : '********'} className={`${errors.confirmPassword?"focus:ring-pink-700":"focus:ring-green-500"} px-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4`} />
              {(watch('confirmPassword').length>0 && errors.confirmPassword?.message)&&(
                <p className='text-xs text-pink-500'>{errors.confirmPassword?.message}</p>
              )}            
              {/* Toggle Password Visibility */}
              <Button onClick={() => setShowConfirmPassword(!showPassword)} type="button" className={`text-slate-200 absolute right-2 text-xl z-10 ${errors.confirmPassword?.message?"bottom-9":"bottom-3"}`}>
                {!showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </Button>
            </label>

          {/* Submit Button */}
          <Button className="mt-4 animate-text bg-gradient-to-r from-slate-900 via-violet-800 to-slate-900 text-slate-100 py-2.5 rounded-md font-semibold hover:via-yellow-600 active:via-red-700 transition-all duration-100" type="submit">Create</Button>
        </Form>
        
        {/* Sign In Link */}
        <h1 className="text-slate-200 text-lg">Have an account? <Link to="/sign-in" className="text-blue-500 hover:border-b hover:border-blue-50 transition-all duration-1000">Signin</Link></h1>
      </div>
    </main>
  )
}

export default SignUp
