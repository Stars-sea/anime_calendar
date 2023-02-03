import { Tag, Tooltip } from "antd";
import { useState } from "react";
import { GetSubjectTypeName } from "../../wailsjs/go/bangumi_api/StructureHelper";
import { bangumi_api } from "../../wailsjs/go/models";

export interface SubjectTitleProps {
    subject: bangumi_api.Subject
}

export function SubjectTitle(props: SubjectTitleProps) {
    const [tag, setTag] = useState("");
    GetSubjectTypeName(props.subject).then(setTag);

    return (
        <span className="subject-title" style={{verticalAlign: "middle"}}>
            <Tooltip title={props.subject.name_cn}>{props.subject.name}</Tooltip>
            <Tag color="cyan" style={{ marginLeft: 8 }}>{tag}</Tag>
            {props.subject.rank && <Tag color="blue">RANK {props.subject.rank}</Tag>}
        </span>
    )
}
