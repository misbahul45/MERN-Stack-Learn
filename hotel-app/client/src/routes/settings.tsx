import { createFileRoute } from '@tanstack/react-router'
import Settings from '../pages/setting/Settings'

export const Route = createFileRoute('/settings')({
  component:SettingsPages,
})


function SettingsPages(){
  return(
    <Settings />
  )
}