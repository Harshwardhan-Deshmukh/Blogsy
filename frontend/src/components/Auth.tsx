import { ReactElement } from "react";
import { useNavigate } from "react-router";
import Inputbox from "./InputBox";

const Auth = ({ type }: { type: "signup" | "signin" }): ReactElement => {
    const navigate = useNavigate();

    return <div className="h-screen flex items-center justify-center">
        <div className="flex-col text-center">
            <div className="text-3xl font-extrabold my-2">
                Create an Account
            </div>
            <div className="text-slate-400 flex font-medium">
                Already have an account?
                <div className="cursor-pointer font-semibold mx-3 hover:text-slate-900 underline"
                    onClick={() => navigate("/signin")}
                >
                    Login
                </div>
            </div>
            <Inputbox label="Username" placeholder="Username"/>
            <Inputbox label="Password" placeholder="Password"/>
        </div>
    </div>
}

export default Auth;