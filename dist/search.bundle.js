(()=>{var e=["League of Legends","Elden Ring","Apex Legends","Genshin Impact","Counter-Strike: Global Offensive","Sekiro: Shadows Die Twice","Resident Evil 4","VALORANT","Dota2","Minecraft"],n=document.querySelector(".search-input"),t=document.querySelector(".search-results"),r=!1;fetch("/src/js/functions/users.json").then((function(e){return e.json()})).then((function(r){n.addEventListener("input",(function(){var i=n.value.toLowerCase().trim();t.innerHTML="";for(var a=e.filter((function(e){return e.toLowerCase().includes(i)})),o=r.filter((function(e){return e.userName.toLowerCase().includes(i)})),c=0,s=0;s<a.length+o.length&&!(c>=3);s++){if(s<a.length){var u=document.createElement("div");u.innerHTML='<a href = "/public/Game-Video.html?gameName='.concat(a[s],'">').concat(a[s],"</a>"),t.appendChild(u),c++}if(s<o.length){var l=document.createElement("div");l.innerHTML='<a href = "/public/UserProfile.html?username='.concat(o[s].userName,'">').concat(o[s].userName,"</a>"),t.appendChild(l),c++}}t.style.height=1===c?"2.5rem":2===c?"5rem":3===c?"7.5rem":"10rem"}))})),n.addEventListener("focus",(function(){t.style.display="block",r=!0})),n.addEventListener("blur",(function(){r=!1,setTimeout((function(){r||(t.style.display="none")}),500)}))})();