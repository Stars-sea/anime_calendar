import { Tag, Tooltip } from "antd";
import { useState } from "react";
import { GetSubjectTypeName } from "../../wailsjs/go/bangumi_api/StructureHelper";
import { bangumi_api } from "../../wailsjs/go/models";
import { BrowserOpenURL } from "../../wailsjs/runtime/runtime";

export interface SubjectTitleProps {
    subject: bangumi_api.Subject
}

export default function SubjectTitle({ subject }: SubjectTitleProps) {
    const [tag, setTag] = useState("");
    GetSubjectTypeName(subject).then(setTag);

    return (
        <div className="subject_title">
            <Tooltip title={subject.name_cn}>
                <span onClick={e => e.ctrlKey && BrowserOpenURL(subject.url)}>
                    {subject.name}
                </span>
            </Tooltip>

            <div className="subject_tags">
                <Tag color="cyan">{tag}</Tag>
                {subject.rank && <Tag color="blue">RANK {subject.rank}</Tag>}
            </div>
        </div>
    )
}
