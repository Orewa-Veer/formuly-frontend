import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const PageCover = ({ children }: Props) => {
  return (
    <>
      {/* page */}
      <div className="p-6 pt-25 sm:px-10 md:px-15 mx-auto ">{children}</div>
    </>
  );
};

export default PageCover;
