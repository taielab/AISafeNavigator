'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';

import { cn } from '@/lib/utils';
import { languages } from '@/i18n';
import { usePathname, useRouter } from '@/app/navigation';

interface FooterProps {
  className?: string;
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink = React.memo(({ href, children }: FooterLinkProps) => (
  <Link 
    href={href}
    className="text-sm text-gray-500 transition-colors duration-200 hover:text-primary"
  >
    {children}
  </Link>
));

FooterLink.displayName = 'FooterLink';

const Footer = React.memo(({ className }: FooterProps) => {
  const t = useTranslations('Footer');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  const footerLinks = [
    { href: '/privacy-policy', label: t('privacy') },
    { href: '/terms-of-service', label: t('termsConditions') },
  ];

  return (
    <footer className={cn('mt-auto border-t border-gray-100', className)}>
      <div className='mx-auto flex max-w-pc flex-col items-center gap-6 px-3 py-8 lg:px-0'>
        <div className='flex flex-col items-center gap-1'>
          <h2 className='text-center text-sm font-bold text-gray-900 lg:text-base'>
            {t('title')}
          </h2>
          <p className='text-center text-xs text-gray-500 lg:text-sm'>
            {t('subTitle')}
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-3'>
          <Globe className="size-4 text-gray-400" />
          <div className='flex flex-wrap items-center gap-2'>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => router.replace(pathname, { locale: lang.lang })}
                className={cn(
                  'text-sm transition-colors duration-200',
                  'rounded px-2 py-1',
                  currentLocale === lang.lang
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-500 hover:text-primary'
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <nav className='flex flex-wrap items-center justify-center gap-5'>
          {footerLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-sm text-gray-500 transition-colors duration-200 hover:text-primary"
              aria-label={t('contactUs')}
            >
              {t('contactUs')}
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
