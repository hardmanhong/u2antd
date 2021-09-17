import React from 'react'
import { Row, Col, Pagination, PaginationProps, RowProps } from 'antd'
import './style.scss'

declare const RowJustify: [
  'start',
  'end',
  'center',
  'space-around',
  'space-between'
]

type UPaginationPropsType = PaginationProps &
  RowProps & {
    justify?: typeof RowJustify[number]
    renderLeft?: React.ReactNode
    renderRight?: React.ReactNode
  }

const UPagination = (props: UPaginationPropsType) => {
  const { justify, renderLeft, renderRight } = props
  return (
    <Row
      className='u2antd-pagination'
      justify={justify ? justify : 'end'}
      align='middle'
    >
      {renderLeft && <Col>{renderLeft}</Col>}
      <Col>
        <Pagination {...props} />
      </Col>
      {renderRight && <Col>{renderRight}</Col>}
    </Row>
  )
}

UPagination.defaultProps = {
  justify: 'end',
  size: 'small',
  showQuickJumper: true,
  showLessItems: true,
  pageSizeOptions: ['10', '20', '30', '40'],
  showTotal: (total: number) => <div>共{total}条</div>
}

export default UPagination
