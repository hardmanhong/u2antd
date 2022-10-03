import React from 'react'
import { Drawer, DrawerProps } from 'antd'
import { useToggle, useToggleWithPayload } from 'u2hooks'

type UDrawerProps = DrawerProps & {
  onClose?: () => void
  children?: React.ReactNode
}

const UDrawer = ({ children, onClose, ...props }: UDrawerProps) => {
  const [visible, { onHide }] = useToggle({
    Component: UDrawer,
    onCancel: onClose
  })
  return (
    <Drawer {...props} visible={visible} onClose={onHide}>
      {children}
    </Drawer>
  )
}
const usePayload = (Component: React.ReactNode, defaultPayload: any) =>
  useToggleWithPayload(UDrawer, Component, defaultPayload)
UDrawer.show = () => {}
UDrawer.hide = () => {}
UDrawer.toggle = () => {}
UDrawer.usePayload = usePayload

export default UDrawer
