import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'साथ Saath — Intergenerational Companionship Platform',
  description: 'Connecting senior citizens with verified college students for meaningful conversations, shared hobbies, technology learning, and scheduled quality time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-saath-200 selection:text-saath-900">
        <AppProvider>
          {children}
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
