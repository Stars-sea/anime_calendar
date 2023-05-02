import { CheckOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { GetUser } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { GetAppConfig, SaveAppConfig } from "../../wailsjs/go/main/App";
import { bangumi_api, config } from "../../wailsjs/go/models";
import URLText from "./URLText";
import UserCard from "./UserCard";
import "./UserSettingSection.css";

interface Validation {
    validateStatus: ValidateStatus,
    errorMessage: string | null
}

const validUser = async (username: string): Promise<Validation> => {
    try {
        const user = await GetUser(username);
        if (user === null) throw "Get null user data";
        return {
            validateStatus: "success",
            errorMessage: null
        }
    } catch (error) {
        console.error(error);
        return {
            validateStatus: "error",
            errorMessage: "获取用户信息错误"
        }
    }
}

interface SettingFormProps {
    onSubmit: (username: bangumi_api.User) => void
}

const SettingForm: React.FC<SettingFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm();
    const [validation, setValidation] = useState<Validation>({
        validateStatus: "",
        errorMessage: null
    });

    useEffect(() => { GetAppConfig().then(form.setFieldsValue); }, []);

    const onCheck = async () => {
        setValidation({
            validateStatus: "validating",
            errorMessage: null
        });

        const { bangumi_username } = form.getFieldsValue();
        setValidation(await validUser(bangumi_username));

        await form.validateFields();
        form.submit();
    }

    const onFinish = async (values: config.AppConfig) => {
        const bangumi_username = values.bangumi_username;
        const bangumi_token    = values.bangumi_token;
        onSubmit(await GetUser(bangumi_username));

        // Save config
        const originConfig = await GetAppConfig();
        const config = {...originConfig, bangumi_username, bangumi_token};
        await SaveAppConfig(config);
    }

    return <Form
        name="user_setting"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
    >
        <Form.Item required hasFeedback name="bangumi_username"
            rules={[{ required: true, message: '请输入 Bangumi 用户名' }]}
            validateStatus={validation.validateStatus} help={validation.errorMessage}>
            <Input prefix={<UserOutlined />} placeholder="Bangumi username" />
        </Form.Item>

        <Form.Item name="bangumi_token" rules={[{
            type: "string", pattern: /^[a-z0-9]{40}$/gi,
            message: "Token 格式不对, 是否漏输?"
        }]}>
            <Input prefix={<KeyOutlined />} placeholder="Bangumi token (optional)" />
        </Form.Item>

        <Form.Item>
            <div className="submit_section">
                <Button type="primary" onClick={onCheck}>
                    <CheckOutlined /> 完成
                </Button>
                <URLText className="apply_token" text="没有 Token? 申请一个" direct
                    url="https://next.bgm.tv/demo/access-token" />
            </div>
        </Form.Item>
    </Form>;
}

export default () => {
    const [user, setUser] = useState<bangumi_api.User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const name = (await GetAppConfig()).bangumi_username;
            setUser(await GetUser(name));
            setLoading(false)
        })();
    }, []);

    const logout = () => {
        setUser(null);
    }

    return (
        <Skeleton loading={loading} avatar active>{
            user == null ? (
                <SettingForm onSubmit={setUser} />
            ) : (
                <UserCard user={user} actions={[
                    <span onClick={logout}>
                        <LogoutOutlined key="logout" style={{marginRight: 5}} />
                        Logout
                    </span>]}
                />
            )
        }</Skeleton>
    );
}
