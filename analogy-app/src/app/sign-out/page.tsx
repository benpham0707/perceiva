// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-b from-blue-50 to-indigo-100">
      <SignUp appearance={{
        elements: {
          card: "shadow-lg rounded-xl bg-white",
          headerTitle: "text-indigo-800 text-2xl font-bold",
          headerSubtitle: "text-gray-600"
        }
      }} />
    </div>
  );
}