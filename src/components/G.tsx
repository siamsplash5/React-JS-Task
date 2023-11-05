"use client";
import { AllImages } from "@/datas/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UploadImage from "./UploadImage";
import SelectAndDeleteFile from "./SelectAndDeleteFile";
import Container from "../Container";

export default function Gallery() {
  const [indexDrop, setIndexDrop] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [images, setImages] = useState(AllImages);
  const imgRef = useRef(null);
  const [uploadImage, setUploadImage] = useState([]);

  // select Images and setSelectedImages
  const handleImageSelect = (id) => {
    setSelectedImages((prevImages) => {
      if (prevImages.includes(id)) {
        return prevImages.filter((img) => img !== id);
      } else {
        return [...prevImages, id];
      }
    });
  };

  // dragOverImage to another image
  const dragOverImage = (index) => {
    if (indexDrop !== null) {
      const newImages = [...images];
      newImages[index] = images[indexDrop];
      newImages[indexDrop] = images[index];
      setImages(newImages);
    }
  };

  //drag image
  const dragImage = (index) => {
    setDraggedImage(images[index]);
    setIndexDrop(index);
  };

  // drop the image
  const dropImage = (index) => {
    if (draggedImage !== null) {
      const newImages = [...images];
      const draggedImageIndex = images.indexOf(draggedImage);
      newImages.splice(index, 0, newImages.splice(draggedImageIndex, 1)[0]);
      setImages(newImages);
      setDraggedImage(null);
      setIndexDrop(null);
    }
  };

  //image is selected or not check
  const isSelected = (imageId) => selectedImages.includes(imageId);

  // delete the selected images
  const deleteImages = () => {
    const newImages = images.filter(
      (img) => !selectedImages.includes(img.id)
    );
    setImages(newImages);
    setSelectedImages([]);
  };

  // uploadImages that why use useEffect to render the image when uploadImage is dependecy
  useEffect(() => {
      uploadImage.forEach((item, index) => {
          setImages((prev) => [
              ...prev,
              { id: index + images?.length + 1, imgSrc: item },
          ]);
      });
  }, [uploadImage, images?.length]);

  return (
    // use container to all device size show perfectly and use for reuseAbility
    <Container>
      {/* there have another to pass the which image you want to delete and select */}
      <SelectAndDeleteFile
        selectedImages={selectedImages}
        deleteImages={deleteImages}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 mt-3 lg:grid-cols-5 gap-5 ">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`singleImage group relative cursor-pointer  ${
              index === 0 ? "col-span-2  row-span-2" : ""
            } ${isSelected(item.id) ? "opacity-50" : ""} ${
              indexDrop === index
                ? "opacity-60 border-2 border-gray-500 transition-opacity-300 border-opacity-50 rounded-5"
                : ""
            } before:hover:bg-gray-700/50  `}
            onDrop={() => dropImage(index)}
            draggable={true}
            onDragStart={() => dragImage(index)}
            onDragLeave={() => setIndexDrop(null)}
            onDragOver={(e) => {
              e.preventDefault();
              setIndexDrop(index);
              dragOverImage(index);
            }}
          >
            <Image
              src={
                typeof item.imgSrc === "string"
                  ? item?.imgSrc
                  : URL.createObjectURL(item.imgSrc)
              }
              alt="Card Image"
              height={1000}
              width={1000}
              className="object-cover h-full w-full"
            />
            <div
              className={`  absolute h-6 w-6 bg-white top-7 left-7  rounded-sm justify-center items-center text-lg group-hover:flex ${
                isSelected(item.id) ? "flex" : "hidden"
              }`}
              onClick={() => handleImageSelect(item.id)}
            >
              <input type="checkbox" className="w-full h-full" name="" id="" />
            </div>
          </div>
        ))}
        <div
          className="border-dashed max-w-full max-h-[250]  border-4  cursor-pointer rounded-xl text-xl font-bold text-center flex items-center justify-center"
          onClick={() => imgRef.current?.click()}
        >
          {/* uploadImage component use for code readAbility  and pass as a props imgRef and setUploadImage */}
          <UploadImage imgRef={imgRef} setUploadImage={setUploadImage} />
        </div>
      </div>
    </Container>
  );
}
