import React, { createContext, useState } from "react";

// Define the shape of the election data
interface ElectionData {
    general: {
        teacherReadInformationConfirm: boolean;

        year: string | undefined;
        tutorium: string | undefined;
        classTeacher: {
            name: string | undefined;
            email: string | undefined;
        };
        electionAnnouncement: {
            by: string | undefined;
            on: Date | undefined;
            using: string | undefined;
        };
        electionStart: Date | undefined;
        numberOfStudents: number | undefined;
        numberOfStudentsPresent: number | undefined;
        electionEnd: Date | undefined;
        comments: string | undefined;
    };
    committee: {
        wahlleiter: string | undefined;
        wahlhelfer: [string | undefined, string | undefined];
    };
    representative?: SingleElection;
    deputy?: SingleElection;
}

type ElectionEvaluationState =
    | "notEvaluated" // default state during the election
    | "stichwahlPending" // if a stichwahl is required and not evaluated
    | "losPending" // if a los is required and not evaluated
    | "done" // if everything is evaluated and a winner is determined
;


type SingleElection = {
    candidates?: {
        name: string;
        votes: number;
    }[];
    singleCandidate?: {
        name: string;
        yesVotes: number;
        noVotes: number;
    };
    incorrectVotes?: number;
    enthaltungen?: number;

    electionEvaluated: ElectionEvaluationState;

    stichwahl?: {
        candidates: {
            name: string;
            votes: number;
        }[];
        incorrectVotes?: number;
        enthaltungen: number;
    };

    los?: {
        method: string; // e.g. coin toss, drawing lots, etc.
        resultingCandidate?: string;
    };

    winner?: {
        name: string;
        email: string;
        acceptsElection: boolean;
    };
    noWinner?: boolean; // if there was only one candidate and he did not get enough votes
};

// Create default data
const defaultElectionData: ElectionData = {
    general: {
        teacherReadInformationConfirm: false,
        year: undefined,
        tutorium: undefined,
        classTeacher: {
            name: undefined,
            email: undefined,
        },
        electionAnnouncement: {
            by: undefined,
            on: undefined,
            using: undefined,
        },
        electionStart: undefined,
        numberOfStudents: undefined,
        numberOfStudentsPresent: undefined,
        electionEnd: undefined,
        comments: undefined,
    },
    committee: {
        wahlleiter: undefined,
        wahlhelfer: [undefined, undefined],
    },
    representative: {
        electionEvaluated: "notEvaluated"
    },
    deputy: {
        electionEvaluated: "notEvaluated"
    },
};

// Create context
const ElectionContext = createContext({
    electionData: defaultElectionData,
    setElectionData: (() => {}) as React.Dispatch<React.SetStateAction<ElectionData>>,
});

// Provider component
export const ElectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [electionData, setElectionData] = useState<ElectionData>(defaultElectionData);

    return <ElectionContext.Provider value={{ electionData, setElectionData }}>{children}</ElectionContext.Provider>;
};

export { ElectionContext };
