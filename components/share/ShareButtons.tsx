'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, MessageCircle, Send, Copy, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

const TwitterShareButton = dynamic(() => import('react-share').then(mod => mod.TwitterShareButton), {
  ssr: false
});
const FacebookShareButton = dynamic(() => import('react-share').then(mod => mod.FacebookShareButton), {
  ssr: false
});
const LinkedinShareButton = dynamic(() => import('react-share').then(mod => mod.LinkedinShareButton), {
  ssr: false
});
const WhatsappShareButton = dynamic(() => import('react-share').then(mod => mod.WhatsappShareButton), {
  ssr: false
});
const TelegramShareButton = dynamic(() => import('react-share').then(mod => mod.TelegramShareButton), {
  ssr: false
});

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  image?: string;
  className?: string;
}

export default function ShareButtons({ url, title, description, image, className = '' }: ShareButtonsProps) {
  const t = useTranslations('Common');
  const [copied, setCopied] = useState(false);
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'AISafeNavigator';
  const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || 'AISafeNavigator';
  const defaultHashtags = (process.env.NEXT_PUBLIC_SHARE_HASHTAGS || 'AI,Tools,Security,Pentesting').split(',');

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(t('copy.success'));
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error(t('copy.failed'));
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-gray-500">{t('share')}:</span>
      <TwitterShareButton
        url={url}
        title={`${title}\n${description}`}
        via={twitterHandle}
        hashtags={defaultHashtags}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label={t('shareOptions.twitter')}
        >
          <Twitter className="h-4 w-4" />
        </Button>
      </TwitterShareButton>

      <FacebookShareButton
        url={`${url}${image ? `?image=${encodeURIComponent(image)}` : ''}`}
        hashtag={`#${defaultHashtags[0]}`}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label={t('shareOptions.facebook')}
        >
          <Facebook className="h-4 w-4" />
        </Button>
      </FacebookShareButton>

      <LinkedinShareButton
        url={url}
        title={title}
        summary={description}
        source={appName}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label={t('shareOptions.linkedin')}
        >
          <Linkedin className="h-4 w-4" />
        </Button>
      </LinkedinShareButton>

      <WhatsappShareButton
        url={url}
        title={`${title}\n${description}`}
        separator=" "
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label={t('shareOptions.whatsapp')}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </WhatsappShareButton>

      <TelegramShareButton
        url={url}
        title={title}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          aria-label={t('shareOptions.telegram')}
        >
          <Send className="h-4 w-4" />
        </Button>
      </TelegramShareButton>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        onClick={handleCopyLink}
        aria-label={t('shareOptions.copyLink')}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
} 