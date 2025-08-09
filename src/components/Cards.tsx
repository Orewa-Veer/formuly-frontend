import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}
const Cards = ({ children, className = "", padding = "p-6" }: Props) => {
  return (
    <div
      className={clsx(
        `group/hoverRoot bg-white/10 shadow-lg  rounded-2xl backdrop-blur-md  hover:shadow-xl transition-all duration-300 border border-white/20  `,
        padding,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cards;
