import { useDepartamentos } from '@/shared/stores/controls/depas'
import { useProvincias } from '@/shared/stores/controls/provs'
import { useDistritos } from '@/shared/stores/controls/distrito'
import { Controller, useForm } from 'react-hook-form'
import { FormItem, Button, Select } from '@/components/ui'
import { Option } from '@/shared/types'
import { useEffect, useMemo, useState } from 'react'
import { useEntidades } from '@/shared/stores/controls/entidades'
import { TbFilter } from "react-icons/tb";
import { EntidadResponse } from '@/shared/services/ControlesService'

export type EntidadForm = {
    departamento: Option | null,
    provincia: Option | null,
    distrito: Option | null,
    entidad: Option | null,
};

interface Props {
    onDistrito: (id: string) => void,
    onSearchEntidad: (e: EntidadResponse | null) => void,
}
export default function FiltrosDirectorio({
    onDistrito,
    onSearchEntidad,
}: Props) {
    const [verFiltros, setVerFiltros] = useState(false)
    // filtros
    const { controls: departmentOptions } = useDepartamentos()
    const { provincias } = useProvincias();
    const { distritos } = useDistritos();
    const { entidades } = useEntidades();

    const { control, reset, setValue, watch, getValues } = useForm<EntidadForm>({
        defaultValues: {
            departamento: null,
            provincia: null,
            distrito: null,
            entidad: null,
        },
    })

    const departamento = watch("departamento"); // Opt | null
    const provincia = watch("provincia"); // Opt | null
    const distrito = watch("distrito"); // Opt | null
    const entidad = watch("entidad"); // Opt | null

    const entidadesOptions = useMemo(() => {
        return entidades.map((e) => ({
            label: e.nombre,
            value: e.id,
        }))
    }, [entidades])
    const provOptions: Option[] = useMemo(() => {
        if (!departamento) return [];
        return provincias.filter(i => i.departamento_id == departamento.value)
            .map(i => ({
                label: i.nombre,
                value: i.id,
            }))
    }, [departamento]);
    const distOptions: Option[] = useMemo(() => {
        if (!departamento || !provincia) return [];
        return distritos.filter(i => i.provincia_id == provincia.value)
            .map(i => ({
                label: i.nombre,
                value: i.id,
            }))
    }, [departamento, provincia]);

    useEffect(() => {
        if (verFiltros && !getValues('entidad.value')) {
            onDistrito(distrito?.value || "")
        }
    }, [distrito]);
    useEffect(() => {
        const entidadId = getValues('entidad.value')
        if (entidadId) {
            const e = entidades.find(e => e.id == entidadId)
            onSearchEntidad(e || null)
        }
    }, [entidad])
    return (
        <form onSubmit={(e) => e.preventDefault()} className="grid w-full gap-4 text-left">
            <div className="flex w-full gap-4">
                <Controller
                    name="entidad"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={entidadesOptions}
                            value={field.value}
                            className="flex-1"
                            placeholder="Ingrese nombre entidad a buscar"
                            isClearable
                            onChange={(opt: Option | null) => {
                                field.onChange(opt);
                                // reset dependientes
                                setValue("departamento", null);
                                setValue("provincia", null);
                                setValue("distrito", null);
                            }}
                            components={{
                                DropdownIndicator: null
                            }}
                        />
                    )}
                />
                <Button icon={<TbFilter />} onClick={() => {
                    setVerFiltros(!verFiltros)
                    if (verFiltros) {
                        setValue("entidad", null)
                        return;
                    }
                    setValue("departamento", null);
                    setValue("provincia", null);
                    setValue("distrito", null);
                }} type="button">Buscar</Button>
            </div>
            <div className={verFiltros ? "flex w-full gap-4 text-left" : "hidden"}>
            <FormItem label="Departamento" className="flex-1">
                <Controller
                    name="departamento"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={departmentOptions}
                            value={field.value}
                            placeholder="Seleccione departamento"
                            isClearable
                            onChange={(opt: Option | null) => {
                                field.onChange(opt);
                                // reset dependientes
                                setValue("entidad", null);
                                setValue("provincia", null);
                                setValue("distrito", null);
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem label="Provincia" className="flex-1">
                <Controller
                    name="provincia"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={provOptions}
                            value={field.value}
                            placeholder="Seleccione provincia"
                            isDisabled={!departamento}
                            isClearable
                            onChange={(opt: Option | null) => {
                                field.onChange(opt);
                                // reset distrito & codigo
                                setValue("distrito", null);
                            }}
                        />
                    )}
                />
            </FormItem>

            <FormItem label="Distrito" className="flex-1">
                <Controller
                    name="distrito"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={distOptions}
                            value={field.value}
                            placeholder="Seleccione distrito"
                            isDisabled={!provincia}
                            isClearable
                            onChange={(opt: Option | null) => {
                                field.onChange(opt);
                            }}
                        />
                    )}
                />
            </FormItem>
            </div>
        </form>
    )

}
