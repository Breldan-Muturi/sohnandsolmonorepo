import { Button } from '@shadcn/index';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoginButtonProps {
  isSubmitting?: boolean;
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  isSubmitting = false,
}) => {
  return (
    <Button
      variant="default"
      className="bg-[#5EE5EB] col-span-2 text-[#030C4F]"
      disabled={isSubmitting}
    >
      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoginButton;
