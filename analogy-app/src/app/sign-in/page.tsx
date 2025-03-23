// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-b from-blue-50 to-indigo-100">
      <SignIn appearance={{
        elements: {
          card: "shadow-lg rounded-xl bg-white",
          headerTitle: "text-indigo-800 text-2xl font-bold",
          headerSubtitle: "text-gray-600"
        }
      }} />
    </div>
  );
}