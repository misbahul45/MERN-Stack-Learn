import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInSchema } from '../../schema/auth.zod';
import { z } from 'zod';
import Form from '../../components/auth/Form';
import Input from '../../components/auth/Input';
import Button from '../../components/auth/Button';
import { AuthContext } from '../../components/Layout/AuthContextProvider';


const SignIn = () => {
  const navigate=useNavigate()
  const { signIn }:AuthContextType=useContext(AuthContext)

  const [showPassword, setShowPassword] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "all",
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  useEffect(() => {
    if (errors.password && errors.password.message) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }, [errors.password, checkPassword]); 

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    const { email, password } = values;
    signIn({ email, password })
    navigate({
      to:'/'
    })
    reset({
      email: '',
      password: ''
    })
  };
  return (
    <main className="w-full h-[calc(100vh-4rem)] py-8 grid place-items-center">
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl animate-text bg-gradient-to-r from-red-500 via-violet-500 to-orange-500 bg-clip-text text-transparent font-black">Log Into KnixxTrav</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg flex flex-col gap-6">
          {/* Email Input */}
          <label htmlFor="email" className="flex flex-col gap-2">
            <span className="text-slate-200 text-lg">Email<span className="text-red-400">*</span></span>
            <Input {...register('email')} id="email" name="email" type="email" placeholder="jKd0H@example.com" className="pl-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4 focus:ring-green-500 invalid:focus:ring-pink-700" />
          </label>

          {/* Password Input */}
          <label htmlFor="password" className="relative flex flex-col gap-2">
            <span className="text-slate-200 text-lg">Password<span className="text-red-400">*</span></span>
            <Input {...register('password')} minLength={8} id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder={showPassword ? 'Ex@mple123' : '********'} className={`${errors.password?"focus:ring-pink-700":"focus:ring-green-500"} px-4 py-2.5 rounded bg-slate-700 text-slate-100 outline-none focus:ring-4`} />
            {checkPassword && watch('password').length > 0 && (
              <p className='text-xs text-pink-500'>Password at Least 8 characters, contains at least one uppercase, number, character</p>
            )}
            {/* Toggle Password Visibility */}
            <Button onClick={() => setShowPassword(!showPassword)} type="button" className={`text-slate-200 absolute right-2 text-xl z-10 ${errors.password?.message ? "bottom-9" : "bottom-3"}`}>
              {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </Button>
          </label>

          {/* Submit Button */}
          <Button className="mt-4 animate-text bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 text-slate-100 py-2.5 rounded-md font-semibold transition-all duration-100" type="submit">Login</Button>
        </Form>

        {/* Sign Up Link */}
        <h1 className="text-slate-200 text-lg"> Don&apos;t Have an account? <Link to="/sign-up" className="text-blue-500 hover:border-b hover:border-blue-50 transition-all duration-1000">Create</Link></h1>
      </div>
    </main>
  );
};

export default SignIn;
