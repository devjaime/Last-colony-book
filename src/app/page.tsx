import { TheLastColonyExperience } from "@/components/the-last-colony-experience";
import type { Locale } from "@/lib/locale";

type HomeProps = {
  searchParams: Promise<{
    lang?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const initialLocale: Locale = params.lang === "en" ? "en" : "es";

  return <TheLastColonyExperience initialLocale={initialLocale} />;
}
