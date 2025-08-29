const winners = [
    {
        id: 1,
        name: 'Primer Lugar',
        institution: 'Municipalidad de Lima',
        image: 'https://reciclaconsciente.pe/wp-content/uploads/2025/05/MLima.webp',
        badgeColor: 'bg-yellow-500',
    },
    {
        id: 2,
        name: 'Segundo Lugar',
        institution: 'Gobierno Regional Cusco',
        image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/GoReCusco_2022-2026.jpg',
        badgeColor: 'bg-gray-400',
    },
    {
        id: 3,
        name: 'Tercer Lugar',
        institution: 'Universidad Nacional de Ingeniería',
        image: 'https://marketingmobileperu.com/wp-content/uploads/2017/07/logo07.jpg',
        badgeColor: 'bg-orange-500',
    },
    {
        id: 4,
        name: 'Cuarto Lugar',
        institution: 'Universidad Nacional del Callao',
        image: 'https://sge.unac.edu.pe/assets2/images/unac-2.png',
        badgeColor: 'bg-orange-500',
    },
    {
        id: 5,
        name: 'quinto Lugar',
        institution: 'Gobierno Regional Ancash',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9g_V4_EhuF5Q7b_nr21k2nap-J6-8V6tlsg&s',
        badgeColor: 'bg-orange-500',
    },
]

const Ganadores = () => {
    return (
        <div className="grid w-full gap-3 pt-2 lg:grid-cols-5 md:grid-cols-1 mt-8 rounded-xl">
            {winners.map((winner) => (
                <div
                    key={winner.id}
                    className="flex flex-col items-center mb-20"
                >
                    {/* Imagen con círculo y badge */}
                    <div className="relative w-24 h-24">
                        <img
                            src={winner.image}
                            alt={winner.name}
                            className="w-full h-full rounded-full border-4 border-gray-200 shadow-md"
                        />
                        {/* Trofeo */}
                        {winner.id <= 3 ? (
                            <div
                                className={`absolute top-0 right-0 p-1 rounded-full ${winner.badgeColor}`}
                            >
                                {' '}
                                🏆{' '}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    {/* Texto */}
                    <p className="font-bold text-lg mt-2">{winner.name}</p>
                    <p className="text-gray-600 text-sm">
                        {winner.institution}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Ganadores
