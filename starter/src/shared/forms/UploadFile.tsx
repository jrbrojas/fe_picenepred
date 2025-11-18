import Upload from '@/components/ui/Upload'
import { useMemo } from 'react';
import { FcImageFile } from 'react-icons/fc'

export interface UploadFileProps {
    fileList?: File[];
    multiple?: boolean;
    onChange?: (file: File[], fileList: File[]) => void;
    onFileRemove?: (file: File[]) => void;
    uploadLimit?: number;
    className?: string;
    disabled?: boolean;
    invalid?: boolean;
}
const UploadFile = (props: UploadFileProps) => {
    const beforeUpload = (files: FileList | null, _: File[]) => {
        let valid: string | boolean = true
        const maxFileSize20MB = 20 * 1024 * 1024;

        if (files) {
            for (const f of files) {
                if (f.size >= maxFileSize20MB) {
                    valid = 'Solo puedes subir 20MB por archivo'
                    alert(valid);
                    break;
                }
            }
        }

        return valid
    }
    const propsToOriginal = useMemo(() => {
        const copy = { ...props };
        if ('invalid' in copy) {
            delete copy.invalid;
        }
        return copy
    }, [props])
    return (
        <Upload
            {...propsToOriginal}
            draggable
            autoHidden={true}
            beforeUpload={beforeUpload}
            className={!!props.invalid ? "border-red-300 bg-red-100" : ''}
        >
            <div className="my-16 text-center">
                <div className="text-6xl mb-4 flex justify-center">
                    <FcImageFile />
                </div>
                <p>Maximo 20MB por archivo</p>
            </div>

        </Upload >
    )
}

export default UploadFile

