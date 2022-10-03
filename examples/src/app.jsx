import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Input, Select } from 'antd'
import 'antd/dist/antd.css'
// import { Button } from 'antd'
// import ModalEdit from './ModalEdit'
// import SearchForm from './SearchForm'
import { USearchForm } from '../../src'

const App = () => {
  const [visible, toggle] = useState(false)
  const onCollapsed = (value) => {
    console.log('onCollapsed', value)
  }
  return (
    <div>
      <USearchForm
        onCollapsed={onCollapsed}
        list={[
          {
            props: {
              name: 'name',
              label: '姓名'
            },
            component: <Input allowClear placeholder='请输入名字' />
          },
          {
            props: {
              name: 'gender',
              label: '性别'
            },
            component: (
              <Select placeholder='默认全部' allowClear>
                {[
                  {
                    value: 1,
                    label: '男'
                  },
                  {
                    value: 2,
                    label: '女'
                  }
                ].map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            )
          },
          {
            props: {
              name: 'phone',
              label: '手机号码'
            },
            component: <Input allowClear placeholder='请输入手机号码' />
          }
        ]}
      />
      {/* <ModalEdit />
      <Button onClick={() => ModalEdit.show()}>show</Button> */}
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
