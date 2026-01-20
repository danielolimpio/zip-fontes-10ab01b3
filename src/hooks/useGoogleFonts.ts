import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GoogleFont {
  id: number;
  name: string;
  category: string;
  variants: string[];
  variantsCount: number;
  subsets: string[];
  version: string;
  lastModified: string;
  googleFontUrl: string;
}

export interface GoogleFontsResponse {
  fonts: GoogleFont[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalFonts: number;
    itemsPerPage: number;
  };
  categories: string[];
}

interface UseGoogleFontsParams {
  page?: number;
  limit?: number;
  sort?: 'popularity' | 'alpha' | 'date' | 'style' | 'trending';
  category?: string;
  search?: string;
}

export function useGoogleFonts({
  page = 1,
  limit = 20,
  sort = 'popularity',
  category = '',
  search = '',
}: UseGoogleFontsParams = {}) {
  return useQuery({
    queryKey: ['google-fonts', page, limit, sort, category, search],
    queryFn: async (): Promise<GoogleFontsResponse> => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
        ...(category && { category }),
        ...(search && { search }),
      });

      const { data, error } = await supabase.functions.invoke('google-fonts', {
        body: null,
        headers: {},
      });

      // If invoke doesn't support query params, use fetch directly
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-fonts?${params}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch fonts');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  });
}
