import { createFileRoute, redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/profile')({
  component: () => <div>Hello /profile!</div>,
  beforeLoad: async ({ context }) => {
    const auth=context.auth
    if (!auth) {
      throw redirect({
        to: '/'
      });
    }
  }
});
