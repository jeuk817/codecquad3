# 타이머
타이머 기능을 제공하는 함수로 노드에서 window대신 global객체 안에 들었다.  

- setTimeout(callback, 밀리초)
- setInterval(callback, 밀리초): 주어진 킬리초마다 콜백 함수를 반복 실행
- setImmediate(callback): 콜백 함수를 즉시 실행 

이 타이머 함수들은 모두 아이디를 반환한다. 아이디를 사용하여 타이머를 취소할 수 있다.  

- clearTimeouf(아이디): setTimeout을 취소한다.
- clearInterval(아이디): setInterval을 취소한다.
- clearImmediate(아이디): setImmediate을 취소한다.

- unref(): 이 타이머가 이벤트루프에서 유일하게 남은 것이라면 콜백함수실행을 보류함.
- ref(): unref()에 의해 보류된 콜백함수를 제개한다.

setTimeout, setImmediate 둘다 이벤트 루프를 거친다. 특수한 경우에 setImmediate가 먼저 실행된다.  

# Process
process객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있는 객체이다.  
일반적으로 운영체제나 실행 환경별로 다른 동작을 하고 싶을 때 사용한다.  

## Process Events
프로세스 객체는 EventEmitter의 인스턴스이다.  


### Class EventEmitter
node는 입출력을 처리할 때 이벤트를 기반으로 하는 비동기 방식으로 처리한다.  
이벤트란 어떤 사건이 발생하는 것을 말한다.  
이러한 각각의 이벤트에는 이벤트리스너라는 것이 등록되어 있다. (ex: 캐릭터 레벨업이라는 이벤트에서 캐릭터의 체력과 공격력을 증가시켜주는 로직이 들어있는 이벤트 리스너가 등록되어있다.)  
Node는 이벤트를 처리하기 위해서 EventEmitter라는 클래스를 제공한다.  
보통은 기본적으로 제공되는 이벤트를 받아서 처리하지만 EventEmitter를 이용하면 직접 이벤트를 만들어 처리 할 수 있다.  
이벤트를 처리하는 방법은 EventEmitter를 상속받은 객체를 만들어 EventEmitter의 메서드를 사용하여 처리하는 방법이다.  

```js
on(event, listener) // 지정한 event에 대한 listener를 추가한다.
once(event, listener) // 지정한 event에 대한 listener를 추가한다. 다만 이 리스너는 최초 한번만 실행 된 후 제거된다.  
removeListener(envet, listener) // 지정한 event에 대한 listener를 제거한다. 
```
<!-- EventEmitter 클래스는 events module에 의해 정의되고 나타내진다.   -->
<!-- EventEmitter 클래스는 Node.js에 내장되어 있는 일종의 옵저버 패턴 구현이다.   -->
process개개체는 Node의 기본 내장객체로서 어디서든 사용가능하며 현재 실행중인 Node프로그램에 대한 정보를 담고 있는 객체이다.  
이벤트를 내보내는 모든 객체는 EventEmitter 클래스의 인스턴스다. 이 객체는 하나 이상의 함수를 이벤트로 사용할 수 있도록 이름을 넣어 추가하는 eventEmitter.on() 함수를 사용할 수 있다.  
이 process객체는 기본적으로 EventEmitter를 상속하고 있으므로 이를 이용해 process에 대한 이벤트를 다룰 수 있다.  

exit이벤트는 현재 실행중인 Node 프로그램이 종료될 때 발생되는 이벤트다.  
```js
process.on('exit', function(){
    console.log('프로세스를 종료합니다.');
});
```
process.emit()은 이벤트를 발생시킨다. 그리고 이벤트가 발생하면서 등록해두었던 이벤트리스너가 실행된다.  
```js
process.on('customEvent', function(){
    console.log('내가 만든 이벤트 발생');
});
process.emit('customEvent');
// 내가 만든 이벤트 발생
```

### Event: 'beforeExit'
beforeExit는 Node.js의 이벤트 루프가 비고, 더이상 실행할 일이 없을 때 나타난다. 

### Event: 'disconnect'
Node.js pocess가 IPC채널과 같이 생성되면, 'disconnect'이벤트는 IPC채널이 닫힐때 나타난다.  

### Event: 'exit'
'exit'는 다음 결과가가 있을때 나타난다.  
    - process.exit() 명시적으로 불릴때,
    - 노드 이벤트 루프가 더이상 일할 거리가 없을때
'exit'리스너는 Node.js프로세스를 끝낼 것이다.  
The listener callback function is invoked with the exit code specified either by the process.exitCode property, or the exitCode argument passed to the process.exit() method.  
```js
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
```
리스너 함수는 반드시 동기조작이어야 한다. Node.js process는 'exit'가 불려지고 곧바로 종료하고 이벤트루프에서 대기중인 추가작업은 포기한다.   
따라서 다음함수에서 setTimeout은 나타나지 않는다.  
```js
process.on('exit', (code) => {
  setTimeout(() => {
    console.log('This will not run');
  }, 0);
});
```

### Event: 'message'
If the Node.js process is spawned with an IPC channel (see the Child Process and Cluster documentation), the 'message' event is emitted whenever a message sent by a parent process using childprocess.send() is received by the child process.  

The message goes through serialization and parsing. The resulting message might not be the same as what is originally sent.  

### Event: 'multipleResolves'

