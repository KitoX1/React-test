import { Route, Routes, Navigate } from "react-router-dom";
import { FC } from "react";

import { PATHS } from "../constants/paths";
import { AddRestaurantPage } from "../views/AddRestarauntPage/AddRestaurantPage";
import { RestaurantPage } from "../views/RestaurantPage/RestaurantPage";
import CustomLayout from "../components/CustomLayout/CustomLayout";
import { LoginPage } from "../views/LoginPage/LoginPage";
import { NoAuthRedirect } from "../hoc/NoAuthRedirect";
import { AuthRedirect } from "../hoc/AuthRedirect";

export const Router: FC = () => {
    
    return (
        <Routes>
            <Route element={<NoAuthRedirect> 
                <CustomLayout /> 
            </NoAuthRedirect>}>
                <Route path={PATHS.addRestaurant} element={<AddRestaurantPage />} />
                <Route path={`${PATHS.restaurants}/:name/:id`} element={<RestaurantPage />} />
            </Route>

            <Route path={PATHS.auth} element={<AuthRedirect>
                <LoginPage />
            </AuthRedirect>} />

            <Route path="*" element={<Navigate to={PATHS.addRestaurant} replace />} />
        </Routes>      
    );
}