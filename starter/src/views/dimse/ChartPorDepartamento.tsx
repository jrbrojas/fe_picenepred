import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
export interface ChartInfo {
    chartNombre: string
    chartLugar: string
    chartTotal: number
    chartAcronimo: string
}
export interface ChartPorDepartamentoProps<T extends ChartInfo> {
    info: T[]
    onSelect?: (info: T) => void
}
export function ChartPorDepartamento<T extends ChartInfo>({
    info = [],
    onSelect = undefined,
}: ChartPorDepartamentoProps<T>) {
    return (
        <div>
            <ApexChart
                options={{
                    legend: {
                        show: false,
                    },
                    chart: {
                        type: 'bar',
                        height: 350,
                        toolbar: {
                            show: true,
                            tools: {
                                download: true,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true
                            }
                        },
                        events: {
                            dataPointSelection: (event, chartContext, config) => {
                                const item = info[config.dataPointIndex];
                                if (item) {
                                    onSelect?.(item);
                                }
                            }
                        },

                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            distributed: true,
                            borderRadius: 4,
                            borderRadiusApplication: 'end',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: info.map((i) => i.chartAcronimo),
                        title: {
                            text: 'Departamentos'
                        },
                        labels: {
                            rotate: -45,
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Porcentajes %'
                        },
                        min: 0,
                        max: 100,
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + "% respondieron 'Sí'"
                            }
                        }
                    },
                    colors: [COLORS[0], COLORS[3], COLORS[6], COLORS[9]],
                }}
                series={[{
                    name: 'Porcentajes %',
                    data: info.map(i => i.chartTotal),
                }]}
                type="bar"
                height={450}
            />
        </div>
    )
}
