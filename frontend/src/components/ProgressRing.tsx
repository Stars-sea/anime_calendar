import { LoadingOutlined } from "@ant-design/icons";
import { Spin, SpinProps } from "antd";

export default function ProgressRing(props: SpinProps) {
    props.indicator = <LoadingOutlined spin />;
    return <Spin {...props} />;
}
