import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const BarchartEntidades = () => {
    const [state, setState] = useState({
        series: [
            {
                data: [75, 60, 85, 65, 25],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 300,
            },
            plotOptions: {
                bar: {
                    barHeight: '60%',
                    distributed: true,
                    horizontal: true,
                    dataLabels: {
                        position: 'bottom',
                    },
                },
            },
            colors: ['#33b2df', '#2b908f', '#4a00ff', '#f48024', '#e7c20cc7'],
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                style: {
                    colors: ['#fff'],
                },
                formatter: function (val, opt) {
                    return (
                        ' > ' +
                        opt.w.globals.labels[opt.dataPointIndex] +
                        ':  ' +
                        val +
                        ' %'
                    )
                },

                dropShadow: {
                    enabled: true,
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff'],
            },
            xaxis: {
                categories: [
                    'Gobierno Nacional',
                    'Gobierno Regional',
                    'Gobierno Local',
                    'Universidades',
                    'Entidades privadas',
                ],
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            /* title: {
              text: 'Custom DataLabels',
              align: 'center',
              floating: true
          },
          subtitle: {
              text: 'Category Names as DataLabels inside bars',
              align: 'center',
          },*/
            tooltip: {
                theme: 'dark',
                x: {
                    show: false,
                },
                y: {
                    title: {
                        formatter: function () {
                            return ''
                        },
                    },
                },
            },
        },
    })

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={380}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default BarchartEntidades
