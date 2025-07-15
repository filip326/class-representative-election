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

export default function SectionCandidates({ electionType }: { electionType: "representative" | "deputy" }) {
    const [candidateList, setCandidateList] = useState<string[]>([]);
    const [candidateVotes, setCandidateVotes] = useState<Record<number, number>>({});
    const [singleCandidateVotes, setSingleCandidateVotes] = useState({ yes: -1, no: -1, abstain: -1 });

    const [candidateName, setCandidateName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
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
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                    setCandidateList([]);
                                    setSingleCandidateVotes({ yes: 0, no: 0, abstain: 0 });
                                }}
                            >
                                <TrashIcon />
                            </Button>
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
                                    value={singleCandidateVotes.yes === -1 ? "" : singleCandidateVotes.yes}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                        setSingleCandidateVotes({
                                            ...singleCandidateVotes,
                                            yes: isNaN(votes) ? -1 : votes,
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
                                    value={singleCandidateVotes.no === -1 ? "" : singleCandidateVotes.no}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                        setSingleCandidateVotes({
                                            ...singleCandidateVotes,
                                            no: isNaN(votes) ? -1 : votes,
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
                                    value={singleCandidateVotes.abstain === -1 ? "" : singleCandidateVotes.abstain}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                        setSingleCandidateVotes({
                                            ...singleCandidateVotes,
                                            abstain: isNaN(votes) ? -1 : votes,
                                        });
                                    }}
                                    className="w-40 text-center"
                                />
                                <span className="text-xs mt-1">Enthaltungen</span>
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
                                            value={candidateVotes[index] === -1 ? "" : candidateVotes[index]}
                                            onChange={(e) => {
                                                const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                                setCandidateVotes({ ...candidateVotes, [index]: isNaN(votes) ? -1 : votes });
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
                                                        setConfirmationDialogOpen(true);
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
                                    value={candidateVotes[-1] === -1 ? "" : candidateVotes[-1]}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                        setCandidateVotes({ ...candidateVotes, [-1]: isNaN(votes) ? -1 : votes });
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
                                    value={candidateVotes[-2] === -1 ? "" : candidateVotes[-2]}
                                    onChange={(e) => {
                                        const votes = e.target.value === "" ? -1 : parseInt(e.target.value, 10);
                                        setCandidateVotes({ ...candidateVotes, [-2]: isNaN(votes) ? -1 : votes });
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
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
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
                                    setCandidateName("");
                                }}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                className="flex-1"
                                disabled={!isCheckboxChecked}
                                onClick={() => {
                                    setCandidateList([...candidateList, candidateName].sort());
                                    setCandidateName("");
                                    setDialogOpen(false);
                                    setIsCheckboxChecked(false);
                                }}
                            >
                                Hinzufügen
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
                    <DialogContent>
                        <h3 className="text-lg font-semibold mb-2">Bestätigung</h3>
                        <p>Möchten Sie die Kandidatur wirklich zurückziehen?</p>
                        <div className="flex flex-row justify-stretch gap-2 mt-4">
                            <Button
                                className="flex-1"
                                variant="secondary"
                                onClick={() => setConfirmationDialogOpen(false)}
                            >
                                Abbrechen
                            </Button>
                            <Button
                                className="flex-1"
                                variant="destructive"
                                onClick={() => {
                                    if (candidateToRemove !== null) {
                                        setCandidateList(candidateList.filter((_, i) => i !== candidateToRemove));
                                    }
                                    setConfirmationDialogOpen(false);
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
