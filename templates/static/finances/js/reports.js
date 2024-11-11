const totalProcessos = 50; // Total de Processos
const mediaGastos = 1200; // Média de Gastos

// Configuração do gráfico
const ctx1 = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx1, {
  type: "bar", // Tipo de gráfico
  data: {
    labels: ["Total de Processos", "Média de Gastos"], // Rótulos
    datasets: [
      {
        label: "Dados Financeiros",
        data: [totalProcessos, mediaGastos], // Dados para o gráfico
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Cor para Total de Processos
          "rgba(255, 99, 132, 0.5)", // Cor para Média de Gastos
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Borda para Total de Processos
          "rgba(255, 99, 132, 1)", // Borda para Média de Gastos
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true, // Começar do zero no eixo Y
      },
    },
  },
});


// 2

const processos = ['Processo 1', 'Processo 2', 'Processo 3', 'Processo 4'];
const gastos = [300, 700, 400, 600]; // Valores dos gastos por processo

// Configuração do gráfico
const ctx2 = document.getElementById('myPieChart').getContext('2d');
const myPieChart = new Chart(ctx2, {
    type: 'pie', // Tipo de gráfico
    data: {
        labels: processos,  // Rótulos para cada processo
        datasets: [{
            label: 'Gastos por Processo',
            data: gastos,  // Dados de gastos
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',  // Cor para Processo 1
                'rgba(255, 99, 132, 0.5)',   // Cor para Processo 2
                'rgba(255, 206, 86, 0.5)',    // Cor para Processo 3
                'rgba(153, 102, 255, 0.5)'    // Cor para Processo 4
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',   // Borda para Processo 1
                'rgba(255, 99, 132, 1)',    // Borda para Processo 2
                'rgba(255, 206, 86, 1)',     // Borda para Processo 3
                'rgba(153, 102, 255, 1)'     // Borda para Processo 4
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,  // Gráfico responsivo
        plugins: {
            legend: {
                position: 'top',  // Posição da legenda
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: R$ ${tooltipItem.raw}`;
                    }
                }
            }
        }
    }
});
