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
    representative: SingleElection;
    deputy: SingleElection;
}

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
    representative: {},
    deputy: {},
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
