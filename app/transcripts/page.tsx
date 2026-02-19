import Link from 'next/link';
import { createServiceRoleClient, type Transcript } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TranscriptsPage() {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from('transcripts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return (
      <div className="card">
        <h2>Transcripts</h2>
        <p>Failed to load transcripts: {error.message}</p>
      </div>
    );
  }

  const transcripts = (data ?? []) as Transcript[];

  return (
    <div>
      <h2>Last 50 Transcripts</h2>
      {transcripts.length === 0 ? <p>No transcripts found.</p> : null}
      {transcripts.map((transcript) => (
        <div className="card" key={transcript.id}>
          <h3 style={{ marginTop: 0 }}>{transcript.title}</h3>
          <p>
            <strong>Created:</strong> {new Date(transcript.created_at).toLocaleString()}
          </p>
          <Link href={`/transcripts/${transcript.id}`}>View detail</Link>
        </div>
      ))}
    </div>
  );
}
