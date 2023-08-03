import { FC } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { SIGN_IN } from '../routes'
import { Link } from 'react-router-dom'

const Registration: FC = () => {
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      // onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
        Or <Link to={SIGN_IN}>sing in!</Link>
      </Form.Item>
    </Form>
  )
}
export default Registration
