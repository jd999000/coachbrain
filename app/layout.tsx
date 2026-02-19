import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoachBrain',
  description: 'Internal transcript ingestion tool'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>CoachBrain</h1>
          <nav style={{ marginBottom: '16px' }}>
            <Link href="/ingest">Ingest</Link> | <Link href="/transcripts">Transcripts</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
