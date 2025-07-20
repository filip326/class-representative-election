// import { InfoIcon } from "lucide-react";
// import { Alert, AlertTitle } from "../ui/alert";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useElectionContext } from "@/context/useElectionContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SectionStichwahl({ electionType }: { electionType: "representative" | "deputy" }) {
    // check if a Stichwahl is required
    const { electionData, setElectionData } = useElectionContext();
    const [evaluateElectionDialog, setEvaluateElectionDialog] = useState(false);

    function evaluateElection(): void {
        setEvaluateElectionDialog(false);
        const electionDataSpecific = electionData[electionType]!;
        // finalize the candidates list and votes
        const candidatesSorted = electionDataSpecific.stichwahl!.candidates.sort((a, b) => b.votes - a.votes);

        // check for ties
        const maxVotes = candidatesSorted[0].votes;
        const winners = candidatesSorted.filter((c) => c.votes === maxVotes);

        if (winners.length === 1) {
            // only one winner, set as winner
            electionDataSpecific.winner = {
                name: winners[0].name,
                acceptsElection: false,
                email: "",
            };
            electionDataSpecific.noWinner = false;
            electionDataSpecific.electionEvaluated = "done";
            electionDataSpecific.los = undefined; // reset los
        } else {
            // multiple winners, set as no winner
            electionDataSpecific.electionEvaluated = "losPending";
            electionDataSpecific.winner = undefined;
            electionDataSpecific.los = {
                candidates: winners.map((c) => c.name),
                method: "",
                resultingCandidate: undefined,
            };
        }
    }

    if (
        electionData[electionType]?.electionEvaluated === "notEvaluated" ||
        !electionData[electionType]?.stichwahl?.candidates
    ) {
        return <></>;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Stichwahl erforderlich</CardTitle>
                    <CardDescription>
                        Aufgrund von Stimmgleichheit ist eine Stichwahl erforderlich, um einen Gewinner zu ermitteln.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Führt einen weiteren Wahlgang mit den Kandidat:innen durch, welche die meisten Stimmen erhalten
                        haben. Auch dieser Wahlgang muss geheim mit Stimmzetteln durchgeführt werden. Tragt die
                        Ergebnisse aus diesem Wahlgang in die Eingabefelder ein.
                    </p>
                    <div className="flex flex-col gap-3 py-2">
                        {electionData[electionType].stichwahl.candidates.map((c) => (
                            <div key={c.name} className="flex flex-row gap-1 justify-between px-2 pr-4">
                                <p className="text-sm font-medium text-foreground">{c.name}</p>
                                <Input
                                    pattern="^[0-9]*$"
                                    inputMode="numeric"
                                    type="text"
                                    className="w-20 text-right"
                                    value={c.votes.toString()}
                                    onChange={(e) => {
                                        const newVotes = parseInt(e.target.value, 10);
                                        if (!isNaN(newVotes)) {
                                            setElectionData((prev) => ({
                                                ...prev,
                                                [electionType]: {
                                                    ...prev[electionType],
                                                    stichwahl: {
                                                        ...prev[electionType]!.stichwahl,
                                                        candidates: prev[electionType]!.stichwahl!.candidates.map(
                                                            (c2) =>
                                                                c2.name === c.name ? { ...c2, votes: newVotes } : c2,
                                                        ),
                                                    },
                                                },
                                            }));
                                        }
                                    }}
                                    readOnly={electionData[electionType]!.electionEvaluated !== "stichwahlPending"}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        <strong>Hinweis:</strong> Sollte die Stichwahl erneut zur Stimmgleichheit führen, so wird in der
                        3. Runde gelost.
                    </p>

                    <Alert className="border-destructive mt-3">
                        <AlertTriangleIcon color="red" />
                        <AlertTitle className="font-semibold text-destructive">
                            Wahlgang abschließen (irreversibel!)
                        </AlertTitle>
                        <AlertDescription>
                            <p>
                                Kandidat:innen-Liste und Stimmanzahl finalisieren und auswerten. <br />
                                Die Kandidat:innen-Liste kann anschließend nicht mehr bearbeitet werden.
                            </p>
                            <Dialog open={evaluateElectionDialog} onOpenChange={setEvaluateElectionDialog}>
                                <DialogTrigger asChild>
                                    <Button
                                        onClick={() => setEvaluateElectionDialog(true)}
                                        disabled={electionData[electionType]!.electionEvaluated !== "stichwahlPending"}
                                    >
                                        Wahlgang abschließen
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <h3 className="text-lg font-semibold mb-2">Wahlgang abschließen?</h3>
                                    <p>
                                        Durch das Abschließen des Wahlgangs wird die Kandidat:innen-Liste finalisiert
                                        und ausgewertet. Die Kandidat:innen-Liste, einschließlich der Stimmzahlen,
                                        können danach <strong>nicht</strong> mehr bearbeitet werden.
                                    </p>
                                    <div className="flex flex-row justify-stretch gap-2 mt-4">
                                        <Button className="flex-1" onClick={() => setEvaluateElectionDialog(false)}>
                                            Abbrechen
                                        </Button>
                                        <Button className="flex-1" onClick={evaluateElection}>
                                            Ja, Wahlgang unumkehrbar abschließen.
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
            {electionData[electionType].los !== undefined && (
                <Card>
                    <CardHeader>
                        <CardTitle>Los</CardTitle>
                        <CardDescription>
                            Da die Stichwahl erneut zur Stimmgleichheit geführt hat, entscheidet das Los.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Der:die Wahlleiter:in zieht das Los, um den:die Gewinner:in der Wahl zu ermitteln. Tragt
                            hier das gewählte Verfahren (z.B. Münzwurf, Stöckchen ziehen, etc.) und den:die gewählte:n
                            Kandidat:in ein.
                        </p>
                        <Textarea
                            value={electionData[electionType].los.method}
                            onChange={(e) =>
                                setElectionData((prev) => ({
                                    ...prev,
                                    [electionType]: {
                                        ...prev[electionType],
                                        los: {
                                            ...prev[electionType]!.los!,
                                            method: e.target.value,
                                        },
                                    },
                                }))
                            }
                            placeholder="Verfahren (z.B. Münzwurf, Stöckchen ziehen, etc.)"
                        />
                        <div className="flex gap-2 justify-start items-baseline my-2">
                            <p>
                                Gewählte:r Kandidat:in:
                            </p>
                            <Select
                                value={electionData[electionType].los.resultingCandidate}
                                onValueChange={(selectedValue) =>
                                    setElectionData((prev) => ({
                                        ...prev,
                                        [electionType]: {
                                            ...prev[electionType],
                                            los: {
                                                ...prev[electionType]!.los!,
                                                resultingCandidate: selectedValue,
                                            },
                                            electionEvaluated: "done",
                                            winner: {
                                                name: selectedValue,
                                                email: "",
                                                acceptsElection: false,
                                            },
                                        },
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Gewählte:r Kandidat:in" />
                                </SelectTrigger>
                                <SelectContent>
                                    {electionData[electionType].los.candidates.map((candidate) => (
                                        <SelectItem key={candidate} value={candidate}>
                                            {candidate}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
}
