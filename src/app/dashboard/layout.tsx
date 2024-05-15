import LogoutButton from '@/components/auth/logout-button'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Home, Mail, PanelLeft, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-zinc-100 sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center rounded-full"
          >
            <Image
              src="/images/android-chrome-512x512.png"
              alt="Conila Logo"
              width={32}
              height={32}
            />
            <span className="sr-only">Conila</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/letters"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Surat</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Surat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="justify-cente flex h-10 w-10 shrink-0 items-center rounded-full"
                >
                  <Image
                    src="/images/android-chrome-512x512.png"
                    alt="Conila Logo"
                    width={32}
                    height={32}
                  />
                  <span className="sr-only">Conila</span>
                </Link>
                <Link href="/" className="flex items-center gap-4 px-2.5">
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/letters"
                  className="flex items-center gap-4 px-2.5"
                >
                  <Mail className="h-5 w-5" />
                  Surat
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-auto overflow-hidden rounded-full"
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton>Logout</LogoutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}
