import { redirect } from 'next/navigation';

export default function AdminRedirect() {
  // Redirect to the admin dashboard
  redirect('/dashboard');
}