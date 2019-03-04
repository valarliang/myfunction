#include <stdio.h>
#include <stdlib.h>

typedef struct Que *Que;
typedef struct QNode *node;
struct QNode {
  int d;
  node next;
};
struct Que {
  node front,rear;
};

void addQ(Que q, int v){
  node p = (node)malloc(sizeof(struct QNode));
  p->d = v; p->next = 0;
  if(!(q->front)) q->front = q->rear = p;
  else {
    q->rear->next = p; q->rear = p;
  }
}

int deleteQ(Que q){
  node tem = q->front;
  int v = tem->d;
  q->front = tem->next;
  if(!(q->front)) q->rear = 0;
  free(tem);
  return v;
}

int BFS(int Graph[],int n,int v){
  int visited[n],cnt=1,level=0,last=v,tail;
  for(int i=0;i<n;i++) visited[i] = 0;
  Que q = (Que)malloc(sizeof(struct Que));
  q->front = q->rear = 0;
  visited[v] = 1; addQ(q,v);
  while(q->front){
    int V = deleteQ(q);
    for(int i=0;i<n;i++){  //用一维数组表示邻接矩阵，扫描邻接点行列都得扫描
      int index = i>V ? i*(i+1)/2+V : V*(V+1)/2+i;
      if(Graph[index] && !visited[i]){
        visited[i] = 1; addQ(q,i);
        cnt++; tail = i;
      }
    }
    if(last == V) level++, last = tail;
    if(level == 6) break;
  }
  free(q);
  return cnt;
}

int main(){
  int n,m,v1,v2;
  scanf("%d %d",&n,&m);
  int num = n*(n+1)/2;
  int Graph[num];
  for(int i=0;i<num;i++) Graph[i] = 0;
  for(int i=0;i<m;i++){
    scanf("%d %d",&v1,&v2); v1--; v2--; //让下标从0开始
    int index = v1<v2 ? v2*(v2+1)/2+v1 : v1*(v1+1)/2+v2;
    Graph[index] = 1;
  }
  for(int i=0;i<n;i++)
    printf("%d: %.2f%%\n",i+1,BFS(Graph,n,i)/(float)n*100);
}