### Event: 'rejectionHandled'
확인되지 않은 JS예외가 이벤트 루프로 되돌아갈 때 이벤트가 방출됨.  
확인되지 않은 예외란 예를 들면 module에서 발생한 에러가 있다.  
```js
// module(say.js)
exports.hello = function(){
    setTimeout(function(){
        throw new Error('오류 핸들링 테스트');
    },1000);

    console.log('hello');
}
```
```js
var say = require('./say.js');

try{
    say.hello();
}
catch(exception){
    console.log(exception);
}
```
위 코드는 콘솔은 출력하지만 오류를 핸들링하지 못하고 Porcess가 죽는다.  
하지만 이때 uncaughtException을 쓴다면,  
```js
process.on('uncaughtException', function(err){
    console.log('uncaughtException 발생: ' err);
});

var say = require('./say.js');

try{
    say.hello();
}
catch(exception){
    console.log(exception);
} 
// hello
// uncaughtException 발생 : Error: 오류 핸들링 테스트
```
이처럼 확인되지 않은 예외들도 잡아서 대응없이 죽는것을 막아준다.  

### Event: 'unhandledRejection'

### Event: 'warning'
'warning'이벤트는 노드가 경고를 방출할때마다 방출한다.  
'경고'는 오류와 유사하지만 Node.js 및 JS 오류처리 흐름의 일부가 아니다.  
Node.js는 애플리케이션 성능, 버그 또는 보안 취약첨을 초래할 수 있는 잘못된 코딩관행을 탐지할 때마다 경고를 보낼 수 있다.  

## Signal Events
시그널 이벤트는 노드process가 신호를 받았을 때 방출한다.  
시그널 핸들러는 'SIGINT','SIGTERM'을 첫번째 인자로 받을 것이다.  

### process.abort()
Node.js 프로세스를 즉시 종료하고 코어 파일을 생성하도록 한다. 이 기능은 작업자 스레드에서는 사용할 수 없다.  

### process.allowedNodeEnvironmentFlags

### process.arch

### process.argv
argv는 argument Vector의 약자이다. 가변적인 갯수의 문자열을 의미한다.  
만약 이렇게 코드를 작성하고 실행하면 다음과 같은 결과를 얻을 수 있다.  
```js
console.log(process.argv.length);

console.log(process.argv);
// PS C:\Users\macho\Documents\codecquad3\JS공통\step8> node .\test.js
// 2
// [ 'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\macho\\Documents\\codecquad3\\JS공통\\step8\\test.js' ]
```
process.argv.length는 2이고, process.argv는 node.exe실행파일 주소와 test.js라는 실행파일 주소가 들어있는 배열이 나온다.  
만약 'node test.js a b c'를 명령하면 length의 값은 5가 출력되고, argv는 위의 답에 a, b, c출력될 것이다.  

### process.argv0
argv[0]의 읽는다. 

### process.channel
Node.js 프로세스가 IPC채널로 생성 된 경우 porcess.channel속성은 IPC채널에 대한 참조다. IPC채널이 존재하지 않으면 이 속성의 값은 undefined다. 

### process.chdir(directory)
Node.js의 워킹디렉토리를 바꾸는 메소드다. 실패하면 예외를 던진다.(예를들어 명시된 디렉토리가 없을 때).
```js
console.log(`Starting directory: ${process.cwd()}`); // 현재 디렉토리
try {
  process.chdir('/tmp'); // 바꿀 디렉토리
  console.log(`New directory: ${process.cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

### process.cwd()
현재 디렉토리를 리턴한다.  


### process.config
현재 Node.js실행파일을 컴파일하는데 사용된 자바스크립트 환경옵션의 묘사를 포함한 객체를 리턴한다.  
결과물 예시 :  
```js
{
  target_defaults:
   { cflags: [],
     default_configuration: 'Release',
     defines: [],
     include_dirs: [],
     libraries: [] },
  variables:
   {
     host_arch: 'x64',
     node_install_npm: 'true',
     node_prefix: '',
     ...
     ...
   }
}
```

### process.connected
만약 Node.js process가 IPC channel과 함께 생성됬다면, IPC channel이 연결되있는동안 true를 리턴할 것이다.  
그리고 process.disconnect()가 불려지면 flase를 리턴한다.  

### process.cpuUsage([previousValue])
이 메소드는 현재 프로세스의 유저와 cpu의 사용시간을 객체에 담아 리턴한다. (millionth of a second).  
이 값은 사용자 및 시스템 코드에서 소요된 시간을 각각측정하며, 그리고 만약 여러 CPU 코어가 이 프로세스에 작업을 수행하면 실제 경과 시간보더 더 큰값이 나올 수 있다.  
그리고 이전의 결과값을 함수의 인자로 넘겨서 그 변화를 읽을 수 있다.  
```js
const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));
// { user: 514883, system: 11226 }
```

### process.debugPort
Node.js의 디버거를 사용하도록 설정하는 포트  
디버그포트란 개발 및 디버깅을 단순화하기 위해 장치에 포함된 포트다.  

### process.disconnect()
만약 Node.js process가 IPC채널과 같이 생성됬다면, 이 메소드는 IPC ㅊ


- process.env
    사용자의 환경변수를 담고있는 객체이다.  
    한 애플리케이션 뿐만 아니라 전체 시스템에서 공통적으로 사용하는 값이 있다면 process.env를 사용하면 된다.(ex: DB주소, 포트번호,아이디,패스워드 등...)  

- process.nextTick(callback)
    이벤트 루프가 다른 콜백함수들 보다 nextTick의 콜백함수를 우선으로 처리하도록 만든다.(setImmediate, setTimeout, promise보다 먼저 실행)  

- process.exit(code)
    실행 중인 노드 프로세스를 종료한다.  v                                               v 
    독립적인 프로그램에서는 수동으로 노드를 멈추게하기위해 사용한다.  

    