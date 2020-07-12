
export default Vue.component("venda", {

  name: "Venda",
  components: {
  },
  data: function () {
    return {
      venda: {},
      printClass: ""
    };
  },
  created: function () {
  },
  methods: {
    pesquisarEndereco() {
      //todo
    },
    salvar() {
      //todo
    },
    imprimir() {
      let w = window.open();
      let html = document.querySelector('form').innerHTML;
      w.document.write(html);
      w.print();
      w.close();
    },
    imprimirCaixa() {
      this.printClass = "termico";
      this.imprimir();
      // 
    },
    imprimirEscritorio() {
      this.printClass = "convencional";
      this.imprimir();
      // 
    },
    submit(evt) {
      this.salvar();
      if (evt.submitter.id === 'caixa') {

        this.imprimirCaixa();
      } else {

        this.imprimirEscritorio();
      }
    }

  },
  template: `<div class="main">
  <header>
      <h3>Mercado Alencar</h3>
  </header>
  <main>
      <div>
          <form @submit.prevent="submit" action="/imprimir" :class="printClass">
              <fieldset>
                  <legend>Cliente</legend>
                  <div class="field">
                      <input type="text" required id="cliente" placeholder="Alencar José Schio" required v-model="venda.cliente" />
                      <label for="cliente">Cliente</label>
                  </div>
                  <div class="field">
                      <input type="text" id="telefone" placeholder="00000 00000" required v-model="venda.telefone" />
                      <label for="telefone">Telefone</label>
                  </div>
              </fieldset>
              <fieldset>
                  <legend>Entrega</legend>
              </fieldset>
              <fieldset>
                  <legend>Compra</legend>
                  <div class="field">
                  <div class="control">
                      <select id="sacolao" required v-model="venda.sacolao">
                          <option value="" selected>Selecone o valor</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                          <option value="200">200</option>
                          <option value="300">300</option>
                      </select>
                      <label for="sacolao">Sacolão de</label>
                  </div>
                  </div>
              </fieldset>
              <div class="field">
                  <input type="text" id="endereco" placeholder="Rua, Avenida, Travessa..." required v-model="venda.endereco" />
                  <label for="endereco">Endereço</label>
              </div>
              <div class="field">
                  <input type="text" id="numero" placeholder="Número, Casa..." v-model="venda.numero" />
                  <label for="numero">Número</label>
              </div>
              <div class="field">
                  <input type="text" id="bairro" placeholder="Bairro" v-model="venda.bairro" />
                  <label for="bairro">Bairro</label>
              </div>
              <div class="field">
                  <input type="text" id="referencia" placeholder="Complemento, referência" v-model="venda.referencia" />
                  <label for="referencia">Complemento, referência</label>
              </div>
              <div class="form-group col-sm-4">
                  <div class="form-check">
                      <label for="aReceber" class="form-check-label">
                          <input id="aReceber" name="aReceber" class="form-check-input" type="checkbox" v-model="venda.aReceber" /> À Receber
                          <span class="form-check-sign">
                              <span class="check"></span>
                          </span>
                      </label>
                  </div>
              </div>
              <div class="form-group col-sm-4" v-if="venda.aReceber">
                  <div class="form-check">
                      <label for="levarTroco" class="form-check-label">
                          <input id="levarTroco" name="levarTroco" class="form-check-input" type="checkbox" v-model="venda.levarTroco" /> Levar Troco
                          <span class="form-check-sign">
                              <span class="check"></span>
                          </span>
                      </label>
                  </div>
              </div>
              <div class="form-group col-sm-4" v-if="venda.aReceber && !venda.levarTroco">
                  <div class="form-check">
                      <label for="cartao" class="form-check-label">
                          <input id="cartao" name="cartao" :required="venda.levarTroco" class="form-check-input" type="checkbox" v-model="venda.cartao" /> Cartão
                          <span class="form-check-sign">
                              <span class="check"></span>
                          </span>
                      </label>
                  </div>
              </div>
              <div class="form-group col-sm-4" v-if="venda.levarTroco">
                  <input type="number" min="1" step="any" id="troco" placeholder="Troco Para" required v-model="venda.troco" />
              </div>
              <div class="field">
              <div class="control">
              <textarea id="obs" rows="3" v-model="venda.obs"></textarea>
              <label for="obs">Obs</label>
              </div></div>
              <div class="clearfix"></div>
              <hr />
              <div class="clearfix modal-footer">
                  <button type="submit" id="escritorio" name="escritorio" class="btn btn-info">Imprimir no Escritório</button>
                  <button type="submit" id="caixa" name="caixa" class="btn btn-info">Imprimir no Caixa</button>
              </div>
          </form>
          <pre><code>{{venda |JSON}}</code></pre>
      </div>
  </main>
</div>

  `
});