import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ImageContainer = ({ image }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: image.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <img
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={"w-64 border-2 rounded-xl"}
            src={image.src}
        />
    );
};

export default ImageContainer;
