import * as React from "react"

import { Icons } from "@/components/ui/icons"

// TODO: add i18n locales support
export const Loading = () => {
    return (<div className="flex items-center text-sm text-muted-foreground">
    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    Loading...
  </div>)
}