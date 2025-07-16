import { useElectionContext } from "@/context/useElectionContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

export default function SectionVotingCommittee() {
    const { electionData, setElectionData } = useElectionContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Wahlausschuss</CardTitle>
                <CardDescription>
                    Der Wahlausschuss leitet die Wahl und ist für die korrekte Durchführung verantwortlich.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground text-xs">
                    Zu Beginn der Wahl muss ein Wahlausschuss gebildet werden. Die Mitglieder des Wahlausschusses leiten
                    die Wahl, zählen die Stimmen aus, etc.. Sie dürfen selbst nicht kandidieren, sind aber
                    wahlberechtigt.
                </p>
                <p className="text-foreground font-medium my-2 text-[.9em]">1 Wahlleiter:in</p>
                <Input placeholder="Name des Wahlleiters oder der Wahlleiterin" minLength={3} maxLength={50}
                    value={electionData.committee.wahlleiter || ""}
                    onChange={(e) =>
                        setElectionData({
                            ...electionData,
                            committee: { ...electionData.committee, wahlleiter: e.target.value },
                        })
                    }
                />
                <p className="text-foreground font-medium my-2 text-[.9em]">2 Wahlhelfer:innen</p>
                <Input placeholder="Name der Wahlhelfer:in" minLength={3} maxLength={50} className="mb-2"
                    value={electionData.committee.wahlhelfer[0] || ""}
                    onChange={(e) =>
                        setElectionData({
                            ...electionData,
                            committee: {
                                ...electionData.committee,
                                wahlhelfer: [e.target.value, electionData.committee.wahlhelfer[1]],
                            },
                        })
                    }
                />
                <Input placeholder="Name der Wahlhelfer:in" minLength={3} maxLength={50}
                    value={electionData.committee.wahlhelfer[1] || ""}
                    onChange={(e) =>
                        setElectionData({
                            ...electionData,
                            committee: {
                                ...electionData.committee,
                                wahlhelfer: [electionData.committee.wahlhelfer[0], e.target.value],
                            },
                        })
                    }
                />
            </CardContent>
        </Card>
    );
}
