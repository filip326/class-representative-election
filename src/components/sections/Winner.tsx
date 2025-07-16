import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


export default function SectionWinner(
    { electionType }: {
        electionType: "representative" | "deputy";
    }
) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Gewinner:in bestimmen
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    Die Wahl zur:m {
                        electionType === "representative"
                            ? "Klassensprecher:in"
                            : "stellvertretenden Klassensprecher:in"
                    } hat <strong>xy</strong> gewonnen. 
                </p>
            </CardContent>
        </Card>
    )
}