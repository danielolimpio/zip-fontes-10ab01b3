import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
  category: string;
  kind: string;
  menu: string;
}

interface GoogleFontsResponse {
  kind: string;
  items: GoogleFont[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_FONTS_API_KEY = Deno.env.get("GOOGLE_FONTS_API_KEY");
    
    if (!GOOGLE_FONTS_API_KEY) {
      throw new Error("GOOGLE_FONTS_API_KEY is not configured");
    }

    const url = new URL(req.url);
    const sort = url.searchParams.get('sort') || 'popularity';
    const category = url.searchParams.get('category') || '';
    const search = url.searchParams.get('search') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    // Fetch from Google Fonts API
    const apiUrl = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}&sort=${sort}`;
    
    console.log("Fetching fonts from Google Fonts API...");
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Fonts API error:", response.status, errorText);
      throw new Error(`Google Fonts API error: ${response.status}`);
    }

    const data: GoogleFontsResponse = await response.json();
    
    console.log(`Fetched ${data.items.length} font families`);

    // Filter fonts
    let filteredFonts = data.items;

    // Filter by category
    if (category) {
      filteredFonts = filteredFonts.filter(font => 
        font.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredFonts = filteredFonts.filter(font => 
        font.family.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const totalFonts = filteredFonts.length;
    const totalPages = Math.ceil(totalFonts / limit);
    const startIndex = (page - 1) * limit;
    const paginatedFonts = filteredFonts.slice(startIndex, startIndex + limit);

    // Transform to our format
    const fonts = paginatedFonts.map((font, index) => ({
      id: startIndex + index + 1,
      name: font.family,
      category: font.category,
      variants: font.variants,
      variantsCount: font.variants.length,
      subsets: font.subsets,
      version: font.version,
      lastModified: font.lastModified,
      googleFontUrl: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family)}:wght@400&display=swap`,
    }));

    return new Response(
      JSON.stringify({
        fonts,
        pagination: {
          currentPage: page,
          totalPages,
          totalFonts,
          itemsPerPage: limit,
        },
        categories: ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error in google-fonts function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
