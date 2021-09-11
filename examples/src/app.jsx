import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import ModalEdit from './ModalEdit'
import SearchForm from './SearchForm'

const App = () => {
  const [visible, toggle] = useState(false)
  return (
    <div>
      <SearchForm />
      <ModalEdit />
      <Button onClick={() => ModalEdit.show()}>show</Button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
