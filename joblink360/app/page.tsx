import { redirect } from 'next/navigation';

export default function Home() {
  // Master entry point redirects to the primary webapp
  redirect('/delite-productions');
}
