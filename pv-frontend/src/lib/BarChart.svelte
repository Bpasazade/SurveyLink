<script>
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    export let data = [];

    onMount(() => {
        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var option;

        option = {
            grid: {
                left: '1%',
                right: '1%',
                bottom: '14%',
                top: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
                    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
                    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
                    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: data,
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [15, 15, 0, 0],
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#317CC0'},
                                {offset: 0.5, color: '#4B9FE9'},
                                {offset: 1, color: '#5CB3FE'}
                            ]
                        )
                    },
                    barWidth: 13,
                    barGap: 0,
                }
            ]
        };


        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        // Add this line to make the chart responsive
        window.addEventListener('resize', () => { myChart.resize(); });

        // Remember to remove the event listener when the component is destroyed
        return () => {
            window.removeEventListener('resize', () => { myChart.resize(); });
        };
    });
</script>

<div id="chart-container"></div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    #chart-container {
        width: 100% !important;
        height: 100% !important;
        overflow: hidden;
    }
</style>