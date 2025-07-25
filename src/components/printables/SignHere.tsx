import { format } from "date-fns"


export default function SignHere({name, omitDate}: {name?: string, omitDate?: boolean}) {
    // a field to sign

    const date = format(new Date(), "yyyy-MM-dd");

    return (
        <div>
            Unterschrift {name}
            <div style={{
                backgroundColor: "#b1b1b1",
                height: "1.5cm",
                width: "8cm",
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                paddingLeft: "0.1cm",
                WebkitPrintColorAdjust: "exact", // Ensures background color is printed
                printColorAdjust: "exact", // For broader browser compatibility
                marginBottom: 0,
                fontSize: "0.7em",
            }}>
                {omitDate === true || `in FFM am ${date}`}
            </div>
        </div>
    )
}