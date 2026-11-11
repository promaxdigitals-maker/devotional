self.addEventListener("push",function(e){
  var d={};try{d=e.data.json()}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title||"Pray first",{body:d.body||"Take a moment with God before you open any other app.",icon:"/icon-180.png",badge:"/icon-180.png",tag:d.tag||"pray-first",data:{url:d.url||"/"}}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  var u=e.notification.data&&e.notification.data.url||"/",m=/watch=(\d)/.exec(u);
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(function(l){
    for(var i=0;i<l.length;i++){if("focus"in l[i]){if(m)l[i].postMessage({watch:+m[1]});return l[i].focus()}}
    return clients.openWindow(u);
  }));
});
