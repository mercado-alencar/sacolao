
class Guard {

	constructor(opt = {}) {
		this.callback = opt.callback;
		if (opt.redirect && window.$router.currentRoute.path != opt.redirect)
			window.$router.push(opt.redirect)
		else if (window.$router.currentRoute.path == '/')
			window.$router.push(opt.redirect || '/real-time/todos')
		else
			this.callback && this.callback();
		if (!window.config) {
			this.config = {
				apiKey: "AIzaSyCoVSABu34Elw64c1j-Ujmd52TPpk1ECUU",
				authDomain: "sistemaseconsultoria.firebaseapp.com",
				databaseURL: "https://sistemaseconsultoria.firebaseio.com",
				projectId: "sistemaseconsultoria",
				storageBucket: "sistemaseconsultoria.appspot.com",
				messagingSenderId: "184960648793"
			};

			if (!firebase.apps.length)
				firebase.initializeApp(this.config);

			this.provider = new firebase.auth.GoogleAuthProvider();
			this.provider.addScope('email');
			this.provider.setCustomParameters({
				'hd': 'sistemas.com.br'
			});
			firebase.auth().languageCode = 'pt';
		}
		firebase.auth().onAuthStateChanged((user) => {
			if (user && user.emailVerified) {
				/* if (window.$router.currentRoute.path != '/real-time')
					window.$router.push(opt.redirect || '/real-time') */
				if (opt.redirect && window.$router.currentRoute.path != opt.redirect)
					window.$router.push(opt.redirect)
				else if (window.$router.currentRoute.path == '/')
					window.$router.push(opt.redirect || '/real-time/todos')
				else
					this.callback && this.callback();
			} else {
				if (window.$router.currentRoute.path != '/')
					window.$router.push('/')
				else
					this.auth();
			}
		});
	}

	auth() {
		firebase.auth().signInWithPopup(this.provider).then((result) => {
			window.$router.push('/real-time')
		}).catch(function (error) {
			if (error && error.code == "auth/popup-blocked") {
				alert("Desbloqueie o popup da pagina e atualize-a.")
			}
			if (window.$router.currentRoute.path != '/')
				window.$router.push('/').catch(err => { })
		});

	}
}






export default Guard;