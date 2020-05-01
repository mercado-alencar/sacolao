
import SettingsSystem from '../components/settings/system.js';
import SettingsEmail from '../components/settings/email.js'


export default Vue.component("settings", {

  name: "Settings",
  components: {
    SettingsSystem, SettingsEmail
  },
  data: function () {
    return {
      active: null,
      actions: [{
        name: 'Sistemas',
        id: 'sistemas',
        icon: 'tim-icons icon-spaceship'
      }, {
        name: 'E-mais',
        id: 'emails'
      }
      ]
    };
  },
  created: function () {
    this.active = this.actions[0];
  },
  methods: {
    setAction(action) {
      this.active = action;
    }
  },
  watch: {

  },
  template: `

            <div class="content" style="padding-left:30px">        
  

             <div class="card">
                <div class="card-header">
                  <ul class="nav nav-tabs nav-tabs-primary" role="tablist">
                    <li class="nav-item"  v-for="current in actions">
                      <a class="nav-link " :class="{'active show' : current && active &&current.id == active.id}" data-toggle="tab" :href="'#'+current.id" role="tablist" v-on:click="setAction(current)">
                        <i :class="current.icon"></i> {{current.name}}
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="card-body">
                  <!-- Tab panes -->
                  <div class="tab-content tab-space">
                    <div class="tab-pane" :class="{'active show' :  active && 'sistemas' == active.id}" id="sistemas">
                        <monitor-settings-system></monitor-settings-system>
                    </div>     
                     <div class="tab-pane" :class="{'active show' :  active && 'emails' == active.id}" id="emails">
                         <monitor-settings-email></monitor-settings-email>
                    </div>                   
                  </div>
                </div>
              </div>
            </div>
  `
});