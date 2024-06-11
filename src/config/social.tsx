import Twitter from '@/components/icon/twitter';
import Telegram from '@/components/icon/telegram';
import Github from '@/components/icon/github';
type SocialConfig = { url: string; name: string; icon: React.ReactNode };

function createSocialConfig(name: string, url: string, icon: React.ReactNode): SocialConfig {
  return {
    name,
    url,
    icon
  };
}

export const socialConfig: SocialConfig[] = [
  createSocialConfig('Twitter', 'https://twitter.com/DarwiniaNetwork', <Twitter />),
  createSocialConfig('Telegram', 'https://t.me/DarwiniaNetwork', <Telegram />),
  createSocialConfig('Github', 'https://github.com/darwinia-network', <Github />)
];
