import Breadcrumbs from "@/components/Breadcrumbs";
import { humanize } from "@/lib/utils/textConverter";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section>
      <div className="text-center">
        <div className="bg-gradient-to-b from-body to-light px-8 py-14  ">
          <h1>{humanize(title)}</h1>
          <Breadcrumbs className="mt-6" />
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
