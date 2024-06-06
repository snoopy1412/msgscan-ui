type SocialConfig = { url: string; name: string; iconPath: string };

function createSocialConfig(name: string, url: string): SocialConfig {
  return {
    name,
    url,
    iconPath: `/images/social/${name.toLowerCase()}.svg`,
  };
}

export const socialConfig: SocialConfig[] = [
  createSocialConfig("Twitter", "https://twitter.com/DarwiniaNetwork"),
  createSocialConfig("Telegram", "https://t.me/DarwiniaNetwork"),
  createSocialConfig("Github", "https://github.com/darwinia-network"),
];
