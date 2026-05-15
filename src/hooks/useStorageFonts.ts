import { useQuery } from "@tanstack/react-query";

export interface StorageFont {
  name: string;
  fileName: string;
  size: number;
  url: string;
}

export interface StorageFontsResponse {
  fonts: StorageFont[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalFonts: number;
    itemsPerPage: number;
  };
}

interface Params {
  page?: number;
  limit?: number;
  search?: string;
}

export function useStorageFonts({ page = 1, limit = 24, search = "" }: Params = {}) {
  return useQuery({
    queryKey: ["storage-fonts", page, limit, search],
    queryFn: async (): Promise<StorageFontsResponse> => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
      });
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/storage-fonts?${params}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        },
      );
      if (!res.ok) throw new Error("Falha ao carregar fontes");
      return res.json();
    },
    staleTime: 1000 * 60 * 10,
  });
}
