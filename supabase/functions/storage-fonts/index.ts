import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const BUCKET = 'ZipFontes'
const STORAGE_TIMEOUT_MS = 8000

type StorageObject = {
  name: string
  metadata?: { size?: number }
}

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const emptyCatalog = (page: number, limit: number, reason: string) => ({
  fonts: [],
  pagination: { currentPage: page, totalPages: 1, totalFonts: 0, itemsPerPage: limit },
  unavailable: true,
  reason,
})

async function listStorageObjects(baseUrl: string, key: string, search: string, page: number, limit: number) {
  const offset = (page - 1) * limit
  const endpoint = `${baseUrl.replace(/\/$/, '')}/storage/v1/object/list/${BUCKET}`
  const requestBody: Record<string, unknown> = {
    prefix: '',
    limit: limit + 1,
    offset,
    sortBy: { column: 'name', order: 'asc' },
  }

  if (search) requestBody.search = search

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
    signal: AbortSignal.timeout(STORAGE_TIMEOUT_MS),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Storage respondeu com status ${response.status}`)
  }

  return (await response.json()) as StorageObject[]
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = Deno.env.get('ZIPFONTES_SUPABASE_URL')!
    const key = Deno.env.get('ZIPFONTES_SERVICE_ROLE_KEY')!

    const u = new URL(req.url)
    const search = (u.searchParams.get('search') || '').toLowerCase().trim()
    const page = Math.max(1, parseInt(u.searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(u.searchParams.get('limit') || '24')))

    if (!url || !key) return jsonResponse(emptyCatalog(page, limit, 'Configuração do catálogo ausente'))

    const objects = await listStorageObjects(url, key, search, page, limit)
    const filtered = objects.filter((f) => {
      const n = f.name.toLowerCase()
      return n.endsWith('.ttf') || n.endsWith('.otf')
    })
    const hasNextPage = filtered.length > limit
    const slice = filtered.slice(0, limit)

    const fonts = slice.map((f) => {
      const familyName = f.name.replace(/\.(ttf|otf)$/i, '').replace(/[-_]/g, ' ')
      return {
        name: familyName,
        fileName: f.name,
        size: f.metadata?.size ?? 0,
        url: `${url.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(f.name)}`,
      }
    })

    return jsonResponse({
      fonts,
      pagination: {
        currentPage: page,
        totalPages: hasNextPage ? page + 1 : page,
        totalFonts: (page - 1) * limit + fonts.length + (hasNextPage ? 1 : 0),
        itemsPerPage: limit,
      },
    })
  } catch (e) {
    const u = new URL(req.url)
    const page = Math.max(1, parseInt(u.searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(u.searchParams.get('limit') || '24')))
    return jsonResponse(emptyCatalog(page, limit, String(e?.message || e)))
  }
})
