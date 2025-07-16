import { DownloadIcon, FileIcon } from "lucide-react";
import { Button } from "../ui/button";
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

                <Button>
                    <DownloadIcon />
                    Walniederschrift herunterladen
                    <FileIcon />
                </Button>
            </CardContent>
        </Card>
    );
}
