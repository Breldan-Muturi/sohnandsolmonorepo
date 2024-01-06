'use client';
import React, { useEffect, useState } from 'react';
import Salutations from './components/Salutations';
import { CustomAvatar, Progress, Separator } from '@shadcn/index';
import {
  BellRing,
  HelpCircle,
  Lock,
  Search,
  ShieldCheck,
  Subtitles,
} from 'lucide-react';
import CardHome, { CardHomeProps } from './components/CardHome';
import CardContentItem, {
  CardContentItemProps,
} from './components/CardContentItem';
import CardIcon from './components/CardIcon';
import CardListItem, { CardListItemProps } from './components/CardListItem';
import Image from 'next/image';
import SecureLogo from '@shadcn/sohnandsolIcons/SecureLogo.png';

// Consider making this a global class
interface UserInfo {
  id: string;
  name: string;
  email: string;
  profilePhoto: string;
  notifications: string[];
  securityTips: string[];
  dataprivacy: string[];
  accountSetup?: {
    step: string;
    completed: boolean;
  }[];
}

const Dashboard = () => {
  const [user, setUser] = useState<UserInfo | null>();
  const userNotificationsLength =
    user?.notifications.length && `(${user.notifications.length})`;
  const userSecurityLength =
    user?.securityTips.length && `(${user.securityTips.length})`;

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.debug('Error fetching user: ', error);
      }
    };

    fetchAndSetUser();
  }, []);

  const getUserInfo = async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error fetching the user');
    }
  };

  // Added inside the Component because it will expect dynamic values, such as from the DB;
  const customerOnboardingContent: CardContentItemProps[] = [
    {
      title: 'Account Setup',
      description: 'Completed steps 4/5',
      cardContentIcon: <CustomAvatar />,
      href: '/profile',
      children: <Progress value={80} className="w-full h-2 my-2" />,
    },
    {
      title: 'Support from Sohn and Sol',
      description: 'Get help with our products',
      cardContentIcon: (
        <CardIcon className="w-10 h-10 mt-0 p-2 ring-[#5EE5EB]">
          <Subtitles className="w-6 h-6" />
        </CardIcon>
      ),
      href: '/support',
    },
  ];

  const cardListItems: CardListItemProps[] = [
    {
      title: 'Search your account',
      icon: <Search className="w-6 h-6 mr-3" />,
    },
    {
      title: 'See help options',
      icon: <HelpCircle className="w-6 h-6 mr-3" />,
    },
    {
      title: 'Send us your feedback',
      icon: <Subtitles className="w-6 h-6 mr-3" />,
    },
  ];

  const cards: CardHomeProps[] = [
    {
      title: 'Customer Onboarding',
      subtitle: 'Set up your account for success with our on-boarding guides',
      cardContent: (
        <div className="flex flex-col w-full">
          {customerOnboardingContent.map((item, i) => {
            const hasSeparator = customerOnboardingContent.length > i + 1;
            return (
              <React.Fragment key={`${i}-${item.title}`}>
                <CardContentItem {...item} />
                {hasSeparator && <Separator className="my-3" />}
              </React.Fragment>
            );
          })}
        </div>
      ),
      footerLink: {
        label: 'Manage your account',
        href: '/personalinfo',
      },
    },
    {
      title: 'Most recent Notifications',
      subtitle:
        'Access a compilation of notifications across all your applications',
      icon: (
        <CardIcon>
          <BellRing className="h-8 w-8" />
        </CardIcon>
      ),
      footerLink: {
        label: `Visit the notifications center ${userNotificationsLength}`,
        href: '/notifications',
      },
    },
    {
      title: 'Security tips',
      subtitle:
        'Visit the security tips list to update your profile and make it more secure',
      icon: (
        <CardIcon>
          <ShieldCheck className="h-8 w-8" />
        </CardIcon>
      ),
      footerLink: {
        label: `Review security tips ${userSecurityLength}`,
        href: '/security',
      },
    },
    {
      title: 'Privacy & data management',
      subtitle: 'Manage all your personal info our apps can access',
      icon: (
        <CardIcon>
          <Lock className="h-8 w-8" />
        </CardIcon>
      ),
      footerLink: {
        label: 'Manage your data and privacy settings',
        href: '/dataprivacy',
      },
    },
    {
      title: 'Looking for something else?',
      cardContent: (
        <div className="flex flex-col w-full">
          {cardListItems.map((listItem, i) => {
            const hasSeparator = cardListItems.length > i + 1;
            return (
              <React.Fragment key={`${i}-${listItem.title}`}>
                <CardListItem {...listItem} />
                {hasSeparator && <Separator className="my-3" />}
              </React.Fragment>
            );
          })}
        </div>
      ),
      className: 'col-span-2',
    },
  ];

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <Salutations avatarImage={user?.profilePhoto} />
      <div className="grid grid-cols-2 w-2/3 gap-6">
        {cards.map((card, i) => {
          return <CardHome key={`${i}-${card.title}`} {...card} />;
        })}
      </div>
      <div className="flex w-2/3 p-2 items-center justify-between">
        <p className="text-sm text-gray-600">
          Application specific roles and privileges are managed within
          individual applications.
          <br /> Your organization administrator has control over which services
          you have access to.
        </p>
        <Image src={SecureLogo} alt="Sohn and sol secure logo" />
      </div>
    </div>
  );
};

export default Dashboard;
