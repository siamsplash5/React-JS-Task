import React from "react";

const UploadImage = () => {
    return (
        <label
            htmlFor="fileUpload"
            className="border-dashed w-full h-full min-w-[130px] min-h-[150px]  border-2 rounded-lg overflow-hidden cursor-pointer"
        >
            <div className="w-full h-full flex justify-center items-center flex-col space-y-2 hover:bg-gray-200">
                {/* <img
                    src="images/image-12.png"
                    alt="icon"
                    className="max-w-[35px]"
                /> */}
                <div className="text-sm text-gray-500">Add Files</div>
            </div>
            <input type="file" className="hidden " id="fileUpload" />
        </label>
    );
};

export default UploadImage;
