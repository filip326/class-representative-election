// Component with the following params
// Wahlgang: int
// electionType: "representative" | "deputy"
// electionData: SingleElectionData

import type { SingleElection } from "@/context/ElectionContext";
import SignHere from "./SignHere";

export default function ElectionPrintable({
    wahlgang,
    electionType,
    electionData,
}: {
    wahlgang: number;
    electionType: "representative" | "deputy";
    electionData: SingleElection;
}) {
    const title = (
        <h2 className="text-xl font-bold mt-5">
            {wahlgang}. Wahlgang:{" "}
            {electionType === "representative" ? "Klassensprecher:in" : "Stellvertretende:r Klassensprecher:in"}
        </h2>
    );

    if (
        (electionData.candidates == undefined || electionData.candidates.length === 0) &&
        electionData.singleCandidate?.name == undefined
    ) {
        return (
            <>
                {title}
                <p>
                    Es wurden keine Kandidat:innen aufgestellt.
                    <br />
                    Es wurde{" "}
                    <strong>
                        kein:e{" "}
                        {electionType === "representative"
                            ? "Klassensprecher:in"
                            : "stellvertretende:r Klassensprecher:in"}{" "}
                    </strong>{" "}
                    gewählt.
                </p>
            </>
        );
    }

    if (electionData.singleCandidate?.name) {
        return (
            <>
                {title}
                <p>
                    Es gab eine:n Kandidaten:in, der:die sich für die Wahl aufgestellt hat.
                    <br />
                    Es wurde eine "Ja/Nein"-Wahl durchgeführt. Der:die Kandidat:in braucht die Mehrheit der gültigen
                    Stimmen, um gewählt zu werden.
                </p>
                <p>
                    Kandidat:in: <strong>{electionData.singleCandidate.name}</strong>
                </p>
                <table style={{ border: "1px solid black", borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black", padding: "4px 8px", width: "25%" }}>Ja</th>
                            <th style={{ border: "1px solid black", padding: "4px 8px", width: "25%" }}>Nein</th>
                            <th style={{ border: "1px solid black", padding: "4px 8px", width: "25%" }}>Enthaltung</th>
                            <th style={{ border: "1px solid black", padding: "4px 8px", width: "25%" }}>Ungültig</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>
                                {electionData.singleCandidate.yesVotes}
                            </td>
                            <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>
                                {electionData.singleCandidate.noVotes}
                            </td>
                            <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>
                                {electionData.enthaltungen}
                            </td>
                            <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>
                                {electionData.incorrectVotes}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {electionData.noWinner || !electionData.winner ? (
                    <p>
                        Es wurde kein:e{" "}
                        {electionType === "representative"
                            ? "Klassensprecher:in"
                            : "stellvertretende:r Klassensprecher:in"}{" "}
                        gewählt.
                    </p>
                ) : (
                    <>
                        <p>
                            Es wurde <strong>{electionData.winner.name}</strong> zur:m{" "}
                            <strong>
                                {electionType === "representative"
                                    ? "Klassensprecher:in"
                                    : "stellvertretende:r Klassensprecher:in"}{" "}
                            </strong>{" "}
                            gewählt.
                            <br />
                            Der:die Kandidat:in nimmt die Wahl an.
                        </p>
                        <SignHere name={electionData.winner.name} />
                    </>
                )}
            </>
        );
    }

    return (
        <>
            {title}
            <p>
                Es wurden {electionData.candidates!.length} Kandidat:innen aufgestellt.
                <br />
                Es wurde eine Mehrheitswahl durchgeführt. Es wird der:die Kandidat:in gewählt, der:die die meisten
                Stimmen erhält.
            </p>
            <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                <tr>
                    <th style={{ border: "1px solid black", padding: "4px 8px", width: "50%" }}>Kandidat:in</th>
                    <th style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>Stimmen</th>
                </tr>
                {electionData.candidates!.map((candidate, index) => (
                    <tr key={index}>
                        <td style={{ border: "1px solid black", padding: "4px 8px", width: "50%" }}>
                            {candidate.name}
                        </td>
                        <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center" }}>
                            {candidate.votes}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td style={{ border: "1px solid black", padding: "4px 8px", width: "80%" }} className="mt-4">
                        Enthaltungen
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center", width: "20%" }}>
                        {electionData.enthaltungen}
                    </td>
                </tr>
                <tr>
                    <td style={{ border: "1px solid black", padding: "4px 8px", width: "80%" }}>Ungültig</td>
                    <td style={{ border: "1px solid black", padding: "4px 8px", textAlign: "center", width: "20%" }}>
                        {electionData.incorrectVotes}
                    </td>
                </tr>
            </table>
            {electionData.stichwahl && (
                <>
                    Aufgrund von Stimmgleichheit musste eine Stichwahl durchgeführt werden.
                    <table>
                        {electionData.stichwahl.candidates!.map((candidate, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid black", padding: "4px 8px", width: "80%" }}>
                                    {candidate.name}
                                </td>
                                <td
                                    style={{
                                        border: "1px solid black",
                                        padding: "4px 8px",
                                        textAlign: "center",
                                        width: "20%",
                                    }}
                                >
                                    {candidate.votes}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td
                                style={{ border: "1px solid black", padding: "4px 8px", width: "80%" }}
                                className="mt-4"
                            >
                                Enthaltungen
                            </td>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "4px 8px",
                                    textAlign: "center",
                                    width: "20%",
                                }}
                            >
                                {electionData.stichwahl.enthaltungen}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid black", padding: "4px 8px", width: "80%" }}>Ungültig</td>
                            <td
                                style={{
                                    border: "1px solid black",
                                    padding: "4px 8px",
                                    textAlign: "center",
                                    width: "20%",
                                }}
                            >
                                {electionData.stichwahl.incorrectVotes}
                            </td>
                        </tr>
                    </table>
                </>
            )}
            {electionData.los && (
                <p>
                    Aufgrund von anhaltender Stimmgleichheit wurde zwischen{" "}
                    <strong>{electionData.los.candidates.join(", ")}</strong> gelost.
                    <br />
                    Der:die Wahlleiter:in hat folgendes Verfahren gewählt: <br />
                    <i className="italic">{electionData.los.method}</i>
                    <br />
                    Das Los fiel auf <strong>{electionData.los.resultingCandidate}</strong>.
                </p>
            )}
            {electionData.noWinner || !electionData.winner ? (
                <p>
                    Es wurde kein:e{" "}
                    {electionType === "representative" ? "Klassensprecher:in" : "stellvertretende:r Klassensprecher:in"}{" "}
                    gewählt.
                </p>
            ) : (
                <>
                    <p>
                        Es wurde <strong>{electionData.winner.name}</strong> zur:m{" "}
                        <strong>
                            {electionType === "representative"
                                ? "Klassensprecher:in"
                                : "stellvertretende:r Klassensprecher:in"}{" "}
                        </strong>{" "}
                        gewählt.
                        <br />
                        Der:die Kandidat:in nimmt die Wahl an.
                    </p>
                    <SignHere name={electionData.winner.name} />
                </>
            )}
        </>
    );
}
