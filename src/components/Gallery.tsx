import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext
} from "@dnd-kit/sortable";
import { useState } from "react";
import { imageFileSrcList as data } from "../../public/data";
import ImageContainer from "./ImageContainer";
import UploadImage from "./UploadImage";


function Gallery() {
    const [imageFileSrcList, setImageFileSrcList] = useState(data);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id == over.id) return;
        setImageFileSrcList((prevList) => {
            const oldIndex = prevList.findIndex(
                (user) => user.id === active.id
            );
            const newIndex = prevList.findIndex((user) => user.id === over.id);
            return arrayMove(imageFileSrcList, oldIndex, newIndex);
        });
    };

    return (
        <div className="container mx-auto w-screen p-4 m-4 bg-white">
            <div>
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                >
                    <SortableContext
                        items={imageFileSrcList}
                        strategy={rectSortingStrategy}
                    >
                        <div className="flex flex-wrap space-y-2">
                            {imageFileSrcList.map((image) => (
                                <div
                                    className="w-1/5 hover:brightness-75 transition duration-300 ease-in-out"
                                    key={image.id}
                                >
                                    <ImageContainer
                                        image={image}
                                    />
                                </div>
                            ))}
                            <UploadImage />
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
}

export default Gallery;
