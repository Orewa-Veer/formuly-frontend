import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Cards = ({ children, className = "" }: Props) => {
  return (
    <div
      className={clsx(
        className,
        "group/hoverRoot bg-white/10 shadow-lg  rounded-2xl backdrop-blur-md p-6 hover:shadow-xl transition-all duration-300 border border-white/20   "
      )}
    >
      {children}
    </div>
  );
};

export default Cards;
