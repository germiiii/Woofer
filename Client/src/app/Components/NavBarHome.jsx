import Link from "next/link";
import "../Styles/StyledNavHome.css";
import Image from "next/image";

const NavBarHome = ({ onLogout }) => {
  return (
    <nav className="nav-main">
      <div className="logo-container">
        <Image
                src="/LOGOWoofer.png"
                alt="logo"
                width={200}
                height={90}
                className="logo-image"
              />
      </div>
      <input
        type="checkbox"
        className="nav-main__btn-collapse"
        id="nav-main__checkbox"
      />
      <label
        htmlFor="nav-main__checkbox"
        className="nav-main__btn-collapse-icon"
      >
        <span className="icon-nav"></span>
        <span className="icon-nav"></span>
        <span className="icon-nav"></span>
      </label>

      <div className="nav-main__btn-collaps-bg"></div>

      <div className="nav-main__menu">
        <a href="/home" className="nav-main__link-item">
          Home
        </a>
        <a href="/" className="nav-main__link-item">
          View Profile
        </a>
        <a href="/add-dogs" className="nav-main__link-item">
         Add dogs
        </a>
        <a href="/safety" className="nav-main__link-item">
         Safety
        </a>
        <a href="/settings" className="nav-main__link-item">
          Settings
        </a>
        <a href="/" className="nav-main__link-item">
          Log Out
        </a>
      </div>
    </nav>
  );
}

export default NavBarHome
