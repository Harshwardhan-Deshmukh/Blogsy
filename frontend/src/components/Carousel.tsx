import { ReactElement, useEffect, useState } from "react";
import Quote from "../components/Quote";
import { QuoteData } from "../store/data";
import { QuotePropsType } from "../types";

const Carousel = (): ReactElement => {
    const [quotes] = useState<QuotePropsType[]>(QuoteData);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex: number): number =>
                prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000)
        return () => clearInterval(interval); 
    }, [quotes.length])

    return <div className="relative overflow-hidden h-screen">
        <Quote
            company={quotes[activeIndex].company}
            name={quotes[activeIndex].name}
            testimonial={quotes[activeIndex].testimonial}
            position={quotes[activeIndex].position}
        />
    </div>
}

export default Carousel;