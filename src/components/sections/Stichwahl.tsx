import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle } from "../ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


export default function SectionStichwahl({ electionType }: { electionType: "representative" | "deputy" }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Stichwahl
                </CardTitle>
                <CardDescription>
                    Bei Stimmgleichheit ist eine Stichwahl erforderlich. Ist weiterhin kein Gewinner ermittelt, so entscheidet das Los.
                </CardDescription>
            </CardHeader>
            <CardContent>

                <Alert>
                    <InfoIcon />
                    <AlertTitle>
                        Es ist keine Stichwahl erforderlich
                    </AlertTitle>
                </Alert>

            </CardContent>
        </Card>
    )
}