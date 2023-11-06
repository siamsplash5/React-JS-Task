import { closestCenter, DndContext } from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext
} from "@dnd-kit/sortable";
import { useState } from "react";
import { imageList as data } from "../../public/data";
import Header from "./Header";
import ImageCard from "./ImageCard";
import SortableImage from "./SortableImage";
import UploadImage from "./UploadImage";

function Gallery() {
    const [imageList, setImageList] = useState([...data]);
    const [totalChecked, setTotalChecked] = useState(
        imageList.filter((item) => item.checked === true).length
    );

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

    const updateCheckList = (isChecked, imageId) => {
       setImageList((prevList) => {
           return prevList.map((item) => {
                console.log(imageId, isChecked)
               if (item.id === imageId) {
                   return { ...item, checked: !isChecked };
               }
               return item;
           });
       });
       setTotalChecked(
           imageList.filter((item) => item.checked === true).length +1
       );
    };

    const deleteCheckList = () => {
        setImageList((prevList) =>
            prevList.filter((item) => item.checked===false)
        );
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
                        <UploadImage />
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default Gallery;
