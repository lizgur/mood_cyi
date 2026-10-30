"use client";

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome } from "react-icons/bi";

type Crumb = { name: string; href: string };

const crumbsFromPathname = (pathname: string): Crumb[] => {
  const paths = pathname.split("/").filter((segment) => segment);
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }];

  paths.forEach((segment, index) => {
    if (segment === "page") return;
    crumbs.push({
      name: humanize(segment.replace(/[-_]/g, " ")) || "",
      href: `/${paths.slice(0, index + 1).join("/")}`,
    });
  });

  return crumbs;
};

const Breadcrumbs = ({
  className,
  items,
}: {
  className?: string;
  items?: Crumb[];
}) => {
  const pathname = usePathname();
  const crumbs = items ?? crumbsFromPathname(pathname);

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex" role="list">
        {crumbs.map(({ name, href }, index) => {
          const isLast = index === crumbs.length - 1;
          const isHome = index === 0 && href === "/";
          const label = isHome ? (
            <BiHome className="text-text-light " size={24} />
          ) : (
            <span>{name}</span>
          );

          return (
            <li className="mx-1 capitalize" role="listitem" key={`${href}-${name}`}>
              {index > 0 && (
                <span className="inline-block mr-1 text-text-light ">&gt;</span>
              )}
              {isLast ? (
                <span className="text-text-light " aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-primary "
                  aria-label={isHome ? "Home" : undefined}
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
