'use client';
import { useCurrentSession } from '@/hooks/use-current-session';
import { useSignout } from '@/hooks/use-signout';
import { Loader, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { DottedSeparator } from './dotted-separator';

export default function UserButton() {
  const { data: user, isLoading } = useCurrentSession();
  const { mutate: signOut } = useSignout();

  if (isLoading)
    return (
      <div className='size-10 rounded-full flex items-center justify-center bg-neutral-300'>
        <Loader className='animate-spin size-4 text-muted-foreground' />
      </div>
    );

  const avatarFallback = user?.name ? user.name.charAt(0) : user?.email.charAt(0) ?? 'U';
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='outline-none relative'>
        <Avatar className='size-10 hover:opacity-75 transition border border-neutral-300 cursor-pointer'>
          <AvatarFallback className='bg-neutral-300 font-medium text-neutral-500 flex items-center justify-center'>
            {avatarFallback.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='bottom' className='w-60' sideOffset={10}>
        <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
          <Avatar className='size-[52px] transition border border-neutral-300 cursor-pointer'>
            <AvatarFallback className='bg-neutral-300 font-medium text-xl text-neutral-500 flex items-center justify-center'>
              {avatarFallback.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col items-center justify-center'>
            <p className='text-sm font-medium text-neutral-900 capitalize'>{user?.name || 'User'}</p>
            <p className='text-xs text-neutral-500'>{user?.email}</p>
          </div>
        </div>
        <DottedSeparator className='mb-1' />
        <DropdownMenuItem
          onClick={() => signOut()}
          className='h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer'
        >
          <LogOut className='size-4 mr-2' />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
