import { Metadata } from 'next';
import { createClient } from '@/db/supabase/client';
import { getTranslations } from 'next-intl/server';

import { RevalidateOneHour } from '@/lib/constants';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import SearchForm from '@/components/home/SearchForm';
import BasePagination from '@/components/page/BasePagination';
import WebNavCardList from '@/components/webNav/WebNavCardList';

const WEB_PAGE_SIZE = 12;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.explore',
  });

  return {
    title: t('title'),
  };
}

export const revalidate = RevalidateOneHour;

export default async function Page({ params }: { params: { pageNum: string; locale: string } }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'Category'
  });
  
  const supabase = createClient();
  const pageNum = parseInt(params.pageNum);
  const start = (pageNum - 1) * WEB_PAGE_SIZE;
  const end = start + WEB_PAGE_SIZE - 1;

  const { data: navigationList, count } = await supabase
    .from('web_navigation')
    .select('*', { count: 'exact' })
    .range(start, end);

  return (
    <div className='flex flex-col'>
      <div className='mb-8 flex flex-col gap-6 lg:mb-12'>
        <ExploreBreadcrumb
          items={[
            {
              href: '/explore',
              label: t('explore'),
            },
          ]}
        />
        <div className='flex w-full items-center justify-center'>
          <SearchForm />
        </div>
      </div>

      <div className='flex flex-col gap-8'>
        <WebNavCardList 
          dataList={navigationList || []} 
          className="min-h-[200px]"
        />
        <div className='flex justify-center'>
          <BasePagination
            currentPage={pageNum}
            pageSize={WEB_PAGE_SIZE}
            total={count || 0}
            route='/explore'
            subRoute='/page'
          />
        </div>
      </div>
    </div>
  );
}
