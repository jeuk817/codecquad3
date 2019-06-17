# this를 정리해보자.
참조: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this  

JavaScript에서 함수의 this 키워드는 다른 언어와 조금 다르게 동작하며, 엄격모드와 비엄격모드에서도 일부 차이가 있다.  

대부분의 경우 this의 값은 함수를 호출한 방법이 결정합니다. 실행하는 중 할당으로 설정할 수 없고 함수를 호출할 때 마다 다를 수 있다.  

## 전역 문맥
아무 함수에도 속하지 않은 범위에서 this는 엄격 모드 여부에 관계없이 전역 객체를 참조한다.  
```javascript
// 웹 브라우저에서는 window 객체가 전역 객체
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = 'MDN';
console.log(window.b) // "MDN"
console.log(b); // "MDN"
```

## 함수 문맥
함수 내부에서 this의 값은 함수를 호출한 방법에 의해 좌우된다.

### 단순 호출
엄격모드가 아닐 때, 기본값으로 전역 객체를 참조합니다.  
```javascript
function f1(){
    return this;
}

// 브라우저
f1() === window; // true

// Node.js
f1() === global; // true
```

그러나 엄격모드에서는 this값이 실행 문맥에 진입하여 설정되는 값을 유지한다.
```javascript
function f2(){
    "use strict";
    return this;
}

f2() === undefined; // true
```
즉 엄격모드에서, 실행 문맥이 this의 값을 설정하지 않으면 undefined로 남아있게 된다.

this의 값을 한 문맥에서 다른 문맥으로 넘기려면 call()이나 apply()를 사용하면 된다.  
call()과 apply()에서, this로 제공한 값이 객체가 아니라면 내부 ToObject 연산을 사용해 객체로 변환하려 시도한다.  
따라서 주어진 값이 7이나 "foo"처럼 원시 값이라면, 관련 생성자를 사용해 객체로 변환한다.  
그래서 원시 7은 new Number(7), 문자열 "foo"는 new String("foo")를 사용한 것과 같아진다.  
```javascript
function bar(){
    console.log(Object.prototype.toString.call(this));
}

bar.call(7);        // [object Number]
bar.call('foo');    // [object String]
```

### binc 메서드
ECMAScript 5는 Function.prototype.bind를 도입했다.  
f.bind(someObject)를 호출하면 f와 같은 본문(코드)과 범위를 가졌지만 this는 원본 함수를 가진 새로운 함수를 생성한다.  
새 함수의 this는 호출 방식과 상관없이 영구적으로 bind()의 첫 번째 매개변수로 고정된다.  
```javascript
function f(){
    return this.a;
}

var g = f.bind({a: 'axerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind는 한 번만 사용가능!
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
```

### 화살표 함수
화살표 함수에서 this는 자신을 감싼 정적 범위이다.  
전역 코드에서는 전역 객체를 가리킨다.  
```javascript
var obj = {
  bar: function() {
    var x = (() => this);
    return x;
  }
};

var fn = obj.bar(); // 여기서 렉시컬 스코프까지 같이 할당된다.

console.log(fn() === obj); // true

var fn2 = obj.bar;
// 여기서는 whindow에서 둘다 실행되므로 bar의 렉시컬 스코프가 없다.
console.log(fn2()() == window); // true
```

### 객체의 메서드로서
함수를 어떤 객체의 메서드로 호출하면 this의 값은 그 객체를 사용한다.
```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};

console.log(o.f()); // 37
```
