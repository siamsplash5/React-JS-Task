/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";

export const ImageContext = createContext({
    image: [
        {
            id: 1,
            src: "source path of the image",
            checked: false,
        },
    ],
    addImage: (todo) => {},
    updateImage: (id, todoText) => {},
    deleteImage: (id) => {},
    toggleComplete: (id) => {},
});

export const useTodo = () => {
    return useContext(TodoContext);
};

export const TodoContainer = TodoContext.Provider;