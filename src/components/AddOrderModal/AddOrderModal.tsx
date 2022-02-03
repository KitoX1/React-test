import { FC, useState } from 'react';
import { Modal, Form, Button, InputNumber, Select } from 'antd';
import { useDispatch } from 'react-redux';

import { addOrder } from '../../redux/slices/ordersSlice';
import { RestaurantCloseModalType } from '../../types/Restaurants';
import { IOrder, OrderType } from '../../types/Order';

const { Option } = Select;


interface AddOrderModalProps {
    restaurantId: any;
    closeModal: (value: RestaurantCloseModalType) => void;
    addModalState: boolean;
}

export const AddOrderModal: FC<AddOrderModalProps> = ({ restaurantId, closeModal, addModalState }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    const [orderType, setOrderType] = useState<OrderType>('hall');

    const onFinish = (values: IOrder) => {
        dispatch(addOrder({...values, restaurantId}));
        closeModal('add');
        form.resetFields();
    }

    return (
        <Modal
        title="Добавить заказ" 
        visible={addModalState}
        onCancel={() => { closeModal('add'); form.resetFields() }}
        footer={null}
        centered
        >
            <Form
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
            initialValues={{ type: 'hall', status: 'new' }}
            >   
                <Form.Item
                name={'orderNumber'}
                label={'Номер заказа'}
                rules={[
                    {
                        required: true,
                        message: 'Заполните поле, пожалуйста'
                    },
                ]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Form.Item
                name={'type'}
                label={'Тип заказа'}
                rules={[
                    {
                        required: true,
                    },
                ]}
                >
                    <Select defaultValue="hall" onSelect={(value: OrderType) => setOrderType(value)}>
                        <Option value="hall">Зал</Option>
                        <Option value="delivery">Доставка</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                name={'status'}
                label={'Статус заказа'}
                rules={[
                    {
                        required: true,
                    },
                ]}
                >
                    <Select defaultValue="new">
                        <Option value="new">Новый</Option>
                        <Option value="cooking">Готовится</Option>
                        <Option disabled={orderType === 'hall' ? true : false} value="assembling">Собирается</Option>
                        <Option value="done">Готов</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                name={'sum'}
                label={'Сумма заказа'}
                rules={[
                    {
                        required: true,
                        message: 'Заполните поле, пожалуйста'
                    },
                ]}
                >                
                    <InputNumber min={1} />  
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={false}>Добавить</Button>
            </Form>
        </Modal>
    )
}