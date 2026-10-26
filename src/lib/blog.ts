import config from "@/config/config.json";
import { blogCatalog } from "@/lib/blogCatalog.generated";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { Post, RegularPage } from "@/types";

const blogFolder = config.settings.blog_folder;

export const getBlogIndex = (): RegularPage => {
  return getListPage(`${blogFolder}/_index.md`);
};

export const getBlogPosts = (): Post[] => {
  try {
    return sortByDate(getSinglePage(blogFolder));
  } catch (error) {
    console.error("[blog] Failed to read markdown posts from disk", error);
    return [];
  }
};

export const getBlogPost = (slug: string): Post | undefined => {
  return getBlogPosts().find((post) => post.slug === slug);
};

const isPublished = (date?: string, draft?: boolean) => {
  if (draft) return false;
  if (!date) return true;
  return new Date(date).getTime() <= Date.now();
};

// Bundled catalog used by the dynamic sitemap. This must not touch the
// filesystem: Vercel traces do not include src/content/blog for sitemap.ts,
// so getBlogPosts() returns [] at request time.
export const getBlogSitemapEntries = () =>
  blogCatalog.filter((entry) => isPublished(entry.date, entry.draft));
