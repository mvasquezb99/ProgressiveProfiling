import { motion } from "motion/react";
import { useDragControls } from "motion/react"
import { useEffect, useRef, useState } from "react";

import PropTypes from 'prop-types';

export default function MotionContainer({ children, handleLike, handleDislike, handleSuperlike }) {
    const controls = useDragControls();
    const card = useRef(null);
    const [action, setAction] = useState(false);

    const handleDrag = (_, info) => {
        if (!action) {
            if (info.offset.x > 10) {
                handleLike();
                setAction(true);
            } else if (info.offset.x < -10) {
                handleDislike();
                setAction(true);
            }
            else if (info.offset.y < -10) {
                handleSuperlike();
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
            drag
            dragControls={controls}
            onDrag={handleDrag}
            onDragEnd={handleActionChange}
            dragSnapToOrigin
            dragConstraints={{ left: -10, right: 10, top: -10, bottom: 0 }}
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
    handleSuperlike: PropTypes.func,
}