import { useElectionContext } from "@/context/useElectionContext";
import DateTimeSelect from "../DateTimeSelect";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { getWarnings } from "@/lib/dataCheck";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertOctagonIcon, AlertTriangleIcon } from "lucide-react";

export default function SectionEnd() {
    const { electionData, setElectionData } = useElectionContext();

    const warnings = getWarnings(electionData);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Ende der Wahl</CardTitle>
                </CardHeader>

                <CardContent>
                    <p>Ende der Wahl:</p>
                    <DateTimeSelect
                        value={electionData.general.electionEnd}
                        onDateChange={(date) =>
                            setElectionData({
                                ...electionData,
                                general: { ...electionData.general, electionEnd: date },
                            })
                        }
                    />

                    <p className="mt-2">
                        Platz für Anmerkungen, Ergänzungen, evtl. Unregelmäßigkeiten bei der Durchführung der Wahl:
                    </p>
                    <Textarea placeholder="Anmerkungen / Ergänzungen" />
                </CardContent>
            </Card>
            {warnings.length > 0 && (
                <Alert variant={"destructive"}>
                    <AlertTriangleIcon />
                    <AlertTitle className="font-semibold">Bevor Sie fortfahren...</AlertTitle>
                    <AlertDescription>
                        <p>Bitte prüfen Sie bitte die folgenden Hinweise. Ggf. sind Angaben unvollständig oder fehlerhaft.</p>
                        <p className="text-xs text-muted-foreground">
                            Sollten Sie nach manueller Prüfung dennoch fortfahren wollen, können Sie diese Warnung
                            ignorieren.
                        </p>
                        <ul>
                            {warnings.map((warning, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <AlertOctagonIcon width={12} />
                                    {warning}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}
        </>
    );
}
