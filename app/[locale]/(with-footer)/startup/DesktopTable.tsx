import { SquareArrowOutUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { STARTUP_LIST } from "@/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import PriceItem from "./PriceItem";
import TagItem from "./TagItem";

export default function DesktopTable() {
  const t = useTranslations("Startup.table");

  return (
    <div className="mb-10 hidden w-full lg:block">
      <Table className="border-separate border-spacing-y-3">
        <TableHeader>
          <TableRow className="tr-rounded h-14 rounded-xl border-none bg-[#F4F6F8] hover:bg-[#F4F6F8]">
            <TableHead className="w-[100px] text-lg font-semibold text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
              {t("da")}
            </TableHead>
            <TableHead className="w-[250px] text-lg font-semibold text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
              {t("website")}
            </TableHead>
            <TableHead className="w-[250px] text-lg font-semibold text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
              {t("tags")}
            </TableHead>
            <TableHead className="w-[150px] text-lg font-semibold text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
              {t("price")}
            </TableHead>
            <TableHead className="w-[100px] text-lg font-semibold text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
              {t("visit")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-3">
          {STARTUP_LIST.map((item) => (
            <TableRow
              key={item.DA}
              className="tr-rounded h-14 rounded-xl border-none bg-white transition-all duration-200 hover:bg-[#F8FAFC] hover:shadow-lg"
            >
              <TableCell className="text-base font-medium text-[#687076] first:rounded-l-xl last:rounded-r-xl">
                {item.DA}
              </TableCell>
              <TableCell className="text-lg font-medium text-[#11181C] first:rounded-l-xl last:rounded-r-xl">
                {item.Website}
              </TableCell>
              <TableCell className="flex flex-wrap gap-2 first:rounded-l-xl last:rounded-r-xl">
                {item.Tag ? item.Tag.split(",").map((tag) => <TagItem key={tag} title={tag} />) : null}
              </TableCell>
              <TableCell className="first:rounded-l-xl last:rounded-r-xl">
                <PriceItem title={item.Price} isFree={item.Price.toLowerCase() === "free"} />
              </TableCell>
              <TableCell className="first:rounded-l-xl last:rounded-r-xl">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 w-full border-[#E6E8EB] bg-transparent text-[#889096] hover:border-primary hover:bg-primary/5 hover:text-primary"
                >
                  <a href={item.URL} target="_blank" rel="noreferrer">
                    <SquareArrowOutUpRight className="size-5" />
                    <span className="sr-only">{item.Website}</span>
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
