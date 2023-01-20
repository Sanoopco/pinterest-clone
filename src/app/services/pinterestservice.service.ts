import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from "rxjs";
import { Comment } from "../interface/comment";
import { Post } from '../interface/post';
import { Savedpost } from '../interface/savedpost';
@Injectable({
  providedIn: 'root'
})
export class PinterestserviceService {

  constructor(private http:HttpClient) { }
  userRegistration(data:any) {
    return fetch("http://127.0.0.1:8000/register/",{
      "method":"POST",
      "body":JSON.stringify(data),
      "headers":{
        "Content-type":"application/json;charset=UTF-8"
      }
    })
  }
  private _tokenRefresh = new Subject<void>();
  get tokenRefresh(){
    return this._tokenRefresh;
  }
  getToken(data:any):Observable<object>{
    return this.http.post("http://127.0.0.1:8000/token/",JSON.stringify(data),{
      "headers":{
        "Content-type":"application/json;charset=UTF-8"
      }
    }).pipe(
      tap(
        ()=>this.tokenRefresh.next()
      )
    )
  }
  getAuthToken(){
    return localStorage.getItem("token")
  }
  private _postRefreshRequired = new Subject<void>();
  get postRefreshRequired(){
    return this._postRefreshRequired;
  }
  getAllPins() {
    let tkn = this.getAuthToken();
    if (tkn){
      return fetch("http://127.0.0.1:8000/posts/",{
      'headers':{
        "Authorization":tkn
      }
    })
    }else{
      return fetch("http://127.0.0.1:8000/posts/")
    }
    
  }
  getPinById(id:any) {
    let tkn = this.getAuthToken()
    if (tkn) {
      return fetch(`http://127.0.0.1:8000/posts/${id}/`,{
        "method":"GET",
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      })
    }
    else{
      return fetch(`http://127.0.0.1:8000/posts/${id}/`,{
        "method":"GET",
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
        }
      })
    }
   
  }
  addPost(formData:FormData):Observable<HttpEvent<Post>> {
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.post<Post>("http://127.0.0.1:8000/posts/",formData,{
      headers: {
        "Authorization":tkn
      },
      observe:'events',reportProgress:true
    });
    }
    return this.http.post<Post>("http://127.0.0.1:8000/posts/",formData,{
      headers: {
        "Content-type":"application/json;charset=UTF-8",
        "Authorization":""
      },
      observe:'events',reportProgress:true
    });  
  }

  deleteMyPost(id:any):Observable<object>{
    let tkn=this.getAuthToken();
    if (tkn){
      return this.http.delete<object>(`http://127.0.0.1:8000/posts/${id}/`,{
        'headers':{
          "Authorization":tkn
        }
        
      }).pipe(
        tap(
          ()=>this.postRefreshRequired.next()
        )
      )
    }
    else{
      return this.http.delete<object>(`http://127.0.0.1:8000/posts/${id}/`,{
        'headers':{
          "Authorization":''
        }
        
      })
    }
  }
  private _refreshRequired = new Subject<void>();

  get refreshrequired(){
    return this._refreshRequired;
  }
  addComment(data:any,id:any):Observable<Comment>{    
    let tkn = this.getAuthToken()
    if(tkn){
      return this.http.post<Comment>(`http://127.0.0.1:8000/posts/${id}/add-comment/`,data,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      )
    }
    else{
      return this.http.post<Comment>(`http://127.0.0.1:8000/posts/${id}/add-comment/`,data)
    }
}
  
