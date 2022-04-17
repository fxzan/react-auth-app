import classes from './ProfileForm.module.css';
import React from 'react';
import AuthContext from '../../auth-store/auth-context';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const authCtx = React.useContext(AuthContext);
  const passwordRef = React.useRef();
  const history = useHistory();

  function changePasswordHandler(event) {
    event.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAAjm7LaO4Ai0IvYIZChtaatt3V69up0Ro",
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        header: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
          if (res.ok) {
            return res.json().then((data) => {
              console.log(data);
              history.replace('/')
              authCtx.login(data.idToken);
            });
          } else {
            return res.json().then(data => alert(data.error.message))
          }
        });
  }

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
