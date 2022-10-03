import React, { useMemo } from 'react'
import './style.less'
import { Form, Button, Row, Col, Grid } from 'antd'
import type { FormItemProps, FormProps, ColProps } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useBoolean } from 'u2hooks'
import { isFn } from '../utils'
import {
  DEFAULT_FORM_COL,
  DEFAULT_ITEM_COL,
  getCurScreen,
  getBtnColProps,
  getCollapsedBtnProps,
  getCollapsedColProps
} from './utils'

interface ItemProps {
  props?: FormItemProps
  component: React.ReactNode | (() => any)
  colProps?: ColProps
}
interface SearchFromPropsType extends FormProps {
  row?: number
  col?: ColProps
  buttonColProps?: ColProps
  list?: ItemProps[]
  submit?: string | React.ReactNode
  cancel?: string | React.ReactNode
  onCancel?: () => {}
  onCollapsed?: (isCollapsed: boolean) => {}
  footer?: React.ReactNode
}
/**
 * list Array 渲染的表单项
 * props Object {} Form 组件的参数 https://ant-design.gitee.io/components/form-cn/#Form
 * onFinish Function 表单提交回调函数
 * col: Number 每个表单项的布局 span
 * row: Number 折叠时显示多少行（包含按钮）
 */
const SearchForm = ({
  list = [],
  col = {},
  row = 1,
  buttonColProps,
  onCollapsed,
  ...props
}: SearchFromPropsType) => {
  const [form] = Form.useForm()
  const [isCollapsed, onToggleIsCollapsed] = useBoolean(true)

  const colProps = { ...DEFAULT_ITEM_COL, ...col }
  const onCollapsedChange = () => {
    if (typeof onCollapsed === 'function') {
      onCollapsed(!isCollapsed)
    }
    onToggleIsCollapsed()
  }
  const onReset = () => {
    form.resetFields()
  }

  const colPropsArr = useMemo(
    () => getCollapsedColProps(colProps, list.length, row),
    // eslint-disable-line react-hooks/exhaustive-deps
    [list, row]
  )
  const currentScreen = getCurScreen(Grid.useBreakpoint())
  const isShowCollapsed = colPropsArr.some((i) => i[currentScreen] === 0)
  const _buttonColProps = isCollapsed
    ? isShowCollapsed
      ? getCollapsedBtnProps(colProps)
      : getBtnColProps(colProps, list.length)
    : getBtnColProps(colProps, list.length)
  return (
    <div className='u2antd-search-form'>
      <Form form={form} {...DEFAULT_FORM_COL} {...props}>
        <Row gutter={24}>
          {list
            .filter((i) => Boolean(i.component))
            .map((item, i) => {
              const col = isCollapsed ? colPropsArr[i] : colProps
              return (
                <Col
                  key={
                    Array.isArray(item?.props?.name)
                      ? item?.props?.name.join('-')
                      : item?.props?.name || i
                  }
                  {...col}
                  {...item?.colProps}
                >
                  <Form.Item {...item.props}>
                    {isFn(item.component) ? item.component() : item.component}
                  </Form.Item>
                </Col>
              )
            })}
          <Col
            className='u2antd-search-form-buttonCol'
            {..._buttonColProps}
            {...buttonColProps}
          >
            <Button
              className='u2antd-search-form-btnSubmit'
              type='primary'
              htmlType='submit'
            >
              搜索
            </Button>
            <Button htmlType='button' onClick={onReset}>
              重置
            </Button>
            {isShowCollapsed && (
              <Button type='link' onClick={onCollapsedChange}>
                更多
                <DownOutlined
                  className={`u2antd-search-form-icon ${
                    isCollapsed ? '' : 'u2antd-search-form-icon-up'
                  }`}
                />
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchForm
