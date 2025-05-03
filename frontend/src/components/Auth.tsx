import { ReactElement, useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { NavigateFunction, useNavigate } from "react-router";
import { SignupInput } from "@harshwardhanet7007/blogsy-types";

function Auth(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [signUpInput, setSignUpInput] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    })

    return (
        <div className="bg-slate-100 h-screen flex justify-center items-center">
            <div className="flex-col max-w-lg mx-5">
                <div className="font-extrabold text-3xl text-center">Create an Account</div>
                <InputBox label="Name" type="text" onChange={e => setSignUpInput(c => ({...c, name: e.target.value}))}/>
                <InputBox label="Username" type="text" onChange={e => setSignUpInput(c => ({...c, username: e.target.value}))}/>
                <InputBox label="Password" type="password" onChange={e => setSignUpInput(c => ({...c, password: e.target.value}))}/>
                <Button label="Sign Up" />
                <div className="flex font-light justify-center text-sm my-2">
                    <div>Already have an Account?</div>
                    <div onClick={() => { navigate("/signin") }} className="px-2 cursor-pointer font-medium hover:font-bold underline">Sign In</div>
                </div>
            </div>
        </div>
    )
}

export default Auth;