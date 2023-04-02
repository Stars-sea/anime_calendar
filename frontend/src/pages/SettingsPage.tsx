import { Button, Form, Input } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { GetUser } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { GetAppConfig, SetAppConfig } from "../../wailsjs/go/main/App";

interface Validation {
    validateStatus: ValidateStatus,
    errorMessage: string | null
}

const validUser = async (username: string) : Promise<Validation> => {
    try {
        const user = await GetUser(username);
        console.log(user);
        if (user === null) throw null;
        return {
            validateStatus: "success",
            errorMessage: null
        }
    } catch (error) {
        console.log(error);
        return {
            validateStatus: "error",
            errorMessage: "获取用户信息错误"
        }
    }
}

export default () => {
    const [form] = Form.useForm();
    const [userValidation, setUserValidation] = useState<Validation>({
        validateStatus: "",
        errorMessage: null
    });

    useEffect(() => { GetAppConfig().then(form.setFieldsValue); }, []);

    const onCheck = async () => {
        setUserValidation({
            validateStatus: "validating",
            errorMessage: null
        });
        
        const { bangumi_username } = form.getFieldsValue();
        setUserValidation(await validUser(bangumi_username));

        await form.validateFields();
        form.submit();
    }

    return (
        <Form
            name="settings"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={v => SetAppConfig(v)}
            autoComplete="off"
            requiredMark="optional"
        >
            <Form.Item label="用户名" required name="bangumi_username"
                       rules={[{ required: true, message: '请输入你的 Bangumi 用户名' }]}
                       hasFeedback
                       validateStatus={userValidation.validateStatus}
                       help={userValidation.errorMessage}>
                <Input placeholder="Bangumi username" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={onCheck}>
                    Apply
                </Button>
            </Form.Item>
        </Form>
    );
}
