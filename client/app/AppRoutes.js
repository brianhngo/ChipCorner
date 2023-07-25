import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import AdminAddChips from './AdminAddChips';
import AdminEditChips from './AdminEditChips';
import SingleProduct from './SingleProduct';
import { me } from './store';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route path='/chips/:id' element={<SingleProduct />} />

        {isLoggedIn ? (
          <>
            <Route path='/chips/:id' element={<SingleProduct />} />
            <Route path='/home' element={<Home />} />
          </>
        ) : (
          <>
            <Route path='/chips/:id' element={<SingleProduct />} />
            <Route
              path='/login'
              element={<AuthForm name='login' displayName='Login' />}
            />
            <Route path='/addchips' element={<AdminAddChips/>}/>
            <Route path='/editchips' element={<AdminEditChips/>}/>
            <Route
              path='/signup'
              element={<AuthForm name='signup' displayName='Sign Up' />}
            />
            <Route
              path='/*'
              element={<AuthForm name='login' displayName='Login' />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;
