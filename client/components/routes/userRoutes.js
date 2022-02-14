import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";

const userRoute = ({ children }) => {
    // state
    const [ok, setOk] = useState(false);
    // router
    const router = useRouter();
    const {
        state: { user },
    } = useContext(Context);
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/auth/current-user");

            if (data.ok) setOk(true);
        } catch (error) {
            console.log(error);
            setOk(false);
            router.push("/login");
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            {!ok ? (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
                />
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default userRoute;
