import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

const fetchAtivos = async () => {
  const { data } = await api.get("/ativos");
  return data;
};

export function useAtivos() {
  return useQuery({
    queryKey: ["ativos"],
    queryFn: fetchAtivos,
  });
}
