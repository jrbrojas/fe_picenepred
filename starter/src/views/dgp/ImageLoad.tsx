import appConfig from "@/configs/app.config";

const ImageLoad = ({path, width = '100%'}: {path: string | null, width?: string | number}) => {
    const sizeImage = width ?? '100%';

    if(!path){
        return null;
    }

    const imageUrl = `${appConfig.urlImagePrefixDGP}/${path}`;

    return (
        <img className="object-contain" width={sizeImage} src={imageUrl} alt="Mapa iamge" />
    );
};

export default ImageLoad;
