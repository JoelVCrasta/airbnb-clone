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
import { ScrollArea } from "@/components/ui/scroll-area"

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
      <DialogContent className="max-w-lg sm:max-w-3xl max-h-screen flex flex-col">
        {/* Header*/}
        <DialogHeader className="shrink-0">
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>

        {/* Scrollable area */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="space-y-4 p-1">{body}</div>
        </ScrollArea>

        {/* Footer  */}
        <DialogFooter className="shrink-0 flex flex-col gap-3 pt-4">
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

        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}

export default Modal
