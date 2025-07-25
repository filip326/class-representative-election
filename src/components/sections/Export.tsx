import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function SectionExport() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Wahlniederschrift exportieren</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Nächste Schritte:</p>
                <ol className="list-decimal list-inside mt-2">
                    <li>Die Wahlniederschrift als PDF herunterladen und ausdrucken.</li>
                    <li>Vom Wahlausschuss und der Klassenlehrkraft unterschreiben lassen.</li>
                    <li>
                        Die Wahlniederschrift beim SV-Vorstand einreichen (SV-Briefkasten oder spätestens beim ersten
                        Schülerrat)
                    </li>
                </ol>

                <h3 className="mt-4 font-semibold">Exportieren</h3>
                <p>
                    Zum Exportieren der Wahlniederschrift, nutzen Sie bitte die Tastenkombination <code>STRG</code> +{" "}
                    <code>P</code> oder die Drucken Schaltfläche im Menü Ihres Web-Browsers. Sie können von dort aus
                    die Wahlniederschrift als PDF exportieren oder ausrucken.
                </p>
            </CardContent>
        </Card>
    );
}
