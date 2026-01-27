import getCurrentUser  from '@/app/lib/auth/mongodb'; // your JWT auth function
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function StudentProfilePage() {
  // Get current logged-in user
  const user = await getCurrentUser();

  if (!user) {
    // If user is not logged in, redirect to sign-up
    redirect('/sign-up');
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <div>
          <label className="font-medium">First Name</label>
          <p>{user.firstName || '-'}</p>
        </div>
        <div>
          <label className="font-medium">Last Name</label>
          <p>{user.lastName || '-'}</p>
        </div>
        <div>
          <label className="font-medium">Email</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label className="font-medium">Contact</label>
          <p>{user.contact || '-'}</p>
        </div>
        <div>
          <label className="font-medium">Role</label>
          <p>{user.role || 'student'}</p>
        </div>

        {/* Edit profile button */}
        <Link
          href={`/dashboard/profile/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
