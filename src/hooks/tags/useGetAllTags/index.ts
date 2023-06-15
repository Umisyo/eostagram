import useSWR from "swr";

const fetcher = async (url: string) => {
  return await fetch(url).then(res => res.json()).then(data => data.tags)
}

export default function useGetAllTags() {
  const {data, isLoading} = useSWR('/api/tags/get-all', fetcher);
  return {tags: data, isLoading};
}