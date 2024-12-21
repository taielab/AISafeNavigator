import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('FooterNavigation.termsConditions');

  return (
    <div className='prose prose-gray mx-auto max-w-4xl p-6'>
      <h1 className='text-gray-900'>{t('1-h1')}</h1>
      <p className='text-gray-600'>{t('1-p')}</p>

      <h2 className='text-gray-900'>{t('2-h2')}</h2>
      <ul className='text-gray-600'>
        <li>{t('2-p')}</li>
      </ul>

      <h2 className='text-gray-900'>{t('3-h2')}</h2>
      <ul className='text-gray-600'>
        <li>{t('3-p')}</li>
      </ul>

      <h2 className='text-gray-900'>{t('4-h2')}</h2>
      <ul className='text-gray-600'>
        <li>
          {t('4-p')}{' '}
          <Link 
            href='/terms-of-service' 
            className='font-medium text-primary hover:text-primary/90'
          >
            {t('terms-of-service')}
          </Link>
        </li>
      </ul>

      <h2 className='text-gray-900'>{t('5-h2')}</h2>
      <ul className='text-gray-600'>
        <li>{t('5-p')}</li>
      </ul>

      <h2 className='text-gray-900'>{t('6-h2')}</h2>
      <ul className='text-gray-600'>
        <li>{t('6-p')}</li>
      </ul>

      <h2 className='text-gray-900'>{t('7-h2')}</h2>
      <ul className='text-gray-600'>
        <li>{t('7-p')}</li>
      </ul>

      <p className='text-gray-600'>{t('last-p')}</p>
    </div>
  );
}
