import { randomUUID } from 'node:crypto';
import { contentStoreConfigured } from './adminSession';

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function supabaseRest<T>(
  path: string,
  init: RequestInit = {},
  prefer?: string,
): Promise<T> {
  const config = getConfig();
  if (!config) throw new Error('Shared content store is not configured.');

  const isModernSecretKey = config.key.startsWith('sb_secret_');

  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: config.key,
      ...(!isModernSecretKey ? { Authorization: `Bearer ${config.key}` } : {}),
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase REST ${response.status}: ${body.slice(0, 500)}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export async function uploadTrainingFile(file: File, contentType: string) {
  const config = getConfig();
  if (!config || !contentStoreConfigured()) {
    throw new Error('Shared content store is not configured.');
  }

  const safeName = file.name
    .normalize('NFKC')
    .replace(/[^0-9A-Za-z가-힣._-]+/g, '-')
    .replace(/-+/g, '-')
    .slice(-100) || 'file';

  const objectPath = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${safeName}`;

  const isModernSecretKey = config.key.startsWith('sb_secret_');

  const response = await fetch(
    `${config.url}/storage/v1/object/training-files/${encodeURI(objectPath)}`,
    {
      method: 'POST',
      headers: {
        apikey: config.key,
        ...(!isModernSecretKey ? { Authorization: `Bearer ${config.key}` } : {}),
        'Content-Type': contentType,
        'x-upsert': 'false',
      },
      body: Buffer.from(await file.arrayBuffer()),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase Storage ${response.status}: ${body.slice(0, 500)}`);
  }

  return {
    path: objectPath,
    url: `${config.url}/storage/v1/object/public/training-files/${encodeURI(objectPath)}`,
  };
}
