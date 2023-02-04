import { LoadingOutlined } from "@ant-design/icons";
import { Spin, SpinProps } from "antd";

export function ProgressRing(props: SpinProps) {
    props.indicator = <LoadingOutlined spin />;
    return Spin(props);
}
