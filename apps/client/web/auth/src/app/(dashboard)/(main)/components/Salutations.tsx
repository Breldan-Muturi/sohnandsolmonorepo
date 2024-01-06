import React from 'react';
import AvatarCustom from '../../components/AvatarCustom';
import Breldan from '@shadcn/sohnandsolIcons/Breldan illustration-1661213522415.png';

interface SalutationsProps {
  avatarImage?: string;
}

const Salutations: React.FC<SalutationsProps> = ({ avatarImage }) => {
  return (
    <section className="flex flex-col items-center space-y-2">
      <AvatarCustom
        imageSrc={avatarImage ?? Breldan.src}
        fallBack="BM"
        className="w-[84px] h-[84px]"
      />
      <h2 className="font-semibold text-xl">Welcome, Breldan Muturi</h2>
      <p className="text-sm text-gray-600">
        Quickly access your applications and manage your profile
      </p>
    </section>
  );
};

export default Salutations;
