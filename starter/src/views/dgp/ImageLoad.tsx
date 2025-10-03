import appConfig from "@/configs/app.config";

const ImageLoad = ({path}: {path: string}) => {

    const imageUrl = `${appConfig.urlImagePrefixDGP}/${path}`;
    return (
        <img src={imageUrl} alt="Mapa iamge" />
    );
};

export default ImageLoad;
