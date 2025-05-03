import { ReactElement, useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { NavigateFunction, useNavigate } from "react-router";

function Auth(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <div className="flex-col max-w-lg mx-5">
                <div className="font-extrabold text-3xl text-center">Create an Account</div>
                <InputBox label="Username" type="text" onChangeFunction={setUsername}/>
                <InputBox label="Email" type="text" onChangeFunction={setEmail}/>
                <InputBox label="Password" type="password" onChangeFunction={setPassword}/>
                <Button label="Sign Up" />
                <div className="flex font-light justify-center text-sm my-2">
                    <div>Already have an Account?</div>
                    <div onClick={() => {navigate("/signin")}} className="px-2 cursor-pointer font-medium hover:font-bold underline">Sign In</div>
                </div>
            </div>
        </div>
    )
}

export default Auth;