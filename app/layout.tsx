import { AmandaWidget } from '@/components/AmandaWidget';
import './globals.css';

export const metadata = {
  title: 'JobLink360',
  description: 'Job platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}      <AmandaWidget />`n      </body>
    </html>
  );
}
