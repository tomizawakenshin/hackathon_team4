import { useSearchParams } from "next/navigation";

export const getIndexParams = (): number => {
  const searchParams = useSearchParams();
  const index = searchParams?.get("index");
  if (index == null) throw new Error("Quiz index is not specified");
  const intIndex = parseInt(index);
  return intIndex;
};
