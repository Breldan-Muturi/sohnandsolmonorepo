import React from 'react';
import SohnandSolFavicon from '@shadcn/sohnandsolIcons/SohnandSolFavicon.jpg';
import Breldan from '@shadcn/sohnandsolIcons/Breldan illustration-1661213522415.png';
import Image from 'next/image';
import {
  Input,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  GripMenu,
} from '@shadcn/index';
import { Search } from 'lucide-react';
import { cn } from '@shadcn/lib/utils';

type HeaderProps = React.HTMLAttributes<HTMLElement>;

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex w-full py-3 px-5 items-center justify-between',
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <Image src={SohnandSolFavicon} alt="Sohn and Sol Favicon" />
        <p className="font-semibold text-xl font-opensans">Account</p>
      </div>
      <div className="relative flex items-center w-1/3">
        <Search className="h-4 w-4 absolute left-0 ml-2" />
        <Input
          type="search"
          placeholder="Search your account"
          className="pl-8"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Avatar className="ring-2 ring-[#5EE5EB] p-0.5 w-[52px] h-[52px]">
          <AvatarImage
            src={Breldan.src}
            alt="Your profile image"
            className="rounded-full"
          />
          <AvatarFallback>BM</AvatarFallback>
        </Avatar>
        <Button variant="ghost" className="h-10 w-10 p-1">
          <GripMenu />
        </Button>
      </div>
    </div>
  );
};

export default Header;
