
import { EventBus } from "../event-bus.js";

export default Vue.component("monitor-menu", {
  props: ['systems'],
  data: function () {
    return {
      selected: null
    };
  },
  methods: {
    open(sys) {
      EventBus.$emit("monitor-sys-select", sys);
    }
  },
  template: `
<div class="sidebar" data="blue" data-color="blue">
    <div class="sidebar-wrapper" data="blue">

        <ul class="nav">
            <li> <a v-on:click="open()">Todos</a>
            </li>
            <li class="" v-for="sys in systems ">

                <a v-on:click="open(sys)" :title="sys.url">
                    <p> {{sys.name}} </p>
                </a>
            </li>

        </ul>
    </div>
</div>     
  `
});