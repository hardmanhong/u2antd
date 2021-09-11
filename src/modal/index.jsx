import React from 'react'
import { Modal } from 'antd'
import { useToggleCom, useToggleComWithPayload } from 'u2hooks'

const UModal = ({ children, onOk, onCancel, ...props }) => {
  const [visible, { onShow, onHide }] = useToggleCom({
    Component: UModal,
    onOk,
    onCancel
  })
  return (
    <Modal {...props} visible={visible} onOk={onShow} onCancel={onHide}>
      {children}
    </Modal>
  )
}
const usePayload = (Component, defaultPayload) =>
  useToggleComWithPayload(UModal, Component, defaultPayload)
UModal.show = () => {}
UModal.hide = () => {}
UModal.toggle = () => {}
UModal.usePayload = usePayload

export default UModal
