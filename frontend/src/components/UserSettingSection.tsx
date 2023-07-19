import { CheckOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import React, { useContext, useEffect, useState } from "react";
import { GetUser, ValidUserAndToken } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { bangumi_api, config } from "../../wailsjs/go/models";
import { AppConfigContext } from "../App";
import URLText from "./URLText";
import UserCard from "./UserCard";

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
    onSubmit: (config: config.UserConfig) => void
}

const SettingForm: React.FC<SettingFormProps> = ({ onSubmit }) => {
    const [form] = Form.useForm<config.UserConfig>();
    const { appconfig } = useContext(AppConfigContext);
    const [validation, setValidation] = useState<Validation>({ validateStatus: "" });

    const onCheck = async () => {
        setValidation({ validateStatus: "validating" });

        const { bangumi_username, bangumi_token } = form.getFieldsValue();
        const result = await validUserAndToken(bangumi_username, bangumi_token);
        setValidation(result);

        await form.validateFields();
        if (result.validateStatus === "success")
            form.submit();
    }

    return <Form
        name="user_setting"
        form={form}
        onFinish={onSubmit}
        autoComplete="off"
        initialValues={appconfig?.user_config}
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
            <div className="flex justify-between ">
                <Button type="primary" onClick={onCheck}>
                    <CheckOutlined /> 完成
                </Button>
                <URLText className="mx-0 my-auto " text="没有 Token? 申请一个" direct
                         url="https://next.bgm.tv/demo/access-token" />
            </div>
        </Form.Item>
    </Form>;
}

export default () => {
    const { appconfig, updateConfig } = useContext(AppConfigContext);
    const [user, setUser] = useState<bangumi_api.User>();
    const [loading, setLoading] = useState(true);

    const setUsername = async (username?: string) => {
        setLoading(true);
        try {
            setUser(username ? await GetUser(username) : undefined);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => { setUsername(appconfig.user_config?.bangumi_username) }, []);

    const updateUserConfig = (user_config: config.UserConfig) => {
        setUsername(user_config.bangumi_username);
        updateConfig({ user_config });
    }

    return (
        <Skeleton loading={loading} avatar active>{
            user ? (
                <UserCard user={user} actions={[
                    <span onClick={() => setUsername()}>
                        <LogoutOutlined className="mr-1 " key="logout" />
                        Logout
                    </span>]}
                />
            ) : (
                <SettingForm onSubmit={updateUserConfig} />
            )
        }</Skeleton>
    );
}
