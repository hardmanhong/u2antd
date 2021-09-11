import React from 'react'
import { Input, Select } from 'antd'
import { useHistory } from 'react-router-dom'
import { UForm } from 'u2antd'
const gender = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
]
const SearchForm = () => {
  const onSearch = (values) => {
    console.log('onSearch', values)
  }
  const history = useHistory()
  const handleCancel = () => {
    console.log('history', history)
    history?.goBack()
  }
  return (
    <UForm
      submit='保存'
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
              {gender.map((item) => (
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
      onFinish={onSearch}
      onCancel={handleCancel}
    />
  )
}

export default SearchForm
