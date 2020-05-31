

export default Vue.component("monitor-chart", {

  name: "Chart",
  props: ['system', 'systems'],
  data: function () {
    return {
      last: null,
      history: [],
      all: [],
      selected: null,
      interval: null

    };
  },
  created: function () {
    this.selected = this.system;
    this.requestHistory();
  },
  mounted: function () {
    this.selected = this.system;
    this.requestHistory();
  },
  methods: {

    requestHistory() {
      let request = this.selected.id;
      fetch(`/history?system=${request}&size=100`).then(r => r.json()).then((res) => {
        this.history = res.reverse();
        this.render();
      }).catch()
    },
    render() {
      setTimeout(() => {


        let gradientChartOptionsConfigurationWithTooltipPurple = {
          maintainAspectRatio: false,
          legend: {
            display: false
          },

          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
          },
          responsive: true,
          scales: {
            yAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.0)',
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 125,
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(225,78,202,0.1)',
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9a9a9a"
              }
            }]
          }
        };
        this.history.forEach(i => {
          i.x = Vue.filter('formatDate')(i.request);
          i.y = (i.status == 200) ? '200' : '0';
          i.label = i.message
        })
        var chart_labels = this.history.map(d => Vue.filter('formatDate')(d.request))
        var chart_data = this.history.map(d => {
          return (d.status == 200) ? '200' : '0';
        });
        var ctx = document.getElementById("chartBig1").getContext('2d');

        var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
        gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
        gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
        var config = {
          type: 'line',
          data: {
            labels: chart_labels,
            datasets: [{
              label: "Status: ",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: '#247bf6',
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: '#247bf6',
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: '#247bf6',
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.history
            }]
          },
          options: gradientChartOptionsConfigurationWithTooltipPurple
        };
        var myChartData = new Chart(ctx, config);

      }, 300)
    }
  },
  watch: {
    system: function (val) {
      this.selected = val;
      this.render();
    }
  },
  template: `
	<div>
    <div class="chart-area" style="height:500px">
                  <canvas id="chartBig1" style="height:500px"></canvas>
                </div>
    </div>
  `
});