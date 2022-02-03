import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import './Header.scss';
import { PATHS } from '../../constants/paths';

export default React.memo(function Header() {

    return(
        <Menu mode="horizontal" className={'header'}>
            <Menu.Item>
                <Link to={PATHS.addRestaurant}>Добавить ресторан +</Link>
            </Menu.Item>
            
            <Menu.Item>
                +79509998877
            </Menu.Item>

            <Menu.Item className={'header__logout'}>
                <Link to={PATHS.auth} onClick={() => localStorage.setItem('fakeToken', '')}>Выйти</Link>
            </Menu.Item>
        </Menu>
    );
})