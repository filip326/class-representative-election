import React from "react";

const Imprint: React.FC = () => {
    return (
        <div className="flex flex-col mt-5 gap-5 max-w-[800px] w-[90vw] mx-auto">
            <h1 className="text-2xl font-bold">Impressum</h1>
            <p>
                Filip Lukas Paidar
                <br />
                Schülervertretung Gymnasium Riedberg
                <br />
                Friedrich-Dessauer-Straße 2<br />
                60437 Frankfurt am Main
                <br />
                Deutschland
            </p>
            <p>
                Kontakt:
                <br />
                E-Mail: filip.paidar@grb-mail.de
            </p>
        </div>
    );
};

export default Imprint;
