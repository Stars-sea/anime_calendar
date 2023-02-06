import { Button, Form, Input } from "antd";
import { SetAppConfig } from "../../wailsjs/go/main/App";

export default () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={v => SetAppConfig(v)}
        autoComplete="off"
    >
        <Form.Item label="用户名" name="bangumi_username"
            rules={[{ required: true, message: '请输入你的 Bangumi 用户名' }]}>
            <Input placeholder="Bangumi username" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Apply
            </Button>
        </Form.Item>
    </Form>
);
