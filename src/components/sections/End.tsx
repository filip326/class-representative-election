import DateTimeSelect from "../DateTimeSelect";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";


export default function SectionEnd() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Ende der Wahl
                </CardTitle>
            </CardHeader>

            <CardContent>

                <p>Ende der Wahl:</p>
                <DateTimeSelect />

                <p className="mt-2">
                    Platz für Anmerkungen, Ergänzungen, evtl. Unregelmäßigkeiten bei der Durchführung der Wahl:
                </p>
                <Textarea 
                    placeholder="Anmerkungen / Ergänzungen"
                />
            
            </CardContent>

        </Card>

    )
}