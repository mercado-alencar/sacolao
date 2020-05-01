import { EventBus } from "./event-bus.js"

export default Vue.component("app", {
    data: function () {
        return {
            selectedIndex: 0,
            modified: 0,
            intercepted: false,
            guard: null,
            showMenu: false,
            systems: [],
            menus: []

        };
    },
    created: function () {
    },
    methods: {
        createMenu(systems) {
            this.menus = window.groupBy(systems, sys => sys.homologation);

            $('[data-toggle="tooltip"]').tooltip()
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
                this.createMenu(this.systems)
                EventBus.$emit("monitor-config", this.systems);
            }).catch()
        }
    },
    template: `
	<div>
    <div class="wrapper" data="blue" data-color="blue">

        <div class="main-panel" data="blue" data-color="blue">
        <!--      <nav class="navbar navbar-expand-lg fixed-top navbar-transparent" color-on-scroll="100">
    <div class="container" style="padding-top:0">
      <div class="navbar-translate">
        <a class="navbar-brand" href="#">
          <span>Sacolão</span> 
        </a>
        <button class="navbar-toggler navbar-toggler toggled collapsed" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>
      <div class="navbar-collapse justify-content-end collapse" id="navigation" style="">

        <ul class="navbar-nav">

          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToDownload()">
              Nova Venda
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" onclick="scrollToDownload()">
             Histórico
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
           Navbar 
            <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
                <div class="container-fluid">
                    <div class="navbar-wrapper">
                        <div class="navbar-toggle d-inline">
                            <button type="button" class="navbar-toggler">
                                <span class="navbar-toggler-bar bar1"></span>
                                <span class="navbar-toggler-bar bar2"></span>
                                <span class="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <a class="navbar-brand" style="padding: 20px" href="javascript:void(0)"> Sacolão </a>
                        <ul></ul>
                    </div>
                    <!-- <ul class="nav">
					<li class="nav-item">
						<router-link  tag='li' :to='{name:"RealTime" }'>
							<a class="nav-link" >Real Time</a></router-link>
					</li>

					<li class="nav-item">
						<router-link  tag='li' :to='{name:"Settings" }'>
							<a class="nav-link" >Configurações</a></router-link>
					</li>
					</ul> 
                </div>
            </nav>-->

                
                <div class="content">
                    <div class="row">
                        <div class=" col-md-12">

                            <router-view></router-view>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
  `
});