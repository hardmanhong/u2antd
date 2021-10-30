import React, { useCallback, useEffect, useRef } from 'react'
import { Modal } from 'antd'
import { ModalProps } from 'antd'
import { useToggleCom, useToggleComWithPayload } from 'u2hooks'

type UModalProps = ModalProps & {
  onOk?: () => void
  onCancel?: () => void
  children?: React.ReactNode
}

type useVisibleCallback = (visible: boolean) => void

type UModalFC = React.FC & {
  useVisible: (callback: useVisibleCallback) => void
}
const useVisibleChange = (UModal: UModalFC, visible: boolean) => {
  const callbackRef = useRef<useVisibleCallback>()
  const useVisible = useCallback((callback: useVisibleCallback) => {
    callbackRef.current = callback
  }, [])
  UModal.useVisible = useVisible
  useEffect(() => {
    callbackRef.current?.(visible)
  }, [visible])
}

const UModal = ({ children, onOk, onCancel, ...props }: UModalProps) => {
  const [visible, { onShow, onHide }] = useToggleCom({
    Component: UModal,
    onOk,
    onCancel
  })
  useVisibleChange(UModal, visible)
  return (
    <Modal {...props} visible={visible} onOk={onShow} onCancel={onHide}>
      {children}
    </Modal>
  )
}
const usePayload = (Component: React.ReactNode, defaultPayload: any) =>
  useToggleComWithPayload(UModal, Component, defaultPayload)
UModal.show = () => {}
UModal.hide = () => {}
UModal.toggle = () => {}
UModal.useVisible = (callbck: useVisibleCallback) => {}
UModal.usePayload = usePayload

export default UModal
