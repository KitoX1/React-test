import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { store } from "./redux/store";
import { Router } from "./router/Router";

export const App: FC = () => {

    return(
        <BrowserRouter>
            <Provider store={store}>
                <Router />
            </Provider>
        </BrowserRouter>
    );
}