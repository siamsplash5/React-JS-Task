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
    const [imageFileSrcList, setImageFileSrcList] = useState([...data]);
    const [checked, setChecked] = useState([]);
    const [totalChecked, setTotalChecked] = useState();

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

    const handleDelete = () => {
        setImageFileSrcList((prevList) =>
            prevList.filter((item) => !checked.includes(item.id))
        );
        setChecked([]);
        setTotalChecked(0);
    };

    return (
        <div className="p-4 m-4 bg-white">
            <div className="w-full flex py-3 px-5 h-16 mb-2 items-center justify-between">
                <div>
                    {totalChecked > 0 ? (
                        <p className="text-gray-800 font-semibold">
                            {totalChecked} {totalChecked > 1 ? "Files" : "File"}{" "}
                            Selected
                        </p>
                    ) : (
                        <p className="text-gray-600 font-semibold">Gallery</p>
                    )}
                </div>
                <div>
                    {totalChecked > 0 && (
                        <button
                            onClick={handleDelete}
                            className="text-red-500 font-semibold"
                        >
                            Delete {totalChecked > 1 ? "Files" : "File"}
                        </button>
                    )}
                </div>
            </div>
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
                            <div
                                className={`
                                 ${
                                     index === 0
                                         ? "col-span-2 row-span-2"
                                         : "col-span-1 row-span-1"
                                 }
                                         ${
                                             checked.includes(image.id)
                                                 ? "brightness-75 transition duration-300 ease-in-out"
                                                 : ""
                                         }
                                        relative hover:brightness-75 transition duration-300 ease-in-out`}
                                key={image.id}
                            >
                                <ImageContainer
                                    image={image}
                                    updateCheckList={updateCheckList}
                                />
                            </div>
                        ))}
                        <UploadImage />
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}

export default Gallery;
