import { ReactNode } from "react";

interface CompetitionSubWrapProps {
  children: ReactNode;
  className?: string;
}

const CompetitionSubWrap = ({
  children,
  className,
}: CompetitionSubWrapProps) => {
  return (
    <div className={`${className} subcontainer w-full lg:w-11/12 mx-auto`}>
      {children}
    </div>
  );
};

export default CompetitionSubWrap;
