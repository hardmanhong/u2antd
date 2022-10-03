import React from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'
import './style.less'

interface UTableType<RecordType> extends TableProps<RecordType> {
  name?: React.ReactNode
  options?: React.ReactNode
}

function UTable<T extends object = any>(props: UTableType<T>) {
  const { name, options, ...tableProps } = props
  return (
    <div className='u2antd-table'>
      {(name || options) && (
        <div className='u2antd-table-header'>
          {name && <div className='u2antd-table-name'>{name}</div>}
          {options && <div>{options}</div>}
        </div>
      )}
      <Table {...tableProps} pagination={false} />
    </div>
  )
}

export default UTable
