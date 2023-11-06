
function Header({ totalChecked, deleteCheckList }) {
    return (
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
                        onClick={deleteCheckList}
                        className="text-red-500 font-semibold"
                    >
                        Delete {totalChecked > 1 ? "Files" : "File"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header