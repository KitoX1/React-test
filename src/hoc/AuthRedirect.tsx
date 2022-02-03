import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATHS } from '../constants/paths';
import { RootState } from '../redux/store';

export const AuthRedirect: FC<{ children: ReactElement }> = ({ children }) => { 
    const auth = useSelector((state: RootState) => state.auth.auth);
    const restaurants = useSelector((state: RootState) => state.restaurants.restaurants)

    if (auth) {
        return <Navigate to={restaurants.length ? `${PATHS.restaurants}/${restaurants[0].name}/${restaurants[0].id}` : PATHS.addRestaurant} />
    }

  return children;
}