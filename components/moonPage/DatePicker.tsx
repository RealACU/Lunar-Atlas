"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useControls from "@/hooks/useControls";

const DatePicker = () => {
  const controls = useControls();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[160px] justify-start text-left font-normal bg-primary border-transparent",
            !controls.date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {controls.date ? (
            format(controls.date, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={controls.date}
          onSelect={(day) => {
            if (day) {
              controls.setDate(day);
            }
          }}
          initialFocus
          defaultMonth={controls.date}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
