import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
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
                            dataLabels: {
                                position: 'top',
                            },
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter(val, opts) {
                            return Number(val).toFixed(2) + " %"
                        },
                        offsetY: -20,
                        style: {
                            colors: ['light-dark'],
                        },
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: info.map((i) => i.chartAcronimo),
                        title: {
                            text: 'Departamentos',
                            style: {
                                fontSize: '14px'
                            }
                        },
                        labels: {
                            rotate: -45,
                            style: {
                                cssClass: 'text-wrap'
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Porcentajes %',
                            style: {
                                fontSize: '14px'
                            }
                        },
                        min: 0,
                        max: 100,
                    },
                    fill: {
                        opacity: 1
                    },
                    tooltip: {
                        custom: function(e) {
                            const item = info[e.dataPointIndex];
                            return `
                              <div class="my-tooltip p-2">
                                <div>${item.chartNombre}</div>
                                <div class="flex items-center gap-2">
                                    <div class="bg-red-600 text-xs font-bold rounded-full" style="width: 8px; height: 8px"></div>
                                    <div>${roundToTwo(item.chartTotal)} %</div>
                                </div>
                              </div>
                            `
                        }
                    },
                    colors: [COLORS[0], COLORS[3], COLORS[6], COLORS[9]],
                }}
                series={[{
                    name: 'Porcentajes %',
                    data: info.map(i => roundToTwo(i.chartTotal)),
                }]}
                type="bar"
                height={450}
            />
        </div>
    )
}
