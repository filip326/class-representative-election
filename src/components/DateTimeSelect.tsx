"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function DateTimeSelect() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const [isJetztChecked, setIsJetztChecked] = React.useState(false);

    const [time, setTime] = React.useState<string>("");

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-40 justify-between font-normal text-foreground"
                        >
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
                                setIsJetztChecked(false); // Uncheck when manually selecting date
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Input
                    type="time"
                    id="time-picker"
                    value={time}
                    onChange={(e) => {
                        setTime(e.target.value);
                        setIsJetztChecked(false);
                    }}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="jetzt-checkbox"
                    checked={isJetztChecked}
                    onCheckedChange={() => {
                        if (!isJetztChecked) setIsJetztChecked(true);
                        setDate(new Date());
                        setOpen(false);
                        setTime(
                            new Date().toLocaleTimeString("de-DE", {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                        );
                    }}
                />
                <Label
                    htmlFor="jetzt-checkbox"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Jetzt
                </Label>
            </div>
        </div>
    );
}
