import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { createClient } from '@/db/supabase/client';
import { CircleChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib/utils';
import { RevalidateOneHour } from '@/lib/constants';
import { generateMetadata as generateSeoMetadata, generateSearchStructuredData } from '@/lib/utils/seo';
import Faq from '@/components/Faq';
import SearchForm from '@/components/home/SearchForm';
import WebNavCardList from '@/components/webNav/WebNavCardList';
import AdPlacement from '@/components/ad/AdPlacement';
import StructuredData from '@/components/seo/StructuredData';

import { TagList } from './Tag';

const ScrollToTop = dynamic(() => import('@/components/page/ScrollToTop'), { ssr: false });

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.home',
  });

  return generateSeoMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: 'website',
    locale,
  });
}

export const revalidate = RevalidateOneHour;

export default async function Page() {
  const t = await getTranslations('Home');
  const supabase = createClient();

  const [{ data: categoryList }, { data: navigationList }] = await Promise.all([
    supabase.from('navigation_category').select(),
    supabase.from('web_navigation').select().order('collection_time', { ascending: false }).limit(12),
  ]);

  const structuredData = generateSearchStructuredData({
    query: '',
    url: process.env.NEXT_PUBLIC_SITE_URL as string,
  });

  return (
    <div className='flex flex-col'>
      <StructuredData data={structuredData} />
      {/* Hero Section - 全宽背景 */}
      <section className='relative w-full from-primary/5 via-white to-white'>
        <div className='mx-auto max-w-[1200px] px-4 py-8 sm:py-12 lg:py-24'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-6xl'>
              {t('title')}
            </h1>
            <p className='mt-3 sm:mt-4 max-w-[90%] sm:max-w-4xl text-sm sm:text-base text-gray-600 lg:text-lg'>
              {t('subTitle')}
            </p>
            <div className='mt-6 sm:mt-8 lg:mt-12 w-full max-w-[95%] sm:max-w-2xl'>
              <SearchForm className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero下方广告 */}
      <div className='mx-auto w-full max-w-[1200px] px-4'>
        <AdPlacement className="mb-8 sm:mb-12" />
      </div>

      {/* Main Content Container */}
      <div className='mx-auto w-full max-w-[1200px] px-4 py-8 sm:py-12 lg:py-20'>
        <div className='space-y-12 sm:space-y-16 lg:space-y-24'>
          {/* AI Tools Section */}
          <section>
            <div className='mb-6 sm:mb-8'>
              <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 lg:text-4xl'>
                {t('ai-navigate')}
              </h2>
            </div>

            <WebNavCardList 
              dataList={navigationList!}
              className="min-h-[200px]"
            />

            <div className='mt-8 sm:mt-12 flex justify-center'>
              <Link
                href='/explore'
                className={cn(
                  'group flex items-center gap-2 rounded-full',
                  'bg-primary/10 px-4 sm:px-6 py-2.5 sm:py-3',
                  'text-sm font-medium text-primary',
                  'transition-all duration-200',
                  'hover:bg-primary/20'
                )}
              >
                {t('exploreMore')}
                <CircleChevronRight className='size-4 sm:size-5 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
          </section>

          {/* AI Tools和FAQ之间的广告 */}
          <AdPlacement />

          {/* FAQ Section */}
          <section className='rounded-2xl bg-white p-4 sm:p-8 shadow-sm lg:p-12'>
            <Faq />
          </section>

          {/* FAQ下方广告 */}
          <AdPlacement />
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
}
