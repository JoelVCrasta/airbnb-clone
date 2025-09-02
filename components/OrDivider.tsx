import { Separator } from "@/components/ui/separator"

const OrDivider = () => {
  return (
    <div className="flex items-center my-4">
      <Separator className="flex-1" />
      <span className="px-3 text-sm text-muted-foreground">or</span>
      <Separator className="flex-1" />
    </div>
  )
}

export default OrDivider
