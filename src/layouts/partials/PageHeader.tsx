import Breadcrumbs from "@/components/Breadcrumbs";
import { SiteCrumb } from "@/lib/seo";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({
  title,
  breadcrumbs,
}: {
  title: string;
  breadcrumbs?: SiteCrumb[];
}) => {
  return (
    <section>
      <div className="text-center">
        <div className="bg-gradient-to-b from-body to-light px-8 py-14  ">
          <h1>{humanize(title)}</h1>
          <Breadcrumbs className="mt-6" items={breadcrumbs} />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
