# mocha 공부
- 참고: http://jeonghwan-kim.github.io/mocha/

# install
- $ npm install mocha --save-dev

- 테스트 코드는 .spec.js 파일로 작성하고 이 파일들에 대해 감시 옵션(-w)을 추가해서 실행한다.
```json
"scripts": {
    "test": "node_modules/.bin/mocha $(find ./ -name '*.js') --recursive -w"
}
```

# 테스트 코드
- describe()으로 테스트 suite을 만들고 그 안에 it()으로 테스트 코드를 작성한다.
- describe()은 중첩해서 사용할 수 있다.
```js
describe('Test suite', function () {
  it('should be ok', function () {
    assert.equal(true, false);
  });
});
```
테스트는 물론 실패한다.
```terminal
Test suite
  1) should be ok

0 passing (1ms)
1 failing

1) Test suite should be ok:

    AssertionError: true == false
    + expected - actual

    -true
    +false
```

# 후커
- 테스트 코드 전/후에 후커를 실행할 수 있다. before()/after()는 테스트 suite 시작 전/후 한 번씩 실행된다.
- beforeEach()/afterEach()는 테스트 suite 안에 정의한 모든 테스트 코드 실행 전/후마다 실행된다. -> 테스트에 필요한 자료를 DB에 입력하거나 삭제하는 등 테스트 코드 실행 전/후에 실행할 로직 작성시 사용한다.
```js
describe('Test suite', function () {
  var arr;

  before('Create the array', function () {
    arr = [0, 1, 2];
  });

  after('Destory the array', function () {
    arr = undefined;
  });

  it('should be ok', function () {
    assert.equal(arr[0], 0);
  });
});
```

- before()는 각 테스트 suite와 it마다 "한번씩" 호출된다.
- beforeEach()는 it마다 "매번" 실행된다.
```js
describe('suite1', () => {
  before('before1', () => console.log('before1')); // 1
  beforeEach('beforeEach1', () => console.log('beforeEach1')); // 3, 5

  describe('suite2', () => {
    before('before2', () => console.log('before2')); // 2
    beforeEach('beforeEach2', () => console.log('beforeEach2')); // 4, 6

    it('test1', () => console.log('test1'))
    it('test2', () => console.log('test2'));
  });
});
```
result
```terminal
suite1
  before1
  suite2
    before2
    beforeEach1
    beforeEach2
    test1
      ✓ test1
    beforeEach1
    beforeEach2
    test2
      ✓ test2
```

# Exclusive
- 테스트 코드를 작성한 만큼 실행시간이 길어진다.
- 모든 테스트유닛들 중 특정 테스트유닛 하나만 실행하고 싶다면 only() 메서드를 사용한다.
- 특정 테스트유닛 하나를 실행하고 싶지 않다면 skip() 메서드를 사용한다.
```js
describe('...', function () {

  // 오직 이 테스트만 수행됨
  describe.only('Only this test suite will be run', function () {
    it('...', function () {
    });

  });

  describe('...', function () {  
    it('...', function () {
    });

    it('...', function () {
    });
  });
});
```

# 비동기
- 비동기 코드를 테스트하기 위해 done()함수를 파라메터로 넘겨 사용한다.
- 아래 코드는 assert한 뒤 파라메터로 넘어온 done() 콜백함수를 실행하면 테스트가 종료된다.
```js
describe('Test suite', function () {
  it('should be ok', function (done) {
    setTimeout(function () {
      assert.equal(0, 0);

      done(); // 비동기 테스트 종료
    }, 1000);
  });
});
```

- mocha는 기본적으로 2초 내로 테스트를 완료하도록한다.
- 이를 초과하면 아래와 같은 에러 메시지를 출력한다.
Error: timeout of 2000ms exceeded. Ensure the done() callback is being called in this test.  

- timeout() 메소드로 수행시간을 설정할 수 있다.
```js
describe('Test suite', function () {

  // 이 테스트 suite을 5초 내로 수행함
  this.timeout(5000);

  it('should be ok', function (done) {
    setTimeout(function () {
      // 3초후 비동기 코드가 실행됨
      assert.equal(0, 0);
      done();
    }, 3000);
  });
});
```
