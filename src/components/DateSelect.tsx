import { ChevronDownIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import React from "react";

type DateSelectProps = {
    value: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
};

export default function DateSelect({ value, onDateChange }: DateSelectProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" id={React.useId()} className="w-40 justify-between font-normal text-foreground">
                    {value
                        ? value.toLocaleDateString("de-DE", {
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
                    selected={value}
                    captionLayout="dropdown"
                    ISOWeek
                    showWeekNumber
                    onSelect={(date) => {
                        onDateChange(date);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
