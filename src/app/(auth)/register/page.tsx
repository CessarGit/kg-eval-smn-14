import { RegisterForm } from '@/components/forms/register-form';

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50/50">
      <RegisterForm />
    </main>
  );
}