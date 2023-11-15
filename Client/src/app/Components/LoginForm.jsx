import { createContext, useState, useContext } from 'react';
import Link from 'next/link';
import styles from '../login/LoginStyles.module.scss'

const FormContext = createContext();

export function LoginForm({ title, children, onSubmit, description }) {
  const [formValues, setFormValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export function Input({ label, name, placeholder, type }) {
  const { formValues, setFormValues } = useContext(FormContext);

  const handleChange = (event) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export function LoginFooter({ description, link, textLink }) {
  return (
    <div className='w-full flex justify-center mt-3'>
      <span className='text-lg lg:text-xl'>
        {description}{' '}
        <Link href={link}>
          <p className='font-bold'>{textLink}</p>
        </Link>
      </span>
    </div>
  );
}

LoginForm.Input = Input;
LoginForm.Footer = LoginFooter;
