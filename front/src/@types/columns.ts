import type { ColumnsType } from 'antd/es/table'
import { IUsersData } from './user'

const columns: ColumnsType<IUsersData> = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'username',
    dataIndex: 'name'
  },
  {
    title: 'email',
    dataIndex: 'email',
    responsive: ['xxl', 'xl', 'lg', 'md', 'sm']
  },
  {
    title: 'password',
    dataIndex: 'password',
    responsive: ['xxl', 'xl']
  },
  {
    title: 'date',
    dataIndex: 'date',
    responsive: ['xxl', 'xl', 'lg', 'md', 'sm']
  },
  {
    title: 'lastLogin',
    dataIndex: 'lastLogin',
    responsive: ['xxl', 'xl', 'lg', 'md']
  },
  {
    title: 'status',
    dataIndex: 'status',
    responsive: ['xxl', 'xl', 'lg', 'md', 'xs']
  }
]
export default columns
