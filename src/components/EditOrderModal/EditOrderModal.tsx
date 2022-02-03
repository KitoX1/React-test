import { FC, useEffect } from 'react';
import { Modal, Form, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';

import { editOrder } from '../../redux/slices/ordersSlice';
import { IOrder } from '../../types/Order';
import { RestaurantCloseModalType } from '../../types/Restaurants';

const { Option } = Select;


interface EditOrderModalProps {
    order: IOrder,
    closeModal: (value: RestaurantCloseModalType) => void,
    editModalState: boolean
}

export const EditOrderModal: FC<EditOrderModalProps> = ({ order, closeModal, editModalState }) => {
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [order])

    const onFinish = (values: IOrder) => {
        dispatch(editOrder({...order, status: values.status}));
        closeModal('edit');
        form.resetFields();
    }

    return (
        <Modal
        title="Изменить статус" 
        visible={editModalState}
        onCancel={() => { closeModal('edit') }}
        footer={null}
        centered
        >
            <Form
            form={form}
            layout={'vertical'}
            onFinish={onFinish}
            initialValues={{ status: order.status }}
            >   
                <Form.Item
                name={'status'}
                label={'Статус заказа'}
                rules={[
                    {
                        required: true,
                    },
                ]}
                >
                    <Select>
                        <Option key="new" disabled={order.status === 'new'} value="new">Новый</Option>
                        <Option key="cooking" disabled={order.status === 'cooking'} value="cooking">Готовится</Option>
                        <Option key="assembling" disabled={order.type === 'hall' || order.status === 'assembling'} value="assembling">Собирается</Option>
                        <Option key="done" disabled={order.status === 'done'} value="done">Готов</Option>
                    </Select>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={false}>Сохранить</Button>
            </Form>
        </Modal>
    )
}