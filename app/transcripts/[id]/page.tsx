import { notFound } from 'next/navigation';
import { createServiceRoleClient, type Transcript } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function TranscriptDetailPage({
  params
}: {
  params: { id: string };
}) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('transcripts')
    .select('*')
    .eq('id', params.id)
    .single<Transcript>();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="card">
      <h2>{data.title}</h2>
      <p>
        <strong>ID:</strong> {data.id}
      </p>
      <p>
        <strong>Call Date:</strong> {data.call_date ?? '-'}
      </p>
      <p>
        <strong>Call Type:</strong> {data.call_type ?? '-'}
      </p>
      <p>
        <strong>Participant:</strong> {data.participant_name ?? '-'}
      </p>
      <p>
        <strong>Source:</strong> {data.source ?? '-'}
      </p>
      <p>
        <strong>Source URL:</strong> {data.source_url ?? '-'}
      </p>
      <p>
        <strong>Created At:</strong> {new Date(data.created_at).toLocaleString()}
      </p>
      <h3>Raw Text</h3>
      <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{data.raw_text}</pre>
    </div>
  );
}
