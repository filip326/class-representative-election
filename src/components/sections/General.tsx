import DateSelect from "../DateSelect";
import DateTimeSelect from "../DateTimeSelect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SectionGeneral() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Allgemeine Angaben</CardTitle>
                <CardDescription>Vorbereitung der Wahl</CardDescription>
            </CardHeader>
            <CardContent className="px-8">
                <p className="font-normal underline text-foreground mb-4">Angaben zur Klasse / zum Tutorium:</p>
                <div className="flex flex-row gap-4 justify-around">
                    <div className="w-1/4 p-0 m-0">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Jahrgangsstufe" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 6, 7, 8, 9, 10].map((g) => (
                                    <SelectItem key={g} value={g.toString()}>
                                        Jahrgang {g}
                                    </SelectItem>
                                ))}
                                <SelectItem value="11">E ½</SelectItem>
                                <SelectItem value="12">Q ½</SelectItem>
                                <SelectItem value="13">Q ¾</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col w-full items-start justify-start p-0 m-0">
                        <Input placeholder="Klasse oder Tut-Kürzel" minLength={3} maxLength={3} />
                        <p className="text-muted-foreground text-xs ml-2">
                            Bitte die Klasse im folgenden Format angeben, z.B. <code>05a</code>, <code>09f</code>,{" "}
                            <code>10c</code>
                            <br />
                            Bei Tut-Kürzeln bitte nur das Kürzel angeben, z.B. <code>Abc</code>, <code>Xyz</code>
                        </p>
                    </div>
                </div>
                <p className="font-normal underline text-foreground mt-3 mb-2">Klassenlehrkraft / Tutor</p>
                <Input className="mt-4" placeholder="Klassenlehrkraft oder Tutor:in" minLength={3} maxLength={50} />
                <Input className="mt-2" placeholder="E-Mail der Klassenlehrkraft oder Tutor:in (iServ)" type="email" />

                <p className="font-normal underline text-foreground mt-4 mb-2">Ankündigung der Wahl:</p>
                <p>
                    Die Wahl wurde fristgerecht mindestens drei Tage im Voraus, nämlich am <DateSelect /> mittels
                    <div className="inline-block">
                        <Select>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mündlich im Klassenraum">mündlicher Ansage im Unterricht</SelectItem>
                                <SelectItem value="per iServ-Nachricht">iServ-E-Mail</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>{" "}
                    durch{" "}
                    <div className="inline-block">
                        <Select>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Klassenlehrkraft">die Klassenlehrkraft</SelectItem>
                                <SelectItem value="Tutor:in">den:die Tutor:in</SelectItem>
                                <SelectItem value="Schüler:in">den:die Wahlleiter:in</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    gegenüber allen Wahlberechtigten angekündigt.
                </p>

                <p className="font-normal underline text-foreground mt-4 mb-2">Beginn der Wahl:</p>

                <DateTimeSelect />

                <p className="font-normal underline text-foreground mt-4 mb-2">Anzahl der Schüler:innen</p>
                <p>
                    Es sind insgesamt{" "}
                    <Input type="text" inputMode="numeric" pattern="[0-9]*" className="w-20 inline-block text-center" />{" "}
                    Schüler:innen wahlberechtigt. Davon sind{" "}
                    <Input type="text" inputMode="numeric" pattern="[0-9]*" className="w-20 inline-block text-center" /> bei der
                    Wahl anwesend.
                </p>
            </CardContent>
        </Card>
    );
}
