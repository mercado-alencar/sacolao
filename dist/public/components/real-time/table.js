
import { EventBus } from "../event-bus.js";

export default Vue.component("monitor-table", {
  name: "Table",
  props: ['system', 'systems'],
  data: function () {
    return {
      last: null,
      history: [],
      all: [],
      selected: null,
      interval: null,
      loading: false

    };
  },
  methods: {
    async	requesAll() {
      this.loading = true;
      this.all = false;
      this.history = [];
      for (let i = 0; i < this.systems.length; i++) {
        if (this.selected) {
          break;
        }
        var retorno = await this.requestLast(this.systems[i].id);
        if (retorno.request && !this.selected) {
          retorno.url = this.systems[i].url;
          retorno.homologation = this.systems[i].homologation;
          this.history.push(retorno);
        }
        if (i == this.systems.length - 1) {
          this.loading = false;
        }
      }
      this.all = true;

    },
    performRequest() {
      if (!this.selected) {
        this.requesAll();
        return;
      }
      this.all = false;
      this.history = [];
      this.requestHistory(this.selected.id)
    },
    open() {
      clearInterval(this.interval);
      this.performRequest();
      this.interval = setInterval(this.performRequest, 600000);
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

    async requestLast(sys) {
      let request = sys || this.selected.id;
      let response = await fetch(`/last?system=${request}`);
      return await response.json();
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
    }

  },
  watch: {
    history: function (val) {
      if (val.length) {
        $('[data-toggle="tooltip"]').tooltip()
      }
    },
    system: function (val) {
      this.selected = val;
      this.open(this.selected)
    },
    systems: function (val) {
      this.open(this.selected)
    }
  },
  template: `
        <div class="table-responsive" >
            <table class="table  ">
                <thead class=" text-primary">
                    <tr>
                        <th v-if="!selected">  </th>
                        <th> System </th>
                        <th> Request </th>
                        <th> Response </th>
                        <th class="text-center"> Status </th>
                        <th width="100px" class="td-actions text-right">
                            <button type="button" rel="tooltip" class="btn btn-info btn-sm btn-icon" v-if="selected" data-toggle="tooltip" v-on:click="requestNow(selected.id)" title="Clique para solicitar ao agora">
                                <i class="tim-icons icon-cloud-upload-94"></i>
                            </button>
                            <button type="button" rel="tooltip" class="btn btn-danger btn-sm btn-icon" type="button" v-if="selected" data-toggle="tooltip" v-on:click="updateManutencao(selected)" title="Clique para alterar o estado de Manutenção">
                                <i class="tim-icons icon-settings"></i>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="current in history">
                        <td v-if="!selected">{{current.homologation? 'Homologação' : 'Produção'}}</td>
                        <td data-toggle="tooltip" :title="selected?'':current.url">{{current.name || current.system }}</td>
                        <td>{{current.request | formatDate}}</td>
                        <td>{{current.response | formatDate}}</td>
                        <td>{{current.status}}

                            <a href="#" :style="{'pointer-events:none' : current.status == 200 }" data-toggle="tooltip" data-placement="top" :title="current.status != 200 ? current.error : 'Ok!'">
                                <i :class="{'fa fa-check-circle text-success' : current.status == 200 , 'fa fa-times-circle text-danger':current.status != 200 }" aria-hidden="true"></i>
                            </a>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot v-show="loading">
                    <tr style="text-align:center !important">
                        <td :colspan="selected ? 4 : 5" style="text-align:center !important"> 
                            <i class="fa fa-spin fa-circle-o-notch fa-5x"></i>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
  `
});