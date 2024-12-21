import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STARTUP_LIST } from '@/lib/constants';
import { Button } from '@/components/ui/button';

import PriceItem from './PriceItem';
import TagItem from './TagItem';

export default function MobileTable() {
  const t = useTranslations('Startup.table');

  return (
    <div className='mb-10 space-y-4 lg:hidden'>
      {STARTUP_LIST.map((item) => (
        <div
          key={item.DA}
          className='flex flex-col gap-3 rounded-xl bg-white p-4 transition-all duration-200 hover:bg-[#F8FAFC] hover:shadow-lg'
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
              <span className='text-lg font-medium text-[#11181C]'>{item.Website}</span>
              <span className='text-sm font-medium text-[#687076]'>DA: {item.DA}</span>
            </div>
            <Button
              asChild
              variant='outline'
              size='sm'
              className='h-9 w-9 border-[#E6E8EB] bg-transparent p-0 text-[#889096] hover:border-primary hover:bg-primary/5 hover:text-primary'
            >
              <a href={item.URL} target='_blank' rel='noreferrer'>
                <SquareArrowOutUpRight className='size-5' />
                <span className='sr-only'>{item.Website}</span>
              </a>
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {item.Tag ? item.Tag.split(',').map((tag) => <TagItem key={tag} title={tag} />) : null}
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-[#687076]'>{t('price')}:</span>
            <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === 'free'} />
          </div>
        </div>
      ))}
    </div>
  );
}
