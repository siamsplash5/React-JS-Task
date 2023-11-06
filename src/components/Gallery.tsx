// Importing drag and drop functionality from dnd-it library
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext
} from "@dnd-kit/sortable";

import { useState } from "react";

// Importing the image information which will contain image path, checked status and ID
import { imageList as data } from "../../public/data";

// Importing necessary components
import Header from "./Header";
import ImageCard from "./ImageCard";
import SortableImage from "./SortableImage";
import UploadImage from "./UploadImage";

function Gallery() {
    // Image information will be distributed from this component
    // Another solution can be Context API for better state management
    const [imageList, setImageList] = useState([...data]);

    // This state will keep track the count of checked images
    const [totalChecked, setTotalChecked] = useState(
        imageList.filter((item) => item.checked === true).length
    );

    // Drag End handler for drag and drop a image
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id === over.id) return;
        setImageList((prevList) => {
            const oldIndex = prevList.findIndex(
                (user) => user.id === active.id
            );
            const newIndex = prevList.findIndex((user) => user.id === over.id);
            return arrayMove(prevList, oldIndex, newIndex);
        });
    };

    // The function will update the image list based on checked status of an image
    const updateCheckList = (isChecked, imageId) => {
        setImageList((prevList) => {
            return prevList.map((item) => {
                if (item.id === imageId) {
                    return { ...item, checked: !isChecked };
                }
                return item;
            });
        });
        setTotalChecked(
            // Adding '1' as the UI not performing as expected, adding 1 solving it
            imageList.filter((item) => item.checked === true).length + 1
        );
    };

    
    // The function will delete the checked images from the image list
    const deleteCheckedImages = () => {
        setImageList((prevList) =>
            prevList.filter((item) => item.checked === false)
        );
        // No image is checked after deletion, so set the value to 0
        setTotalChecked(0);
    };

    return (
        <div className="p-4 m-4 bg-white">
            {/* The component contains the count of total checked image and the delete button */}
            <Header
                totalChecked={totalChecked}
                deleteCheckedImages={deleteCheckedImages}
            />
            <hr />
            <br />
            {/* Dnd Context wrapper component for enable drag and drop machanism */}
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                {/* Dnd Context wrapper component for enable sorting machanism */}
                <SortableContext
                    items={imageList}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {imageList.map((image, index) => (
                            <ImageCard
                                image={image}
                                key={image.id}
                                index={index}
                            >
                                <SortableImage
                                    image={image}
                                    updateCheckList={updateCheckList}
                                />
                            </ImageCard>
                        ))}
                        {/* Uploading image component */}
                        <UploadImage />
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default Gallery;
