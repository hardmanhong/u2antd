import React from 'react'
import { Drawer, DrawerProps } from 'antd'
import { useToggleCom, useToggleComWithPayload } from 'u2hooks'

type UDrawerProps = DrawerProps & {
  onClose?: () => void
  children?: React.ReactNode
}

const UDrawer = ({ children, onClose, ...props }: UDrawerProps) => {
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
const usePayload = (Component: React.ReactNode, defaultPayload: any) =>
  useToggleComWithPayload(UDrawer, Component, defaultPayload)
UDrawer.show = () => {}
UDrawer.hide = () => {}
UDrawer.toggle = () => {}
UDrawer.usePayload = usePayload

export default UDrawer
