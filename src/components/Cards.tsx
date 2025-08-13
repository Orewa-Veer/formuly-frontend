import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const Cards = ({ children, className = "", padding = "p-4" }: Props) => {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800",
        "rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200",
        "flex flex-col", // Ensures content stacks naturally
        padding,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Cards;
