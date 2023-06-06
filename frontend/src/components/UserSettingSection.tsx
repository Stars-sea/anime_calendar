import { CheckOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import React, { useContext, useEffect, useState } from "react";
import { GetUser, ValidUserAndToken } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api, config } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import URLText from "./URLText";
import UserCard from "./UserCard";
import "./UserSettingSection.css";

interface Validation {
    validateStatus: ValidateStatus,
    errorMessage?: string
}

async function validUserAndToken(username: string, token?: string): Promise<Validation> {
    try {
        const apiErr = await ValidUserAndToken(username, token === '' ? undefined : token);
        if (apiErr === null)
            return { validateStatus: "success" };
        else return {
            validateStatus: "error",
            errorMessage: `${apiErr.title}: ${apiErr.description}`
        };
    } catch (error) {
        return {
            validateStatus: "error",
            errorMessage: `Unknown error (${error})`
        };
    }
}

interface SettingFormProps {
    onSubmit: () => void,
    updateConfig: (config: config.AppConfig) => void
}

const SettingForm: React.FC<SettingFormProps> = ({ onSubmit, updateConfig }) => {
    const [form] = Form.useForm<config.AppConfig>();
    const appconfig = useContext(AppConfigContext);
    const [validation,  setValidation]  = useState<Validation>({ validateStatus: "" });


    const onCheck = async () => {
        setValidation({ validateStatus: "validating" });

        const { bangumi_username, bangumi_token } = form.getFieldsValue();
        const result = await validUserAndToken(bangumi_username, bangumi_token);
        setValidation(result);

        await form.validateFields();
        if (result.validateStatus === "success")
            form.submit();
    }

    const onFinish = async (values: config.AppConfig) => {
        const filter_anime = appconfig ? appconfig.filter_anime : false;
        updateConfig({...values, filter_anime});
        onSubmit();
    }

    return <Form
        name="user_setting"
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={appconfig}
        requiredMark={false}
    >
        <Form.Item required hasFeedback name="bangumi_username"
            validateStatus={validation.validateStatus} help={validation.errorMessage}
            rules={[{ required: true, message: '请输入 Bangumi 用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="Bangumi username" />
        </Form.Item>

        <Form.Item name="bangumi_token" rules={[{
                type: "string", pattern: /^[a-z0-9]{40}$/gi,
                message: "Token 格式错误"
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


interface UserSettingSectionProps {
    updateConfig: (config: config.AppConfig) => void
}

export default ({ updateConfig }: UserSettingSectionProps) => {
    const appconfig = useContext(AppConfigContext);
    const [user, setUser] = useState<bangumi_api.User | null>(null);
    const [loading, setLoading] = useState(true);

    const setUsername = async (username?: string) => {
        setLoading(true);
        try {
            setUser(username ? await GetUser(username) : null);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => { setUsername(appconfig?.bangumi_username) }, []);

    return (
        <Skeleton loading={loading} avatar active>{
            user == null ? (
                <SettingForm onSubmit={() => setUsername(appconfig?.bangumi_username)} updateConfig={updateConfig} />
            ) : (
                <UserCard user={user} actions={[
                    <span onClick={() => setUsername()}>
                        <LogoutOutlined key="logout" style={{marginRight: 5}} />
                        Logout
                    </span>]}
                />
            )
        }</Skeleton>
    );
}
