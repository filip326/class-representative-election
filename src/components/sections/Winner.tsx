import { useElectionContext } from "@/context/useElectionContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useId } from "react";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

export default function SectionWinner({ electionType }: { electionType: "representative" | "deputy" }) {
    const { electionData, setElectionData } = useElectionContext();
    const electionDataSpecific = electionData[electionType];
    const checkboxId = useId();

    if (!electionDataSpecific) {
        return null;
    }

    switch (electionDataSpecific.electionEvaluated) {
        case "notEvaluated":
            return (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            {electionType === "representative"
                                ? "Gewählte Klassensprecher:in bestimmen"
                                : "Gewählte Stellvertreter:in bestimmen"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Bitte schließe den Wahlgang ab, um eine:n Gewinner:in zu ermitteln</p>
                    </CardContent>
                </Card>
            );
        case "stichwahlPending":
            return (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            {electionType === "representative"
                                ? "Stichwahl der Klassensprecher:innen"
                                : "Stichwahl der Stellvertreter:innen"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Bitte führe die Stichwahl durch und schließe diese ab, um eine:n Gewinner:in zu ermitteln.
                        </p>
                    </CardContent>
                </Card>
            );
        case "losPending":
            return (
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            {electionType === "representative"
                                ? "Losentscheid der Klassensprecher:innen"
                                : "Losentscheid der Stellvertreter:innen"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Bitte führe den Losentscheid durch, um eine:n Gewinner:in zu ermitteln.</p>
                    </CardContent>
                </Card>
            );
        case "done":
            if (electionDataSpecific.noWinner) {
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {electionType === "representative"
                                    ? "Keine Klassensprecher:in gewählt"
                                    : "Kein:e Stellvertreter:in gewählt"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Es wurde kein:e Gewinner:in ermittelt, da entweder keine Kandidat:innen zur Wahl standen
                                oder keine nötige Mehrheit erreicht wurde.
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Weiter unten könnt ihr die Wahlniederschrift exportieren.
                            </p>
                        </CardContent>
                    </Card>
                );
            }
            if (electionDataSpecific.winner) {
                return (
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                {electionType === "representative"
                                    ? "Gewählte Klassensprecher:in"
                                    : "Gewählte Stellvertreter:in"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Die Wahl gewonnen hat <strong>{electionDataSpecific.winner.name}</strong>.
                            </p>
                            {/* accepts election checkbox */}
                            <Label htmlFor={checkboxId} className="my-2 text-[1em]">
                                <Checkbox
                                    id={checkboxId}
                                    checked={electionDataSpecific.winner.acceptsElection}
                                    onCheckedChange={(checked) => {
                                        setElectionData((prev) => ({
                                            ...prev,
                                            [electionType]: {
                                                ...prev[electionType],
                                                winner: {
                                                    ...prev[electionType]!.winner,
                                                    acceptsElection: checked,
                                                },
                                            },
                                        }));
                                    }}
                                />
                                Der:die gewählte Kandidat:in nimmt die Wahl zum:r {electionType === "representative" ? "Klassensprecher:in" : "Stellvertreter:in"} an.
                            </Label>
                            <p>
                                Für die Kontaktaufnahme durch die Schülervertretung (z.B. Einladung zum Schülerrat) wird eine gültige iServ-Adresse (<code>@grb-mail.de</code>) benötigt.
                            </p>
                            <Input
                                type="email"
                                placeholder="E-Mail-Adresse des Gewinners der Wahl"
                                value={electionDataSpecific.winner.email}
                                onChange={(e) => {
                                    setElectionData((prev) => ({
                                        ...prev,
                                        [electionType]: {
                                            ...prev[electionType],
                                            winner: {
                                                ...prev[electionType]!.winner,
                                                email: e.target.value,
                                            },
                                        },
                                    }));
                                }}
                            />
                        </CardContent>
                    </Card>
                );
            }
            return;
        default:
            return (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {electionType === "representative"
                                ? "Gewählte Klassensprecher:innen"
                                : "Gewählte Stellvertreter:innen"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Es wurde kein:e Gewinner:in ermittelt.</p>
                    </CardContent>
                </Card>
            );
    }
}
