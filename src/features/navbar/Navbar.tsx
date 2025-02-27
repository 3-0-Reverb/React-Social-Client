import {Nav, NavLink } from 'react-bootstrap';
import Logo from '../../assets/images/reverb_logo_final_light.png';
import { Link, useHistory } from 'react-router-dom';
import './navbar.css';

// The props that are allowed to be passed to this.
interface NavigationBarProps {
  loggedIn: string,
}

function switchTheme() {
  let current = document.documentElement.getAttribute("data-theme");
  if(current == "light"){
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme","dark");
  }else{
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme","light");
  }
}

// The function component typed as well as its props defined and typed
// through destructuring.

const NavigationBar = ({ loggedIn }: NavigationBarProps) => {
  //font family and style for the links
  const fontStyle = {
    fontFamily: ''
  };

  const history = useHistory();

  let sideNavBar;
  if (!loggedIn) {
    // Assigning the navbar to a variable to make it easier to use with the return later.
    sideNavBar = 
      <Nav id="navbar" defaultActiveKey="home">

        <NavLink id="homeLink" data-testid="logolink" as={Link} to={"/"} eventKey="home">
          <img
            alt=""
            src={Logo}
            width="100%"
          />
        </NavLink>

        <div id="navbar-links" >

          <button id="theme-button" onClick={() => switchTheme()}>🌞/🌜</button>

          <NavLink as={Link} to={"/login"} id="loginLink" className="navbar-link" eventKey="login-link" onClick={() => history.push("/login")}>
            Login
          </NavLink>

          <NavLink as={Link} to={"/register"} id="registerLink" className="navbar-link" eventKey="register-link" onClick={() => history.push("/register")}>
            Register
          </NavLink>

        </div>
      </Nav>
  } else {
    sideNavBar = 
    <div id="NavbarContainer">
      <Nav id="navbar" defaultActiveKey="home">

        <NavLink id="homeLink" data-testid="logolink" as={Link} to={"/feed"} eventKey="home">
          <img
            alt=""
            src={Logo}
            width="100%"
          />
        </NavLink>

        <div id="navbar-links">

          <button id="theme-button" onClick={() => switchTheme()}>🌞/🌜</button>
          
          <NavLink id="followingFeed" className="navbar-link" as={Link} to={"/following"} eventKey="home">
           Follow Feed
          </NavLink>

          <Nav.Link as={Link} to={"/bookmarks"} className="navbar-link" id="group-Link" eventKey="bookmarks-link" onClick={() => history.push("/bookmarks")}>
            Bookmarks
          </Nav.Link>
          
          <NavLink as={Link} to={"/profile"} id="profileLink" className="navbar-link" eventKey="profile-link" onClick={() => history.push("/profile")}>
            Profile
          </NavLink>



          <Nav.Link as={Link} to={"/createGroup"} className="navbar-link" id="group-Link" eventKey="group-link" onClick ={() => history.push("/createGroup")}>
            Create Group
          </Nav.Link>

          <NavLink as={Link} to={"/discover"} id="discoverLink" className="navbar-link" eventKey="discover-link" onClick={() => history.push("/discover")}>
            Discover
          </NavLink>

          <NavLink as={Link} to={"/logout"} id="logoutLink" className="navbar-link" eventKey="logout-link">
            Logout
          </NavLink>

        </div>
      </Nav>
      </div>
  }

  const theme = localStorage.getItem("data-theme") ? localStorage.getItem("data-theme"): "light";
  document.documentElement.setAttribute("data-theme", theme!);

  return (
    <div>
      {sideNavBar}
    </div>
  );
}

export default NavigationBar;