getComments(id:any):Observable<Comment[]>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get<Comment[]>(`http://127.0.0.1:8000/posts/${id}/comments/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      });
    }
    else{
      return this.http.get<Comment[]>(`http://127.0.0.1:8000/posts/${id}/comments/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
        }
      }); 
    }
  }

  getMyPosts(){
    let tkn = this.getAuthToken();
    if (tkn){
      return this.http.get("http://127.0.0.1:8000/myposts/",{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      })
    }
    else{
      return this.http.get("http://127.0.0.1:8000/myposts/")
    }

  }

  getSavedPosts():Observable<object[]> {
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get<object[]>("http://127.0.0.1:8000/savedposts/",{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      })
    }
    else{
      return this.http.get<object[]>("http://127.0.0.1:8000/savedposts/")
    }
    
  }

  savePost(id:any) {
    
    let tkn = this.getAuthToken()
    if (tkn){
      return fetch(`http://127.0.0.1:8000/posts/${id}/save/`,{
      "method":'POST',
      "headers":{
        "Content-type":"application/json;charset=UTF-8",
        "Authorization":tkn
      }
    })
    }
    else{
      return new Promise((res,rej)=>rej("you need to login"))
    }

    
  }
  
  removeSavedPost(id:any):Observable<object> {
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.delete<object>(`http://127.0.0.1:8000/savedposts/${id}/remove/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next()
          }
        )
      )
    }
    return this.http.delete(`localhost:8000/savedposts/${id}/remove/`)
  }

  replyComment(data:any,id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.post(`http://127.0.0.1:8000/comments/${id}/add-reply/`,data,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next()
          }
        )
      )
    }
    else{
      return this.http.post(`http://127.0.0.1:8000/comments/${id}/add-reply/`,data)
    }
  }
  getAllReplyOfComment(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get(`http://127.0.0.1:8000/comments/${id}/all-reply/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      })
    }
    return this.http.get(`http://127.0.0.1:8000/comments/${id}/all-reply/`)
  }
  removeComment(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if(tkn) {
      return this.http.delete(`http://127.0.0.1:8000/comments/${id}/remove/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      ) 
    }
    return this.http.delete(`http://127.0.0.1:8000/comments/${id}/remove/`)
  }

  
  removeReply(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if(tkn) {
      return this.http.delete(`http://127.0.0.1:8000/reply/${id}/remove-reply/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      ) 
    }
    return this.http.delete(`http://127.0.0.1:8000/reply/${id}/remove-reply/`)
  }


  addLikeToComment(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn) {
       return this.http.post(`http://127.0.0.1:8000/comments/${id}/add-like/`,"",{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      ) 
    }
    else{
      return this.http.post(`http://127.0.0.1:8000/comments/${id}/add-like/`,"")
    }
  }


  removeLikeFromComment(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn) {
       return this.http.delete(`http://127.0.0.1:8000/comments/${id}/remove-like/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      ) 
    }
    else{
      return this.http.delete(`http://127.0.0.1:8000/comments/${id}/remove-like/`,)
    }
  }

  addLikeToReply(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn) {
       return this.http.post(`http://127.0.0.1:8000/reply/${id}/add-like/`,"",{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      )  
    }
    else{
      return this.http.post(`http://127.0.0.1:8000/reply/${id}/add-like/`,"")
    } 
  }

  removeLikeFromReply(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn) {
       return this.http.delete(`http://127.0.0.1:8000/reply/${id}/remove-like/`,{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>{
            this.refreshrequired.next();
          }
        )
      ) 
    }
    else{
      return this.http.delete(`http://127.0.0.1:8000/reply/${id}/remove-like/`,)
    }
  }

  getCurrentUser():Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get<object>("http://127.0.0.1:8000/currentuser/",{
        "headers":{
          "Content-type":"application/json;charset=UTF-8",
          "Authorization":tkn
        }
      })
    }
    else{
      return this.http.get("http://127.0.0.1:8000/currentuser/")
    }
  }
  private _profileRefresh = new Subject<void>();

  get profileRefresh(){
    return this._profileRefresh;
  }

  getProfilePic(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get<object>(`http://127.0.0.1:8000/profilepic/${id}/`,{
      "headers":{
        "Authorization":tkn
      }
    })
    }
    else{
      return this.http.get<object>(`http://127.0.0.1:8000/profilepic/${id}/`)
    }
  }

  addProfilePic(formData:FormData):Observable<HttpEvent<object>>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.post<object>('http://127.0.0.1:8000/profilepic/',formData,{
      headers: {
        "Authorization":tkn
      },
      observe:'events',reportProgress:true
    })
    .pipe(
      tap(
        ()=>{
          this.profileRefresh.next()
        }
      )
    )
    }
    else{
      return this.http.post<object>('http://127.0.0.1:8000/profilepic/',formData,{
      headers: {
        "Authorization":""
      },
      observe:'events',reportProgress:true
    })
    }
    
  }
  updateProfilePic(id:any,formData:FormData):Observable<HttpEvent<object>>{
    let tkn = this.getAuthToken();
    if (tkn){
      return this.http.put<object>(`http://127.0.0.1:8000/profilepic/${id}/`,formData,{
        headers: {
          "Authorization":tkn
        },
        observe:'events',reportProgress:true
      }).pipe(
        tap(
          ()=>this.profileRefresh.next()
        )
      )
    }
    else{
      return this.http.put<object>(`http://127.0.0.1:8000/profilepic/${id}`,formData,{
        headers: {
          "Authorization":'tkn'
        },
        observe:'events',reportProgress:true
      })
    }
  }
  removeProfilePic(id:any):Observable<object>{
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.delete<object>(`http://127.0.0.1:8000/profilepic/${id}/`,{
        headers: {
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>this.profileRefresh.next()
        )
      )
    }
    else{
      return this.http.delete<object>(`http://127.0.0.1:8000/profilepic/${id}/`,{
        headers: {
          "Authorization":''
        }
      })
    }
  }
  getUserById(id:any){
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.get(`http://127.0.0.1:8000/user/${id}/`,{
        "headers":{
          "Authorization":tkn
        }
      })
    }
    else{
      return this.http.get(`http://127.0.0.1:8000/user/${id}/`,{
        "headers":{
          "Authorization":'tkn'
        }
      })
    } 
  }
  private _followRefresh = new Subject<void>();

  get followRefresh(){
    return this._followRefresh;
  }
  follow(id:any){
    let tkn = this.getAuthToken()
    if (tkn){
      return this.http.post(`http://127.0.0.1:8000/user/${id}/follow/`,'',{
        "headers":{
          "Authorization":tkn
        }
      }).pipe(
        tap(
          ()=>this.followRefresh.next()
        )
      )
    }
    else{
      return this.http.post(`http://127.0.0.1:8000/user/${id}/follow/`,'',{
        "headers":{
          "Authorization":""
        }
      })
    }
  }

  getMyFollowers():Observable<object[]>{
    let tkn = this.getAuthToken()
    if (tkn){
       return this.http.get<object[]>('http://127.0.0.1:8000/my_followers/',{
      "headers":{
        "Authorization":tkn
      }
    })
    }
    else{
      return this.http.get<object[]>('http://127.0.0.1:8000/my_followers/',{
        "headers":{
          "Authorization":""
        }
    })}
  }

  getFollowersById(id:any):Observable<object[]>{
    let tkn = this.getAuthToken()
    if (tkn){
       return this.http.get<object[]>(`http://127.0.0.1:8000/user/${id}/followers/`,{
      "headers":{
        "Authorization":tkn
      }
    })
    }
    else{
      return this.http.get<object[]>(`http://127.0.0.1:8000/user/${id}/followers/`,{
        "headers":{
          "Authorization":""
        }
    })}
  }
}
