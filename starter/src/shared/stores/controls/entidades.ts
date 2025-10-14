import { apiEntidades, ListEntidadResponse } from "../../services/ControlesService";
import { usePersistData } from "../persistdata";
import { useEffect, useState } from "react";

export interface Entidad {
    entidades: ListEntidadResponse;
    loading: boolean;
    error: string | null;
}

export function useEntidades(): Entidad {
    const {
        data,
        fetching,
        fetchData
    } = usePersistData()

    const [entidades, setEntidades] = useState<ListEntidadResponse>([])

    useEffect(() => {
        fetchData('entidades', apiEntidades)
            .then(() => {
                setEntidades((data.entidades || []) as ListEntidadResponse)
            })
    }, [data.entidades]);
    return {
        entidades,
        loading: fetching.entidades,
        error: null,
    };
}
