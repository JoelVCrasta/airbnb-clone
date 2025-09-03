"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactNode
  footer?: React.ReactNode
  disabled?: boolean
  buttonLabel: string
  secondaryButton?: () => void
  secondaryButtonLabel?: string
}

const Modal = ({
  isOpen = false,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  buttonLabel,
  disabled,
  secondaryButton,
  secondaryButtonLabel,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>

        {/* Body */}
        <div className="space-y-4">{body}</div>

        {/* Footer */}
        <DialogFooter className="flex flex-col gap-3">
          {footer}
          <div className="flex w-full justify-end gap-3">
            {secondaryButton && secondaryButtonLabel && (
              <Button
                variant="outline"
                disabled={disabled}
                onClick={secondaryButton}
              >
                {secondaryButtonLabel}
              </Button>
            )}
            <Button disabled={disabled} onClick={onSubmit}>
              {buttonLabel}
            </Button>
          </div>
        </DialogFooter>

        {/* Close button handled automatically by DialogClose */}
        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}

export default Modal
