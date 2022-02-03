import { Layout, Menu } from 'antd';
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

import { PATHS } from '../../constants/paths';
import { getRestaurants } from '../../redux/slices/restaurantsSlice';
import { RootState } from '../../redux/store';
import Header from '../Header/Header';

const { Content, Sider } = Layout;


export default React.memo(function CustomLayout() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state: RootState) => state.restaurants.restaurants);

    useEffect(() => {
        dispatch(getRestaurants());
    }, []);

    return(
        <Layout>
            <Header />
            
            <Layout className="site-layout">
                <Sider trigger={null}>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        {restaurants && restaurants.map(restaurant =>
                            <Menu.Item key={restaurant.id}>
                                <Link to={`${PATHS.restaurants}/${restaurant.name}/${restaurant.id}`}>{restaurant.name}</Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </Sider>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
})