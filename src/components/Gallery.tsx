import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext
} from "@dnd-kit/sortable";
import { useState } from "react";
import { imageFileSrcList as data } from "../../public/data";
import Header from "./Header";
import ImageCard from "./ImageCard";
import SortableImage from "./SortableImage";
import UploadImage from "./UploadImage";

function Gallery() {
    const [imageFileSrcList, setImageFileSrcList] = useState([...data]);
    const [checked, setChecked] = useState([]);
    const [totalChecked, setTotalChecked] = useState(0);

    const onDragEnd = (event) => {
        const { active, over } = event;
        if (active.id === over.id) return;
        setImageFileSrcList((prevList) => {
            const oldIndex = prevList.findIndex(
                (user) => user.id === active.id
            );
            const newIndex = prevList.findIndex((user) => user.id === over.id);
            return arrayMove(prevList, oldIndex, newIndex);
        });
    };

    const updateCheckList = (isChecked, imageId) => {
        const updatedCheckedList = [...checked];

        if (!isChecked) {
            updatedCheckedList.push(imageId);
        } else {
            const index = updatedCheckedList.indexOf(imageId);
            updatedCheckedList.splice(index, 1);
        }
        setChecked(updatedCheckedList);
        setTotalChecked(updatedCheckedList.length);
    };

    const deleteCheckList = () => {
        setImageFileSrcList((prevList) =>
            prevList.filter((item) => !checked.includes(item.id))
        );
        setChecked([]);
        setTotalChecked(0);
    };

    return (
        <div className="p-4 m-4 bg-white">
            <Header
                totalChecked={totalChecked}
                deleteCheckList={deleteCheckList}
            />
            <hr />
            <br />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext
                    items={imageFileSrcList}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {imageFileSrcList.map((image, index) => (
                            <ImageCard
                                image={image}
                                key={image.id}
                                index={index}
                                checked={checked}
                            >
                                <SortableImage
                                    image={image}
                                    updateCheckList={updateCheckList}
                                />
                            </ImageCard>
                        ))}
                        <UploadImage />
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default Gallery;
