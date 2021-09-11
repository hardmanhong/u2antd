import React from 'react'
import { Form, Input, Select } from 'antd'
import { UModal, UForm } from 'u2antd'
import { useEffect } from 'react'
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
const formProps = {
  list: [
    {
      props: {
        name: 'name',
        label: '姓名',
        rules: [{ required: true, message: '请输入姓名' }]
      },
      component: <Input />
    },
    {
      props: {
        name: 'gender',
        label: '性别',
        rules: [{ required: true, message: '请选择性别' }]
      },
      component: (
        <Select placeholder='请选择'>
          {gender.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
        </Select>
      )
    }
  ]
}

const ModalEdit = ({ onOk }) => {
  const payload = UModal.usePayload(ModalEdit, {})
  const [form] = Form.useForm()
  useEffect(() => {
    console.log('useEffect', payload)
  }, [payload])
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log('values', values)
      ModalEdit.hide()
      onOk()
    })
  }
  const title = payload?.id ? '编辑员工' : '添加员工'
  return (
    <UModal title={title} onOk={handleOk}>
      <UForm form={form} {...formProps} footer={null} />
    </UModal>
  )
}
export default ModalEdit
