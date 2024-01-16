<script>
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    export let data = [];
    export let chartContainer;

    onMount(() => {
        var dom = chartContainer;
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                top: '90%',
                left: 'center',
            },
            series: [
                {
                    name: 'Area Mode',
                    type: 'pie',
                    radius: [45, 90],
                    center: ['50%', '40%'],
                    roseType: 'radius',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: data,
                }
            ],
            color: ['#317CC0', '#4B9FE9', '#5CB3FE', '#E6E6E6'],
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

<div id="chart-container" bind:this={chartContainer}></div>

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