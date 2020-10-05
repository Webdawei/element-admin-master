// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.$axios = axios; // axios实例化
Vue.prototype.$qs = Qs; // Qs实例化

// 定义Content-Type格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 防止iframe点击盗取用户信息
axios.defaults.headers.post['X-Frame-Options'] = 'SAMEORIGIN';

// 设置、获取sessionstorage
Vue.prototype.$setSession = function(key, val) {
	sessionStorage.setItem(key, val);
	return true;
}
Vue.prototype.$getSession = function(key) {
	return sessionStorage.getItem(key);
}

// 设置、获取cookie
Vue.prototype.$setCookie = function(key, val, time) {
	var d = new Date();
	d.setTime(d.getTime() + (time));
	document.cookie = key + "=" + val + ";expires=" + d.toGMTString() + "; path=/";
	return true;
}
Vue.prototype.$getCookie = function(key) {
	//获取cookie字符串
	var strCookie = document.cookie;
	//将多cookie切割为多个名/值对
	var arrCookie = strCookie.split("; ");
	var val;
	//遍历cookie数组，处理每个cookie对
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		//找到名称为val的cookie，并返回它的值
		if (key == arr[0]) {
			val = arr[1];
			break;
		}
	}
	return val;
}

//校验密码强度---沒有匹配到以下級別就提示
Vue.prototype.$checkPassWord = function(value) {
	// 1:弱 2:中等 3:强
	var arr = [],
		array = [1, 2, 3];
	if (value.length < 6) { //最初级别
		return 1;
	}
	if (/\d/.test(value)) { //如果用户输入的密码 包含了数字
		arr.push(1);
	}
	if (/[a-z]/.test(value)) { //如果用户输入的密码 包含了小写的a到z
		arr.push(2);
	}
	if (/[A-Z]/.test(value)) { //如果用户输入的密码 包含了大写的A到Z
		arr.push(2);
	}
	if (/\W/.test(value)) { //如果是非数字 字母 下划线
		arr.push(3);
	}
	for (var i = 0; i < array.length; i++) {
		if (arr.indexOf(array[i]) == -1) {
			return array[i];
		}
	}
}

