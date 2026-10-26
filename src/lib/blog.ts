import config from "@/config/config.json";
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
  } catch {
    return [];
  }
};

export const getBlogPost = (slug: string): Post | undefined => {
  return getBlogPosts().find((post) => post.slug === slug);
};
