import { Link } from 'react-router-dom';
import AuthContext from '../../auth-store/auth-context';
import React from 'react';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {authCtx.isLoggedIn&& <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {authCtx.isLoggedIn && <li>
            <button onClick={authCtx.logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;