import  getCurrentUser  from '@/app/lib/auth/mongodb';
import { redirect } from 'next/navigation';



export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-up');
  }

  return <>{children}</>;
}
