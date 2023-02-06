import { Tag } from "antd";
import { useState } from "react";
import { GetSubjectTypeName } from "../../wailsjs/go/bangumi_api/StructureHelper";
import { bangumi_api } from "../../wailsjs/go/models";
import URLText from "./URLText";

function getNonEmpty(first: boolean, s1: string, s2: string): string {
    let r = first ? s1 : s2;
    if (r.length == 0) {
        r = first ? s2 : s1;
    }
    return r;
}

export interface SubjectTitleProps {
    subject: bangumi_api.Subject,
    showNameCN: boolean
}

export default function SubjectTitle({ subject, showNameCN = false }: SubjectTitleProps) {
    const [tag, setTag] = useState("");
    GetSubjectTypeName(subject).then(setTag);

    return (
        <div className="subject_title">
            <URLText text={getNonEmpty(showNameCN, subject.name_cn, subject.name)}
                     tooltip={showNameCN ? "" : subject.name_cn}
                     url={subject.url} />

            <div className="subject_tags">
                <Tag color="cyan">{tag}</Tag>
                {subject.rank && <Tag color="blue">RANK {subject.rank}</Tag>}
            </div>
        </div>
    );
}

SubjectTitle.defaultProps = {
    showNameCN: false
};
