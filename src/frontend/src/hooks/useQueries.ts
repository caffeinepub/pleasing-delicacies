import { useQuery } from "@tanstack/react-query";

export interface BackendProduct {
  category: string;
  name: string;
  description?: string;
  price?: number;
  [key: string]: unknown;
}

export function useGetAllProducts() {
  return useQuery<BackendProduct[]>({
    queryKey: ["products"],
    queryFn: async () => [],
    enabled: false,
  });
}
