import { LoadingOutlined } from "@ant-design/icons";
import { Spin, SpinProps } from "antd";

export function ProgressRing(props: SpinProps) {
    return (
        <Spin
            prefixCls={props.prefixCls}
            className={props.className}
            spinning={props.spinning}
            style={props.style}
            size={props.size}
            tip={props.tip}
            delay={props.delay}
            wrapperClassName={props.wrapperClassName}
            children={props.children}
            indicator={
                <LoadingOutlined spin />
            }
        />
    );
}