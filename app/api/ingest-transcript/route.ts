import { NextResponse } from 'next/server';
import { createServiceRoleClient, type Transcript } from '@/lib/supabase';

type IngestPayload = {
  title?: unknown;
  raw_text?: unknown;
  call_date?: unknown;
  call_type?: unknown;
  participant_name?: unknown;
  source?: unknown;
  source_url?: unknown;
};

function optionalString(value: unknown): string | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  return typeof value === 'string' ? value : null;
}

export async function POST(request: Request) {
  let payload: IngestPayload;

  try {
    payload = (await request.json()) as IngestPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const title = typeof payload.title === 'string' ? payload.title.trim() : '';
  const rawText = typeof payload.raw_text === 'string' ? payload.raw_text.trim() : '';

  if (!title || !rawText) {
    return NextResponse.json(
      { error: 'Validation failed: title and raw_text are required.' },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  const { data, error } = await supabase
    .from('transcripts')
    .insert({
      title,
      raw_text: rawText,
      call_date: optionalString(payload.call_date),
      call_type: optionalString(payload.call_type),
      participant_name: optionalString(payload.participant_name),
      source: optionalString(payload.source),
      source_url: optionalString(payload.source_url)
    })
    .select('*')
    .single<Transcript>();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
