const UploadImage = () => {
    return (
        <label
            htmlFor="fileUpload"
            className="flex flex-col items-center cursor-pointer"
        >
            <div className="bg-gray-100 w-full h-full rounded-sm p-4 text-center flex flex-col justify-center items-center hover:bg-gray-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-600"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <div className="text-gray-600 mt-2 text-sm">Add Files</div>
            </div>
            <input type="file" className="hidden" id="fileUpload" />
        </label>
    );
};

export default UploadImage;
