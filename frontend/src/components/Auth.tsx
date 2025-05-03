import { ReactElement, useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { NavigateFunction, useNavigate } from "react-router";
import { SignupInput } from "@harshwardhanet7007/blogsy-types";
import axios from "axios";
import BACKEND_URL from "../../config"

function Auth({ type }: { type: "signup" | "signin" }): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [signUpInput, setSignUpInput] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    })

    async function sendRequest(): Promise<void> {
        const response = await axios.post(`${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`, signUpInput)
        const data: {success: boolean, jwt: string}  = response.data;
        if (data.success) {
            localStorage.setItem("blogsy-token", data.jwt);
            navigate("/blog")
        } else {
            alert("Inputs are not correct")
        }
    }

    return (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <div className="flex-col max-w-lg mx-5">
                <div className="font-extrabold text-3xl text-center">{type === "signup" ? "Create an Account" : "Account Login"}</div>
                {type === "signup" && <InputBox label="Name" type="text" onChange={e => setSignUpInput(c => ({ ...c, name: e.target.value }))} />}
                <InputBox label="Username" type="text" onChange={e => setSignUpInput(c => ({ ...c, username: e.target.value }))} />
                <InputBox label="Password" type="password" onChange={e => setSignUpInput(c => ({ ...c, password: e.target.value }))} />
                <Button label={type === "signup" ? "Sign Up" : "Sign In"} onClick={sendRequest}/>
                <div className="flex font-light justify-center text-sm my-2">
                    <div>{type === "signup" ? "Already have an Account?" : "Don't have an Account?"}</div>
                    <div onClick={() => { 
                        if (type === "signup")
                            navigate("/signin") 
                        if (type === "signin")
                            navigate("/signup") 
                    }} className="px-2 cursor-pointer font-medium hover:font-bold underline">{type === "signup" ? "Sign In" : "Sign Up"}</div>
                </div>
            </div>
        </div>
    )
}

export default Auth;