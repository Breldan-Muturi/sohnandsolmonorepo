import './globals.css';
import { Toaster } from '@shadcn/index';
import { ClerkProvider } from '@clerk/nextjs';
import { Caveat, Open_Sans, Arimo, Alegreya_Sans } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
const opensans = Open_Sans({ subsets: ['latin'], variable: '--font-opensans' });
const arimo = Arimo({ subsets: ['cyrillic'], variable: '--font-arimo' });
const alegrayaLight = Alegreya_Sans({
  subsets: ['cyrillic'],
  weight: '400',
  variable: '--font-alegraya-light',
});
const alegrayaMedium = Alegreya_Sans({
  subsets: ['cyrillic'],
  weight: '500',
  variable: '--font-alegraya-medium',
});

export const metadata = {
  title: 'Easy Travel',
  description:
    'Compare thousands of tours around the world, read in-depth trip reviews and enjoy exclusive online savings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${caveat.variable} ${opensans.variable} ${alegrayaLight.variable} ${alegrayaMedium.variable} ${arimo.variable}`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
