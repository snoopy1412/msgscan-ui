import Image from "next/image";
import { APP_NAME } from "@/config/site";
import { socialConfig } from "@/config/social";

const currentYear = new Date().getUTCFullYear();

const Footer = () => {
  return (
    <footer className="flex h-[var(--footer-height)] items-center">
      <div className="flex w-full items-center justify-center  md:justify-between">
        <span className="text-sm font-light capitalize text-foreground">
          &copy; {currentYear} {APP_NAME}
        </span>

        <div className="hidden items-center gap-5 md:flex">
          {socialConfig.map(({ url, name, iconPath }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:opacity-80 active:scale-95 active:opacity-60 size-[1.625rem] flex justify-center items-center shrink-0"
            >
              <Image
                src={iconPath}
                width={20}
                height={20}
                alt={`${name} icon`}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
