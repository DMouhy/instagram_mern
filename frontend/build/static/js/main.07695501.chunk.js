(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{39:function(e,t,a){e.exports=a(61)},44:function(e,t,a){},45:function(e,t,a){},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),c=a(31),r=a.n(c),l=(a(44),a(3)),i=(a(45),a(10)),s=a.n(i),m=a(14),u=a(4),p=(a(47),a(24)),f=a(35),d=a(5),h=(a(48),a(21)),g="https://instagram-mern-clone.herokuapp.com",E=a(73);a(49);var b=function(){return o.a.createElement("div",{className:"insta_loading"},o.a.createElement(h.a,null))};var _=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)([]),i=Object(l.a)(r,2),u=i[0],p=i[1],f=Object(n.useState)({type:"",text:""}),_=Object(l.a)(f,2),j=_[0],O=_[1],v=Object(n.useState)(!1),y=Object(l.a)(v,2),S=y[0],N=y[1];function w(){return k.apply(this,arguments)}function k(){return(k=Object(m.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===a){e.next=4;break}return N(!0),e.next=4,fetch("".concat(g,"/api/search_profile"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({search_string:a})}).then((function(e){return e.json()})).then((function(e){e.Empty_error||e.error||(p(e),O({type:"success",message:""})),e.error&&O({type:"error",text:e.error}),N(!1)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){""===a?(O({type:"",text:""}),u.length=0,N(!1)):w()}),[a,u.length]),"error"===j.type&&(u.length=0),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"search_profile"},o.a.createElement("div",{className:"search_icon",onClick:w},S?o.a.createElement(b,null):o.a.createElement(h.b,null)),o.a.createElement("input",{onChange:function(e){!function(e){c(e.target.value)}(e)},type:"text",placeholder:"Search...",value:a}),o.a.createElement("div",{className:"profile_list ".concat(""===a&&"hide_profile_list")},u.map((function(e){return o.a.createElement(d.b,{onClick:function(){return c("")},to:"/profile/".concat(e.profile._id),key:e.profile._id,className:"card"},o.a.createElement(E.a,{className:"Avatar",src:e.profile.picture}),o.a.createElement("span",null,e.profile.user_profile.username))})),"error"===j.type&&o.a.createElement("div",{className:"message"},j.text))))},j=(a(55),a(15));var O=function(e){var t=e.fetch_my_profile_posts,a=e.fetch_followingPosts,c=Object(n.useState)(!0),r=Object(l.a)(c,2),i=r[0],s=r[1],m=Object(n.useState)(""),u=Object(l.a)(m,2),f=u[0],d=u[1],h=Object(n.useState)(""),E=Object(l.a)(h,2),_=E[0],O=E[1],v=Object(n.useState)(""),y=Object(l.a)(v,2),S=y[0],N=y[1],w=Object(n.useState)(""),k=Object(l.a)(w,2),C=k[0],I=k[1],T=Object(n.useState)(!1),x=Object(l.a)(T,2),P=x[0],F=x[1];return Object(n.useEffect)((function(){C&&fetch("".concat(g,"/api/create_post"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({image:C,caption:S})}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(I(""),N(""),O(""),d(""),F(!1),s(!0),t(),a())}))}),[C]),o.a.createElement(o.a.Fragment,null,o.a.createElement("button",null,o.a.createElement(p.a,{onClick:function(){return s(!1)}})),o.a.createElement("div",{className:"addpost_container ".concat(i&&"hide_CreatePost")},!P&&o.a.createElement("button",{onClick:function(){d(""),O(""),N(""),s(!0)}},o.a.createElement(j.a,null)),o.a.createElement("div",{className:"add_post"},o.a.createElement("input",{onChange:function(e){O(e.target.files[0]);var t=new FileReader;t.readAsDataURL(e.target.files[0]),t.onloadend=function(){d(t.result)}},type:"file",accept:"image/*",name:"image",id:"import_postImage"}),o.a.createElement("div",{className:"title"},"Add new Post"),""!==f?o.a.createElement(o.a.Fragment,null,P?o.a.createElement(o.a.Fragment,null,o.a.createElement(b,null),o.a.createElement("div",{className:"wait"},"Loading your image...")):o.a.createElement(o.a.Fragment,null,o.a.createElement("img",{src:f,alt:"#"}),o.a.createElement("input",{onChange:function(e){return N(e.target.value)},className:"add_caption",type:"text",value:S,placeholder:"Caption..."}),o.a.createElement("button",{onClick:function(){if(_){F(!0);var e=new FormData;e.append("file",_),e.append("upload_preset","instagram_mern_media"),e.append("cloud_name","dchnmxssq"),fetch("https://api.cloudinary.com/v1_1/dchnmxssq/image/upload",{method:"POST",body:e}).then((function(e){return e.json()})).then((function(e){return I(e.url)})).catch((function(e){return console.log(e)}))}}},"Create"))):o.a.createElement("label",{htmlFor:"import_postImage"},"Import image"))))};var v=function(e){var t=e.fetch_my_profile_posts,a=e.fetch_followingPosts;return o.a.createElement("div",{className:"header"},o.a.createElement("div",{className:"header_flex"},o.a.createElement("div",{className:"header_insta_logo"},o.a.createElement(d.b,{to:"/"},"Instagram")),o.a.createElement(_,null),o.a.createElement("div",{className:"buttons"},o.a.createElement(O,{fetch_my_profile_posts:t,fetch_followingPosts:a}),o.a.createElement(d.b,{to:"/profile"},o.a.createElement(f.a,null)),o.a.createElement("button",{onClick:function(){localStorage.removeItem("token"),window.location.reload(!1)}},o.a.createElement(p.b,null)))))},y=(a(56),a(57),a(25));var S=function(e){var t=e.myprofileId,a=e.post,c=Object(n.useState)([]),r=Object(l.a)(c,2),i=r[0],s=r[1],m=Object(n.useState)(!0),u=Object(l.a)(m,2),p=u[0],f=u[1],h=Object(n.useState)(""),_=Object(l.a)(h,2),j=_[0],O=_[1],v=Object(n.useState)([]),S=Object(l.a)(v,2),N=S[0],w=S[1],k=Object(n.useState)(!1),C=Object(l.a)(k,2),I=C[0],T=C[1];function x(){fetch("".concat(g,"/api/get_likes"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postId:a._id})}).then((function(e){return e.json()})).then((function(e){return w(e.likes)}))}function P(){fetch("".concat(g,"/api/all_post_comments"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postId:a._id})}).then((function(e){return e.json()})).then((function(e){s(e.comments),f(!1)}))}return Object(n.useEffect)((function(){return function e(){P(),x(),setTimeout((function(){return e()}),5e3)}()}),[]),Object(n.useEffect)((function(){f(!0),P(),x()}),[a._id]),Object(n.useEffect)((function(){N&&T(N.includes(t))}),[N]),o.a.createElement("div",{className:"post"},o.a.createElement("div",{className:"post_username"},o.a.createElement(E.a,{className:"avatar",src:a.posted_by.picture}),o.a.createElement(d.b,{to:"/profile/".concat(a.posted_by._id)},o.a.createElement("p",null,a.username))),o.a.createElement("div",{className:"post_post_img"},o.a.createElement("img",{src:a.image,alt:"#"})),o.a.createElement("div",{className:"post_likes"},o.a.createElement(y.a,{onClick:function(){T(!I);var e=localStorage.getItem("token")||"";fetch("".concat(g,"/api/like_unlike"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(e)},body:JSON.stringify({postId:a._id})}).then((function(e){return e.json()})).then((function(e){e.error&&(localStorage.removeItem("token"),window.location.reload(!1)),x()}))},className:"hearth ".concat(I?"liked":"notliked")}),o.a.createElement("p",null,o.a.createElement("span",null,N.length)," likes")),o.a.createElement("div",{className:"post_caption"},o.a.createElement(E.a,{className:"avatar",src:a.posted_by.picture}),o.a.createElement("div",{className:"caption_data"},o.a.createElement("p",null,a.username),o.a.createElement("p",null,a.caption))),p?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,0!==i.length&&o.a.createElement("div",{className:"post_comments"},i.map((function(e){return o.a.createElement("div",{key:e._id,className:"comment_card"},o.a.createElement(E.a,{className:"avatar",src:e.commentData.posted_by.picture}),o.a.createElement("div",{className:"caption_data"},o.a.createElement(d.b,{to:"/profile/".concat(e.commentData.posted_by._id)},o.a.createElement("p",null,e.posted_by_username)),o.a.createElement("p",null,e.commentData.comment)))})))),o.a.createElement("form",{onSubmit:function(e){return function(e){if(e.preventDefault(),j){var t=localStorage.getItem("token")||"";fetch("".concat(g,"/api/add_comment"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(t)},body:JSON.stringify({postId:a._id,comment:j})}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(O(""),P())}))}}(e)},className:"post_add_comment"},o.a.createElement("input",{onChange:function(e){return O(e.target.value)},type:"text",value:j,placeholder:"add comment..."})))};var N=function(e){var t=e.myprofileId,a=e.loading_post,c=e.posts,r=e.have_following,i=Object(n.useState)(""),s=Object(l.a)(i,2),m=s[0],u=s[1],p=Object(n.useState)(!0),f=Object(l.a)(p,2),h=f[0],_=f[1],j=Object(n.useState)({bool:!1,message:""}),O=Object(l.a)(j,2),v=O[0],y=O[1];return Object(n.useEffect)((function(){y({bool:!1,message:""}),_(!0),fetch("".concat(g,"/api/all_profiles"),{method:"GET"}).then((function(e){return e.json()})).then((function(e){e.error&&(y({bool:!0,message:e.error}),_(!1)),u(e),_(!1)})).catch((function(e){return console.log(e)}))}),[]),a?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"users_list"},h?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,v.bool?o.a.createElement("div",{className:"no_following"},v.message):o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{className:"users_count"},m.length," users"),m.map((function(e){return o.a.createElement(d.b,{to:"/profile/".concat(e._id),key:e._id},o.a.createElement("div",{key:e._id,className:"userCard"},o.a.createElement(E.a,{src:e.picture}),o.a.createElement("p",null,e.user_profile.username)))}))))),r.bool?o.a.createElement("div",{className:"no_following"},r.message):o.a.createElement("div",{className:"posts"},c.map((function(e){return o.a.createElement(S,{myprofileId:t,key:e._id,post:e})}))))},w=(a(58),a(36)),k=a(37);a(59);var C=function(e){var t=e.is_mine,a=e.postId,c=e.set_postId,r=e.fetchProfiles,i=e.myId,s=Object(n.useState)(""),m=Object(l.a)(s,2),u=m[0],p=m[1],f=Object(n.useState)(""),h=Object(l.a)(f,2),_=h[0],O=h[1],v=Object(n.useState)(!0),S=Object(l.a)(v,2),N=S[0],w=S[1],k=Object(n.useState)(""),C=Object(l.a)(k,2),I=C[0],T=C[1],x=Object(n.useState)([]),P=Object(l.a)(x,2),F=P[0],A=P[1],J=Object(n.useState)([]),D=Object(l.a)(J,2),B=D[0],z=D[1],R=Object(n.useState)(!0),U=Object(l.a)(R,2),G=U[0],Y=U[1],q=Object(n.useState)(!1),L=Object(l.a)(q,2),M=L[0],W=L[1],$=Object(n.useState)(!0),H=Object(l.a)($,2),K=H[0],Q=H[1],V=Object(n.useState)(!1),X=Object(l.a)(V,2),Z=X[0],ee=X[1];function te(){fetch("".concat(g,"/api/all_post_comments"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postId:a})}).then((function(e){return e.json()})).then((function(e){A(e.comments),Y(!1)}))}function ae(){fetch("".concat(g,"/api/get_likes"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({postId:a})}).then((function(e){return e.json()})).then((function(e){return z(e.likes)}))}return Object(n.useEffect)((function(){return function e(){te(),ae(),setTimeout((function(){return e()}),5e3)}()}),[]),Object(n.useEffect)((function(){Y(!0),te(),a&&(w(!0),fetch("".concat(g,"/api/post_detail"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({postId:a})}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(p(e.post),O(e.user),w(!1))})),ae())}),[a]),Object(n.useEffect)((function(){B&&W(B.includes(i))}),[B]),o.a.createElement("div",{className:"postDetail_container"},o.a.createElement("div",{className:"cancel_btn",onClick:function(){return c("")}},o.a.createElement(j.a,null)),o.a.createElement("div",{className:"postDetail"},N?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"post_image"},o.a.createElement("img",{src:u.image,alt:"#"})),o.a.createElement("div",{className:"data"},o.a.createElement("div",{className:"header"},o.a.createElement("div",{className:"username"},o.a.createElement(E.a,{className:"avatar",src:_.picture})," ",o.a.createElement("span",null,_.username.username)),o.a.createElement("div",{className:"delete_post ".concat(!t&&"hide_trash")},o.a.createElement(j.b,{onClick:function(){return Q(!1)},className:"trash"})),o.a.createElement("div",{className:"delete_validate_container ".concat(K&&"hide_del_val")},o.a.createElement("div",{className:"btns"},Z?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"Sure you want to delete?"),o.a.createElement("button",{onClick:function(){ee(!0);var e=localStorage.getItem("token")||"";fetch("".concat(g,"/api/delete_post"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(e)},body:JSON.stringify({postId:a})}).then((function(e){return e.json()})).then((function(e){e.error&&(localStorage.removeItem("token"),window.location.reload(!1)),console.log(e.message),ee(!1),Q(!0),c(""),r()}))}},"Delete"),o.a.createElement("button",{onClick:function(){return Q(!0)}},"Cancel"))))),o.a.createElement("div",{className:"caption"},o.a.createElement(E.a,{src:_.picture}),o.a.createElement("div",{className:"msg"},o.a.createElement("p",null,_.username.username),o.a.createElement("p",null,u.caption))),o.a.createElement("div",{className:"comments"},G?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,0!==F.length?o.a.createElement(o.a.Fragment,null,F.map((function(e){return o.a.createElement(d.b,{key:e.commentData._id,to:"/profile/".concat(e.commentData.posted_by._id)},o.a.createElement("div",{className:"comment"},o.a.createElement(E.a,{src:e.commentData.posted_by.picture}),o.a.createElement("div",{className:"msg"},o.a.createElement("p",null,e.posted_by_username),o.a.createElement("p",null,e.commentData.comment))))}))):o.a.createElement("p",{className:"noComment"},"No comment available"))),o.a.createElement("form",{onSubmit:function(e){return function(e){if(e.preventDefault(),I){var t=localStorage.getItem("token")||"";fetch("".concat(g,"/api/add_comment"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(t)},body:JSON.stringify({postId:a,comment:I})}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(T(""),te(),r())}))}}(e)},className:"add_comment"},o.a.createElement("input",{onChange:function(e){return T(e.target.value)},type:"text",value:I,placeholder:"add comment..."})),o.a.createElement("div",{className:"likes"},o.a.createElement(y.a,{onClick:function(){W(!M);var e=localStorage.getItem("token")||"";fetch("".concat(g,"/api/like_unlike"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(e)},body:JSON.stringify({postId:a})}).then((function(e){return e.json()})).then((function(e){e.error&&(localStorage.removeItem("token"),window.location.reload(!1)),r(),ae()}))},className:"hearth ".concat(M?"liked":"notliked")}),o.a.createElement("p",null,o.a.createElement("span",null,B.length)," likes"))))))};var I=function(e){var t=e.fetchProfiles,a=e.posts,c=e.profile,r=Object(n.useState)(!0),i=Object(l.a)(r,2),s=i[0],m=i[1],u=Object(n.useState)(""),p=Object(l.a)(u,2),f=p[0],d=p[1],h=Object(n.useState)(!1),_=Object(l.a)(h,2),j=_[0],O=_[1],v=Object(n.useState)(""),y=Object(l.a)(v,2),S=y[0],N=y[1],I=Object(n.useState)(""),T=Object(l.a)(I,2),x=T[0],P=T[1],F=Object(n.useState)(!1),A=Object(l.a)(F,2),J=A[0],D=A[1],B=Object(n.useState)(!1),z=Object(l.a)(B,2),R=z[0],U=z[1],G=Object(n.useState)(""),Y=Object(l.a)(G,2),q=Y[0],L=Y[1];return Object(n.useEffect)((function(){fetch("".concat(g,"/api/is_my_profile"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({profile_id:c._id})}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(m(e.message),d(e.myId))}))}),[s]),Object(n.useEffect)((function(){""!==x&&function(){D(!0);var e=new FormData;e.append("file",x),e.append("upload_preset","instagram_mern_media"),e.append("cloud_name","dchnmxssq"),fetch("https://api.cloudinary.com/v1_1/dchnmxssq/image/upload",{method:"POST",body:e}).then((function(e){return e.json()})).then((function(e){N(e.url)})).catch((function(e){return console.log(e)}))}(),""!==S&&fetch("".concat(g,"/api/change_profile_image"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({imageUrl:S})}).then((function(e){return e.json()})).then((function(e){e.error&&(localStorage.removeItem("token"),window.location.reload(!1)),e.message&&(console.log(e.message),O(!1),D(!1),window.location.reload(!1))})).catch((function(e){return console.log(e)}))}),[x,S]),o.a.createElement("div",{className:"profile"},o.a.createElement("div",{className:"profile_header_flex"},o.a.createElement(E.a,{onClick:function(){return O(!0)},className:"profile_avatar ".concat("https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png"===c.picture&&"default_avatar"," ").concat(!s&&"change_avatar"),src:c.picture}),o.a.createElement("div",{className:"change_profile_pic ".concat(!j&&"hide_pic_modify")},o.a.createElement("input",{onChange:function(e){return P(e.target.files[0])},type:"file",accept:"image/*",name:"image",id:"import_image"}),o.a.createElement("div",{className:"conatiner"},J?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,o.a.createElement("p",null,"Modify profile image"),o.a.createElement("label",{htmlFor:"import_image"},"Import image"),"https://res.cloudinary.com/dchnmxssq/image/upload/v1601118594/instagram_mern_images/profileimg_sugvm2.png"!==c.picture&&o.a.createElement("p",{onClick:function(){D(!0),fetch("".concat(g,"/api/remove_profile_image"),{method:"PUT",headers:{Authorization:"Bearer".concat(localStorage.getItem("token"))}}).then((function(e){return e.json()})).then((function(e){e.error&&(localStorage.removeItem("token"),window.location.reload(!1)),e.message&&(console.log(e.message),O(!1),D(!1),t())})).catch((function(e){return console.log(e)}))}},"Remove image"),o.a.createElement("p",{onClick:function(){O(!1)}},"Cancel")))),o.a.createElement("div",{className:"profile_data"},o.a.createElement("div",{className:"username"},c.user_profile.username),o.a.createElement("ul",{className:"ul_flex"},o.a.createElement("li",null,a.length," ",o.a.createElement("span",null,"posts")),o.a.createElement("li",null,c.following.length," ",o.a.createElement("span",null,"following")),o.a.createElement("li",null,c.followers.length," ",o.a.createElement("span",null,"followers"))),!s&&o.a.createElement("div",{className:"btns"},c.followers.includes(f)?o.a.createElement("button",{onClick:function(){U(!0),fetch("".concat(g,"/api/unfollow"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({profile_id:c._id})}).then((function(e){return e.json()})).then((function(e){e.error?(U(!1),localStorage.removeItem("token"),window.location.reload(!1)):(t(),U(!1))}))},className:"unfollow_btn"},R?o.a.createElement(b,null):"unfollow"):o.a.createElement("button",{onClick:function(){U(!0),fetch("".concat(g,"/api/follow"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer".concat(localStorage.getItem("token"))},body:JSON.stringify({profile_id:c._id})}).then((function(e){return e.json()})).then((function(e){e.error?(U(!1),localStorage.removeItem("token"),window.location.reload(!1)):(t(),U(!1))}))},className:"follow_btn"},R?o.a.createElement(b,null):"follow")),o.a.createElement("div",{className:"full_name"},"".concat(c.user_profile.last_name," ").concat(c.user_profile.first_name)))),o.a.createElement("div",{className:"profile_posts"},0!==a.length&&a.map((function(e){return o.a.createElement("div",{key:e._id},o.a.createElement("div",{className:"img_container"},o.a.createElement("img",{src:e.image,alt:"#"}),o.a.createElement("div",{onClick:function(){L(e._id)},className:"show_likes_comments"},o.a.createElement(w.a,null),e.likes.length," - ",o.a.createElement(k.a,null),e.comments.length)))})),""!==q&&o.a.createElement(C,{myId:f,is_mine:s,fetchProfiles:t,postId:q,set_postId:L})))};var T=function(){var e=Object(u.f)(),t=Object(n.useState)(""),a=Object(l.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)(""),p=Object(l.a)(i,2),f=p[0],d=p[1],h=Object(n.useState)(!0),E=Object(l.a)(h,2),_=E[0],j=E[1],O=Object(n.useState)({bool:!1,message:""}),v=Object(l.a)(O,2),y=v[0],S=v[1];function N(){return w.apply(this,arguments)}function w(){return(w=Object(m.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(g,"/api/x_profile_posts/").concat(e.id),{method:"GET"}).then((function(e){return e.json()})).then((function(e){e.error?(S({bool:!0,message:e.error}),j(!1)):(d(e.posts),r(e.profile),j(!1),S({bool:!1,message:""}))}));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return Object(n.useEffect)((function(){S({bool:!1,message:""}),j(!0),N()}),[e.id]),o.a.createElement(o.a.Fragment,null,_?o.a.createElement(b,null):o.a.createElement(o.a.Fragment,null,y.bool?o.a.createElement("div",null,y.message):o.a.createElement(I,{fetchProfiles:N,profile:c,posts:f})))};var x=function(){var e=Object(n.useState)(""),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(""),i=Object(l.a)(r,2),p=i[0],f=i[1],d=Object(n.useState)(!0),h=Object(l.a)(d,2),E=h[0],_=h[1],j=Object(n.useState)(""),O=Object(l.a)(j,2),y=O[0],S=O[1],w=Object(n.useState)(!0),k=Object(l.a)(w,2),C=k[0],x=k[1],P=Object(n.useState)({bool:!1,message:""}),F=Object(l.a)(P,2),A=F[0],J=F[1];function D(){return B.apply(this,arguments)}function B(){return(B=Object(m.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(g,"/api/my_profile_posts"),{method:"GET",headers:{Authorization:"Bearer".concat(localStorage.getItem("token"))}}).then((function(e){return e.json()})).then((function(e){e.error?(localStorage.removeItem("token"),window.location.reload(!1)):(f(e.posts),c(e.profile),_(!1))}));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(){return R.apply(this,arguments)}function R(){return(R=Object(m.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=localStorage.getItem("token")||"",e.next=3,fetch("".concat(g,"/api/all_following_posts"),{method:"GET",headers:{Authorization:"Bearer".concat(t)}}).then((function(e){return e.json()})).then((function(e){e.noFollow&&(J({bool:!0,message:e.noFollow}),x(!1)),S(e),x(!1)})).catch((function(e){return console.log(e)}));case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){return function e(){z(),setTimeout((function(){return e()}),5e3)}()}),[]),Object(n.useEffect)((function(){D()}),[a]),Object(n.useEffect)((function(){x(!0),J({bool:!1,message:""}),z()}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(v,{fetch_my_profile_posts:D,fetch_followingPosts:z}),o.a.createElement(u.c,null,o.a.createElement(u.a,{exact:!0,path:"/",render:function(){return o.a.createElement(N,{myprofileId:a._id,loading_post:C,posts:y,have_following:A})}}),o.a.createElement(u.a,{exact:!0,path:"/profile",render:function(){return E?o.a.createElement(b,null):o.a.createElement(I,{fetchProfiles:D,profile:a,posts:p})}}),o.a.createElement(u.a,{exact:!0,path:"/profile/:id",render:function(){return o.a.createElement(T,null)}})))},P=a(18),F=a(19);a(60);var A=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(!1),i=Object(l.a)(r,2),s=i[0],m=i[1],u=Object(n.useState)({type:"",text:""}),p=Object(l.a)(u,2),f=p[0],d=p[1],h=Object(n.useState)({email:"",password:""}),E=Object(l.a)(h,2),b=E[0],_=E[1],j=Object(n.useState)({username:"",first_name:"",last_name:"",email:"",password:"",re_password:""}),O=Object(l.a)(j,2),v=O[0],y=O[1];function S(e){_(Object(F.a)(Object(F.a)({},b),{},Object(P.a)({},e.target.name,e.target.value)))}function N(e){y(Object(F.a)(Object(F.a)({},v),{},Object(P.a)({},e.target.name,e.target.value)))}return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"logSign"},o.a.createElement("div",{className:"FormContainer"},o.a.createElement("div",{className:"insta_logo"},"Instagram"),o.a.createElement("div",{className:"".concat("error"===f.type?"message_error":"").concat("success"===f.type?"message_success":"")},f.text),o.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),m(!0),fetch("".concat(g,"/api/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}).then((function(e){return e.json()})).then((function(e){e.error?(console.log(e.error),d({type:"error",text:e.error}),setTimeout((function(){return d({type:"",text:""})}),4e3),m(!1)):(console.log(e),d({type:"success",text:e.message}),setTimeout((function(){return d({type:"",text:""})}),4e3),_({email:"",password:""}),localStorage.setItem("token",e.token),window.location.reload(!1),m(!1))}))}(e)},className:"login_form ".concat(a&&"hide")},o.a.createElement("input",{onChange:function(e){return S(e)},name:"email",type:"email",placeholder:"Your email...",value:b.email}),o.a.createElement("input",{onChange:function(e){return S(e)},name:"password",type:"password",placeholder:"Your password...",value:b.password}),o.a.createElement("button",{className:"".concat(s&&"button_loading"),type:"submit"},s?"Login...":"Login")),o.a.createElement("form",{onSubmit:function(e){return function(e){e.preventDefault(),m(!0),fetch("".concat(g,"/api/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)}).then((function(e){return e.json()})).then((function(e){e.error?(console.log(e.error),d({type:"error",text:e.error}),setTimeout((function(){return d({type:"",text:""})}),4e3),m(!1)):(d({type:"success",text:e.message}),setTimeout((function(){return d({type:"",text:""})}),4e3),_({email:v.email,password:v.password}),c(!1),y({username:"",first_name:"",last_name:"",email:"",password:"",re_password:""}),m(!1))}))}(e)},className:"signup_form ".concat(!a&&"hide")},o.a.createElement("input",{onChange:function(e){return N(e)},name:"username",type:"text",placeholder:"Your username...",value:v.username}),o.a.createElement("input",{onChange:function(e){return N(e)},name:"first_name",type:"text",placeholder:"Your first name...",value:v.first_name}),o.a.createElement("input",{onChange:function(e){return N(e)},name:"last_name",type:"text",placeholder:"Your last name...",value:v.last_name}),o.a.createElement("input",{onChange:function(e){return N(e)},name:"email",type:"email",placeholder:"Your email...",value:v.email}),o.a.createElement("input",{onChange:function(e){return N(e)},name:"password",type:"password",placeholder:"Your password...",value:v.password}),o.a.createElement("input",{onChange:function(e){return N(e)},name:"re_password",type:"password",placeholder:"Rewrite password...",value:v.re_password}),o.a.createElement("button",{className:"".concat(s&&"button_loading"),type:"submit"},s?"Reistering...":"Reister"))),o.a.createElement("div",{className:"form_switcher"},o.a.createElement("p",null,a?"Already a user ?":"New user ?"," ",o.a.createElement("span",{onClick:function(){return c(!a)}},a?"Login":"Register")," "))),o.a.createElement("footer",null,o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"A PROPOS")),o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"AIDE")),o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"API")),o.a.createElement("li",null,o.a.createElement("a",{href:"/"},"LANGUAGE")),o.a.createElement("li",null,o.a.createElement("p",null,"\xa9 2020 INSTAGRAM_Clone")))))},J=Object(n.createContext)();var D=function(){var e=Object(n.useState)(!!localStorage.getItem("token")),t=Object(l.a)(e,2),a=t[0],c=t[1];return o.a.createElement("div",{className:"app"},o.a.createElement(J.Provider,{value:c},a?o.a.createElement(x,null):o.a.createElement(A,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(d.a,null,o.a.createElement(D,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[39,1,2]]]);
//# sourceMappingURL=main.07695501.chunk.js.map