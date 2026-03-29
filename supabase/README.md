# Self-hosted Supabase (Compose overlay)

Dieses Repo nutzt eine zusätzliche Compose-Datei, um Supabase selbst zu hosten und via Traefik zu veröffentlichen.

## Start

- Stelle sicher, dass in `.env` alle Supabase-Secrets gesetzt sind (siehe `.env` Hinweise).
- Starte dann beide Compose-Dateien zusammen.

## URL / Routing

- Supabase wird über Kong veröffentlicht.
- Standard: eigene Subdomain, z. B. `SUPABASE_DOMAIN=supabase.festival-find.me`.
- `NEXT_PUBLIC_SUPABASE_URL` in der App muss auf `https://${SUPABASE_DOMAIN}` zeigen.

## Persistenz

- Postgres Daten: Volume `supabase_db_data`
- Storage Dateien: Volume `supabase_storage_data`

## Hinweise

- Diese Compose-Datei ist bewusst „minimal“ (ohne Analytics/Logs, ohne Supavisor, ohne Edge Functions).
- Für volle Supabase-Parität kann man später Services ergänzen (functions, analytics, vector, supavisor, imgproxy).

