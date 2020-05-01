
export default Vue.component("data-table", {
  name: "Data",
  props: ['options', 'data'],
  data: function () {
    return {
      config: { columns: [] },
      list: []

    };
  },
  methods: {


  },
  watch: {
    options: function (val) {
      this.config = val;
    },
    data: function (val) {
      this.list = val;
    },
  },
  template: `
        <div class="table-responsive" >
            <table class="table  ">
                <thead class=" text-primary">
                    <tr>
                     <th width="100px" class="td-actions text-right" v-if="options.actions">
                            <button  v-for="current in options.actions" v-if="current.global" type="button" rel="tooltip" class="btn btn-info btn-sm btn-icon" type="button"  data-toggle="tooltip" :title="current.name" v-on:click="current.onClick()">
                                
                            <i :class="current.icon"></i>
                            </button>
                        </th>
                        <th  v-for="current in options.columns" :class="current.class"> {{current.name}} </th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="current in list">
                        <td v-if="options.actions" class="td-actions text-right">
                          <button  v-for="option in options.actions" v-if="!option.global" type="button" rel="tooltip" :class="option.class ? option.class+'  btn-sm btn-icon' : 'btn btn-info btn-sm btn-icon'" type="button"  data-toggle="tooltip" :title="option.name" v-on:click="option.onClick(current)">
                                
                            <i :class="option.icon"></i>
                            </button>
                        </td>
                        <td  v-for="column in options.columns" :class="column.class"> {{column.format? column.format(current[column.field]) : current[column.field]}} </th>
                       
                    </tr>
                </tbody>
                <tfoot v-show="!list.length" style="text-align:center !important">
                    <tr v-if="options.loading" style="text-align:center !important">
                        <td colspan="4" style="text-align:center !important">
                            <i style="text-align:center !important" class="fa fa-spin fa-circle-o-notch fa-5x"></i>
                        </td>
                    </tr>
                     <tr v-else>
                        <td colspan="4">
                              Nada a exibir
                        </td>
                    </tr>
                 
                </tfoot>
            </table>
        </div>
  `
});