import svLogo from "./assets/sv-logo.png";
import SectionCandidates from "./components/sections/Candidates";
import SectionEnd from "./components/sections/End";
import SectionExport from "./components/sections/Export";
import SectionGeneral from "./components/sections/General";
import SectionInformation from "./components/sections/Information";
import SectionStichwahl from "./components/sections/Stichwahl";
import SectionVotingCommittee from "./components/sections/VotingCommittee";
import SectionWinner from "./components/sections/Winner";
import { Separator } from "./components/ui/separator";
import { ElectionProvider } from "./context/ElectionContext";
import { useState, useEffect } from "react";
import SectionPrintable from "./components/printable";
import ReactDOM from "react-dom";

function App() {
    const [isPrintMode, setIsPrintMode] = useState(false);

    useEffect(() => {
        const handleBeforePrint = () => ReactDOM.flushSync(() => setIsPrintMode(true));
        const handleAfterPrint = () => setIsPrintMode(false);

        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, []);

    if (isPrintMode) {
        return (
            <ElectionProvider>
                <SectionPrintable />
            </ElectionProvider>
        );
    }

    return (
        <ElectionProvider>
            <div className="flex flex-col mt-5 gap-10 max-w-[800px] w-[90vw] mx-auto">
                <div className="flex flex-row items-center justify-center gap-5">
                    <img src={svLogo} className="max-h-20" />
                    <h1 className="text-2xl font-bold mt-5">Klassensprecherwahl-Wahlniederschrift</h1>
                </div>

                <SectionInformation />
                <SectionGeneral />
                <SectionVotingCommittee />

                <h2 className="text-xl font-bold">1. Wahlgang: Klassensprecher:in</h2>

                <SectionCandidates electionType="representative" />
                <SectionStichwahl electionType="representative" />
                <SectionWinner electionType="representative" />

                <Separator />

                <h2 className="text-xl font-bold">2. Wahlgang: stellvertretende:r Klassensprecher:in</h2>

                <SectionCandidates electionType="deputy" />
                <SectionStichwahl electionType="deputy" />
                <SectionWinner electionType="deputy" />

                <Separator />

                <h2 className="text-xl font-bold">Abschluss</h2>
                <SectionEnd />
                <SectionExport />
            </div>

            <footer>
                {/* Links to imprint and privacy policy */}
                <a href="/legal.txt" target="_blank">
                    Rechtliches
                </a>
            </footer>
        </ElectionProvider>
    );
}

export default App;

