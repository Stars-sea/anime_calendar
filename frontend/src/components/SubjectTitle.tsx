import { Tag, Tooltip } from "antd";
import { useState } from "react";
import { GetSubjectTypeName } from "../../wailsjs/go/bangumi_api/StructureHelper";
import { bangumi_api } from "../../wailsjs/go/models";

export interface SubjectTitleProps {
    subject: bangumi_api.Subject
}

export function SubjectTitle({ subject }: SubjectTitleProps) {
    const [tag, setTag] = useState("");
    GetSubjectTypeName(subject).then(setTag);

    return (
        <span className="subject_title" style={{ verticalAlign: "middle" }}>
            <Tooltip title={subject.name_cn}>{subject.name}</Tooltip>
            <Tag color="cyan" style={{ marginLeft: 8 }}>{tag}</Tag>
            {subject.rank && <Tag color="blue">RANK {subject.rank}</Tag>}
        </span>
    )
}
