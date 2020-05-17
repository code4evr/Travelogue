import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import NProgress from 'nprogress';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Search from './blogCard/BlogSearch';
import '../style/style.css';

// NProgress.configure(
//   { showSpinner: false },
//   { easing: 'ease', speed: 10000 },
// );

Router.onRouteChangeStart = url => NProgress.set(0);
Router.onRouteChangeComplete = url => NProgress.set(1);
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const firstName = () => {
    let name = [];
    name = isAuth().name.split(' ');
    return name[0];
  };

  const handleScroll = () => {
    const isTop = window.scrollY > 50;
    const nav = document.getElementById('nav');
    if (isTop) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Navbar
        id="nav"
        //color="red"
        light
        expand="md"
        fixed="top"
        className="navbar-styles"
        onScroll={handleScroll}
      >
        <Link href="/">
          <NavLink className="font-weight-bold">TRAVELOGUE</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>Travel Stories</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>

                <NavItem>
                  <Link href="/signup">
                    <NavLink>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 0 && (
              <React.Fragment>
                <NavItem>
                  <Link href="/user">
                    <NavLink>Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/user/contact">
                    <NavLink>Contact</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink>Dashboard</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  onClick={() =>
                    signout(() => Router.replace(`/signin`))
                  }
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
            <Search />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
