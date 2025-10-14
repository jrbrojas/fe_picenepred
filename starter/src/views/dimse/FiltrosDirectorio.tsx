import { useDepartamentos } from '@/shared/stores/controls/depas'
import { useProvincias } from '@/shared/stores/controls/provs'
import { useDistritos } from '@/shared/stores/controls/distrito'
import { Controller, useForm } from 'react-hook-form'
import { FormItem, Select } from '@/components/ui'
import { Option } from '@/shared/types'
import { useEffect, useMemo } from 'react'

export type EntidadForm = {
    departamento: Option | null,
    provincia: Option | null,
    distrito: Option | null,
};


export default function FiltrosDirectorio({ onDistrito }: {
    onDistrito: (id: string) => void
}) {
    // filtros
    const { controls: departmentOptions } = useDepartamentos()
    const { provincias } = useProvincias();
    const { distritos } = useDistritos();

    const { control, reset, setValue, watch } = useForm<EntidadForm>({
        defaultValues: {
            departamento: null,
            provincia: null,
            distrito: null,
        },
    })

    const departamento = watch("departamento"); // Opt | null
    const provincia = watch("provincia"); // Opt | null
    const distrito = watch("distrito"); // Opt | null

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
        onDistrito(distrito?.value || "")
    }, [distrito]);
    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex w-full gap-4 text-left">
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
        </form>
    )

}
