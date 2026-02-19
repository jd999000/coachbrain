'use client';

import { FormEvent, useState } from 'react';

type ApiResponse = {
  id: string;
  title: string;
  created_at: string;
};

export default function IngestPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get('title'),
      raw_text: formData.get('raw_text'),
      call_date: formData.get('call_date'),
      call_type: formData.get('call_type'),
      participant_name: formData.get('participant_name'),
      source: formData.get('source'),
      source_url: formData.get('source_url')
    };

    const response = await fetch('/api/ingest-transcript', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorPayload = (await response.json()) as { error?: string };
      setMessage(errorPayload.error ?? 'Failed to ingest transcript.');
      setLoading(false);
      return;
    }

    const data = (await response.json()) as ApiResponse;
    event.currentTarget.reset();
    setMessage(`Saved transcript ${data.id}`);
    setLoading(false);
  }

  return (
    <div className="card">
      <h2>Ingest Transcript</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" required />

        <label htmlFor="raw_text">Raw Text *</label>
        <textarea id="raw_text" name="raw_text" rows={10} required />

        <label htmlFor="call_date">Call Date</label>
        <input id="call_date" name="call_date" placeholder="2026-01-14T10:30:00Z" />

        <label htmlFor="call_type">Call Type</label>
        <input id="call_type" name="call_type" />

        <label htmlFor="participant_name">Participant Name</label>
        <input id="participant_name" name="participant_name" />

        <label htmlFor="source">Source</label>
        <input id="source" name="source" />

        <label htmlFor="source_url">Source URL</label>
        <input id="source_url" name="source_url" />

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Transcript'}
        </button>
      </form>
      {message ? <p>{message}</p> : null}
    </div>
  );
}
