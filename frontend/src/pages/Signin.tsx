import { ReactElement } from "react";
import Auth from "../components/Auth";
import Carousel from "../components/Carousel";

function Signin(): ReactElement {
    return <div className="grid grid-rows-2 md:grid-cols-2 md:max-h-screen">
        <div className="order-2 md:order-1">
            <Carousel />
        </div>
        <div className="order-1 md:order-2">
            <Auth type="signin" />
        </div>
    </div>
}

export default Signin;