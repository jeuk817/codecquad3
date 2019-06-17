(1) 아래와 같은 상황에서 f1 branch를 master에 merge하기 위한 명령어들을 기술하세요. 
1. git rebase master
2. git checkout master
3. git merge f1

 
(2) Git에서 다음 파일은 어떤 상태를 의미하는지 stage, HEAD, 디렉토리의 관점에서 설명하 세요. 
- Unmodified (Clean) : commit되어 head에 올라와있고 stage는 비어있다.
- Untracked 
- New 
- Modified : 디렉토리에 있는 내용이 변경되었다. stage에 아직 안올라와 있다.
- Staged : 변경된 내용을 add하여 stage에 올라와 있는 상태이다. 

 
(3) Git의 Object 종류에 대해 나열하고 설명하시오. 이 중 가장 중요한 객체는 무엇인가? 이 유는?  
blob, tree, commit, tag


(4) 고양이는 같은 내용의 4KB짜리 파일을 10개 만들어서 여러 디렉토리에 복사한후 Add – commit 하였다. 이 때 Git 저장소에는 blob 오브젝트가 몇 개 생기는가? 

(5)  문어는 같은 내용의 4KB 파일을 서로 다른 브랜치 10개에 중복 저장하였다. 이 때 Git 저장소에는 blob 오브젝트가 몇 개 생기는가? 
 
(6) 브랜치를 새로 만들면 전체 Git 저장소의 용량은 얼마 증가할까? 

(7) Rebase와 merge의 차이에 대해 기술하시오 
merge는 새로운 커밋하나를 생성하고 그곳에 두 브랜치가 병합되고, 합쳐진 브랜치는 그대로 남겨둔다.  
rebase는 브랜치의 커밋을 잘라서 합칠 브랜치 위에 새롭게 커밋된것 처럼 붙여진다.  


(8) Rebase와 merge 중 충돌 처리가 쉬운 쪽은 어느 쪽인가? 이유는? 
merge는 충돌을 한번만 해결  
rebase는 충돌을 여러번 해결  


(9) Git stash 명령에 대해 설명하시오 

(10)  Hard reset, soft reset, mixed reset 의 차이점에 대해 설명하시오. 
hard는 해당 커밋 이후의 내역을 삭제한다.  
soft는 해당 커밋으로 되돌아 갔지만, 이후의 내용이 지워지지 않고, 해당 내용의 인덱스도 그대로 있다. 바로 커밋할 수 있는 상태로 남아있다.  
mixed는 해당 커밋으로 돌아가고 이후 내용이 남아있지만 index는 초기화  
