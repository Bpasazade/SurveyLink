<script>
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

    let canvas;

    onMount(() => {
        const ctx = canvas.getContext('2d');
        var background_1 = ctx.createLinearGradient(0, 0, 0, 600);
        background_1.addColorStop(0, '#327FC7');
        background_1.addColorStop(1, '#5CB3FE');

        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "24:00"],
                datasets: [{
                    label: 'Sample Data',
                    data: [0, 5000, 50000, 150000, 200000],
                    backgroundColor: background_1,
                    borderColor: ['red', 'blue', 'fuchsia', 'green', 'navy'],
                    borderRadius: 10,
                    barThickness: 20,
                }]
            },
            options: {
                responsive: false,
                scales: {
                    // remove y-axis grid lines
                    y: {              
                        ticks: {
                            callback: function(value, index, values) {
                                return value === 0 ? '0k' : value / 1000 + 'k';
                            }
                        },
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                }
            }
        });
    });
</script>

<style>
    #barChart {
        position: absolute; 
        top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0;
    }
</style>

<canvas id="barChart" bind:this={canvas}></canvas>