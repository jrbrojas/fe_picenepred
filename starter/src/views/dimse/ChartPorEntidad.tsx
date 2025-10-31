import ApexChart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'
function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
export interface ChartPorEntidadInfo {
    chartNombre: string
    chartLugar: string
    chartTotal: number
    chartAcronimo: string
}
export interface ChartPorEntidadProps<T extends ChartPorEntidadInfo> {
    info: T[]
    onSelect?: (info: T) => void
}
export function ChartPorEntidad<T extends ChartPorEntidadInfo>({
    info = [],
    onSelect = undefined,
}: ChartPorEntidadProps<T>) {
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
                            horizontal: true,
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
                            return val + " %"
                        },
                        offsetX: 30,
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
                            text: 'Porcentajes %'
                        },
                        labels: {
                            rotate: -45,
                            style: {
                                fontSize: '8px'
                            }
                        }
                    },
                    yaxis: {
                        title: {
                            text: 'Entidades'
                        },
                        min: 0,
                        max: 100,
                        labels: {
                            minWidth: 100,
                            maxWidth: 400,
                        },
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
                                <div>${item.chartLugar}</div>
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
    );
}
