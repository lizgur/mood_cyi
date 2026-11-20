const FOOTNOTE_MARKER = /\[\^(\d+)\]/g;
const FOOTNOTE_RUN = /(?:\[\^(\d+)\])+/g;
const SOURCE_SUP = String.raw`<sup><a href="#source-(\d+)">\d+</a></sup>`;
const ADJACENT_SOURCE_SUPS = new RegExp(
  `(?:${SOURCE_SUP})(?:\\s*${SOURCE_SUP})+`,
  "g",
);

const sourceLink = (n: string) => `<a href="#source-${n}">${n}</a>`;
const sourceSup = (nums: string[]) => `<sup>${nums.map(sourceLink).join(",")}</sup>`;

/** Turn `[^n]` / `[^n][^m]` into superscript links to `#source-n`. */
export const linkifyFootnoteMarkers = (text: string): string => {
  if (!text) return text;
  return text.replace(FOOTNOTE_RUN, (match) => {
    const nums = [...match.matchAll(FOOTNOTE_MARKER)].map((m) => m[1]);
    return sourceSup(nums);
  });
};

/**
 * Join back-to-back `#source-n` superscripts so 6 then 7 reads as "6,7"
 * instead of a merged "67".
 */
export const joinAdjacentSourceSuperscripts = (text: string): string => {
  if (!text) return text;
  return text.replace(ADJACENT_SOURCE_SUPS, (match) => {
    const nums = [...match.matchAll(/#source-(\d+)/g)].map((m) => m[1]);
    return sourceSup(nums);
  });
};

/** Visible-body transform: `[^n]` markers and adjacent source superscripts. */
export const formatVisibleSourceCitations = (text: string): string =>
  joinAdjacentSourceSuperscripts(linkifyFootnoteMarkers(text));

/** Strip `[^n]` markers for FAQPage JSON-LD (and similar plain text). */
export const stripFootnoteMarkers = (text: string): string => {
  if (!text) return text;
  return text.replace(FOOTNOTE_MARKER, "");
};
