import React from 'react'
import { Drawer } from 'antd'
import { useToggleCom, useToggleComWithPayload } from 'up-use'

const UDrawer = ({ children, onClose, ...props }) => {
  const [visible, { onHide }] = useToggleCom({
    Component: UDrawer,
    onCancel: onClose
  })
  return (
    <Drawer {...props} visible={visible} onClose={onHide}>
      {children}
    </Drawer>
  )
}
const usePayload = (Component, defaultPayload) =>
  useToggleComWithPayload(UDrawer, Component, defaultPayload)
UDrawer.show = () => {}
UDrawer.hide = () => {}
UDrawer.toggle = () => {}
UDrawer.usePayload = usePayload

export default UDrawer
