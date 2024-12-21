'use client';

/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { createClient } from '@/db/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { FORM_PLACEHOLDER, WEBSITE_EXAMPLE } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinning from '@/components/Spinning';

const FormSchema = z.object({
  website: z.string(),
  url: z.string().url(),
});

export default function SubmitForm({ className }: { className?: string }) {
  const supabase = createClient();
  const t = useTranslations('Submit');

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      website: '',
      url: '',
    },
  });

  const onSubmit = async (formData: z.infer<typeof FormSchema>) => {
    let errMsg: any = t('networkError');
    try {
      setLoading(true);
      const { error } = await supabase.from('submit').insert({
        name: formData.website,
        url: formData.url,
        // email: ''
      });
      if (error) {
        errMsg = error.message;
        throw new Error();
      }
      toast.success(t('success'));
      form.reset();
    } catch (error) {
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mx-3 mb-5 flex flex-col justify-between rounded-xl',
          'border border-gray-200 bg-white p-6 shadow-sm',
          'lg:h-auto lg:w-[444px] lg:p-8',
          className,
        )}
      >
        <div className='space-y-4 lg:space-y-6'>
          <FormField
            control={form.control}
            name='website'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>{t('website')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder='AiSecKit'
                    className={cn(
                      'h-11 w-full rounded-lg',
                      'border-gray-200 bg-white',
                      'placeholder:text-gray-400',
                      'focus:border-primary/20 focus:ring-2 focus:ring-primary/20'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='space-y-2'>
                <FormLabel>{t('url')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={FORM_PLACEHOLDER}
                    className={cn(
                      'h-11 w-full rounded-lg',
                      'border-gray-200 bg-white',
                      'placeholder:text-gray-400',
                      'focus:border-primary/20 focus:ring-2 focus:ring-primary/20'
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='mt-8 flex flex-col gap-4'>
          <button
            type='submit'
            disabled={loading}
            className={cn(
              'inline-flex h-11 items-center justify-center',
              'rounded-lg bg-primary px-8 py-2',
              'text-sm font-medium text-white',
              'transition-colors duration-200',
              'hover:bg-primary/90',
              'focus:outline-none focus:ring-2 focus:ring-primary/20',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          >
            {loading ? <Spinning className='size-5' color="white" /> : t('submit')}
          </button>
          <p className='text-sm text-gray-500'>
            {t('add')} <span className='font-medium text-gray-900'>{WEBSITE_EXAMPLE}</span> {t('text')}
          </p>
        </div>
      </form>
    </Form>
  );
}
