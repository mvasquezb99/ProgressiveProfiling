import { motion } from "motion/react";
import { useDragControls } from "motion/react"
import { useEffect, useRef, useState } from "react";

import PropTypes from 'prop-types';

export default function MotionContainer({ children, handleLike, handleDislike }) {
    const controls = useDragControls();
    const card = useRef(null); // Mantener elementos del DOM sin re-renders innecesarios.
    const [swipe, setSwipe] = useState("");

    const handleDrag = (_, info) => {
        if (info.offset.x > 5) {
            handleLike();
        } else if (info.offset.x < -5) {
            handleDislike();
        }
    }

    useEffect(() => {
        card.current = document.getElementById("dragBox");
    }, [])

    return (
        <motion.div
            drag="x"
            dragControls={controls}
            onDragStart={handleDrag}
            dragSnapToOrigin
            dragConstraints={{ left: -5, right: 5 }}
            onDragEnd={() => { setSwipe("") }}
            className={` w-[20rem] h-[28rem] ${swipe}`}
            id="dragBox"
        >
            {children}
        </motion.div>
    )
}

MotionContainer.propTypes = {
    children: PropTypes.node,
    handleLike: PropTypes.func,
    handleDislike: PropTypes.func,
}