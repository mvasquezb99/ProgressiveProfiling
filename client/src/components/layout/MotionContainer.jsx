import { motion } from "motion/react";
import { useDragControls } from "motion/react"
import { useEffect, useRef, useState } from "react";

import PropTypes from 'prop-types';

export default function MotionContainer({ children, handleLike, handleDislike }) {
    const controls = useDragControls();
    const card = useRef(null);
    const [action, setAction] = useState(false);

    const handleDrag = (_, info) => {
        if (!action) {
            if (info.offset.x > 5) {
                handleLike();
                setAction(true);
            } else if (info.offset.x < -5) {
                handleDislike();
                setAction(true);
            }
        }
    }

    const handleActionChange = () => {
        setAction(false);
    }

    useEffect(() => {
        card.current = document.getElementById("dragBox");
    }, [])

    return (
        <motion.div
            drag="x"
            dragControls={controls}
            onDrag={handleDrag}
            onDragEnd={handleActionChange}
            dragSnapToOrigin
            dragConstraints={{ left: -5, right: 5 }}
            className={`w-[20rem] h-[28rem]`}
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