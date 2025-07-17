import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
import { useElectionContext } from "@/context/useElectionContext";

export default function SectionCandidates({ electionType }: { electionType: "representative" | "deputy" }) {
    const { electionData, setElectionData } = useElectionContext();

    const candidateVotes = electionData[electionType]?.candidates?.reduce<Record<number, number | undefined>>(
        (acc, candidate, index) => {
            acc[index] = candidate.votes;
            return acc;
        },
        {},
    );
    function setCandidateVotes(newVotes: Record<number, number | undefined>) {
        setElectionData({
            ...electionData,
            [electionType]: {
                ...electionData[electionType],
                candidates:
                    electionData[electionType]?.candidates?.map((candidate, index) => ({
                        ...candidate,
                        votes: newVotes[index] || 0,
                    })) || [],
            },
        });
    }

    const candidateList =
        electionData[electionType]?.candidates?.length ?? -1 > 0
            ? electionData[electionType]?.candidates?.map((candidate) => candidate.name) || []
            : electionData[electionType]?.singleCandidate?.name
            ? [electionData[electionType]?.singleCandidate?.name || ""]
            : [];
    function setCandidateList(newList: string[]) {
        if (newList.length === 0) {
            setElectionData({
                ...electionData,
                [electionType]: {
                    ...electionData[electionType],
                    candidates: undefined,
                    singleCandidate: undefined,
                },
            });
            return;
        }

        if (newList.length === 1) {
            setElectionData({
                ...electionData,
                [electionType]: {
                    ...electionData[electionType],
                    candidates: undefined,
                    singleCandidate: {
                        name: newList[0],
                        yesVotes: undefined,
                        noVotes: undefined,
                    },
                },
            });
            return;
        }

        setElectionData({
            ...electionData,
            [electionType]: {
                ...electionData[electionType],
                candidates: newList.map((name, i) => ({ name, votes: candidateVotes?.[i] || 0 })),
                singleCandidate: undefined,
            },
        });
    }

    const [addCandidate, setAddCandidate] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [candidateToRemove, setCandidateToRemove] = useState<number | null>(null);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kandidat:innen Liste</CardTitle>
                <CardDescription>
                    Sammelt Kandidat:innen für die Wahl zur:m{" "}
                    {electionType === "representative"
                        ? "Klassensprecher:in"
                        : "stellvertretende(n) Klassensprecher:in"}
                    .
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Sammelt zunächst die Namen der Kandidat:innen, die sich für die Wahl zur:m{" "}
                    {electionType === "representative"
                        ? "Klassensprecher:in"
                        : "stellvertretende(n) Klassensprecher:in"}{" "}
                    bereit erklären. Fügt die Namen über die dafür vorgesehene Schaltfläche hinzu.
                    <br />
                    Zählt nach der geheimen Wahl (mittels Stimmzettel) die Stimmen für jede:n Kandidat:in aus und tragt
                    die Ergebnisse in die Wahlniederschrift ein.
                </p>

                <Separator className="my-3" />

                {candidateList.length === 1 ? (
                    <div className="space-y-2">
                        <div className="flex items-center gap-4">
                            <span className="flex-1">{candidateList[0]}</span>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => {
                                            setCandidateList([]);
                                        }}
                                    >
                                        <TrashIcon />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>Kandidatur zurückziehen</TooltipContent>
                            </Tooltip>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Ist nur ein:e Kandidat:in aufgestellt, so wird zwischen "Ja" und "Nein" abgestimmt.
                            <br />
                            Die:der Kandidat:in ist in diesem Fall nur dann gewählt, wenn er mindestens 50 % der
                            abgegebenen gültigen Stimmen erhält.
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex flex-col items-center">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Ja-Stimmen"
                                    value={electionData[electionType]?.singleCandidate?.yesVotes}
                                    onChange={(e) => {
                                        const votes = isNaN(parseInt(e.target.value))
                                            ? undefined
                                            : parseInt(e.target.value, 10) ?? undefined;
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                singleCandidate: {
                                                    ...electionData[electionType]?.singleCandidate,
                                                    yesVotes: votes,
                                                },
                                            },
                                        });
                                    }}
                                    className="w-40 text-center"
                                />
                                <span className="text-xs mt-1">Ja-Stimmen</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Nein-Stimmen"
                                    value={electionData[electionType]?.singleCandidate?.noVotes}
                                    onChange={(e) => {
                                        const votes = isNaN(parseInt(e.target.value))
                                            ? undefined
                                            : parseInt(e.target.value, 10) ?? undefined;
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                singleCandidate: {
                                                    ...electionData[electionType]?.singleCandidate,
                                                    noVotes: votes,
                                                },
                                            },
                                        });
                                    }}
                                    className="w-40 text-center"
                                />
                                <span className="text-xs mt-1">Nein-Stimmen</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Enthaltungen"
                                    value={electionData[electionType]?.enthaltungen}
                                    onChange={(e) => {
                                        const votes = isNaN(parseInt(e.target.value))
                                            ? undefined
                                            : parseInt(e.target.value, 10) ?? undefined;
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                enthaltungen: votes,
                                            },
                                        });
                                    }}
                                    className="w-40 text-center"
                                />
                                <span className="text-xs mt-1">Enthaltungen</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Ungültig"
                                    value={electionData[electionType]?.incorrectVotes}
                                    onChange={(e) => {
                                        const votes = isNaN(parseInt(e.target.value))
                                            ? undefined
                                            : parseInt(e.target.value, 10) ?? undefined;
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                incorrectVotes: votes,
                                            },
                                        });
                                    }}
                                    className="w-40 text-center"
                                />
                                <span className="text-xs mt-1">Ungültige Stimmen</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <ul className="list-disc list-inside space-y-2 mt-4">
                            {candidateList.map((candidate, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <span className="flex-1">{candidate}</span>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="Stimmen"
                                            value={candidateVotes?.[index]}
                                            onChange={(e) => {
                                                const votes =
                                                    e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                                                setCandidateVotes({
                                                    ...candidateVotes,
                                                    [index]: votes,
                                                });
                                            }}
                                            className="w-27 text-right"
                                        />
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => {
                                                        setCandidateToRemove(index);
                                                    }}
                                                >
                                                    <TrashIcon />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Kandidatur zurückziehen</TooltipContent>
                                        </Tooltip>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Separator className="mt-2" />
                        <div className="flex gap-3 items-center my-2 justify-end pr-10">
                            <span>Enthaltungen</span>
                            <div className="flex flex-col items-end">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Enthaltungen"
                                    value={electionData[electionType]?.enthaltungen}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                enthaltungen: votes,
                                            },
                                        });
                                    }}
                                    className="w-27 ml-2 text-right"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 items-center my-2 justify-end pr-10">
                            <span>Ungültige Stimmen</span>
                            <div className="flex flex-col items-end">
                                <Input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="Ungültig"
                                    value={electionData[electionType]?.incorrectVotes}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? undefined : parseInt(e.target.value, 10);
                                        setElectionData({
                                            ...electionData,
                                            [electionType]: {
                                                ...electionData[electionType],
                                                incorrectVotes: votes,
                                            },
                                        });
                                    }}
                                    className="w-27 ml-2 text-right"
                                />
                            </div>
                        </div>
                    </>
                )}

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant={"default"} onClick={() => setDialogOpen(true)}>
                            Kandidat:in hinzufügen
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <h3 className="text-lg font-semibold mb-2">Kandidat:in hinzufügen</h3>
                        {/* Form to add a candidate would go here */}
                        <p className="text-xs text-muted-foreground">
                            Gebt bitte den vollständigen Namen (Vor- und Nachname) der Kandidat:in an. Achtet auf die
                            korrekte Schreibweise.
                        </p>
                        <Input
                            placeholder="Name der:des Kandidat:in"
                            value={addCandidate}
                            onChange={(e) => setAddCandidate(e.target.value)}
                        />
                        <Label htmlFor="add-candidate-checkbox" className="ml-2">
                            <Checkbox
                                id="add-candidate-checkbox"
                                checked={isCheckboxChecked}
                                onCheckedChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                            />
                            Der:die Kandidat:in erklärt sich bereit, das Amt im Falle einer Wahl anzunehmen.
                        </Label>
                        <div className="flex flex-row justify-stretch gap-2 mt-4">
                            <Button
                                className="flex-1"
                                variant={"secondary"}
                                onClick={() => {
                                    setDialogOpen(false);
                                    setAddCandidate("");
                                }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                className="flex-1"
                                disabled={!isCheckboxChecked}
                                onClick={() => {
                                    setCandidateList([...candidateList, addCandidate.trim()].sort());
                                    setAddCandidate("");
                                    setDialogOpen(false);
                                    setIsCheckboxChecked(false);
                                }}
                            >
                                Hinzufügen
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={candidateToRemove !== null}
                    onOpenChange={(open) => {
                        if (!open) {
                            setCandidateToRemove(null);
                        }
                    }}
                >
                    <DialogContent>
                        <h3 className="text-lg font-semibold mb-2">Bestätigung</h3>
                        <p>Möchten Sie die Kandidatur wirklich zurückziehen?</p>
                        <div className="flex flex-row justify-stretch gap-2 mt-4">
                            <Button className="flex-1" variant="secondary" onClick={() => setCandidateToRemove(null)}>
                                Abbrechen
                            </Button>
                            <Button
                                className="flex-1"
                                variant="destructive"
                                onClick={() => {
                                    if (candidateToRemove !== null) {
                                        setCandidateList(candidateList.filter((_, i) => i !== candidateToRemove));
                                    }
                                    setCandidateToRemove(null);
                                }}
                            >
                                Entfernen
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
