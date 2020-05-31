
import { EventBus } from "../event-bus.js";
import Chart from './chart.js';
import Table from './table.js';

export default Vue.component("monitor-data", {

  name: "Data",
  components: {
    Chart,
    Table
  },
  props: ['systems'],
  data: function () {
    return {
      last: null,
      history: [],
      all: [],
      selected: null,
      interval: null,
      showTable: true,
      picked: null

    };
  },
  mounted() {
    this.selected = null;
    EventBus.$on("monitor-sys-select", sys => {
      this.selected = sys;
      this.open();
      this.showTable = true;
    });
  },
  methods: {
    async	requesAll() {
      this.all = false;
      this.history = [];
      for (let i = 0; i < this.systems.length; i++) {
        if (this.selected) {
          break;
        }
        var retorno = await this.requestLast(this.systems[i].id);
        if (retorno.request && !this.selected) {
          retorno.url = this.systems[i].url;
          this.history.push(retorno);
        }
      }
      this.all = true;

    },
    open() {
      if (!this.selected) {
        this.showTable = true;
        this.requesAll();
        return;
      }
      this.all = false;
      this.history = [];
      this.requestHistory(this.selected.id)
    },
    async requestLast(sys) {
      let request = sys || this.selected.id;
      let response = await fetch(`/last?system=${request}`);
      return await response.json();
    },
    requestHistory(sys) {
      let request = sys || this.selected.id;
      fetch(`/history?system=${request}`).then(r => r.json()).then((res) => {
        this.history = res;
      }).catch()
    },
    requestNow(sys) {
      let request = sys || this.selected.id;
      fetch(`/now?system=${request}`).then(r => r.json()).then((res) => {
        this.requestHistory();
      }).catch()
    },
    updateManutencao() {
      fetch(`/maintance?system=${this.selected.id}`).then((res) => {
        if (res.status == 200) {

          EventBus.$emit("monitor-reload-config", true);
          this.open(this.systems.find(s => s.id == this.selected.id));

        } else {
          alert('Ocorreu um problema ao atualizar o estado de manutenção, por favor tente mais tarde ou informe aos devs');
        }
      }).catch(() => {
        alert('Ocorreu um problema ao atualizar o estado de manutenção, por favor tente mais tarde ou informe aos devs');
      })
    },
    changeView(val) {
      this.showTable = val;
    }

  },
  watch: {
    history: function (val) {
      if (val.length) {
        $('[data-toggle="tooltip"]').tooltip()
      }
    },
    systems: function (val) {
      if (val && val.length) {
        this.selected = this.selected ? val.find(s => s.id == this.selected.id) : null;
        this.open(this.selected)
      }
    }
  },
  template: `
  <div class="card card-chart">
    <div class="card-header ">
        <div class="row">
            <div class="col-sm-6 text-left">
                <h4 class="card-title">
					<i class="tim-icons icon-bulb-63" v-show="selected && selected.maintance" title="Em manutenção" data-toggle="tooltip"></i>
					<b>{{selected ? selected.name :'Todos'}}</b>
				</h4>
            </div>
            <div class="col-sm-6" v-show="selected">
                <div class="btn-group btn-group-toggle float-right" data-toggle="buttons">
                    <label class="btn btn-sm btn-info btn-simple active"  @click="changeView(true)">
                        <input type="radio" name="options" />
                        <span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">Tabela</span>
                        <span class="d-block d-sm-none">
							<i class="tim-icons icon-single-02"></i>
						</span>
                    </label>
                    <label class="btn btn-sm btn-info btn-simple "  @click="changeView(false)">
                        <input type="radio" name="options" />
                        <span class="d-none d-sm-block d-md-block d-lg-block d-xl-block">Grafico</span>
                        <span class="d-block d-sm-none">
							<i class="tim-icons icon-gift-2"></i>
						</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body">
        <div v-show="showTable">
          <monitor-table :system="selected" :systems="systems"> </monitor-table>
        </div>
        <div  v-if="!showTable">
          <monitor-chart :system="selected"> </monitor-chart>
        </div>
    </div>
</div>
  `
});