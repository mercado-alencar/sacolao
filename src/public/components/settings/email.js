
import { EventBus } from "../event-bus.js";

export default Vue.component("monitor-settings-email", {

	name: "MonitorSettingsEmail",
	components: {
	},
	data: function () {
		return {
			mailModel: false
		}
	},
	created: function () {
		this.get();
	},
	methods: {
		get() {
			fetch("/email/1", {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.mailModel = data
			}).catch((err) => console.log(JSON.stringify(err)));
		},
		submit(event) {
			event.preventDefault();
			if (this.mailModel.id) {
				this.update();
			} else {
				this.save();
			}
		},
		update() {
			let model = this.mailModel;
			delete model.edit;
			fetch('/email/' + model.id, {
				method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(model)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.$toasted.show("Atualizado com sucesso!!", {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000
				});
				this.get();
			}).catch((err) => console.log(JSON.stringify(err)));

		},
		save() {
			fetch("/email", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.mailModel)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				this.$toasted.show(" Salvo com Sucesso !!", {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000
				});
				this.get();
			}).catch((err) => console.log(JSON.stringify(err)));

		}
	},
	watch: {

	},
	template: `
  <div class="">

    <form class="modal-body" @submit="submit">
        <div class="form-group">
            <label for="sender">From</label>
            <input type="email" class="form-control" id="sender" placeholder="naoresponsa@provedor.com" required v-model="mailModel.sender">
        </div>
        <div class="form-group">
            <div class="form-group">
            <label for="email">Usuario</label>
            <input type="email" class="form-control" id="email" placeholder="email@provedor.com" required v-model="mailModel.email">
        </div>

        <div class="form-group">
            <label for="host">Host</label>
            <input type="text" class="form-control" id="host" placeholder="smtp...provedor....com" required v-model="mailModel.host">
        </div>

        <div class="form-group">
            <label for="senha">Senha</label>
            <input type="password" class="form-control" id="senha" placeholder="*****************" required v-model="mailModel.senha">
        </div>

        <div class="form-group">
            <label for="port">Porta</label>
            <input type="number" class="form-control" id="port" placeholder="0000" required v-model="mailModel.port">
        </div>
		<div class="form-group">
            <div class="form-group">
            <label for="destinations">Destinatarios</label>
            <input type="text" class="form-control" id="destinations" placeholder="email@provedor.com;" required v-model="mailModel.destinations">
				<small id="systemIdHelp" class="form-text text-muted">Separe os emails com ponto-e-virgula(;)</small> 
        </div>


        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
             <button type="submit" class="btn btn-info">Salvar</button>
         </div>
	</form>

</div>
  `
});