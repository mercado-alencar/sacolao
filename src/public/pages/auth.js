export default Vue.component("clientes", {
	data: function () {
		return {
			selectedIndex: 0,
			modified: 0,
			intercepted: false,
			guard: null

		};
	},
	created: function () {
		
	},
	methods: {
	},
	template: `
	<div>
   <h4>   É necessário logar para ter acesso as informações.</h4>
   </div>
  `
});