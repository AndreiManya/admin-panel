/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC, useState, useEffect, useContext } from 'react'
import { Space, Button, Table, message } from 'antd'
import { StopOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { changeStatus, getUsers, deleteUsers } from '../http/userAPI'
import { IUsersData } from '../@types/user'
import columns from '../@types/columns'
import { AuthContext } from '../App'
import { Navigate, useNavigate } from 'react-router-dom'
import { SIGN_IN } from '../routes'
import { isAxiosError } from 'axios'

const Users: FC = () => {
  const { setAuth } = useContext(AuthContext)
  const navigate = useNavigate()
  const [data, setData] = useState<IUsersData[] | null>(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]): void => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0
  const selfAction = (): void => {
    const id = localStorage.getItem('user')
    if (id !== null && selectedRowKeys.includes(+id)) {
      setAuth(false)
      navigate(SIGN_IN)
    }
  }
  const fetch = async (): Promise<void> => {
    try {
      setData(null)
      const resp = await getUsers().then((e) => e)
      setData(resp)
    } catch (e) {
      isAxiosError(e) && message.error(e.message)
    }
  }
  const status = async (status: string): Promise<void> => {
    try {
      await changeStatus(selectedRowKeys, status)
      message.success('Users blocked')
      status === 'blocked' && selfAction()
      fetch()
    } catch (e) {
      isAxiosError(e) && message.error(e.message)
    }
  }
  const del = async (): Promise<void> => {
    try {
      await deleteUsers(selectedRowKeys)
      selfAction()
      fetch()
      message.success('Users deleted')
    } catch (e) {
      isAxiosError(e) && message.error(e.message)
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className="wrapper">
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Button
            disabled={!hasSelected}
            onClick={(): void => {
              status('blocked')
            }}
            danger
            icon={<StopOutlined />}
          >
            Block
          </Button>
          <Button
            type="primary"
            disabled={!hasSelected}
            onClick={(): void => {
              status('active')
            }}
            icon={<CheckOutlined />}
          >
            Unblock
          </Button>
          <Button
            type="primary"
            disabled={!hasSelected}
            onClick={(): void => {
              del()
            }}
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
        </span>
      </div>
      {data !== null && (
        <Table
          scroll={{ x: 600, y: 'auto' }}
          rowKey="id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      )}
    </div>
  )
}
export default Users
