import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
interface Props {
  page: number;
  onChange: (page: number) => void;
  totalPages: number;
}
const Paginations = ({ page, onChange, totalPages }: Props) => {
  const arr = Array.from({ length: totalPages });
  return (
    <div>
      <Pagination>
        <PaginationContent>
         {}
          {arr.map((_, index) => (
            <PaginationItem>
              <PaginationLink href="#">{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={() => onChange(page)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
