(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t(16),o=t.n(r),u=t(3),a=t(4),i=t.n(a),s="/api/persons",l=function(){return i.a.get(s).then((function(e){return e.data}))},d=function(e){return i.a.post(s,e).then((function(e){return e.data}))},f=function(e){return i.a.put("".concat(s,"/").concat(e.id),e).then((function(e){return e.data}))},j=function(e){return i.a.delete("".concat(s,"/").concat(e.id)).then((function(e){return e}))},b=t(0),m=function(e){var n=e.person,t=e.onDelete;return Object(b.jsxs)("div",{children:[n.name," ",n.number,Object(b.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},h=function(e){var n=e.filter,t=e.persons,c=e.onDelete,r=t.filter((function(e){var t;return null===(t=e.name)||void 0===t?void 0:t.toLowerCase().includes(n.toLowerCase())}));return Object(b.jsx)("div",{children:r.map((function(e,n){return Object(b.jsx)(m,{person:e,onDelete:c},n)}))})},p=function(e){var n=e.newName,t=e.number,c=e.onSubmit,r=e.onNameChange,o=e.onNumberChange;return Object(b.jsxs)("form",{onSubmit:c,children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n,onChange:r})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:t,onChange:o})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},O=function(e){var n=e.onFilterChange,t=e.filter;return Object(b.jsxs)("div",{children:["filter shown with:",Object(b.jsx)("input",{onChange:n,value:t})]})},v=function(e){var n=e.message;return null===n?null:Object(b.jsx)("div",{className:n.type,children:n.content})},x=(t(40),function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),a=Object(u.a)(o,2),i=a[0],s=a[1],m=Object(c.useState)(""),x=Object(u.a)(m,2),g=x[0],w=x[1],y=Object(c.useState)(""),C=Object(u.a)(y,2),N=C[0],S=C[1],T=Object(c.useState)(null),D=Object(u.a)(T,2),M=D[0],k=D[1];Object(c.useEffect)((function(){l().then((function(e){r(e)}))}),[]);var E=function(e){f(e).then((function(n){r(t.map((function(e){return e.id!==n.id?e:n}))),s(""),w(""),k({content:"Number of ".concat(e.name," was replaced"),type:"successMessage"}),setTimeout((function(){return k(null)}),5e3)})).catch((function(){k({content:"Number of ".concat(e.name," was not replaced"),type:"errorMessage"}),setTimeout((function(){return k(null)}),5e3)}))};return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Phonebook"}),Object(b.jsx)(v,{message:M}),Object(b.jsx)(O,{filter:N,onFilterChange:function(e){S(e.target.value)}}),Object(b.jsx)("h2",{children:"Add a new"}),Object(b.jsx)(p,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===i}));if(n&&window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?")))return E({name:i,number:g,id:n.id});var c={name:i,number:g};d(c).then((function(e){r(t.concat(e)),s(""),w(""),k({content:"".concat(c.name," was added"),type:"successMessage"}),setTimeout((function(){return k(null)}),5e3)})).catch((function(e){k({content:e.response.data.error,type:"errorMessage"}),setTimeout((function(){return k(null)}),5e3)}))},newName:i,onNameChange:function(e){s(e.target.value)},number:g,onNumberChange:function(e){w(e.target.value)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(h,{persons:t,filter:N,onDelete:function(e){window.confirm("Delete ".concat(e.name,"'?"))&&j(e).then((function(){k({content:"The person ".concat(e.name," was deleted"),type:"successMessage"}),setTimeout((function(){return k(null)}),5e3)})).catch((function(){k({content:"The person ".concat(e.name," was already deleted from server"),type:"errorMessage"}),setTimeout((function(){return k(null)}),5e3)})).finally((function(){var n=t.filter((function(n){return n.id!==e.id}));r(n)}))}})]})});o.a.render(Object(b.jsx)(x,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.0729c667.chunk.js.map