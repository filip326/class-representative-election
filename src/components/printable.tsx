import { useElectionContext } from "@/context/useElectionContext";
import svLogo from "../assets/sv-logo.png";
import { format } from "date-fns/format";
import ElectionPrintable from "./printables/ElectionPrintable";
import SignHere from "./printables/SignHere";
import qrcodeSvg from "qrcode-svg";

const header = (
    <header>
        <div className="flex flex-row items-center justify-between gap-5">
            <h1 className="text-2xl font-bold mt-5">Klassensprecherwahl-Wahlniederschrift</h1>
            <img src={svLogo} className="max-h-15" alt="SV Logo" />
        </div>
    </header>
);

function getBarcode(data: unknown,) {
    const dataString = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(dataString);
    const dataBufferBase64 = `---WAHLNIEDERSCHRIFT---\n${btoa(String.fromCharCode(...dataBuffer))
        .split("")
        .reduce<string[]>((acc, char, i) => {
            acc.push(char);
            if (i % 30 === 0 && i !== 0) acc.push("\n");
            return acc;
        }, [])
        .join("")}\n---END OF WAHLNIEDERSCHRIFT---`;

    const qrCode = new qrcodeSvg(dataBufferBase64);
    return qrCode.svg();
}

export default function SectionPrintable() {

    const { electionData } = useElectionContext();

    const qrCode = getBarcode(electionData);

    const dateStart = electionData.general.electionStart
        ? format(electionData.general.electionStart, "yyyy-MM-dd")
        : "";

    const electionAnnouncementDate = electionData.general.electionAnnouncement.on
        ? format(electionData.general.electionAnnouncement.on, "yyyy-MM-dd")
        : "";

    const electionEndDate = electionData.general.electionEnd
        ? format(electionData.general.electionEnd, "yyyy-MM-dd")
        : "";

    return (
        <>
            {header}
            <main>
                <h2 className="font-bold mt-5 text-xl">Allgemeine Angaben</h2>
                <div className="grid grid-cols-4">
                    <p>
                        Jahrgang <strong>{electionData.general.year}</strong>
                    </p>
                    <p>
                        Klasse <strong>{electionData.general.tutorium}</strong>
                    </p>
                    <p>
                        Datum <strong>{dateStart}</strong>
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    <p>
                        Klassenlehrkraft <strong>{electionData.general.classTeacher.name}</strong>
                    </p>
                    <p>
                        E-Mail <strong>{electionData.general.classTeacher.email}</strong>
                    </p>
                </div>
                <p className="border-2 mx-2 my-1 p-1 text-xs">
                    Ich, die Klassenlehrkraft, bestätige, mich mit den rechtlichen Vorgaben für die Klassensprecherwahl
                    vertraut gemacht, den Wahlausschuss angemessen darüber unterrichtet und die korrekte Durchführung
                    der Wahl beaufsichtigt zu haben. <br />
                    <SignHere name={electionData.general.classTeacher.name} />
                </p>
                <p>
                    Die Wahl wurde angekündigt am <strong>{electionAnnouncementDate}</strong> mittels{" "}
                    {electionData.general.electionAnnouncement.using}.
                </p>
                <h2 className="font-bold mt-5 underline">Wahlausschuss</h2>
                <div className="grid grid-cols-2">
                    <p>
                        Wahlleiter:in
                        <br />
                        <strong>{electionData.committee.wahlleiter}</strong>
                    </p>
                    <p>
                        Beisitzer
                        <br />
                        <strong>{electionData.committee.wahlhelfer[0]}</strong>,<br />
                        <strong>{electionData.committee.wahlhelfer[1]}</strong>
                    </p>
                </div>
                <h2 className="font-bold mt-5 underline">Angaben zur Wahl</h2>
                <p>
                    Zu Beginn der Wahl waren <strong>{electionData.general.numberOfStudents}</strong> Schüler:innen
                    wahlberechtigt. Davon anwesend waren <strong>{electionData.general.numberOfStudentsPresent}</strong>{" "}
                    Schüler:innen.
                </p>
                <p>
                    Die Wahl begann am <strong>{dateStart}</strong> um{" "}
                    <strong>
                        {electionData.general.electionStart?.toLocaleTimeString("de-DE", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            hourCycle: "h23",
                        })}
                    </strong>
                    .
                </p>

                <div
                    style={{
                        pageBreakInside: "avoid",
                        breakInside: "avoid",
                        pageBreakAfter: "auto",
                    }}
                >
                    <ElectionPrintable
                        wahlgang={1}
                        electionType={"representative"}
                        electionData={electionData.representative!}
                    />
                </div>
                <div
                    style={{
                        pageBreakInside: "avoid",
                        breakInside: "avoid",
                        pageBreakAfter: "always",
                    }}
                >
                    <ElectionPrintable wahlgang={2} electionType={"deputy"} electionData={electionData.deputy!} />
                </div>
                <h2 className="text-2xl font-bold">Ende der Wahl</h2>
                <p>
                    Die Wahl endete am {electionEndDate} um{" "}
                    {electionData.general.electionEnd?.toLocaleTimeString("de-DE", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h23",
                        hour12: false,
                    })}
                </p>
                <p>
                    Wir, der Wahlausschuss, bestätigen die ordnungsgemäße Durchführung der Wahl und die Wahl der o.g.
                    Kandidat:innen.
                    <div className="grid grid-cols-2">
                        <div className="col-span-2">
                            <SignHere name={electionData.committee.wahlleiter} />
                        </div>
                        {electionData.committee.wahlhelfer.map((w) => (
                            <div key={w}>
                                <SignHere name={w} />
                            </div>
                        ))}
                    </div>
                </p>
                <h3 className="font-bold underline text-xl mt-5">Nur zu internen Prüfung durch die SV</h3>
                <div className="grid grid-cols-2 mb-5">
                    <div className="border-black" dangerouslySetInnerHTML={{ __html: qrCode }} />
                    <div>
                        <p className="">Vom SV-Vorstand geprüft:</p>
                        <div
                            style={{
                                borderTop: "1px solid black",
                                marginTop: "1cm",
                            }}
                        >
                            Vorstandsmitglied
                        </div>
                        <div
                            style={{
                                borderTop: "1px solid black",
                                marginTop: "1cm",
                            }}
                        >
                            Datum
                        </div>
                        <SignHere omitDate={true} />
                    </div>
                </div>
            </main>
            <footer className="text-2xs text-muted-foreground text-center">
                <hr />
                <p>Wahlniederschrift Klassensprecherwahl</p>
                <p className="text-[0.6em]">
                    &copy; 2025 Schülververtretung Gymnasium Riedberg
                    <br />
                    Software by Filip Lukas Paidar
                </p>
                <img src={svLogo} alt="SV Logo" className="mx-auto h-10" />
            </footer>
        </>
    );
}
