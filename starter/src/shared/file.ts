export async function urlToFile(url: string, filename = "archivo.ext"): Promise<File | null> {
    try {
        const response = await fetch(url);      // Descarga el contenido
        const blob = await response.blob();     // Lo convierte en Blob
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } catch (e) {
        console.error(e)
        return null;
    }
}
