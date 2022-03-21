import React, { useState, useEffect} from "react";
import { getAllImages } from './../../modules/ImageManager'



export const ImageRotator = ({insideImages}) => {

    const [images, setImages] = useState([]);

    const getImages = () => {
        return getAllImages().then(dataFromAPI => {
            setImages(dataFromAPI)
        });
    }

    useEffect(() => {
        getImages()
    }, []);

    useEffect(() => {
        imageCarousel()
    }, [images]);

    //This rotates the main image on homepage
    const imageCarousel = () => {
        const randomNumber = Math.floor( Math.random() * (images.length));
        const selectedImage = images[randomNumber]
        setImages(selectedImage)
    }

    return (
        <>
        <img className="main__image" src={insideImages} alt="Computer-generated 3D house" />
        </>
    )
}




 


