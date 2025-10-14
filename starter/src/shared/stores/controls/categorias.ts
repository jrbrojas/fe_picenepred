import { Option } from "../../types";
import { apiCategorias, CategoriaResponse } from "../../services/ControlesService";
import { usePersistData } from "../persistdata";
import { useEffect, useMemo, useState } from "react";

export interface Categoria {
    categorias: CategoriaResponse;
    controls: Option[];
    loading: boolean;
    error: string | null;
}

export function useCategorias(): Categoria {
    const {
        data,
        fetching,
        fetchData
    } = usePersistData()

    const [categorias, setCategorias] = useState<CategoriaResponse>([])
    const controls = useMemo(() => categorias.map(c => ({
        label: c.nombre,
        value: c.id,
    })), [categorias])

    useEffect(() => {
        fetchData('categorias', apiCategorias)
            .then(() => {
                setCategorias((data.categorias || []) as CategoriaResponse)
            })
    }, [data.categorias]);

    return {
        categorias,
        controls,
        loading: fetching.categorias,
        error: null,
    };
}
