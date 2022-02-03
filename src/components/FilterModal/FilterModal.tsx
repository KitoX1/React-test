import { FC, useEffect } from 'react';
import { Modal, Form, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';

import { getOrders } from '../../redux/slices/ordersSlice';
import { RestaurantCloseModalType } from '../../types/Restaurants';
import { GetOrderType, IOrder } from '../../types/Order';


interface FilterOrderModalProps {
    restaurantId: any,
    closeModal: (value: RestaurantCloseModalType) => void,
    filterModalState: boolean
}

export const FilterModal: FC<FilterOrderModalProps> = ({ restaurantId, closeModal, filterModalState }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();


    interface IoptionsType {
        label: 'Доставка' | 'Зал',
        value: 'type=delivery&' | 'type=hall&'
    }

    const optionsType: IoptionsType[] = [
        { label: 'Доставка', value: 'type=delivery&' },
        { label: 'Зал', value: 'type=hall&' },
    ];


    interface IoptionsStatus {
        label: 'Новый' | 'Готовится' | 'Собирается' | 'Готов',
        value: 'status=new&' | 'status=cooking&' | 'status=assembling&' | 'status=done&'
    }

    const optionsStatus: IoptionsStatus[] = [
        { label: 'Новый', value: 'status=new&' },
        { label: 'Готовится', value: 'status=cooking&' },
        { label: 'Собирается', value: 'status=assembling&' },
        { label: 'Готов', value: 'status=done&' }
    ];

    useEffect(() => {
        form.resetFields();
    }, [restaurantId])

    const onFinish = (values: any) => {
        const newValues: GetOrderType = { 
            restaurantId, 
            filters: (values.type.length === 0 && values.status.length === 0) 
            ? '' 
            : [...values.type, ...values.status].reduce((prev, cur) => prev + cur)
        }
        dispatch(getOrders(newValues));
        closeModal('filter');
        localStorage.setItem('filter', newValues.filters);
    }

    return (
        <Modal
        title="Фильтр" 
        visible={filterModalState}
        onCancel={() => closeModal('filter')}
        footer={null}
        centered
        >
            <Form
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
            initialValues={{ type: [], status: [] }}
            >   
                <Form.Item
                name={'type'}
                label={'Тип заказа'}
                >
                    <Checkbox.Group name="Тип заказа" options={optionsType} />
                </Form.Item>

                <Form.Item
                name={'status'}
                label={'Статус заказа'}
                >                
                    <Checkbox.Group name="Статус заказа" options={optionsStatus} />    
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={false}>Сохранить</Button>
            </Form>
        </Modal>
    )
}