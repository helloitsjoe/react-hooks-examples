(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},13:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(5),c=a.n(o),i=(a(3),a(1),a(2)),l={Paris:["Ate a baguette",'Said "merci" a lot',"Wore a beret","Ate a croissant","Changed diapers"],Rome:["Ate a pizza","Ate gelato every day","Fought a gladiator",'Said "grazie" a lot',"Changed diapers"],Boston:["Ate a lobster roll",'Did not say "cah"',"Went to Harvard Yard","Changed diapers","Rode a Swan Boat"],Tokyo:["Ate a tuna roll",'Said "arigato" a lot',"Ate a mochi","Did not watch anime","Changed diapers"]};function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:500;return new Promise(function(a,n){setTimeout(function(){if(Math.random()<.1)return n("Something went wrong!");a(l[e])},t)})}function u(e,t){var a=e[Math.floor(Math.random()*e.length)];return a===t?u(e,t):a}var s=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(!1),c=Object(i.a)(o,2),s=c[0],m=c[1],h=Object(n.useState)([]),b=Object(i.a)(h,2),f=b[0],g=b[1],p=Object(n.useState)(""),v=Object(i.a)(p,2),y=v[0],E=v[1],j=Object(n.useState)(u(Object.keys(l))),O=Object(i.a)(j,2),w=O[0],A=O[1];return Object(n.useLayoutEffect)(function(){r(!0),m(!1),d(w).then(function(e){r(!1),E(u(e)),g(e)}).catch(function(e){r(!1),m(!0)})},[w]),{loading:a,error:s,place:w,activity:y,setRandomActivity:function(){return E(u(f,y))},setRandomPlace:function(){return A(Object.keys(l))}}};a(12);var m=function(e){var t=e.loading,a=e.error;return r.a.createElement("div",{"data-testid":"fallback",className:"App"},t?r.a.createElement("h1",null,"Loading..."):r.a.createElement("h1",{style:{color:"red"}},"Error! ",a))};c.a.render(r.a.createElement(function(){var e=s(),t=e.loading,a=e.error,n=e.place,o=e.activity,c=e.setRandomActivity,i=e.setRandomPlace;return t||a?r.a.createElement(m,{loading:t,error:a}):r.a.createElement("div",{className:"App"},r.a.createElement("h1",{"data-testid":"vacation-title"},"What I did on my ",r.a.createElement("span",{style:{color:"purple"}},n)," ","vacation:"),r.a.createElement("h2",null,o),r.a.createElement("button",{onClick:c},"What else?"),r.a.createElement("button",{onClick:i},"Where else?"))},null),document.getElementById("root"))},6:function(e,t,a){e.exports=a(13)}},[[6,1,2]]]);
//# sourceMappingURL=main.636fe6d3.chunk.js.map