import { useState } from 'react';
import { Link } from 'react-router-dom';


const SideBar = () => {
  const [pathUrl,setPathUrl] = useState(window.location.pathname);
  const token = localStorage.getItem('token');

  const navStyles = {
    display: token ? 'block !important' : 'none',
  };

  return (
    <div className="sidebar"  data-image="../assets/img/comp.png">
      {/*
    coolers li staamalt'hom https://coolors.co/palette/d8f3dc-b7e4c7-95d5b2-74c69d-52b788-40916c-2d6a4f-1b4332-081c15
  badal mel image-data tag 
*/}
      <div className="sidebar-wrapper">
        <div className="logo">
          <a href="home" className="simple-text">
            <img alt="yes" src="../assets/img/logoEntet.png" height="50px" />
          </a>
        </div>
        <ul className="nav" style={navStyles}>
          <li className={`nav-item${pathUrl=="/"?" active":""}`} onClick={()=>setPathUrl("/")}>
            <Link className="nav-link" to="/">
              <i className="nc-icon nc-icon nc-tv-2" />
              <p>Home</p>
            </Link>
          </li>
          <li className={`nav-item${pathUrl=="/book"?" active":""}`} onClick={()=>setPathUrl("/book")}>
            <Link className="nav-link" to="/book">
              <i className="nc-icon nc-circle-09" />
              <p>Manage Books</p>
            </Link>
          </li>
          <li className={`nav-item${pathUrl=="/category"?" active":""}`} onClick={()=>setPathUrl("/category")}>
            <Link className="nav-link" to="/category">
              <i className="nc-icon nc-paper-2" />
              <p>Manage Category</p>
            </Link>
          </li>
          <li className={`nav-item${pathUrl=="/borrow"?" active":""}`} onClick={()=>setPathUrl("/borrow")}>
            <Link className="nav-link" to="/borrow">
              <i className="nc-icon nc-check-2" />
              <p>Manage Borrwing</p>
            </Link>
          </li>
          <li className={`nav-item${pathUrl=="/subscriber"?" active":""}`} onClick={()=>setPathUrl("/subscriber")}>
            <Link className="nav-link" to="/subscriber">
              <i className="nc-icon nc-circle-09" />
              <p>Manage Subscribers</p>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default SideBar;