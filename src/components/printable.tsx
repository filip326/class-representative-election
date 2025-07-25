import { useElectionContext } from "@/context/useElectionContext";
import svLogo from "../assets/sv-logo.png";
import { format } from "date-fns/format";
import ElectionPrintable from "./printables/ElectionPrintable";

const header = (
    <header>
        <div className="flex flex-row items-center justify-between gap-5">
            <h1 className="text-2xl font-bold mt-5">Klassensprecherwahl-Wahlniederschrift</h1>
            <img src={svLogo} className="max-h-15" alt="SV Logo" />
        </div>
    </header>
);

export default function SectionPrintable() {
    const { electionData } = useElectionContext();

    const dateStart = electionData.general.electionStart
        ? format(electionData.general.electionStart, "yyyy-MM-dd")
        : "";

    const electionAnnouncementDate = electionData.general.electionAnnouncement.on
        ? format(electionData.general.electionAnnouncement.on, "yyyy-MM-dd")
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
                    <ElectionPrintable
                        wahlgang={2}
                        electionType={"deputy"}
                        electionData={electionData.deputy!}
                    />
                </div>
            </main>
        </>
    );
}