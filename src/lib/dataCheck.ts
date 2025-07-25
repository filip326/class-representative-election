import type { ElectionData } from "@/context/ElectionContext";
import { differenceInDays } from "date-fns";

export function getWarnings(data: ElectionData, extended: boolean = false): string[] {
    const warnings: string[] = [];

    // check the general section
    if (!data.general.classTeacher) {
        warnings.push("Bitte Klassenlehrkraft angeben");
    }
    if (!data.general.classTeacher.name) {
        warnings.push("Bitte den Namen der Klassenlehrkraft angeben");
    }
    if (!data.general.classTeacher.email) {
        warnings.push("Bitte die E-Mail-Adresse der Klassenlehrkraft angeben");
    } else if (!data.general.classTeacher.email?.endsWith("@grb-mail.de")) {
        warnings.push("Die E-Mail-Adresse der Klassenlehrkraft muss eine iServ-Adresse sein");
    }

    if (!data.general.teacherReadInformationConfirm) {
        warnings.push("Bitte die Kenntnisnahme der rechtlichen Vorgaben bestätigen.");
    }

    if (!data.general.electionStart) {
        warnings.push("Bitte geben Sie das Datum und die Uhrzeit der Wahl an.");
    }
    if (!data.general.electionEnd) {
        warnings.push("Bitte geben Sie das Datum und die Uhrzeit des Wahlendes an.");
    }
    if (!data.general.electionAnnouncement.on) {
        warnings.push("Bitte das Datum der Wahlankündigung angeben.");
    }
    if (!data.general.electionAnnouncement.using) {
        warnings.push("Bitte die Art der Wahlankündigung angeben.");
    }
    if (
        data.general.electionStart &&
        data.general.electionAnnouncement.on &&
        differenceInDays(data.general.electionStart, data.general.electionAnnouncement.on) < 3
    ) {
        warnings.push("Die Wahlankündigung muss mindestens 3 Tage vor der Wahl erfolgen.");
    }

    if (!data.committee.wahlleiter || !data.committee.wahlhelfer[0] || !data.committee.wahlhelfer[1]) {
        warnings.push("Bitte alle Mitglieder des Wahlvorstands angeben.");
    }

    if (!data.general.tutorium) {
        warnings.push("Bitte eine Klasse / einen Tutorkurs angeben.");
    }
    if (!data.general.year) {
        warnings.push("Bitte eine Jahrgangsstufe angeben.");
    } else {
        if (parseInt(data.general.year) < 5 || parseInt(data.general.year) > 13) {
            warnings.push("Die Jahrgangsstufe muss zwischen 5 und 13 sein.");
        }
        if (
            parseInt(data.general.year) <= 10 &&
            !data.general.tutorium?.toLowerCase().startsWith(data.general.year.padStart(2, "0"))
        ) {
            warnings.push("Die Klasse muss mit der Jahrgangsstufe übereinstimmen.");
        } else if (parseInt(data.general.year) > 10 && !/^[A-Za-z]{3}$/.test(data.general.tutorium || "")) {
            warnings.push("Das Tutorium muss ein Kürzel aus drei Buchstaben sein.");
        }
    }
    if (!data.general.numberOfStudents) {
        warnings.push("Bitte die Anzahl der Schüler angeben.");
    }
    if (!data.general.numberOfStudentsPresent) {
        warnings.push("Bitte die Anzahl der anwesenden Schüler angeben.");
    }
    if ((data.general.numberOfStudentsPresent ?? 0) > (data.general.numberOfStudents ?? 0)) {
        warnings.push("Die Anzahl der anwesenden Schüler darf nicht größer sein als die Anzahl der Schüler.");
    }

    // check the candidates section
    if (data.representative?.electionEvaluated !== "done") {
        warnings.push("Die Wahl des Klassensprechers ist noch nicht abgeschlossen!");
    } else if (!data.representative.noWinner) {
        if (!data.representative.winner?.email) {
            warnings.push("Bitte die E-Mail-Adresse des Klassensprechers angeben.");
        } else if (!data.representative.winner.email.endsWith("@grb-mail.de")) {
            warnings.push("Die E-Mail-Adresse des Klassensprechers muss eine iServ-Adresse sein.");
        }

        if (!data.representative.winner?.acceptsElection) {
            warnings.push(
                "Der gewählte Klassensprecher muss sein Amt annehmen, was in der Wahlniederschrift zu vermerken ist.",
            );
        }
    }
    if (data.deputy?.electionEvaluated !== "done") {
        warnings.push("Die Wahl des stellvertretenden Klassensprechers ist noch nicht abgeschlossen!");
    } else if (!data.deputy.noWinner) {
        if (!data.deputy.winner?.email) {
            warnings.push("Bitte die E-Mail-Adresse des stellvertretenden Klassensprechers angeben.");
        } else if (!data.deputy.winner.email.endsWith("@grb-mail.de")) {
            warnings.push("Die E-Mail-Adresse des stellvertretenden Klassensprechers muss eine iServ-Adresse sein.");
        }
        if (!data.deputy.winner?.acceptsElection) {
            warnings.push(
                "Der gewählte stellvertretende Klassensprecher muss sein Amt annehmen, was in der Wahlniederschrift zu vermerken ist.",
            );
        }
    }

    if (extended) {
        // extended warnings will be included in the qr code
        // but not shown in the UI
        if (data.general.comments) {
            warnings.push("Es gibt Anmerkungen oder Ergänzungen zur Wahl, die ggf. erhöhte Aufmerksamkeit erfordern.");
        }
    }

    return warnings;
}
