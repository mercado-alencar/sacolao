import Menu from '../components/real-time/menu.js';
import Data from '../components/real-time/data.js';
import { EventBus } from "../components/event-bus.js";


export default Vue.component("realtime", {

  name: "Realtime",
  components: {
    Menu,
    Data
  },
  data: function () {
    return {
      selectedIndex: 0,
      modified: 0,
      intercepted: false,
      guard: null,
      systems: [],
      last: null,
      history: [],
      all: [],
      selected: null

    };
  },
  created: function () {
    EventBus.$on("monitor-reload-config", sys => {
      this.loadConfig();
    });

  },
  methods: {
    init() {
      this.loadConfig();
    },
    loadConfig() {
      fetch(`/config`).then(r => r.json()).then((res) => {
        this.systems = res.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        }).reverse();

        EventBus.$emit("monitor-config", this.systems);
      }).catch()
    },
    open() {

      var id = this.$route.params.id;
      let selected = id === 'todos' ? null : this.systems.find((sys) => sys.id == id);
      EventBus.$emit("monitor-sys-select", selected);
    },

  },
  watch: {
    history: function (val) {
      if (val.length) {
        $('[data-toggle="tooltip"]').tooltip()
      }
    }, '$route': function () {
      this.open();
    }
  },
  template: `

           <monitor-data :systems="systems"></monitor-table>
  `
});