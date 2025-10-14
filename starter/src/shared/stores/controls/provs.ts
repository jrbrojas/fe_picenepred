import { apiProv, ProvResponse } from "../../services/UbigeoService";
import { usePersistData } from "../persistdata";
import { useEffect, useState } from "react";

export interface Prov {
    provincias: ProvResponse;
    loading: boolean;
    error: string | null;
}

export function useProvincias(): Prov {
    const {
        data,
        fetching,
        fetchData
    } = usePersistData()

    const [provincias, setProvincias] = useState<ProvResponse>([])

    useEffect(() => {
        fetchData('provincias', apiProv)
            .then(() => {
                setProvincias((data.provincias || []) as ProvResponse)
            })
    }, [data.provincias]);
    return {
        provincias,
        loading: fetching.provincias,
        error: null,
    };
}
