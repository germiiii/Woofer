
import Link from 'next/link'
import '../Styles/StyledNavHome.css'


export default function Nav({ onLogout }) {
  

  return (
   <nav className='nav-main'>
   
    <input type='checkbox' className='nav-main__btn-collapse' id='nav-main__checkbox'/>
    <label htmlFor='nav-main__checkbox' className='nav-main__btn-collapse-icon'>
        <span className='icon-nav'></span>
        <span className='icon-nav'></span>
        <span className='icon-nav'></span>
    </label>
   
    <div className='nav-main__btn-collaps-bg'></div>

    <div className='nav-main__menu'>
        <a href='/home' className='nav-main__link-item'>Home</a>
        <a href='/' className='nav-main__link-item'>Change Profile</a>
        <a href='/walker-services' className='nav-main__link-item'>Add Walker Service</a>
        <a href='/settings' className='nav-main__link-item'>Settings</a>
        <a href='/' className='nav-main__link-item'>Log Out</a>
    </div>
   </nav>
  );
}

