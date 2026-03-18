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
      <body>{children}</body>
    </html>
  );
}