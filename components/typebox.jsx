"use client"

import { TypeAnimation } from "react-type-animation";

const TypeBox = ({sequence}) => {
    return (
        <TypeAnimation
            sequence={sequence}
            wrapper="span"
            speed={20}
            style={{ fontSize: '30px', display: 'inline-block' }}
            className="font-semibold"
            repeat={Infinity}
        />
    );
}

export default TypeBox;