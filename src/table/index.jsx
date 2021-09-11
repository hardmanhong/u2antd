import React from 'react'
import { Table } from 'antd'
import './style.scss'

const UTable = (props) => {
  const { title, options, ...tableProps } = props
  return (
    <div className='u2antd-table'>
      {(title || options) && (
        <div className='u2antd-table-header'>
          {title && <div className='u2antd-table-title'>{title}</div>}
          {options && <div>{options}</div>}
        </div>
      )}
      <Table {...tableProps} pagination={false} />
    </div>
  )
}
export default UTable
