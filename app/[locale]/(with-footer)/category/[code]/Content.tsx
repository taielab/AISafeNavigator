/* eslint-disable react/jsx-props-no-spreading */
import { WebNavigation } from '@/db/supabase/types';
import { useTranslations } from 'next-intl';

import Empty from '@/components/Empty';
import ExploreBreadcrumb from '@/components/explore/ExploreBreadcrumb';
import BasePagination from '@/components/page/BasePagination';
import WebNavCard from '@/components/webNav/WebNavCard';
import AdPlacement from '@/components/ad/AdPlacement';

// 每隔多少个项目插入一个广告
const AD_INTERVAL = 8;

export default function Content({
  headerTitle,
  navigationList,
  currentPage,
  total,
  pageSize,
  route,
}: {
  headerTitle: string;
  navigationList: WebNavigation[];
  currentPage: number;
  total: number;
  pageSize: number;
  route: string;
}) {
  const t = useTranslations('Category');

  const renderItems = () => {
    const items: JSX.Element[] = [];
    navigationList.forEach((item, index) => {
      items.push(
        <WebNavCard key={item.id} {...item} />
      );

      // 在每个广告间隔后添加广告
      if ((index + 1) % AD_INTERVAL === 0 && index < navigationList.length - 1) {
        items.push(
          <div key={`ad-${index}`} className="col-span-full">
            <AdPlacement className="w-full" />
          </div>
        );
      }
    });
    return items;
  };

  return (
    <>
      <div className='flex flex-col items-center py-12 lg:py-16'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900 lg:text-5xl'>
            {headerTitle}
          </h1>
          <div className='mt-6'>
            <ExploreBreadcrumb
              items={[
                {
                  href: '/explore',
                  label: t('explore'),
                },
                {
                  href: '#',
                  label: headerTitle,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* 标题下方广告 */}
      <AdPlacement className="mb-8" />

      <div className='mt-3'>
        {navigationList && !!navigationList?.length ? (
          <>
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
              {renderItems()}
            </div>
            {/* 分页上方广告 */}
            <AdPlacement className="my-8" />
            <div className='my-8 flex items-center justify-center lg:my-12'>
              <BasePagination
                currentPage={currentPage}
                total={total}
                pageSize={pageSize}
                route={route}
                subRoute='/page'
              />
            </div>
          </>
        ) : (
          <div className='mb-3 lg:mb-5'>
            <Empty title={t('empty')} />
          </div>
        )}
      </div>
    </>
  );
}
