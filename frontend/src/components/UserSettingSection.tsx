import { CheckOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Skeleton } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { GetUser } from "../../wailsjs/go/bangumi_api/BangumiApi";
import { GetAppConfig, SetAppConfig } from "../../wailsjs/go/main/App";
import { bangumi_api, main } from "../../wailsjs/go/models";
import UserCard from "./UserCard";

interface Validation {
    validateStatus: ValidateStatus,
    errorMessage: string | null
}

const validUser = async (username: string): Promise<Validation> => {
    try {
        const user = await GetUser(username);
        if (user === null) throw null;
        return {
            validateStatus: "success",
            errorMessage: null
        }
    } catch (error) {
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

    const onFinish = async (values: main.AppConfig) => {
        const bangumi_username = values.bangumi_username;
        onSubmit(await GetUser(bangumi_username));

        // Save config
        const originConfig = await GetAppConfig();
        const config = {...originConfig, bangumi_username};
        await SetAppConfig(config);
    }

    return (
        <Form
            name="username_setting"
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            layout="inline"
            autoComplete="off"
            requiredMark="optional"
        >
            <Form.Item required name="bangumi_username"
                rules={[{ required: true, message: '请输入你的 Bangumi 用户名' }]}
                hasFeedback
                validateStatus={validation.validateStatus}
                help={validation.errorMessage}>
                <Input prefix={<UserOutlined />} placeholder="Bangumi username" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" shape="circle" onClick={onCheck}>
                    <CheckOutlined />
                </Button>
            </Form.Item>
        </Form>
    );
}

export default () => {
    const [user, setUser] = useState<bangumi_api.User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const initUser = async () => {
            const name = (await GetAppConfig()).bangumi_username;
            setUser(await GetUser(name));
            setLoading(false)
        }
        initUser();
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
