import { bangumi_api } from "../../wailsjs/go/models";
import ScoreBox from "../components/ScoreBox";

export interface SubjectDetailPageProps {
    subject: bangumi_api.Subject
}

export default ({ subject }: SubjectDetailPageProps) => {
    return <>
        <ScoreBox score={subject.rating} />
    </>;
}
