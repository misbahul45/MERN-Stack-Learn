import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/setting')({
  component: () => <div>Hello /_authenticated/setting!</div>
})