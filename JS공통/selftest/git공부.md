## git 명령어
- git log -p : 커밋간의 변경사항을 표시해준다.  
- git log 커밋아이디 : 해당 커밋포함 이전의 커밋로그만 표시해준다.  
- git diff : 자신이 어떠한 작업을 했는지 표시해 준다.(git add하기 전과 add한 후의 파일 내용을 비교)  
- git diff 커밋아이디..커밋아이디 : 두 커밋사이의 소스상의 차이점을 보여준다.  



### reset vs revert
- git reset 커밋아이디 --hard : 해당 커밋상태로 돌아간다. (해당커밋 이후의 커밋은 사라진다.)  
    - hard : 해당 커밋 이후의 모든 내용을 지운다.  
    - soft : 해당 커밋으로 되돌아 갔지만, 이후의 내용이 지워지지 않고, 해당 내용의 인덱스도 그대로 있다. 바로 커밋할 수 있는 상태로 남아있다.  
    - mixed : 이력이 되돌려지고, 변경된 내용이 남아있지만 인덱스는 초기화됨.  
- git revert 커밋아이디 : 해당커밋을 취소하고 이력은 남긴다.  
- 이미 push한 상태라면 reset을 하더라도 자신의 로컬 git만 과거로 돌아가고 원격 레파지토리에 2개뒤라고 표시되고 돌릴수 없다.  
- 이미 push한 상태라면 revert할 수 밖에 없다.  이때 conflict가 날 수 있는데, conflict는 결자해지 해야한다.  

### add commit
- git commit -a : add와 커밋을 동시에 한다.  
- git commit -am "message" : add와 commit과 message를 동시에 한다.  
