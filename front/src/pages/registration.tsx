import { FC, useContext, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { SIGN_IN, USERS_LIST } from '../routes'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, LoadingContext } from '../App'
import { register } from '../http/userAPI'

const Registration: FC = () => {
  const { setAuth } = useContext(AuthContext)
  const { setLoading } = useContext(LoadingContext)
  const navigate = useNavigate()
  const [name, setName] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const onSubmit = (): void => {
    const fetch = async (): Promise<void> => {
      try {
        setLoading(true)
        await register(name, pass).then((e) => e)
        setAuth(true)
        setLoading(false)
        navigate(USERS_LIST)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch()
  }
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
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
