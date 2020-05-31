
import { EventBus } from "../event-bus.js";

export default Vue.component("monitor-settings-system", {

	name: "MonitorSettingsSystem",
	components: {
	},
	data: function () {
		return {
			active: null,
			selected: null,
			editable: {},
			list: [],
			tableOptions: {
				columns: [{
					name: '',
					field: 'homologation',
					format: val => val ? 'Homologação' : 'Produção',
					class: 'text-left'
				}, {
					name: 'Sistema',
					field: 'name',
					class: 'text-left'
				}, {
					name: '',
					field: 'maintance',
					format: val => val ? 'Em Manutenção' : 'Operando Normal',
					class: 'text-left'
				}],
				actions: [
					{
						name: 'Adicionar',
						global: true,
						icon: 'fa fa-plus',
						onClick: this.showAddOrEditModal
					},
					{
						name: 'Editar',
						icon: 'tim-icons icon-pencil',
						onClick: this.showAddOrEditModal
					},
					{
						name: 'Manutenção',
						icon: 'tim-icons icon-settings',
						class: 'btn btn-danger',
						onClick: this.setMaintance
					}

				]
			}


		};
	},
	created: function () {
		this.loadConfig()
	},
	methods: {
		showAddOrEditModal(item) {
			this.editable = item || { homologation: false, maintance: false };
			if (item) {
				this.editable.edit = true;
			}
			$('#systemEditModal').modal()

		},
		setMaintance(selected) {
			fetch(`/maintance?system=${selected.id}`).then((res) => {
				if (res.status == 200) {
					EventBus.$emit("monitor-reload-config", true);
					this.loadConfig();
				} else {
					alert('Ocorreu um problema ao atualizar o estado de manutenção, por favor tente mais tarde ou informe aos devs');
				}
			}).catch(() => {
				alert('Ocorreu um problema ao atualizar o estado de manutenção, por favor tente mais tarde ou informe aos devs');
			})

		},
		loadConfig() {
			this.tableOptions.loading = true;
			fetch(`/config`).then(r => r.json()).then((res) => {
				this.list = res.sort((a, b) => {
					if (a.name > b.name) {
						return -1;
					}
					if (b.name > a.name) {
						return 1;
					}
					return 0;
				}).reverse();
				this.tableOptions.loading = false;
			}).catch(() => { this.tableOptions.loading = false })
		},
		submit(event) {
			event.preventDefault();
			if (this.editable.edit) {
				this.update();
			} else {
				this.save();
			}
		},
		update() {
			let model = Object.assign({ homologation: false, maintance: false }, this.editable);
			delete model.edit;
			fetch('/system', {
				method: "PUT",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(model)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				$('#systemEditModal').modal('hide');
				this.loadConfig();
				this.editable = { homologation: false, maintance: false };
				this.$toasted.show("Atualizado com Sucesso !!", {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000
				});
			}).catch((err) => console.log(JSON.stringify(err)));

		},
		save() {
			fetch("/system", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.editable)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				$('#systemEditModal').modal('hide');
				this.loadConfig();
				this.editable = { homologation: false, maintance: false };
				this.$toasted.show(" Salvo com Sucesso !!", {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000
				});
			}).catch((err) => console.log(JSON.stringify(err)));

		},
		remove() {
			fetch("/system/" + this.editable.id, {
				method: "DELETE",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.editable)
			}).then((response) => {
				return response.json();
			}).then((data) => {
				$('#systemEditModal').modal('hide');
				this.loadConfig(); this.editable = { homologation: false, maintance: false };
				this.$toasted.show(" Deletado com Sucesso !!", {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000
				});
			}).catch((err) => console.log(JSON.stringify(err)));
		}
	},
	watch: {

	},
	template: `
  <div class="">
       <data-table :options="tableOptions" :data="list"> </data-table>

                <!-- Modal -->
                <div class="modal  modal-black  fade" id="systemEditModal" tabindex="-1" role="dialog" aria-labelledby="systemEditModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="systemEditModalLabel">{{editable.id ? 'Editar '+editable.name:'Novo Sistema'}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
											<form class="modal-body"   @submit="submit">
												<div class="form-group">
													<label for="systemName">Nome do Sistema</label>
													<input type="text" class="form-control" id="systemName" placeholder=" Algum Nome Legal ou Deus Mitologico" required v-model="editable.name">
												</div>
													<div class="form-group">
													<label for="systemId">Identificador do Sistema</label>
													<input type="text" :disabled="editable.edit" class="form-control" id="systemId" placeholder="server.sistema-maneiro ou  sistema-maneiro-legal" required v-model="editable.id" aria-describedby="systemIdHelp">
													<small id="systemIdHelp" class="form-text text-muted">Não deve conter espaços ou letras maiuscula. Deve ser único (sim ainda nao deu pra fazer a validação na hr de salvar)</small> 
												</div>

												<div class="form-group">
													<label for="systemUrl">URL do Sistema</label>
													<input type="text" class="form-control" id="systemUrl" placeholder="https://...." required v-model="editable.url">
												</div>

												<div class="form-group">
													<label for="systemUrlRequest">URL da Requisição do Sistema</label>
													<input type="text" class="form-control" id="systemUrlRequest" placeholder="https://..../public/api/..." required v-model="editable.request_url">
												</div>

												<div class="form-group">
														<div class="form-check">
																<label class="form-check-label">
																		<input class="form-check-input" type="checkbox" v-model="editable.homologation">
																	Homologação
																		<span class="form-check-sign">
																				<span class="check"></span>
																		</span>
																</label>
														</div>
													</div>

 											<div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-danger" @click="remove()" v-if="this.editable && this.editable.edit">Excluir</button>
                        <button type="submit" class="btn btn-info">Salvar</button>
                      </div>
											</form>

                      </div>
                    </div>
                  </div>
                </div>
</div>
  `
});