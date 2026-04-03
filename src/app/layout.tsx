import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'FitBudget',
  description: 'Budget-aware fashion website for complete outfit planning.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 md:px-6">{children}</div>
      </body>
    </html>
  );
}
