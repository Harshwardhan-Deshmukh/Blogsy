import Auth from "../components/Auth";
import Quote from "../components/Quote";

const Signup = () => {
    return <div className="grid grid-rows-2 lg:grid lg:grid-cols-2 lg:h-screen">
        <div>
            <Auth type="signin"/>
        </div>
        <div className="">
            <Quote />
        </div>
    </div>
}

export default Signup;