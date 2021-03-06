import Intersection from './Intersection'

let CPUData = [
    [1246406400000, 21.5],
    [1246492800000, 22.1],
    [1246579200000, 23],
    [1246665600000, 23.8],
    [1246752000000, 21.4],
    [1246838400000, 21.3],
    [1246924800000, 40.3],
    [1247011200000, 15.4],
    [1247097600000, 16.4],
    [1247184000000, 17.7],
    [1247270400000, 17.5],
    [1247356800000, 17.6],
    [1247443200000, 17.7],
    [1247529600000, 100.8],
    [1247616000000, 44.7],
    [1247702400000, 16.3],
    [1247788800000, 17.8],
    [1247875200000, 18.1],
    [1247961600000, 17.2],
    [1248048000000, 14.4],
    [1248134400000, 13.7],
    [1248220800000, 15.7],
    [1248307200000, 14.6],
    [1248393600000, 15.3],
    [1248480000000, 2.3],
    [1248566400000, 15.8],
    [1248652800000, 15.2],
    [1248739200000, 14.8],
    [1248825600000, 14.4],
    [1248912000000, 15],
    [1248998400000, 13.6]
];

let baseLine = []
for (let i = 0; i < CPUData.length; i++) {
    baseLine.push([CPUData[i][0], 20])
}

let anomalyLines = Intersection.splitLine(CPUData, baseLine, 'up')

let chartsSeries = [{
    name: 'Cpu Usage',
    data: CPUData,
}, {
    name: 'Base Line',
    data: baseLine,
}]

anomalyLines.forEach((line, i) => {
    chartsSeries.push({
        name: 'Anmomaly-' + (i + 1),
        data: line,
        color: 'red'
    })
})

Highcharts.chart('container', {
    title: {
        text: 'CPU Usages'
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: null
        }
    },

    tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '°C'
    },

    legend: {},

    series: chartsSeries
});