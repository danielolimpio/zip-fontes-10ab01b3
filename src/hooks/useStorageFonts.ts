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
  unavailable?: boolean;
  reason?: string;
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
      const payload = await res.json();
      if (!res.ok) throw new Error(payload?.error || "Falha ao carregar fontes");
      return payload;
    },
    staleTime: 1000 * 60 * 10,
  });
}
