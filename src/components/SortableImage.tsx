/* Sortable Image Component */

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const SortableImage = ({ image, updateCheckList }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: image.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    const [isHovered, setIsHovered] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        updateCheckList(isChecked, image.id);
    };

    return (
        <div
            className={`image-container relative`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className={"h-full w-full object-cover border-2 rounded-xl"}
                src={image.src}
            />
            {(isHovered || isChecked) && (
                <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                    className="image-checkbox absolute top-2 left-2 w-6 h-6 opacity-100"
                />
            )}
        </div>
    );
};

export default SortableImage;
