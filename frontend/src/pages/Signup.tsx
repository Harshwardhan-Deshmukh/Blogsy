import { ReactElement } from "react";
import Carousel from "../components/Carousel";
import Auth from "../components/Auth";

function Signup(): ReactElement {
    return (
        <div className="grid grid-rows-2 md:grid-cols-2 md:max-h-screen">
            <Auth />
            <Carousel />
        </div>
    )
}

export default Signup;