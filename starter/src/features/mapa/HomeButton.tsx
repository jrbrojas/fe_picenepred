import { useRef } from 'react'
import { useMap } from 'react-leaflet'

import { HiHome } from 'react-icons/hi2'

const HomeButton = ({ homeLocation, onTodosChange }) => {
    const map = useMap()
    const homeMarkerRef = useRef(null)
    const handleHomeButtonClick = () => {
        if (homeMarkerRef.current) {
            map.setView(homeMarkerRef.current.getLatLng(), 5)
        } else {
            map.setView(homeLocation.center, 5)
        }
        const newValue = '0'
        onTodosChange(newValue)
        //console.log("Dentro del Componente HomeButton ", newValue)
    }
    return (
        <button
            className={`btn btn-ghost absolute top-0 right-0 h-16 w-16`}
            onClick={handleHomeButtonClick}
        >
            <HiHome className="w-6 h-6 text-gray-500" />
        </button>
    )
}

export default HomeButton
