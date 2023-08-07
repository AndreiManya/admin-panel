/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC, useContext, useState } from 'react'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { SIGN_IN, USERS_LIST } from '../routes'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, LoadingContext } from '../App'
import { register } from '../http/userAPI'
import { isAxiosError } from 'axios'

const Registration: FC = () => {
  const { setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const onSubmit = (): void => {
    const createUser = async (): Promise<void> => {
      try {
        setLoading(true)
        await register(name, pass, email).then((e) => e)
        setLoading(false)
        message.success('User successfuy registered')
        navigate(USERS_LIST)
      } catch (e) {
        setLoading(false)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-unsafe-member-access
        isAxiosError(e) && message.error(e.response?.data?.message)
      }
    }
    createUser()
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your Email!' },
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          }
        ]}
      >
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value)
          }}
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
