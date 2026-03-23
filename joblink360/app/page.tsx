// app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to sovereign dashboard
  redirect('/sovereign-dashboard');
}