/* === */
// 保留小数
Vue.prototype.retainValidDecimal = function(key, float) {
	if (key != '') {
		var num = this.fourArithmeticOperations(key + '+' + "0", float);
	}
	return num;
};
Vue.prototype.BigDecimal = function(num) {
	var regSz = RegExp(/^0+(\.[0]+)?$/); // 判断是否有0.00
	if (regSz.test(num) || num == undefined || num == "undefined" || !num || num == "" || num == "-") {
		num = "0.00";
	}
	num = num.replace(" ", "").replace(/,/gi, '');
	if (!isNaN(num)) {
		return new BigDecimal(num + "");
	} else return new BigDecimal(0 + "");
};
// 四则运算
Vue.prototype.fourArithmeticOperations = function(expression, float, round) {
	var flag = false; // 第一位是否是负号的标记
	var flag1 = false; // 判定参与计算的数据是否有意义  无意义重置为0.00
	if (expression.indexOf("-") == 0) {
		flag = true;
		expression = expression.substring(1, expression.length);
	}
	var _self = this;
	if (float == undefined) {
		float = 2
	} else {
		float = parseInt(float)
	}
	round = round == undefined ? true : false; // 四舍五入控制
	var reg = RegExp(/\+\-|\-\-|\*\-|\/\-|\+|\-|\*|\//g); // 把所有特殊符号全部截取
	var regSz = RegExp(/^(?:0|\-?(?:0\.\d*[0-9]|[0-9]\d*(?:\.\d*[0-9])?))$/); //  包括0.000000
	var linshi = "";
	var matchArr = expression.match(reg); //取表达式符号
	var splitArr = expression.split(reg); //取表达式内容
	for (var i = 0; i < splitArr.length; i++) {
		if (!splitArr[i]) {
			splitArr[i] = "0.00"
		}
	}
	var html = "";
	for (var i = 0; i < splitArr.length; i++) {
		var str = splitArr[i];
		if (!regSz.test(splitArr[i])) {
			str = "_self.pageData." + splitArr[i];
		}
		if (i == 0) { // 第一位
			if (flag) {
				linshi = "-" + splitArr[i];
			} else {
				linshi = splitArr[i];
			}
		} else { // 大于第一位
			if (matchArr[i - 1] == "+" || matchArr[i - 1] == "+-") {
				if (round) {
					linshi = _self.BigDecimal(linshi).add(_self.BigDecimal(matchArr[i - 1] == "+-" ? "-" + splitArr[i] : splitArr[i]))
						.setScale(float + 10, 4).toString();
				} else {
					linshi = _self.BigDecimal(linshi).add(_self.BigDecimal(matchArr[i - 1] == "+-" ? "-" + splitArr[i] : splitArr[i]))
						.setScale(float + 10).toString();
				}
			} else if (matchArr[i - 1] == "-" || matchArr[i - 1] == "--") {
				if (round) {
					linshi = _self.BigDecimal(linshi).subtract(_self.BigDecimal(matchArr[i - 1] == "--" ? "-" + splitArr[i] :
						splitArr[i])).setScale(float + 10, 4).toString();
				} else {
					linshi = _self.BigDecimal(linshi).subtract(_self.BigDecimal(matchArr[i - 1] == "--" ? "-" + splitArr[i] :
						splitArr[i])).setScale(float + 10).toString();
				}
			} else if (matchArr[i - 1] == "*" || matchArr[i - 1] == "*-") {
				if (round) {
					linshi = _self.BigDecimal(linshi).multiply(_self.BigDecimal(matchArr[i - 1] == "*-" ? "-" + splitArr[i] :
						splitArr[i])).setScale(float + 10, 4).toString();
				} else {
					linshi = _self.BigDecimal(linshi).multiply(_self.BigDecimal(matchArr[i - 1] == "*-" ? "-" + splitArr[i] :
						splitArr[i])).setScale(float + 10).toString();
				}
			} else if (matchArr[i - 1] == "/" || matchArr[i - 1] == "/-") {
				if (round) {
					linshi = _self.BigDecimal(linshi).divide(_self.BigDecimal(matchArr[i - 1] == "/-" ? "-" + splitArr[i] : splitArr[
						i]), float + 10, 4).toString();
				} else {
					linshi = _self.BigDecimal(linshi).divide(_self.BigDecimal(matchArr[i - 1] == "/-" ? "-" + splitArr[i] : splitArr[
						i]), float + 10).toString();
				}
			}
		}
	}
	if (round) {
		linshi = this.BigDecimal(linshi).add(this.BigDecimal("0")).setScale(float, 4).toString();
	} else {
		linshi = this.BigDecimal(linshi).add(this.BigDecimal("0")).setScale(float).toString();
	}
	return linshi;
};
// 比较两数大小
// return  -1 小于   0 等于    1 大于
Vue.prototype.compareTo = function(first, second) {
	first = first + "";
	second = second + "";
	return this.BigDecimal(first).compareTo(this.BigDecimal(second))
};
// 数值取绝对值
Vue.prototype.absolute = function(num) {
	num = num + "";
	return this.BigDecimal(num).abs().toString();
};
/* === */

// 数组转逗号字符串
Vue.prototype.$toComma = function(arr, type, el) {
	let str = '';
	if (type == 'obj') {
		for (var i in arr) {
			if (el == 'id') {
				str += arr[i].id + ",";
			}
		}
	} else {
		for (var i in arr) {
			str += arr[i] + ",";
		}
	}
	return str.slice(0, -1);
}

// 表单提交过滤
Vue.prototype.$filter = function(data) {
	let _this = this;
	for (var i in data) {
		if (i != "editor_content") {
			if (typeof data[i] == "string" && data[i] != "") {
				if (data[i].indexOf("<") != "-1" || data[i].indexOf(">") != "-1" || data[i].indexOf("$") != "-1") {
					// ELEMENT.Message.warning('您输入的信息含有"$ > <"等敏感字符,请重新填写!');
					return;
				}
			}
		}
	}
	return true;
}

// 弹窗
Vue.prototype.$success = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'success'
	})
}
Vue.prototype.$warning = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'warning'
	})
}
Vue.prototype.$error = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'error'
	})
}
Vue.prototype.$info = function(msg) {
	this.$message({
		message: msg,
		duration: 2000,
		type: 'info'
	})
}

//退出系统
Vue.prototype.$logout = function(index) {
	//清空浏览器缓存
	localStorage.clear();
	sessionStorage.clear();
	if (index) {
		router.push("/");
	}
}

// 获取地址栏参数
Vue.prototype.$getParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
};

let loading;
function startLoading() {
	loading = ELEMENT.Loading.service({
		fullscreen: true,
		background: "rgba(0,0,0,.1)"
	});
}
function endLoading() {
	loading = ELEMENT.Loading.service({});
	loading.close();
}
// 合并同一时刻请求
let loadingCount = 0;
export function showLoading() {
	if (loadingCount === 0) {
		startLoading();
	}
	loadingCount++;
}

export function closeLoading() {
	if (loadingCount <= 0) {
		return
	}
	loadingCount--;
	if (loadingCount === 0) {
		endLoading();
	}
}

//路由守卫
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.token) {
			localStorage.setItem("token", localStorage.token);
			next()
		} else if (!localStorage.token) {
			// return;
			next({
				path: '/loginAndReg?lrType=login'
			})
		} else {
			next()
		}
	} else {
		next() // 确保一定要调用 next()
	}
});

// 请求拦截器
axios.interceptors.request.use(function(config) {
	if (!localStorage.token && config.data.workbench) {
		router.push('/loginAndReg?lrType=login')
	}
	if (config.data.noLoading) {} else {
		showLoading();
	}
	if (config.method === 'post') {
		config.data = Qs.stringify(config.data)
	}
	return config;
}, function(error) {
	closeLoading();
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function(response) {
	let _this = this;
	setTimeout(function() {
		closeLoading();
	}, 500);
	// 重置token
	let refreshToken = response.headers.Authorization;
	if (refreshToken) {
		localStorage.setItem("token", refreshToken);
	}
	if (response.data.code == 200) {
		return response;
	} else {
		Vue.prototype.$warning(response.data.msg);
		return false;
	}
}, function(error) {
	closeLoading();
	router.push({
		path: '/500'
	})
	return Promise.reject(error);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
