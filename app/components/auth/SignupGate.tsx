'use client';

import { useState } from 'react';

// Shows signup form ONLY when user is not signed in
export default function SignupGate({ isSignedIn }: { isSignedIn: boolean }) {
  if (isSignedIn) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <SignupForm />
    </div>
  );
}

function SignupForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Call your signup API here
    // await fetch('/api/signup', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form),
    // });

    console.log('Signup data:', form);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5"
    >
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-2"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-2"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white rounded-xl py-2 hover:opacity-90"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-sm text-center text-gray-500">
        Already have an account? <span className="text-black cursor-pointer">Sign in</span>
      </p>
    </form>
  );
}
