import { FC } from 'react'
import { Spin } from 'antd'

const Spinner: FC = () => {
  return (
    <div className="spin-container">
      <Spin size="large"></Spin>
    </div>
  )
}

export default Spinner
