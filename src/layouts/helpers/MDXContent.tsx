import { formatVisibleSourceCitations } from "@/lib/sourceCitations";
import shortcodes from "@/shortcodes/all";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const MDXContent = ({ content }: { content: any }) => {
  interface IMdxOptions {
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }
  const mdxOptions: IMdxOptions = {
    remarkPlugins: [remarkGfm],
  };
  const source =
    typeof content === "string"
      ? formatVisibleSourceCitations(content)
      : content;

  return (
    <>
      {/* @ts-ignore */}
      <MDXRemote
        source={source}
        components={shortcodes}
        options={{ mdxOptions }}
      />
    </>
  );
};

export default MDXContent;
