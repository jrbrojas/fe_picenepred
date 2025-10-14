import { apiDist, UbigeoResponse } from "../../services/UbigeoService";
import { usePersistData } from "../persistdata";
import { useEffect, useState } from "react";

export interface Ubigeo {
    distritos: UbigeoResponse;
    loading: boolean;
    error: string | null;
}

export function useDistritos(): Ubigeo {
    const {
        data,
        fetching,
        fetchData
    } = usePersistData()

    const [distritos, setProvincias] = useState<UbigeoResponse>([])

    useEffect(() => {
        fetchData('distritos', apiDist)
            .then(() => {
                setProvincias((data.distritos || []) as UbigeoResponse)
            })
    }, [data.distritos]);
    return {
        distritos,
        loading: fetching.distritos,
        error: null,
    };
}
