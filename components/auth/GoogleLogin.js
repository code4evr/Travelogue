import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import GoogleLogin from 'react-google-login';
import {
  loginGoogleAuth,
  authenticate,
  isAuth,
} from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import { route } from 'next/dist/next-server/server/router';

const LoginGoogle = () => {
  const responseGoogle = response => {
    console.log(response);
    const tokenId = response.tokenId;
    const user = { tokenId };

    loginGoogleAuth(user).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };
  return (
    <div className="login-with-google-div mt-2">
      <GoogleLogin
        clientId={`${GOOGLE_CLIENT_ID}`}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default LoginGoogle;
