import { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PATHS } from '../constants/paths';
import { RootState } from '../redux/store';

export const NoAuthRedirect: FC<{ children: ReactElement }> = ({children}) => {    
    const auth = useSelector((state: RootState) => state.auth.auth);

    if (!auth) {
        return <Navigate to={PATHS.auth} />
    }

  return children;
}