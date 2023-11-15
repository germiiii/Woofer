"use client"
import { useAuthFetch } from '../../Hooks/useAuthFetch';
import { useLoading } from '../../Hooks/useLoading';
import { LoginForm, Input, LoginFooter } from '../Components/LoginForm';
import styles from '../login/LoginStyles.module.scss'

export default function LoginPage() {
  // const { finishLoading, isLoading, startLoading } = useLoading();
  // const authFetch = useAuthFetch();

  
    
  return (
    <>
    <form className={styles.LoginForm}>
      <h1>Sign In</h1>
    <LoginForm>
        <div className='my-[10px] flex flex-col gap-4'>
          <Input
            label='email'
            name='email'
            placeholder='Enter your email address...'
          />
          <Input
            placeholder='Enter your password..'
            label='password'
            name='password'
            type='password'
          />
        </div>
        <button className={styles.button}>
          <span>Sign in</span>
        </button>
        
        <LoginFooter
          description='Forgot your password?'
          link='/forget-password'
          textLink='Recover password'
        />
        <LoginFooter
          description='Don` have an account yet?'
          link='/register'
          textLink='Sign up'
        /> 
      </LoginForm>
    </form>
      
    </>
  );
};
