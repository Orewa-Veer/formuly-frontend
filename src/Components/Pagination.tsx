import { useState } from "react";
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
  const [active, setActive] = useState(page);
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (page <= 1) {
                  setActive(1);
                  return onChange(1);
                } else {
                  setActive(page - 1);
                  return onChange(page - 1);
                }
              }}
            />
          </PaginationItem>
          {arr.map((_, index) => (
            <PaginationItem>
              <PaginationLink
                key={index + 1}
                onClick={() => {
                  onChange(index + 1);
                  setActive(index + 1);
                }}
                isActive={active === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (page >= totalPages) {
                  setActive(totalPages);
                  return onChange(totalPages);
                } else {
                  setActive(page + 1);
                  return onChange(page + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginations;
