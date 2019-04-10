# 온라인 코드 리뷰과정

- 출처 : https://github.com/code-squad/codesquad-docs/blob/master/codereview/README.md

1. 원격저장소 브랜치에 자신에게 해당되는 브랜치생성을 마스터에게 요청한다.
2. 프로젝트를 자신의 계정으로 fork한다.
3. fork한 프로젝트를 자신의 컴퓨터로 clone한다.  
- git clone -b {원격저장소와 동기화할 브랜치이름} --single-branch http://github.com/{본인아이디}/{저장소 아이디}
4. 기능 구현을 위핸 브랜치 생성
- git checkout -b 브랜치이름
5. 기능 구현 후 add, commit
- git add 파일명 (or *)
- git commit -m "메시지"
6. 본인의 원격저장소로 push
- git push origin 브랜치이름
7. github에서 PR(pull request)를 보낸다.
- pull request는 original 저장소의 브랜치(자신의 github 아이디)와 앞 단계에서 생성한 브랜치 이름을 기준으로 한다. pull request를 통해 피드백을 받으면 코드를 수정한 후 같은 브랜치에 add, commit, push 작업을 반복한다.
- ex) code-squad/java-racingcar javajigi 브랜치 기준 => javajigi/java-racingcar step1
8. 리뷰어가 피드백을 마무리하고 원격저장소로 merge한다.
9. merge를 완료했다는 통보를 받으면 작업브랜치를 삭제한다.(option 안해도됨)
- git branch -D 삭제할 브랜치이름
10. merge한 원격저장소와 동기화하기 위해 원격저장소 추가(최초 한번만)
- git remote add {저장소별칭} base_저장소_url
11. 원격저장소에서 자기 브랜치 가져오기(갱신하기)
- git fetch upstream {동기화할 브랜치이름}
12. 원격저장소 브랜치와 동기화하기
- git rebase upstream/본인 아이디
13. 4단계부터 다시 진행


# clone과 remote 차이
- clone은 원격저장소에서 로컬로 파일을 전부 복제해오는 것.
- remote는 로컬저장소에서 어딘가의 원격저장소로 연결해주는 명령어.

## PR보낼때 충돌이 일어난 경우
- 원격저장소에서 pull을 받아 충돌을 일으킨 후 충돌을 해결해서 다시 push하자.
- push를 하기전에 pull을 먼저하면 이런일이 발생하지 않을 것이다.