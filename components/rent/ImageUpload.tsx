"use client"

import { useCallback } from "react"
import Dropzone from "react-dropzone"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast, Toaster } from "sonner"
import { Input } from "@/components/ui/input"

const MAX_FILES = 5

interface ImageUploadProps {
  value: File[]
  onChange: (value: File[]) => void
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > MAX_FILES) {
        toast.error(`You can only upload up to ${MAX_FILES} images.`)
        return
      }

      onChange([...value, ...acceptedFiles])
    },
    [value, onChange]
  )

  const removeFile = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index)
    onChange(updatedFiles)
  }

  return (
    <>
      <Dropzone onDrop={onDrop} accept={{ "image/*": [] }}>
        {({ getRootProps, getInputProps }) => (
          <section>
            {/* Dropzone area */}
            <Card
              {...getRootProps()}
              className="flex flex-col items-center justify-center m-2 py-14 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-muted shadow-none transition"
            >
              <Input {...getInputProps()} type="file" />
              <div className="text-center space-y-2">
                <p className="text-md text-muted-foreground">
                  Drag & drop images here, or click to select
                </p>
              </div>
            </Card>

            {/* Scrollable image list */}
            {value.length > 0 && (
              <ScrollArea className="min-h-0 h-60 w-full rounded-md p-2">
                <div className="flex flex-col gap-2">
                  {value.map((file, index) => (
                    <Card
                      key={index}
                      className="flex flex-row justify-between relative p-2"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 flex items-center">
                        {/* File details */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.size < 1024 * 1024
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </p>
                        </div>

                        {/* Remove button */}
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </section>
        )}
      </Dropzone>
    </>
  )
}

export default ImageUpload
