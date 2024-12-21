import { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { generateMetadata as generateSeoMetadata } from '@/lib/utils/seo';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'NotFound',
  });

  const siteName = process.env.NEXT_PUBLIC_APP_NAME || 'AISafeNavigator';

  return generateSeoMetadata({
    title: t('metadata.title', { siteName }),
    description: t('metadata.description'),
    keywords: t('metadata.keywords').split(','),
    type: 'website',
    locale,
  });
}

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-8 text-2xl font-semibold text-gray-700">{t('title')}</h2>
        <p className="mb-8 text-gray-600">{t('description')}</p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {t('goHome')}
        </Link>
      </div>
      <div className="mt-12 text-center">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">{t('suggestions.title')}</h3>
        <ul className="space-y-2 text-gray-600">
          <li>{t('suggestions.check')}</li>
          <li>{t('suggestions.refresh')}</li>
          <li>{t('suggestions.contact')}</li>
        </ul>
      </div>
    </div>
  );
}
