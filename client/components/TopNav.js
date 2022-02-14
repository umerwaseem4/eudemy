import React, { useContext } from "react";
import Link from "next/link";
import { Menu } from "antd";
import {
    AppstoreAddOutlined,
    LoginOutlined,
    LogoutOutlined,
    UserAddOutlined,
    CoffeeOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const TopNav = () => {
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();

    const logout = async () => {
        dispatch({
            type: "LOGOUT",
        });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/auth/logout");
        toast(data.message);
        router.push("/login");
    };

    return (
        <Menu mode="horizontal">
            <Menu.Item icon={<AppstoreAddOutlined />}>
                <Link href={"/"}>
                    <a>App</a>
                </Link>
            </Menu.Item>
            {user === null && (
                <>
                    <Menu.Item icon={<LoginOutlined />}>
                        <Link href={"/login"}>
                            <a>Login</a>
                        </Link>
                    </Menu.Item>
                    <Menu.Item icon={<UserAddOutlined />}>
                        <Link href={"/register"}>
                            <a>Regiser</a>
                        </Link>
                    </Menu.Item>
                </>
            )}
            {user !== null && (
                <>
                    <Menu.SubMenu
                        icon={<CoffeeOutlined />}
                        title={user.name}
                        className="float-end"
                    >
                        <Menu.ItemGroup>
                            <Menu.Item onClick={logout} className="float-right">
                                <Link href={"/user"}>
                                    <a>Dashboard</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item
                                onClick={logout}
                                icon={<LogoutOutlined />}
                                className="float-right"
                            >
                                Logout
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </Menu.SubMenu>
                </>
            )}
        </Menu>
    );
};

export default TopNav;
