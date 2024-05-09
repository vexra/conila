import logout from '@/actions/logout'

export default function LogoutButton({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <form action={logout}>
      <button type="submit">{children}</button>
    </form>
  )
}
