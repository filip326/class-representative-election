import svLogo from "./assets/sv-logo.png";
import SectionGeneral from "./components/sections/General";
import SectionInformation from "./components/sections/Information";
import SectionVotingCommittee from "./components/sections/VotingCommittee";

function App() {
    return (
        <>
            <div className="flex flex-col mt-5 gap-10 max-w-[800px] w-[90vw] mx-auto">
                <div className="flex flex-row items-center justify-center gap-5">
                    <img src={svLogo} className="max-h-20" />
                    <h1 className="text-2xl font-bold mt-5">Klassensprecherwahl-Wahlniederschrift</h1>
                </div>

                <SectionInformation />
                <SectionGeneral />
                <SectionVotingCommittee />
            </div>

            <footer>

                <a href="">Impressum</a>
                <a href="">Datenschutz</a>

            </footer>
        </>
    );
}

export default App;

