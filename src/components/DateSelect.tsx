import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import React from "react";

export default function DateSelect() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" id="date-picker" className="w-40 justify-between font-normal text-foreground">
                    {date
                        ? date.toLocaleDateString("de-DE", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              weekday: "short",
                          })
                        : "Datum"}
                    <ChevronDownIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    ISOWeek
                    onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
