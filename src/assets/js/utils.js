const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (let i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

export default {
    setCookie (name, value, time) {
    	if (!time) {
    		document.cookie = name + "="+ escape(value) + ";expires=" + 0
    	} else {
    		let exp = new Date()
				exp.setTime(exp.getTime() + this.getSec(time))
				document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString();
    	}
		},
    getCookie (name) {
      let arr,
          reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
      	return unescape(arr[2]);
      } else {
      	return null;
      }
    },
    delCookie (name) {
			let exp = new Date();
			exp.setTime(exp.getTime() - 1);
			let cval = this.getCookie(name);
			if(cval != null) {
				document.cookie= name + "="+cval+";expires="+exp.toGMTString();
			}
		},
		getSec (time) {
			let number = time.substring(0, time.length - 1) * 1,
			    unit = time.substring(time.length - 1);
			if (unit === "s"){
				return number * 1000
			} else if (unit === 'm') {
				return number * 1000 * 60
			} else if (unit === "h") {
				return number * 1000 * 60 * 60
			} else if (unit === "d") {
				return number * 1000 * 60 * 60 * 24
			}
		},
		randomCode (length) {
      length = length || 4;
      var code = '';
      const ALPHABET = 'abcdefghijklmnopqrstuvwxyzQWERTYUIOPASDFGHJKLZXCVBNM1234567890'
      for (let i = 0; i < length; i++) {
        code += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
      }
      return code;
    },
    canvasCode (canvasEle) {
      const canvas = document.getElementById(canvasEle);
      const cxt = canvas.getContext('2d');
      const authCode = this.randomCode();
      const linear = cxt.createLinearGradient(10, 10, 60, 30);  
            linear.addColorStop(0,'purple');  
            linear.addColorStop(.5,'orange');  
            linear.addColorStop(1,'green');
      cxt.clearRect(0, 0, 100, 100);
      cxt.font = "22px Microsoft Yahei";
      cxt.fillStyle = linear;
      cxt.fillText(authCode, 10, 25);
      return authCode;
    },
    formatDate: {
      format (date, pattern) {
          pattern = pattern || DEFAULT_PATTERN;
          return pattern.replace(SIGN_REGEXP, function ($0) {
              switch ($0.charAt(0)) {
                  case 'y': return padding(date.getFullYear(), $0.length);
                  case 'M': return padding(date.getMonth() + 1, $0.length);
                  case 'd': return padding(date.getDate(), $0.length);
                  case 'w': return date.getDay() + 1;
                  case 'h': return padding(date.getHours(), $0.length);
                  case 'm': return padding(date.getMinutes(), $0.length);
                  case 's': return padding(date.getSeconds(), $0.length);
              }
          });
      },
      parse (dateString, pattern) {
          var matchs1 = pattern.match(SIGN_REGEXP);
          var matchs2 = dateString.match(/(\d)+/g);
          if (matchs1.length == matchs2.length) {
              var _date = new Date(1970, 0, 1);
              for (var i = 0; i < matchs1.length; i++) {
                  var _int = parseInt(matchs2[i]);
                  var sign = matchs1[i];
                  switch (sign.charAt(0)) {
                      case 'y': _date.setFullYear(_int); break;
                      case 'M': _date.setMonth(_int - 1); break;
                      case 'd': _date.setDate(_int); break;
                      case 'h': _date.setHours(_int); break;
                      case 'm': _date.setMinutes(_int); break;
                      case 's': _date.setSeconds(_int); break;
                  }
              }
              return _date;
          }
          return null;
      }
    }
}
