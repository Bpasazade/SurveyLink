<!-- Chart.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as echarts from 'echarts';

    export let data = [];
    export let colors = [];
    export let textColor = '';
    export let chartContainer;

    onMount(() => {
        console.log(data);
        if (data.length != 0) {
        var dom = chartContainer;
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var option = {
            title: {
                text: data[0] + '%',
                left: '49%',
                top: '49%',
                textAlign: 'center',

                textVerticalAlign: 'middle',
                textStyle: {
                    color: textColor,
                    fontFamily: 'Gilroy-Bold',
                    fontWeight: 'bold',
                    fontSize: 22
                }
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['100%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 20,
                        borderColor: '#fff',
                        borderWidth: 2,
                        
                    },
                    color: [
                            new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: colors[0]},
                                    {offset: 1, color: colors[1]}
                                ]), 
                            '#E6E6E6'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]};
        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        // Add this line to make the chart responsive
        window.addEventListener('resize', () => { myChart.resize(); });

        // Remember to remove the event listener when the component is destroyed
        return () => {
            window.removeEventListener('resize', () => { myChart.resize(); });
        };
    }
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