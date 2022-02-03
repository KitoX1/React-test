import { FC } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';

import { addRestaurant } from '../../redux/slices/restaurantsSlice';
import { AddRestaurantType } from '../../types/Restaurants';


export const AddRestaurantPage: FC = () => {
    const [form] = Form.useForm();
    
    const dispatch = useDispatch();
    
    const onFinish = (values: AddRestaurantType) => {
        dispatch(addRestaurant(values));   
    }

    return (
        <Form
        form={form}
        layout={'vertical'}
        onFinish={onFinish}
        >   
            <Form.Item
            name={'name'}
            label={'Название'}
            rules={[{
                required: true,
                message: 'Введите Название, пожалуйста',
            }]}
            >
                <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={false}>Добавить</Button>
        </Form>
    );
}