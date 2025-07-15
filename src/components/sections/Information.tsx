import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function ClassRepElectionInfo() {
    return (
        <div className="space-y-4 p-4">
            <h2 className="text-xl font-bold">Wichtige Informationen zur Klassensprecherwahl</h2>
            <Alert variant={"destructive"} className="border-destructive">
                <AlertCircleIcon />
                <AlertTitle className="font-semibold">Wichtig!</AlertTitle>
                <AlertDescription>
                    Bitte lesen Sie als Klassenlehrkraft die folgenden Informationen vor der Wahl sorgfältig durch und
                    besprechen dies mit der Klasse (insbesondere dem Wahlausschuss). Fehlerhaft durchgeführte
                    Klassensprecherwahlen können ggf. nicht im Schülerrat anerkannt werden, die Wahl muss wiederholt
                    werden. <br />
                    Wir bitten die Klassenlehrkräfte insbesondere in den jüngeren Klassen um Unterstützung bei der
                    Durchführung und Organisation der Wahl.
                </AlertDescription>
            </Alert>
            <Accordion type="single" collapsible>
                <AccordionItem value="info">
                    <AccordionTrigger>🗳 Klassensprecherwahl einfach erklärt</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-2xl font-bold">🗳 Klassensprecherwahl einfach erklärt</h2>
                        <p>
                            <strong>Klassensprecher:innen</strong> sind die gewählten Vertreter:innen der Klasse. Sie
                            bringen Anliegen, Ideen und Probleme der Klasse gegenüber Lehrkräften, der Schulleitung und
                            der Schülervertretung ein. Außerdem organisieren sie den Klassenrat und nehmen an den
                            Schülerratssitzungen teil, wo sie die Interessen ihrer Klasse vertreten. Der Schülerrat ist
                            das wichtigste Gremium in der Schülervertretung und durch die Klassensprecher:innen ist jede
                            Klasse darin vertreten.
                        </p>

                        <p>Jede Klasse wählt zu Beginn des Schuljahres ein Klassensprecher-Team. Dieses besteht aus:</p>
                        <ul className="list-disc list-inside">
                            <li>einer Klassensprecherin oder einem Klassensprecher</li>
                            <li>einer Stellvertreterin oder einem Stellvertreter</li>
                        </ul>
                        <p>
                            Beide werden für jeweils ein Schuljahr gewählt (§ 1 Abs. 1 VO-SV). Der:die
                            Klassensprecher:in uns sein:e Stellvertreter:in müssen in zwei getrennten Wahlgängen gewählt
                            werden, es erfolgt keinesfalls eine Geschlechtertrennung o.ä.. Eine Beteiligung aller
                            Geschlechter an der Wahl ist aber wünschenswert (§ 3 Abs. 4 VO-SV). Es ist{" "}
                            <strong>nicht</strong> erforderlich, dass der:die Stellvertreter:in ein anderes Geschlecht
                            hat als der:die Klassensprecher:in. Einzig der Wählerwille ist entscheidend, es dürfen in
                            beiden Wahlgängen alle Geschlechter kandidieren.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deadline">
                    <AccordionTrigger>🕒 Frist für die Wahl</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-xl font-semibold">🕒 Frist für die Wahl</h2>
                        <p>
                            Die Wahl muss <strong>innerhalb der ersten drei Schulwochen</strong> stattfinden. Für das
                            Schuljahr 2025/26 ist der späteste Wahltermin daher{" "}
                            <strong>Freitag, der 5. September 2025</strong> (§ 1 Abs. 2 VO-SV, § 24 Abs. 1 SV-GO).{" "}
                            <br />
                            Die Wahl muss <strong>drei Schultage vor der Wahl angekündigt</strong> werden (§ 17 Satz 2
                            SV-GO). Das Datum wird von der Klassenlehrkraft festgelegt. Alternativ kann auch der
                            Wahlausschuss, sofern bereits gebildet, das Datum festlegen. Die Wahl findet in der
                            Unterrichtszeit statt.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="who-votes">
                    <AccordionTrigger>👥 Wer wählt?</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-xl font-semibold">👥 Wer wählt?</h2>
                        <p>
                            Wahlberechtigt und wählbar sind alle Schüler:innen der Klasse oder des Tutor-Kurses, die zum
                            Zeitpunkt der Wahl anwesend sind (§ 2 VO-SV, § 10 Abs. 1 SV-GO).
                        </p>
                        <p>
                            Jede:r kann sich selbst vorschlagen oder vorgeschlagen werden. Voraussetzung: Die Kandidatur
                            muss freiwillig sein und mit einer klaren Zustimmung zur Annahme der Wahl verbunden sein (§
                            5 Abs. 2 VO-SV, § 18 Abs. 1 und 5 SV-GO). <br />
                            Durch eine <strong>rechtzeitige Ankündigung</strong> mindestens 3 Tage vor der Wahl soll
                            auch abwesenden Schüler:innen die Möglichkeit zur Kandidatur (z.B. als iServ-Nachricht)
                            gegeben werden (§ 17 Satz 2 SV-GO)
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="election-process">
                    <AccordionTrigger>🧾 So läuft die Wahl ab</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-xl font-semibold">🧾 So läuft die Wahl ab</h2>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Wahlausschuss bilden (mind. Wahlleitung + 2 Wahlhelfer:innen)</li>
                            <li>Kandidat:innenliste an der Tafel sichtbar aufstellen</li>
                            <li>Geheime Wahl mit Stimmzetteln in zwei getrennten Wahlgängen</li>
                            <li>Auszählung durch den Wahlausschuss</li>
                            <li>Stichwahl oder Los bei Gleichstand (§ 7 VO-SV, § 23 SV-GO)</li>
                            <li>Bekanntgabe des Ergebnisses</li>
                        </ol>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="minutes">
                    <AccordionTrigger>📄 Die Wahlniederschrift</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-xl font-semibold">📄 Die Wahlniederschrift</h2>
                        <p>
                            Nach oder während der Wahl erstellt der Wahlausschuss eine Wahlniederschrift (§ 8 VO-SV, §
                            15 SV-GO). Diese enthält u.a.:
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Datum, Uhrzeit, Namen der Kandidierenden</li>
                            <li>Stimmenzahlen, gültige/ungültige Stimmen</li>
                            <li>ggf. Stichwahlen oder Losverfahren</li>
                            <li>Ergebnis und Unterschriften</li>
                        </ul>
                        <p>
                            💡 Ihr müsst euch ab diesem Schuljahr kaum sorgen über die Wahlniederschrift mehr machen.
                            Über diese Webseite wird die Niederschrift für euch nahezu automatisch angelegt und
                            überprüft - ohne dass etwas vergessen gehen kann. Daten eintragen, ausdrucken und
                            unterschreiben - fertig!
                        </p>
                        <p>
                            Bitte gebt die Niederschrift <strong>spätestens zur ersten Schülerratssitzung</strong> beim
                            SV-Vorstand ab (§ 15 Abs. 6 SV-GO).
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="teacher-role">
                    <AccordionTrigger>🧑‍🏫 Rolle der Klassenlehrkraft</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-xl font-semibold">🧑‍🏫 Rolle der Klassenlehrkraft</h2>
                        <p>Die Klassenlehrkraft hilft bei der Wahl, indem sie:</p>
                        <ul className="list-disc list-inside">
                            <li>den Wahlausschuss begleitet</li>
                            <li>einen geeigneten Wahlzeitpunkt festlegt</li>
                            <li>bei Rückfragen zur Verfügung steht</li>
                        </ul>
                        <p>
                            Die Organisation kann aber, insbesondere in älteren Jahrgängen, vollständig durch die
                            Schüler:innen erfolgen.
                        </p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="legal-basis">
                    <AccordionTrigger>📚 Rechtsgrundlagen</AccordionTrigger>
                    <AccordionContent>
                        <h2 className="text-base font-medium">📚 Rechtsgrundlagen</h2>
                        <ul className="list-disc list-inside">
                            <li>
                                <a href="https://www.rv.hessenrecht.hessen.de/perma?j=Sch%2FStudVtrV_HE_Inhaltsverzeichnis">
                                    Verordnung über die Schülervertretungen in Hessen (VO-SV), §§ 1-8
                                </a>
                            </li>
                            <li>
                                <a href="https://sv.grb.wiki/de/Rechtliches/SV-GO">
                                    Schülerverfassung / Geschäftsordnung der SV (SV-GO), §§ 10-24
                                </a>
                            </li>
                        </ul>
                        <p>Fragen? Wendet euch gerne an den SV-Vorstand oder eure Verbindungslehrkraft.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
