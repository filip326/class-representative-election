"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DateTimeSelectProps = {
    value: Date | undefined;
    onDateChange: (value: Date | undefined) => void;
};

export default function DateTimeSelect({ value, onDateChange }: DateTimeSelectProps) {
    const [open, setOpen] = React.useState(false);

    const checkboxId = React.useId();

    const handleTimeChange = (time: string) => {
        if (value) {
            const [hours, minutes] = time.split(":").map(Number);
            const updatedDate = new Date(value);
            updatedDate.setHours(hours, minutes);
            onDateChange(updatedDate);
        }
    };

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id={React.useId()}
                            className="w-40 justify-between font-normal text-foreground"
                        >
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
                                if (date) {
                                    const updatedDate = new Date(date);
                                    if (value) {
                                        updatedDate.setHours(value.getHours(), value.getMinutes());
                                    }
                                    onDateChange(updatedDate);
                                } else {
                                    onDateChange(undefined);
                                }
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Input
                    type="time"
                    id={React.useId()}
                    value={value ? value.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit"}) : ""}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    
                />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={checkboxId}
                    checked={value?.toDateString() === new Date().toDateString()}
                    onCheckedChange={() => {
                        const now = new Date();
                        onDateChange(now);
                        setOpen(false);
                    }}
                />
                <Label
                    htmlFor={checkboxId}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Jetzt
                </Label>
            </div>
        </div>
    );
}
