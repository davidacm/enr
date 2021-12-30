import store from './store';
import {
	speak,
	cancelSpeak
} from './speak';

export const VueSpeak = {
	install(Vue) {
		Vue.prototype.speak = (text) => {
			let s = store.state;
			speak(text, s.vLang, s.vVoice, s.rate, s.pitch);
		};
		Vue.prototype.cancelSpeak = () => {
			cancelSpeak();
		}
	}
}

export const local = new Proxy({}, {
	get(obj, key) {
		if (key == "setItem") return (key, value) => localStorage.setItem(key, JSON.stringify(value));
		let cb = key => {
			let v = localStorage.getItem(key);
			return v !== null ? JSON.parse(v) : v;
		};
		return key == "getItem" ? cb : cb(key);
	},
	set(obj, key, value) {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	}
});

export function getItem(key, defaultValue) {
	let v = local.getItem(key);
	return v !== null ? v : defaultValue;
}