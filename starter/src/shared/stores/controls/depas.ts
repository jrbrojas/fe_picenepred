import { Option } from "../../types";
import { apiDepas, DepaResponse } from "../../services/UbigeoService";
import { usePersistData } from "../persistdata";
import { useEffect, useMemo, useState } from "react";

export interface Depa {
    departamentos: DepaResponse;
    controls: Option[];
    loading: boolean;
    error: string | null;
}

export function useDepartamentos(): Depa {
    const {
        data,
        fetching,
        fetchData
    } = usePersistData()

    const [departamentos, setDepartamentos] = useState<DepaResponse>([])
    const controls = useMemo(() => departamentos.map(c => ({
        label: c.nombre,
        value: c.id,
    })), [departamentos])

    useEffect(() => {
        fetchData('departamentos', apiDepas)
            .then(() => {
                setDepartamentos((data.departamentos || []) as DepaResponse)
            })
    }, [data.departamentos]);

    return {
        departamentos,
        controls,
        loading: fetching.departamentos,
        error: null,
    };
}
