import App from "./components/app.js";
import Venda from "./pages/venda.js";
const routes = [
	{ path: '/', component: Venda, name: "venda" }
];
const router = new VueRouter({
	routes // short for `routes: routes`
});
window.$router = router;
var vm = new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<app/>'
});
Vue.filter('formatDate', function (value) {
	if (value) {
		return new Date(value).format('dd-mm-yyyy HH:MM:ss')
	}
})

Vue.use(Toasted)

window.groupBy = (list, keyGetter) => {
	const map = new Map();
	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
}