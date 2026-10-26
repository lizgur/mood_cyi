import { markdownify } from "@/lib/utils/textConverter";

export type FaqItem = { title: string; content: string };

const FaqList = ({ faqs }: { faqs: FaqItem[] }) => {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <details className="group" key={faq.title}>
          <summary className="flex justify-between items-center cursor-pointer p-4 bg-white rounded-lg">
            <span className="font-semibold">{faq.title}</span>
            <span className="group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>
          <div
            className="p-4 bg-gray-50 rounded-b-lg"
            dangerouslySetInnerHTML={markdownify(faq.content, true)}
          />
        </details>
      ))}
    </div>
  );
};

export default FaqList;
