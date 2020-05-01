
import { EventBus } from "../components/event-bus.js";


export default Vue.component("venda", {

  name: "Venda",
  components: {
  },
  data: function () {
    return {
        venda:{}
    };
  },
  created: function () {
  },
  methods: {
  pesquisarEndereco() {
      //todo
  },
  salvar(){
      //todo
  },
  imprimir() {
     // 
  },
  submit() {
      
  }

  },
  template: `
  <div class="modal-body">
    <form class="modal-body" @submit="submit">
        <div class="row">
            <div class="form-group col-sm-12">
                <label for="cliente">Cliente</label>
                <input type="text" class="form-control" required id="cliente" placeholder="Alencar José Schio" required v-model="venda.cliente">
            </div>
            <div class="form-group col-sm-6">
                <label for="telefone">Telefone</label>
                <input type="text" class="form-control" id="telefone" placeholder="00000 00000" required v-model="venda.telefone">
            </div>

            <div class="form-group col-sm-6">
                <label for="sacolao">Sacolão de</label>
                <select class="form-control" id="sacolao" required v-model="venda.sacolao">
                    <option value="" selected >Selecone o valor</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                </select>
            </div>

            <div class="form-group col-sm-12">
            <label for="endereco">Endereço</label>
            <input type="text" class="form-control" id="endereco" placeholder="Rua, Avenida, Travessa..." required v-model="venda.endereco">
            </div>
            <div class="form-group col-sm-6">
            <input type="text" class="form-control" id="numero" placeholder="Número, Casa..." v-model="venda.numero">
            </div>
            <div class="form-group col-sm-6">
             <input type="text" class="form-control" id="bairro" placeholder="Bairro" v-model="venda.bairro">
          </div>
          <div class="form-group col-sm-12">
          <input type="text" class="form-control" id="referencia" placeholder="Complemento, referência" v-model="venda.bairro">
       </div>
            <div class="form-group col-sm-4">
                <div class="form-check">
                    <label for="aReceber" class="form-check-label">
                        <input id="aReceber" name="aReceber" class="form-check-input" type="checkbox" v-model="venda.aReceber"> À Receber
                        <span class="form-check-sign">
                             <span class="check"></span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="form-group  col-sm-4" v-if="venda.aReceber">
                <div class="form-check">
                    <label for="levarTroco" class="form-check-label">
                        <input id="levarTroco" name="levarTroco" class="form-check-input" type="checkbox" v-model="venda.levarTroco"> Levar Troco
                        <span class="form-check-sign">
                                <span class="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <div class="form-group  col-sm-4" v-if="venda.aReceber && !venda.levarTroco">
                <div class="form-check">
                    <label for="cartao" class="form-check-label">
                        <input id="cartao" name="cartao" :required="venda.levarTroco" class="form-check-input" type="checkbox" v-model="venda.cartao"> Cartão
                        <span class="form-check-sign">
                         <span class="check"></span>
                        </span>
                    </label>
                </div>
            </div>
            <div class="form-group col-sm-4" v-if="venda.levarTroco">
                <input type="text" class="form-control" id="troco" placeholder="Troco" required v-model="venda.troco">
            </div>
            <div class="form-group col-sm-12">
            <label for="obs">Obs</label>
            <textarea class="form-control" id="obs" rows="3" v-model="venda.obs"></textarea>
          </div>
            <div class="clearfix"></div>
            <hr>
            <div class="clearfix modal-footer">
                <button type="submit" class="btn btn-info">Imprimir no Escritório</button>
                <button type="submit" class="btn btn-info">Imprimir no Caixa</button>
            </div>
        </div>
    </form>

    <pre><code>{{venda |JSON}}</code></pre>

</div>
  `
});