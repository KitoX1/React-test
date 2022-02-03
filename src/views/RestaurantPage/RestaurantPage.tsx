import { FC, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Table, Menu, Button } from 'antd';

import './RestaurantPage.scss'
import { FilterModal } from "../../components/FilterModal/FilterModal";
import { AddOrderModal } from "../../components/AddOrderModal/AddOrderModal";
import { EditOrderModal } from "../../components/EditOrderModal/EditOrderModal";
import { getOrders } from "../../redux/slices/ordersSlice";
import { RootState } from "../../redux/store";
import { IOrder } from "../../types/Order";
import { RestaurantCloseModalType } from "../../types/Restaurants";

const { SubMenu } = Menu;


export const RestaurantPage: FC  = () => {
    const { name, id } = useParams();
    const location = useLocation();
    const storageLocation = localStorage.getItem('location');

    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.orders.orders);
    const loadingInProgress = useSelector((state: RootState) => state.orders.loadingInProgress);
    
    const [selectedOrder, setSelectedOrder] = useState<IOrder>({ orderNumber: 0, type: '', status: '', sum: 0, restaurantId: 0, id: 0 });
    const [addModalState, setAddModalState] = useState<boolean>(false);
    const [editModalState, setEditModalState] = useState<boolean>(false);
    const [filterModalState, setFilterModalState] = useState<boolean>(false);


    interface Icolumns {
        title: string | ReactNode,
        dataIndex: string,
        key: string
    }
    
    const columns: Icolumns[] = [
        {
            title: 'Номер заказа',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Статус заказа',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Тип заказа',
            dataIndex: 'type',
            key: 'type',
        },
        {   
            title: <Button onClick={() => setFilterModalState(true)} className="restaurant__filterBtn">Фильтр</Button>,
            dataIndex: 'action',
            key: 'action'
        }
    ];


    interface Idata {
        key: number,
        orderNumber: number,
        status: string,
        type: string,
        action: ReactNode
    }

    const data: Idata[] = orders.map((order) => { return { 
        key: order.id, 
        orderNumber: order.orderNumber, 
        status: (() => {
        switch (order.status) {
            case 'new':
                return 'Новый';
            case 'cooking':
                return 'Готовится';
            case 'assembling':
                return 'Собирается';
            case 'done':
                return 'Готов';
            default:
                return '';
        }})(), 

        type: (() => {
            switch (order.type) {
                case 'hall':
                    return 'Зал';
                case 'delivery':
                    return 'Доставка';
                default:
                    return '';
        }})(),

        action:  (<Menu mode="inline">
            <SubMenu key="1" title="Изменить">
                <Menu.Item onClick={() => { setEditModalState(true); setSelectedOrder(order) }}>Сменить статус</Menu.Item>
            </SubMenu>
        </Menu>)
    }});

    useEffect(() => {
        if (location.pathname === storageLocation) {
            dispatch(getOrders({ restaurantId: id || 1, filters: localStorage.getItem('filter') || ''}))
        } else {
            dispatch(getOrders({ restaurantId: id || 1, filters: '' }));
            localStorage.setItem('filter', "");
            localStorage.setItem('location', location.pathname);
        }
    }, [id])
     
    const closeModal = (value: RestaurantCloseModalType) => {
        switch (value) {
            case 'add':
                setAddModalState(false);  break;
            case 'filter':
                setFilterModalState(false);  break;
            case 'edit':
                setEditModalState(false);  break;
            default:
                break;
        }
    } 

    return(
        <>
            <span className="restaurant__title">{name}</span>
            <Button onClick={() => setAddModalState(true)} className="restaurant__addBtn">Добавить заказ</Button>

            <Table columns={columns} dataSource={data} loading={loadingInProgress} className="restaurant__table" />
            
            <AddOrderModal closeModal={closeModal} addModalState={addModalState} restaurantId={id} />
            <EditOrderModal closeModal={closeModal} editModalState={editModalState} order={selectedOrder} />
            <FilterModal closeModal={closeModal} filterModalState={filterModalState} restaurantId={id} />
        </>
    );
}