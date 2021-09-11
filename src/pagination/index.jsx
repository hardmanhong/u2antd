import React from 'react'
import { Row, Col, Pagination } from 'antd'
import './style.scss'

const UPagination = (props) => {
  const { justify, renderLeft, renderRight } = props
  return (
    <Row
      className='u2antd-pagination'
      type='flex'
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
  showTotal: (total) => <div>共{total}条</div>
}

export default UPagination
