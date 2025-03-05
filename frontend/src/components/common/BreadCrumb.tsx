import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import React from "react";

interface BreadcrumbPageProps {
  paths: { name: string; url: string }[];
}

const CourseBreadcrumb: React.FC<BreadcrumbPageProps> = ({ paths }) => {
  return (
    <Breadcrumb className="mb-4 pl-14">
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{path.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={path.url}>{path.name}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className="mx-2 text-gray-500" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CourseBreadcrumb;
