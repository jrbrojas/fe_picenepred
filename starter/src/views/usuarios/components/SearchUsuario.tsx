import DebouceInput from '@/components/shared/DebouceInput'
import { TbSearch } from 'react-icons/tb'
import { Ref } from 'react'

type SearchPropsUsuario = {
    onInputChange: (value: string) => void
    ref?: Ref<HTMLInputElement>
}

const SearchUsuario = (props: SearchPropsUsuario) => {
    const { onInputChange, ref } = props

    return (
        <DebouceInput
            ref={ref}
            placeholder="Buscar usuario..."
            suffix={<TbSearch className="text-lg" />}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default SearchUsuario
