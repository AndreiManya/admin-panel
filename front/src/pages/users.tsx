import { FC, useState } from 'react'
import { Space, Button, Table } from 'antd'
import { StopOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: React.Key
  username: string
  email: string
  password: string
  date: Date
  lastLogin: Date
  status: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'id',
    dataIndex: 'key'
  },
  {
    title: 'username',
    dataIndex: 'username'
  },
  {
    title: 'email',
    dataIndex: 'email',
    responsive: ['sm']
  },
  {
    title: 'password',
    dataIndex: 'password'
  },
  {
    title: 'date',
    dataIndex: 'date',
    responsive: ['sm']
  },
  {
    title: 'lastLogin',
    dataIndex: 'lastLogin',
    responsive: ['sm']
  },
  {
    title: 'status',
    dataIndex: 'status',
    responsive: ['sm']
  }
]
const data: DataType[] = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    username: `Edward King ${i}`,
    password: `pass${i}`,
    email: `email${i}@mgail.com`,
    date: new Date(),
    lastLogin: new Date(),
    status: 'wwdw'
  })
}

const Users: FC = () => {
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
  return (
    <div className="wrapper">
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Button disabled={!hasSelected} danger icon={<StopOutlined />}>
            Block
          </Button>
          <Button type="primary" disabled={!hasSelected} icon={<CheckOutlined />}>
            Unblock
          </Button>
          <Button type="primary" disabled={!hasSelected} danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Space>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}
export default Users
