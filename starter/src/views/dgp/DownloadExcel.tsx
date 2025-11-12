import React from "react";
import ExcelSvg from "@/assets/excel.svg";

type Props = {
    path: string | null;
};

const DownloadExcel: React.FC<Props> = ({ path }) => {

    if (path == 'http://127.0.0.1:8000/storage') return null;

    return (
        <div className="flex justify-start gap-15 items-center mt-2">
                <span className="text-xs">Descargar Excel</span>

            <a
                href={path ?? '#'}
                className="inline-flex sm:text-sm px-3 py-2 rounded-md"
                target="_blank"
                rel="noreferrer"
            >
                {/* Icono Excel */}
                <img src={ExcelSvg} className="h-10 w-10" alt="Descargar archivo excel" />

            </a>

        </div>
    );
};

export default DownloadExcel;