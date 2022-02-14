import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/userRoutes";

const userIndex = () => {
    // state
    const {
        state: { user },
    } = useContext(Context);

    return (
        <UserRoute>
            <p>no data</p>
            <>
                <h1 className="text-center square">User</h1>
                <h1>{JSON.stringify(user, null, 4)}</h1>
            </>
        </UserRoute>
    );
};

export default userIndex;
