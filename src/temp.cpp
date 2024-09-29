// Online C++ compiler to run C++ program online
#include <bits/stdc++.h>
using namespace std;


int chk(vector<int>&v, int mid, int n){
    int cnt = 0;
    int beg = v[0];
    for(int i=1; i<n; i++){
       if(v[i]-beg>=mid){ cnt++; beg=v[i];}
    }
    return cnt;
}


void solve(){
    int n,c; cin>>n>>c;
    vector<int>v(n);
    for(int i=0; i<n; i++){ cin>>v[i];}
    
    sort(v.begin(), v.end());
    
    int l = 1;
    int h = v.back()-v.front();
   
    int ans = 0;
    while(l<h){
        int m = l + (h-l)/2;
        int cnt = chk(v,m,n);
        if(cnt<c){
            ans=m;
            h=m;
        }else if(cnt>c){
           l=m;
        }
        else{
            ans=m;
            l=m+1;
        }
    }
    cout<<ans<<endl;
}


int main() {
    // Write C++ code here
    int t; cin>>t;
    while(t--){
        solve();
    }

    return 0;
}