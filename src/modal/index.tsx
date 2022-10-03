import React from 'react'
import { Modal } from 'antd'
import type { ModalProps } from 'antd'
import { useToggle, useToggleWithPayload } from 'u2hooks'

type UModalProps = ModalProps & {
  onOk?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

const UModal = ({ children, onOk, onCancel, ...props }: UModalProps) => {
  const [visible, { onShow, onHide }] = useToggle({
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

const usePayload = (Component: React.ReactNode, defaultPayload: any) =>
  useToggleWithPayload(UModal, Component, defaultPayload)
UModal.show = () => {}
UModal.hide = () => {}
UModal.toggle = () => {}
UModal.usePayload = usePayload

export default UModal
