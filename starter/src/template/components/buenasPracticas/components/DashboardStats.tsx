const DashboardStats = ({
    title,
    icon,
    value,
    description,
    colorIndex = 0,
}) => {
    // Colores predefinidos para los valores
    const COLORS = [
        'primary',
        'secondary',
        'accent',
        'info',
        'success',
        'warning',
        'error',
    ]

    // Determina estilo de descripción según el contenido
    const getDescStyle = () => {
        if (description.includes('↗︎'))
            return 'font-bold text-green-700 dark:text-green-300'
        if (description.includes('↙'))
            return 'font-bold text-rose-500 dark:text-red-400'
        return 'text-gray-500 dark:text-gray-400'
    }

    const colorClass = COLORS[colorIndex % COLORS.length]

    return (
        <div className="border rounded-lg shadow-lg p-4 bg-base-200/50 hover:scale-105 transition-transform duration-200">
            <div className="stat flex items-center space-x-4">
                {icon && (
                    <div className={`stat-figure text-${colorClass} text-4xl`}>
                        {icon}
                    </div>
                )}
                <div className="flex-1">
                    <div className="stat-title dark:text-slate-300 text-sm uppercase tracking-wide">
                        {title}
                    </div>
                    <div
                        className={`stat-value text-${colorClass} dark:text-slate-200 text-2xl font-semibold`}
                    >
                        {value}
                    </div>
                    <div className={`stat-desc mt-1 ${getDescStyle()}`}>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardStats
