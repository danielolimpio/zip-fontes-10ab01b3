import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

const BUCKET = 'ZipFontes'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = Deno.env.get('ZIPFONTES_SUPABASE_URL')!
    const key = Deno.env.get('ZIPFONTES_SERVICE_ROLE_KEY')!
    const supabase = createClient(url, key)

    const u = new URL(req.url)
    const search = (u.searchParams.get('search') || '').toLowerCase().trim()
    const page = Math.max(1, parseInt(u.searchParams.get('page') || '1'))
    const limit = Math.min(100, Math.max(1, parseInt(u.searchParams.get('limit') || '24')))

    // List all files at root (paginated by Supabase, max 1000 per call)
    const all: { name: string; size: number }[] = []
    let offset = 0
    const pageSize = 1000
    while (true) {
      const { data, error } = await supabase.storage.from(BUCKET).list('', {
        limit: pageSize,
        offset,
        sortBy: { column: 'name', order: 'asc' },
      })
      if (error) throw error
      if (!data || data.length === 0) break
      for (const f of data) {
        const n = f.name.toLowerCase()
        if (n.endsWith('.ttf') || n.endsWith('.otf')) {
          all.push({ name: f.name, size: (f as any).metadata?.size ?? 0 })
        }
      }
      if (data.length < pageSize) break
      offset += pageSize
    }

    // Filter
    const filtered = search
      ? all.filter((f) => f.name.toLowerCase().includes(search))
      : all

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / limit))
    const start = (page - 1) * limit
    const slice = filtered.slice(start, start + limit)

    const fonts = slice.map((f) => {
      const familyName = f.name.replace(/\.(ttf|otf)$/i, '').replace(/[-_]/g, ' ')
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(f.name)
      return {
        name: familyName,
        fileName: f.name,
        size: f.size,
        url: pub.publicUrl,
      }
    })

    return new Response(
      JSON.stringify({
        fonts,
        pagination: { currentPage: page, totalPages, totalFonts: total, itemsPerPage: limit },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
