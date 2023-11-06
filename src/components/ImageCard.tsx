
function ImageCard({children, image, index}) {
    return (
        <div
            className={`
                ${
                    index === 0
                        ? "col-span-2 row-span-2"
                        : "col-span-1 row-span-1"
                }
            ${
                image.checked
                    ? "brightness-75 transition duration-300 ease-in-out"
                    : ""
            }
            hover:brightness-75 transition duration-300 ease-in-out relative `}
            key={image.id}
        >
            {children}
        </div>
    );
}

export default ImageCard;
