<!-- App.svelte -->
<script>
    localStorage.setItem('storedRoute', '/template');
    import { writable } from 'svelte/store';

    // Store to manage the current screen
    const currentScreen = writable('introduction');

    // Function to change the current screen
    const changeScreen = (screen) => {
        currentScreen.set(screen);
    };

    // Define your content for each section
    let sections = {
        introduction: 'Introduction Section',
        question1: 'Question 1 Section',
        question2: 'Question 2 Section',
        question3: 'Question 3 Section',
        question4: 'Question 4 Section',
        conclusion: 'Conclusion Section',
    };

    import * as echarts from 'echarts';
    import { onMount } from 'svelte';

    onMount(() => {
        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });
        var option;

        option = {
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
                    data: [120, 200, 150, 80, 70, 110, 130, 90, 100, 120, 200, 150, 80, 70, 110, 130, 90, 100, 120, 200, 150, 80, 70, 110],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [15, 15, 0, 0]
                    }
                }
            ]
        };


        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }

        //window.addEventListener('resize', myChart.resize);
    });


</script>

<div id="chart-container" style="height: 250px; width: 400px;"></div>

<style>
    * {
        margin: 0;
        padding: 0;
        }
        #chart-container {
        position: relative;
        height: 100vh;
        overflow: hidden;
        }
</style>