import { Form, Button, InputNumber } from 'antd';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkPhoneCode, checkPhoneNumber } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { PhoneCodeRequestType, PhoneNumberRequestType } from '../../types/Auth';

export const LoginPage: FC = () => {
    const [form] = Form.useForm();
    
    const dispatch = useDispatch();
    const phoneNumber = useSelector((state: RootState) => state.auth.phoneNumber);
        
    const onFinish = (values: PhoneCodeRequestType | PhoneNumberRequestType) => {
        {!phoneNumber 
        ? dispatch(checkPhoneNumber(values))
        : dispatch(checkPhoneCode(values));
        }
    }
    
    return (
        <Form
        form={form}
        layout={'vertical'}
        onFinish={onFinish}
        initialValues={ phoneNumber ? { phoneNumber: 9509998877 } : undefined }
        >   
            <Form.Item
            name={'phoneNumber'}
            label={'Номер телефона'}
            rules={[{
                required: true,
                message: 'Введите Номер телефона, пожалуйста',
            }]}
            >
                <InputNumber disabled={phoneNumber} addonBefore="+7" controls={false} />
            </Form.Item>

            {phoneNumber &&
            <Form.Item
            name={'phoneCode'}
            label={'Код'}
            rules={[{
                required: true,
                message: 'Введите Код, пожалуйста',
            }]}
            >
                <InputNumber controls={false} />
            </Form.Item>
            }
            
            <Button type="primary" htmlType="submit" loading={false}>{!phoneNumber ? 'Авторизоваться' : 'Отправить' }</Button>
        </Form>
    );
}