'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Menu } from 'lucide-react';

import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import LocaleSwitcher from '../LocaleSwitcher';
import NavigationDrawer from './NavigationDrawer';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = NAV_LINKS.map((item) => ({
    ...item,
    label: t(`${item.code}`),
  }));

  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg'>
        <div className='mx-auto flex h-16 max-w-pc items-center justify-between px-3 lg:px-0'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/logo.svg'
              alt='logo'
              width={32}
              height={32}
              className='size-8'
            />
            <span className='text-lg font-bold text-gray-900'>AisecKit</span>
          </Link>

          {/* Right Section: Navigation + LocaleSwitcher */}
          <div className='flex items-center gap-6'>
            {/* Desktop Navigation */}
            <nav className='hidden lg:block'>
              <ul className='flex items-center gap-6'>
                {NavLinks.map((item) => (
                  <li key={item.code}>
                    <Link
                      href={item.href}
                      className={cn(
                        'text-sm font-medium transition-colors duration-200',
                        pathname === item.href || (pathname.includes(item.href) && item.href !== '/')
                          ? 'text-primary'
                          : 'text-gray-600 hover:text-primary'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <LocaleSwitcher />
            
            {/* Mobile Menu Button */}
            <button
              type='button'
              onClick={() => setOpen(true)}
              className='rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden'
              aria-label='Open menu'
            >
              <Menu className='size-5' />
            </button>
          </div>
        </div>
      </header>
      <NavigationDrawer open={open} setOpen={setOpen} />
    </>
  );
}
