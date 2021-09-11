import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'antd'
import { isFn } from '../utils'
import './style.scss'

const DEFAULT_FORM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
const FooterButtons = ({
  submit = '确定',
  cancel = '取消',
  onCancel,
  wrapperCol = {
    offset: DEFAULT_FORM_LAYOUT.labelCol.span,
    span: DEFAULT_FORM_LAYOUT.wrapperCol.span
  }
}) => {
  return (
    (submit || cancel) && (
      <Form.Item wrapperCol={wrapperCol}>
        {submit &&
          (React.isValidElement(submit) ? (
            submit
          ) : (
            <Button
              type='primary'
              htmlType='submit'
              className='u2antd-form-submit'
            >
              {submit}
            </Button>
          ))}
        {cancel &&
          (React.isValidElement(cancel) ? (
            cancel
          ) : (
            <Button onClick={onCancel}>{cancel}</Button>
          ))}
      </Form.Item>
    )
  )
}
const UForm = ({
  forwardedRef,
  list = [],
  submit,
  cancel,
  onCancel,
  footer = FooterButtons,
  ...props
}) => {
  const form = props.form || Form.useForm()[0]
  return (
    <Form
      form={form}
      ref={forwardedRef}
      className='u2antd-form'
      {...DEFAULT_FORM_LAYOUT}
      {...props}
    >
      {list
        .filter((i) => Boolean(i.component))
        .map((item, i) => {
          return (
            <Form.Item key={item?.props?.name || i} {...item.props}>
              {isFn(item.component) ? item.component() : item.component}
            </Form.Item>
          )
        })}
      {footer ? (
        React.isValidElement(footer) ? (
          footer
        ) : (
          <FooterButtons
            onCancel={onCancel}
            submit={submit}
            cancel={cancel}
            wrapperCol={{
              offset:
                props?.labelCol?.span || DEFAULT_FORM_LAYOUT.labelCol.span,
              span:
                props?.wrapperCol?.span || DEFAULT_FORM_LAYOUT.wrapperCol.span
            }}
          />
        )
      ) : null}
    </Form>
  )
}

export default UForm
