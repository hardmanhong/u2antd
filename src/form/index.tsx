import React from 'react'
import { FormProps, FormItemProps, ColProps } from 'antd'
import { Form, Button } from 'antd'
import { isFn } from '../utils'
import './style.scss'

const DEFAULT_FORM_LAYOUT = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
type FooterButtonsType = {
  submit?: React.ReactNode
  cancel?: React.ReactNode
  onCancel?: React.MouseEventHandler<HTMLElement>
  wrapperCol?: ColProps
}
const FooterButtons = ({
  submit = '确定',
  cancel = '取消',
  onCancel = () => {},
  wrapperCol = {
    offset: DEFAULT_FORM_LAYOUT.labelCol.span,
    span: DEFAULT_FORM_LAYOUT.wrapperCol.span
  }
}: FooterButtonsType) => {
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
interface ItemProps {
  props?: FormItemProps
  component: React.ReactNode | (() => any)
}

interface UFromPropsType extends FormProps {
  list?: ItemProps[]
  submit?: string | React.ReactNode
  cancel?: string | React.ReactNode
  onCancel?: () => {}
  footer?: React.ReactNode
}

const UForm = ({
  list = [],
  submit,
  cancel,
  onCancel,
  footer = FooterButtons,
  ...props
}: UFromPropsType) => {
  const form = props.form || Form.useForm()[0]
  return (
    <Form
      form={form}
      className='u2antd-form'
      {...DEFAULT_FORM_LAYOUT}
      {...props}
    >
      {list
        .filter((i) => Boolean(i.component))
        .map((item, i) => {
          return (
            <Form.Item key={item?.props?.id || i} {...item.props}>
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
                (props?.labelCol?.span as number) ||
                DEFAULT_FORM_LAYOUT.labelCol.span,
              span:
                (props?.wrapperCol?.span as number) ||
                DEFAULT_FORM_LAYOUT.wrapperCol.span
            }}
          />
        )
      ) : null}
    </Form>
  )
}

export default UForm
