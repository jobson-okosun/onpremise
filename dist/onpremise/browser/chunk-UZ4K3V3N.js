import{a as Dt}from"./chunk-QTD6XN2N.js";import{a as At}from"./chunk-6ZCDKWY3.js";import{c as _t}from"./chunk-H5RUGNXR.js";import{B as Fe,D as te,E as ne,F as C,G as ie,I as Ct,J as yt,N as He,O as xt,P as St,Q as kt,R as Tt,S as It,T as Ce,U as Le,V as Et,b as Ue,c as vt,j as bt,n as le,o as Xe,p as we,v as Ye,w as wt,y as Qe,z as $}from"./chunk-ILSC42OT.js";import{c as Be,d as se,f as ce,g as ze,h as de,i as We,j as Ze}from"./chunk-36JN3LZY.js";import{l as ht,m as gt}from"./chunk-ALWJEOCX.js";import{b as pt,d as Pe,f as Ne,h as ee}from"./chunk-DCGPLH7Z.js";import{e as mt,m as ft}from"./chunk-UPA7XW3Z.js";import{h as ut}from"./chunk-GIGRNQ2E.js";import{$a as z,$b as $e,Ac as at,Bb as b,Cb as w,Cc as Y,Dc as J,Eb as it,Fb as Ie,Fc as st,Gb as Ee,Hb as d,Ib as s,Jb as c,Jc as ct,Kb as m,Kc as h,Lc as dt,Nb as Ae,Ob as he,Pb as ge,Pc as re,Qb as fe,Ra as q,Rb as F,Sc as ae,Vb as y,Wa as a,Xb as l,Xc as R,Y as oe,Yb as Z,Yc as lt,Z as V,Zb as U,_ as Se,_b as H,aa as K,ac as M,bc as P,ca as u,f as B,fc as ot,g as me,gc as _e,ha as I,hc as ve,ia as E,ic as A,ja as f,jc as x,ka as ke,kb as T,kc as De,lb as Te,lc as be,ob as D,oc as Ge,pb as W,pc as Ke,qb as _,qc as qe,ra as Q,uc as rt,wa as k,xc as X,yc as Me,zb as S,zc as j}from"./chunk-4DEWBOK7.js";import{a as g,b as v}from"./chunk-HZ6M6AS2.js";var Oe=class t{_gotoPage=new me(!1);gotoPage$=this._gotoPage.asObservable();_clearCurrentPageEvent=new B;clearCurrentPageEvent$=this._clearCurrentPageEvent.asObservable();_pageSelectEvent=new B;pageSelectEvent$=this._pageSelectEvent.asObservable();_subQuestionSelectEvent=new B;subQuestionSelectEvent$=this._subQuestionSelectEvent.asObservable();_questionChanged$=new B;_toggleDrawingAndWritingLayout$=new B;_selectDrawingTool=new B;_selectMeasurementTool$=new me(null);_removeMeasurementTool$=new me(null);_backgroundChange$=new me(null);_eraserSizeChange$=new B;_deletePageEvent=new B;clearPage(){return new Promise(o=>{this._clearCurrentPageEvent.next(),o()})}deletePage(){return new Promise(o=>{this._deletePageEvent.next(),o()})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=V({token:t,factory:t.\u0275fac,providedIn:"root"})};var ye=class{page;strokes;undoStack;redoStack;constructor(o){this.page=o,this.strokes=[],this.undoStack=[],this.redoStack=[]}},L=class{currentPage;pages;constructor(){this.currentPage=0,this.pages=[]}};var Ve=class t{_stores=Q({default:new L});_activeStoreId=Q("default");store=h(()=>this._stores()[this._activeStoreId()]);constructor(){this.createNewPage()}setActiveStoreId(o){this._stores()[o]||(this._stores.update(e=>v(g({},e),{[o]:new L})),this.createNewPageForId(o)),this._activeStoreId.set(o)}getActiveStoreId(){return this._activeStoreId()}setAllStores(o){this._stores.set(o);let e=Object.keys(o);e.length>0&&!o[this._activeStoreId()]&&this._activeStoreId.set(e[0])}getAllStores(){return this._stores()}updateActiveStore(o){this._stores.update(e=>{let n=this._activeStoreId(),i=e[n]||new L;return v(g({},e),{[n]:o(i)})})}createStore(){this.updateActiveStore(()=>new L),this.createNewPage()}getStoreData(){return this._stores()[this._activeStoreId()]}updateStore(o){this.updateActiveStore(e=>g(g({},e),o))}updateStoreCurrentPage(o){let e=this.getStoreData();o>=0&&o<e.pages.length&&this.updateActiveStore(n=>v(g({},n),{currentPage:o}))}getCurrentPageData(){let o=this.getStoreData();return!o||!o.pages||o.pages.length===0?null:o.pages[o.currentPage]}createNewPageForId(o){this._stores.update(e=>{let n=e[o]||new L,i=n.pages.length+1,r=new ye(i),p=[...n.pages,r],O=p.length-1;return v(g({},e),{[o]:v(g({},n),{currentPage:O,pages:p})})})}createNewPage(){return new Promise(o=>{this.updateActiveStore(e=>{let n=e.pages.length+1,i=new ye(n),r=[...e.pages,i],p=r.length-1;return v(g({},e),{currentPage:p,pages:r})}),o()})}deleteCurrentPage(){this.updateActiveStore(o=>{let{currentPage:e,pages:n}=o;if(n.length===1)return o;let i=n.filter((O,N)=>N!==e),r;i.length===0?r=0:e>0&&e===n.length-1?r=i.length-1:r=e;let p=i.map((O,N)=>(O.page=N+1,O));return v(g({},o),{currentPage:r,pages:p})})}selectPage(o){this.updateStoreCurrentPage(o)}clearCurrentPage(){this.updateActiveStore(o=>{let e=o.pages.map((n,i)=>i===o.currentPage?v(g({},n),{strokes:[],undoStack:n.strokes,redoStack:[]}):n);return v(g({},o),{pages:e})})}updateCurrentPageStrokes(o){this.updateActiveStore(e=>{let n=e.pages.map((i,r)=>r===e.currentPage?v(g({},i),{strokes:[...o],undoStack:[],redoStack:[]}):i);return v(g({},e),{pages:n})})}clearStoreData(){this.updateActiveStore(()=>new L),this.createNewPage()}undo(){this.updateActiveStore(o=>{let e=[...o.pages],n=e[o.currentPage];if(!n)return o;if(n.strokes.length){let i=n.strokes.pop();return n.redoStack.push(i),v(g({},o),{pages:e})}return n.undoStack.length?(n.strokes=n.undoStack,n.undoStack=[],n.redoStack=[],v(g({},o),{pages:e})):o})}redo(){this.updateActiveStore(o=>{let e=[...o.pages],n=e[o.currentPage];if(!n||!n.redoStack.length)return o;let i=n.redoStack.pop();return n.strokes.push(i),v(g({},o),{pages:e})})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=V({token:t,factory:t.\u0275fac,providedIn:"root"})};var zt=["data-p-icon","chevron-down"],Mt=(()=>{class t extends He{static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["","data-p-icon","chevron-down"]],features:[D],attrs:zt,decls:1,vars:0,consts:[["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(n,i){n&1&&(f(),Ae(0,"path",0))},encapsulation:2})}return t})();var Wt=["data-p-icon","chevron-up"],Pt=(()=>{class t extends He{static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["","data-p-icon","chevron-up"]],features:[D],attrs:Wt,decls:1,vars:0,consts:[["d","M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z","fill","currentColor"]],template:function(n,i){n&1&&(f(),Ae(0,"path",0))},encapsulation:2})}return t})();var Nt=`
    .p-drawer {
        display: flex;
        flex-direction: column;
        transform: translate3d(0px, 0px, 0px);
        position: relative;
        transition: transform 0.3s;
        background: dt('drawer.background');
        color: dt('drawer.color');
        border: 1px solid dt('drawer.border.color');
        box-shadow: dt('drawer.shadow');
    }

    .p-drawer-content {
        overflow-y: auto;
        flex-grow: 1;
        padding: dt('drawer.content.padding');
    }

    .p-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('drawer.header.padding');
    }

    .p-drawer-footer {
        padding: dt('drawer.footer.padding');
    }

    .p-drawer-title {
        font-weight: dt('drawer.title.font.weight');
        font-size: dt('drawer.title.font.size');
    }

    .p-drawer-full .p-drawer {
        transition: none;
        transform: none;
        width: 100vw !important;
        height: 100vh !important;
        max-height: 100%;
        top: 0px !important;
        left: 0px !important;
        border-width: 1px;
    }

    .p-drawer-left .p-drawer-enter-from,
    .p-drawer-left .p-drawer-leave-to {
        transform: translateX(-100%);
    }

    .p-drawer-right .p-drawer-enter-from,
    .p-drawer-right .p-drawer-leave-to {
        transform: translateX(100%);
    }

    .p-drawer-top .p-drawer-enter-from,
    .p-drawer-top .p-drawer-leave-to {
        transform: translateY(-100%);
    }

    .p-drawer-bottom .p-drawer-enter-from,
    .p-drawer-bottom .p-drawer-leave-to {
        transform: translateY(100%);
    }

    .p-drawer-full .p-drawer-enter-from,
    .p-drawer-full .p-drawer-leave-to {
        opacity: 0;
    }

    .p-drawer-full .p-drawer-enter-active,
    .p-drawer-full .p-drawer-leave-active {
        transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .p-drawer-left .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-end-width: 1px;
    }

    .p-drawer-right .p-drawer {
        width: 20rem;
        height: 100%;
        border-inline-start-width: 1px;
    }

    .p-drawer-top .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-end-width: 1px;
    }

    .p-drawer-bottom .p-drawer {
        height: 10rem;
        width: 100%;
        border-block-start-width: 1px;
    }

    .p-drawer-left .p-drawer-content,
    .p-drawer-right .p-drawer-content,
    .p-drawer-top .p-drawer-content,
    .p-drawer-bottom .p-drawer-content {
        width: 100%;
        height: 100%;
    }

    .p-drawer-open {
        display: flex;
    }

    .p-drawer-mask:dir(rtl) {
        flex-direction: row-reverse;
    }
`;var Xt=["header"],Yt=["footer"],Jt=["content"],en=["closeicon"],tn=["headless"],nn=["container"],on=["closeButton"],rn=["*"],an=(t,o)=>({transform:t,transition:o}),sn=t=>({value:"visible",params:t});function cn(t,o){t&1&&fe(0)}function dn(t,o){if(t&1&&_(0,cn,1,0,"ng-container",4),t&2){let e=l(2);d("ngTemplateOutlet",e.headlessTemplate||e._headlessTemplate)}}function ln(t,o){t&1&&fe(0)}function pn(t,o){if(t&1&&(s(0,"div",9),x(1),c()),t&2){let e=l(3);A(e.cx("title")),d("pBind",e.ptm("title")),a(),De(e.header)}}function un(t,o){t&1&&(f(),m(0,"svg",12)),t&2&&S("data-pc-section","closeicon")}function mn(t,o){}function hn(t,o){t&1&&_(0,mn,0,0,"ng-template")}function gn(t,o){if(t&1&&_(0,un,1,1,"svg",11)(1,hn,1,0,null,4),t&2){let e=l(4);d("ngIf",!e.closeIconTemplate&&!e._closeIconTemplate),a(),d("ngTemplateOutlet",e.closeIconTemplate||e._closeIconTemplate)}}function fn(t,o){if(t&1){let e=F();s(0,"p-button",10),y("onClick",function(i){I(e);let r=l(3);return E(r.close(i))})("keydown.enter",function(i){I(e);let r=l(3);return E(r.close(i))}),_(1,gn,2,2,"ng-template",null,1,st),c()}if(t&2){let e=l(3);d("pt",e.ptm("pcCloseButton"))("ngClass",e.cx("pcCloseButton"))("buttonProps",e.closeButtonProps)("ariaLabel",e.ariaCloseLabel),S("data-pc-group-section","iconcontainer")}}function _n(t,o){t&1&&fe(0)}function vn(t,o){t&1&&fe(0)}function bn(t,o){if(t&1&&(he(0),s(1,"div",5),_(2,vn,1,0,"ng-container",4),c(),ge()),t&2){let e=l(3);a(),d("pBind",e.ptm("footer"))("ngClass",e.cx("footer")),S("data-pc-section","footer"),a(),d("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}function wn(t,o){if(t&1&&(s(0,"div",5),_(1,ln,1,0,"ng-container",4)(2,pn,2,4,"div",6)(3,fn,3,5,"p-button",7),c(),s(4,"div",5),U(5),_(6,_n,1,0,"ng-container",4),c(),_(7,bn,3,4,"ng-container",8)),t&2){let e=l(2);d("pBind",e.ptm("header"))("ngClass",e.cx("header")),S("data-pc-section","header"),a(),d("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),a(),d("ngIf",e.header),a(),d("ngIf",e.showCloseIcon&&e.closable),a(),d("pBind",e.ptm("content"))("ngClass",e.cx("content")),S("data-pc-section","content"),a(2),d("ngTemplateOutlet",e.contentTemplate||e._contentTemplate),a(),d("ngIf",e.footerTemplate||e._footerTemplate)}}function Cn(t,o){if(t&1){let e=F();s(0,"div",3,0),y("@panelState.start",function(i){I(e);let r=l();return E(r.onAnimationStart(i))})("@panelState.done",function(i){I(e);let r=l();return E(r.onAnimationEnd(i))})("keydown",function(i){I(e);let r=l();return E(r.onKeyDown(i))}),b(2,dn,1,1,"ng-container")(3,wn,8,11),c()}if(t&2){let e=l();ve(e.style),A(e.cn(e.cx("root"),e.styleClass)),d("pBind",e.ptm("root"))("@panelState",j(10,sn,at(7,an,e.transformOptions,e.transitionOptions))),a(2),w(e.headlessTemplate||e._headlessTemplate?2:3)}}var yn=`
    ${Nt}

    /** For PrimeNG **/
    .p-drawer {
        position: fixed;
        display: flex;
        flex-direction: column;
    }

    .p-drawer-left {
        top: 0;
        left: 0;
        width: 20rem;
        height: 100%;
    }

    .p-drawer-right {
        top: 0;
        right: 0;
        width: 20rem;
        height: 100%;
    }

    .p-drawer-top {
        top: 0;
        left: 0;
        width: 100%;
        height: 10rem;
    }

    .p-drawer-bottom {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 10rem;
    }

    .p-drawer-full {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        -webkit-transition: none;
        transition: none;
    }

    .p-overlay-mask-enter {
        animation: p-overlay-mask-enter-animation 150ms forwards;
    }

    .p-overlay-mask-leave {
        animation: p-overlay-mask-leave-animation 150ms forwards;
    }

    @keyframes p-overlay-mask-enter-animation {
        from {
            background-color: transparent;
        }
        to {
            background-color: rgba(0, 0, 0, 0.4);
        }
    }
    @keyframes p-overlay-mask-leave-animation {
        from {
            background-color: rgba(0, 0, 0, 0.4);
        }
        to {
            background-color: transparent;
        }
    }
`,xn={mask:({instance:t})=>["p-drawer-mask",{"p-overlay-mask p-overlay-mask-enter":t.modal},{"p-drawer-full":t.fullScreen}],root:({instance:t})=>["p-drawer p-component",{"p-drawer-full":t.fullScreen,"p-drawer-open":t.visible},`p-drawer-${t.position}`],header:"p-drawer-header",title:"p-drawer-title",pcCloseButton:"p-drawer-close-button",content:"p-drawer-content",footer:"p-drawer-footer"},Bt=(()=>{class t extends Fe{name="drawer";style=yn;classes=xn;static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275prov=V({token:t,factory:t.\u0275fac})}return t})();var Qt=new K("DRAWER_INSTANCE"),Sn=We([ce({transform:"{{transform}}",opacity:0}),se("{{transition}}")]),kn=We([se("{{transition}}",ce({transform:"{{transform}}",opacity:0}))]),Ft="translate3d(-100%, 0px, 0px)",Je=(()=>{class t extends ne{$pcDrawer=u(Qt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}appendTo="body";blockScroll=!1;style;styleClass;ariaCloseLabel;autoZIndex=!0;baseZIndex=0;modal=!0;closeButtonProps={severity:"secondary",text:!0,rounded:!0};dismissible=!0;showCloseIcon=!0;closeOnEscape=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";get visible(){return this._visible??!1}set visible(e){this._visible=e}get position(){return this._position}set position(e){if(this._position=e,e==="full"){this.transformOptions="none";return}switch(e){case"left":this.transformOptions="translate3d(-100%, 0px, 0px)";break;case"right":this.transformOptions="translate3d(100%, 0px, 0px)";break;case"bottom":this.transformOptions="translate3d(0px, 100%, 0px)";break;case"top":this.transformOptions="translate3d(0px, -100%, 0px)";break}}get fullScreen(){return this._fullScreen}set fullScreen(e){this._fullScreen=e,e===!0?this.transformOptions="none":this.transformOptions=Ft}header;maskStyle;closable=!0;onShow=new z;onHide=new z;visibleChange=new z;containerViewChild;closeButtonViewChild;initialized;_visible;_position="left";_fullScreen=!1;container;transformOptions=Ft;mask;maskClickListener;documentEscapeListener;animationEndListener;_componentStyle=u(Bt);onAfterViewInit(){this.initialized=!0}headerTemplate;footerTemplate;contentTemplate;closeIconTemplate;headlessTemplate;_headerTemplate;_footerTemplate;_contentTemplate;_closeIconTemplate;_headlessTemplate;templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"closeicon":this._closeIconTemplate=e.template;break;case"headless":this._headlessTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}onKeyDown(e){e.code==="Escape"&&this.hide(!1)}show(){this.container?.setAttribute(this.$attrSelector,""),this.autoZIndex&&Ce.set("modal",this.container,this.baseZIndex||this.config.zIndex.modal),this.modal&&this.enableModality(),this.onShow.emit({}),this.visibleChange.emit(!0)}hide(e=!0){e&&this.onHide.emit({}),this.modal&&this.disableModality()}close(e){this.hide(),this.visibleChange.emit(!1),e.preventDefault()}enableModality(){let e=this.document.querySelectorAll(".p-drawer-open"),n=e.length,i=n==1?String(parseInt(this.container.style.zIndex)-1):String(parseInt(e[n-1].style.zIndex)-1);this.mask||(this.mask=this.renderer.createElement("div"),this.mask&&(Ye(this.mask,"style",this.getMaskStyle()),Ye(this.mask,"style",`z-index: ${i}`),Ue(this.mask,this.cx("mask"))),this.dismissible&&(this.maskClickListener=this.renderer.listen(this.mask,"click",r=>{this.dismissible&&this.close(r)})),this.renderer.appendChild(this.document.body,this.mask),this.blockScroll&&Ct())}getMaskStyle(){return this.maskStyle?Object.entries(this.maskStyle).map(([e,n])=>`${e}: ${n}`).join("; "):""}disableModality(){this.mask&&(vt(this.mask,"p-overlay-mask-enter"),Ue(this.mask,"p-overlay-mask-leave"),this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyModal.bind(this)))}destroyModal(){this.unbindMaskClickListener(),this.mask&&this.renderer.removeChild(this.document.body,this.mask),this.blockScroll&&yt(),this.unbindAnimationEndListener(),this.mask=null}onAnimationStart(e){switch(e.toState){case"visible":this.container=e.element,this.appendContainer(),this.show(),this.closeOnEscape&&this.bindDocumentEscapeListener();break}}onAnimationEnd(e){switch(e.toState){case"void":this.hide(!1),Ce.clear(this.container),this.unbindGlobalListeners();break}}appendContainer(){this.appendTo&&(this.appendTo==="body"&&this.container?this.renderer.appendChild(this.document.body,this.container):this.container&&bt(this.appendTo,this.container))}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentEscapeListener=this.renderer.listen(e,"keydown",n=>{n.which==27&&parseInt(this.container.style.zIndex)===Ce.get(this.container)&&this.close(n)})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindGlobalListeners(){this.unbindMaskClickListener(),this.unbindDocumentEscapeListener()}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}onDestroy(){this.initialized=!1,this.visible&&this.modal&&this.destroyModal(),this.appendTo&&this.container&&this.renderer.appendChild(this.el.nativeElement,this.container),this.container&&this.autoZIndex&&Ce.clear(this.container),this.container=null,this.unbindGlobalListeners(),this.unbindAnimationEndListener()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-drawer"]],contentQueries:function(n,i,r){if(n&1&&(H(r,Xt,4),H(r,Yt,4),H(r,Jt,4),H(r,en,4),H(r,tn,4),H(r,Qe,4)),n&2){let p;M(p=P())&&(i.headerTemplate=p.first),M(p=P())&&(i.footerTemplate=p.first),M(p=P())&&(i.contentTemplate=p.first),M(p=P())&&(i.closeIconTemplate=p.first),M(p=P())&&(i.headlessTemplate=p.first),M(p=P())&&(i.templates=p)}},viewQuery:function(n,i){if(n&1&&($e(nn,5),$e(on,5)),n&2){let r;M(r=P())&&(i.containerViewChild=r.first),M(r=P())&&(i.closeButtonViewChild=r.first)}},inputs:{appendTo:"appendTo",blockScroll:[2,"blockScroll","blockScroll",R],style:"style",styleClass:"styleClass",ariaCloseLabel:"ariaCloseLabel",autoZIndex:[2,"autoZIndex","autoZIndex",R],baseZIndex:[2,"baseZIndex","baseZIndex",lt],modal:[2,"modal","modal",R],closeButtonProps:"closeButtonProps",dismissible:[2,"dismissible","dismissible",R],showCloseIcon:[2,"showCloseIcon","showCloseIcon",R],closeOnEscape:[2,"closeOnEscape","closeOnEscape",R],transitionOptions:"transitionOptions",visible:"visible",position:"position",fullScreen:"fullScreen",header:"header",maskStyle:"maskStyle",closable:[2,"closable","closable",R]},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange"},features:[X([Bt,{provide:Qt,useExisting:t},{provide:te,useExisting:t}]),W([C]),D],ngContentSelectors:rn,decls:1,vars:1,consts:[["container",""],["icon",""],["role","complementary","pFocusTrap","",3,"pBind","class","style","keydown",4,"ngIf"],["role","complementary","pFocusTrap","",3,"keydown","pBind"],[4,"ngTemplateOutlet"],[3,"pBind","ngClass"],[3,"pBind","class",4,"ngIf"],[3,"pt","ngClass","buttonProps","ariaLabel","onClick","keydown.enter",4,"ngIf"],[4,"ngIf"],[3,"pBind"],[3,"onClick","keydown.enter","pt","ngClass","buttonProps","ariaLabel"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(n,i){n&1&&(Z(),_(0,Cn,4,12,"div",2)),n&2&&d("ngIf",i.visible)},dependencies:[ee,pt,Pe,Ne,kt,xt,$,C,It,Tt],encapsulation:2,data:{animation:[Be("panelState",[de("void => visible",[Ze(Sn)]),de("visible => void",[Ze(kn)])])]},changeDetection:0})}return t})(),Ht=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=Te({type:t});static \u0275inj=Se({imports:[Je,$,$]})}return t})();var Lt=`
    .p-accordionpanel {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: dt('accordion.panel.border.width');
        border-color: dt('accordion.panel.border.color');
    }

    .p-accordionheader {
        all: unset;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('accordion.header.padding');
        color: dt('accordion.header.color');
        background: dt('accordion.header.background');
        border-style: solid;
        border-width: dt('accordion.header.border.width');
        border-color: dt('accordion.header.border.color');
        font-weight: dt('accordion.header.font.weight');
        border-radius: dt('accordion.header.border.radius');
        transition:
            background dt('accordion.transition.duration'),
            color dt('accordion.transition.duration'),
            outline-color dt('accordion.transition.duration'),
            box-shadow dt('accordion.transition.duration');
        outline-color: transparent;
    }

    .p-accordionpanel:first-child > .p-accordionheader {
        border-width: dt('accordion.header.first.border.width');
        border-start-start-radius: dt('accordion.header.first.top.border.radius');
        border-start-end-radius: dt('accordion.header.first.top.border.radius');
    }

    .p-accordionpanel:last-child > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.bottom.border.radius');
    }

    .p-accordionpanel:last-child.p-accordionpanel-active > .p-accordionheader {
        border-end-start-radius: dt('accordion.header.last.active.bottom.border.radius');
        border-end-end-radius: dt('accordion.header.last.active.bottom.border.radius');
    }

    .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.color');
    }

    .p-accordionpanel:not(.p-disabled) .p-accordionheader:focus-visible {
        box-shadow: dt('accordion.header.focus.ring.shadow');
        outline: dt('accordion.header.focus.ring.width') dt('accordion.header.focus.ring.style') dt('accordion.header.focus.ring.color');
        outline-offset: dt('accordion.header.focus.ring.offset');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) > .p-accordionheader:hover {
        background: dt('accordion.header.hover.background');
        color: dt('accordion.header.hover.color');
    }

    .p-accordionpanel:not(.p-accordionpanel-active):not(.p-disabled) .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader {
        background: dt('accordion.header.active.background');
        color: dt('accordion.header.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover {
        background: dt('accordion.header.active.hover.background');
        color: dt('accordion.header.active.hover.color');
    }

    .p-accordionpanel:not(.p-disabled).p-accordionpanel-active > .p-accordionheader:hover .p-accordionheader-toggle-icon {
        color: dt('accordion.header.toggle.icon.active.hover.color');
    }

    .p-accordioncontent-content {
        border-style: solid;
        border-width: dt('accordion.content.border.width');
        border-color: dt('accordion.content.border.color');
        background-color: dt('accordion.content.background');
        color: dt('accordion.content.color');
        padding: dt('accordion.content.padding');
    }
`;var je=["*"],In=["toggleicon"],En=t=>({active:t});function An(t,o){}function Dn(t,o){t&1&&_(0,An,0,0,"ng-template")}function Mn(t,o){if(t&1&&_(0,Dn,1,0,null,0),t&2){let e=l();d("ngTemplateOutlet",e.toggleicon)("ngTemplateOutletContext",j(2,En,e.active()))}}function Pn(t,o){if(t&1&&m(0,"span",4),t&2){let e=l(3);A(e.cn(e.cx("toggleicon"),e.pcAccordion.collapseIcon)),d("pBind",e.ptm("toggleicon")),S("aria-hidden",!0)}}function Nn(t,o){if(t&1&&(f(),m(0,"svg",5)),t&2){let e=l(3);A(e.cx("toggleicon")),d("pBind",e.ptm("toggleicon")),S("aria-hidden",!0)}}function Bn(t,o){if(t&1&&(he(0),_(1,Pn,1,4,"span",2)(2,Nn,1,4,"svg",3),ge()),t&2){let e=l(2);a(),d("ngIf",e.pcAccordion.collapseIcon),a(),d("ngIf",!e.pcAccordion.collapseIcon)}}function Qn(t,o){if(t&1&&m(0,"span",4),t&2){let e=l(3);A(e.cn(e.cx("toggleicon"),e.pcAccordion.expandIcon)),d("pBind",e.ptm("toggleicon")),S("aria-hidden",!0)}}function Fn(t,o){if(t&1&&(f(),m(0,"svg",7)),t&2){let e=l(3);d("pBind",e.ptm("toggleicon")),S("aria-hidden",!0)}}function Hn(t,o){if(t&1&&(he(0),_(1,Qn,1,4,"span",2)(2,Fn,1,2,"svg",6),ge()),t&2){let e=l(2);a(),d("ngIf",e.pcAccordion.expandIcon),a(),d("ngIf",!e.pcAccordion.expandIcon)}}function Ln(t,o){if(t&1&&_(0,Bn,3,2,"ng-container",1)(1,Hn,3,2,"ng-container",1),t&2){let e=l();d("ngIf",e.active()),a(),d("ngIf",!e.active())}}var Ot=t=>({transitionParams:t}),On=t=>({value:"visible",params:t}),Vn=t=>({value:"hidden",params:t}),jn=`
    ${Lt}

    /*For PrimeNG*/
    .p-accordionpanel:not(.p-accordionpanel-active) > .p-accordioncontent,
    .p-accordioncontent-content.ng-animating {
        overflow: hidden;
    }

    .p-accordionheader-toggle-icon.icon-start {
        order: -1;
    }

    .p-accordionheader:has(.p-accordionheader-toggle-icon.icon-start) {
        justify-content: flex-start;
        gap: dt('accordion.header.padding');
    }

    .p-accordioncontent.ng-animating {
        overflow: hidden;
    }

    .p-accordionheader.p-ripple {
        overflow: hidden;
        position: relative;
    }
`,Rn={root:"p-accordion p-component",panel:({instance:t})=>["p-accordionpanel",{"p-accordionpanel-active":t.active(),"p-disabled":t.disabled()}],header:"p-accordionheader",toggleicon:"p-accordionheader-toggle-icon",contentContainer:"p-accordioncontent",content:"p-accordioncontent-content"},G=(()=>{class t extends Fe{name="accordion";style=jn;classes=Rn;static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275prov=V({token:t,factory:t.\u0275fac})}return t})();var Vt=new K("ACCORDION_PANEL_INSTANCE"),jt=new K("ACCORDION_HEADER_INSTANCE"),Rt=new K("ACCORDION_CONTENT_INSTANCE"),$t=new K("ACCORDION_INSTANCE"),xe=(()=>{class t extends ne{$pcAccordionPanel=u(Vt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=u(oe(()=>ue));value=ae(void 0);disabled=re(!1,{transform:e=>Le(e)});active=h(()=>this.pcAccordion.multiple()?this.valueEquals(this.pcAccordion.value(),this.value()):this.pcAccordion.value()===this.value());valueEquals(e,n){return Array.isArray(e)?e.includes(n):e===n}_componentStyle=u(G);static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-accordion-panel"],["p-accordionpanel"]],hostVars:4,hostBindings:function(n,i){n&2&&(S("data-p-disabled",i.disabled())("data-p-active",i.active()),A(i.cx("panel")))},inputs:{value:[1,"value"],disabled:[1,"disabled"]},outputs:{value:"valueChange"},features:[X([G,{provide:Vt,useExisting:t},{provide:te,useExisting:t}]),W([C]),D],ngContentSelectors:je,decls:1,vars:0,template:function(n,i){n&1&&(Z(),U(0))},dependencies:[ee,ie],encapsulation:2,changeDetection:0})}return t})(),et=(()=>{class t extends ne{$pcAccordionHeader=u(jt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=u(oe(()=>ue));pcAccordionPanel=u(oe(()=>xe));id=h(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);active=h(()=>this.pcAccordionPanel.active());disabled=h(()=>this.pcAccordionPanel.disabled());ariaControls=h(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);toggleicon;onClick(e){if(this.disabled())return;let n=this.active();this.changeActiveValue();let i=this.active(),r=this.pcAccordionPanel.value();!n&&i?this.pcAccordion.onOpen.emit({originalEvent:e,index:r}):n&&!i&&this.pcAccordion.onClose.emit({originalEvent:e,index:r})}onFocus(){!this.disabled()&&this.pcAccordion.selectOnFocus()&&this.changeActiveValue()}onKeydown(e){switch(e.code){case"ArrowDown":this.arrowDownKey(e);break;case"ArrowUp":this.arrowUpKey(e);break;case"Home":this.onHomeKey(e);break;case"End":this.onEndKey(e);break;case"Enter":case"Space":case"NumpadEnter":this.onEnterKey(e);break;default:break}}_componentStyle=u(G);changeActiveValue(){this.pcAccordion.updateValue(this.pcAccordionPanel.value())}findPanel(e){return e?.closest('[data-pc-name="accordionpanel"]')}findHeader(e){return le(e,'[data-pc-name="accordionheader"]')}findNextPanel(e,n=!1){let i=n?e:e.nextElementSibling;return i?we(i,"data-p-disabled")?this.findNextPanel(i):this.findHeader(i):null}findPrevPanel(e,n=!1){let i=n?e:e.previousElementSibling;return i?we(i,"data-p-disabled")?this.findPrevPanel(i):this.findHeader(i):null}findFirstPanel(){return this.findNextPanel(this.pcAccordion.el.nativeElement.firstElementChild,!0)}findLastPanel(){return this.findPrevPanel(this.pcAccordion.el.nativeElement.lastElementChild,!0)}changeFocusedPanel(e,n){Xe(n)}arrowDownKey(e){let n=this.findNextPanel(this.findPanel(e.currentTarget));n?this.changeFocusedPanel(e,n):this.onHomeKey(e),e.preventDefault()}arrowUpKey(e){let n=this.findPrevPanel(this.findPanel(e.currentTarget));n?this.changeFocusedPanel(e,n):this.onEndKey(e),e.preventDefault()}onHomeKey(e){let n=this.findFirstPanel();this.changeFocusedPanel(e,n),e.preventDefault()}onEndKey(e){let n=this.findLastPanel();this.changeFocusedPanel(e,n),e.preventDefault()}onEnterKey(e){this.disabled()||this.changeActiveValue(),e.preventDefault()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-accordion-header"],["p-accordionheader"]],contentQueries:function(n,i,r){if(n&1&&H(r,In,5),n&2){let p;M(p=P())&&(i.toggleicon=p.first)}},hostVars:12,hostBindings:function(n,i){n&1&&y("click",function(p){return i.onClick(p)})("focus",function(p){return i.onFocus(p)})("keydown",function(p){return i.onKeydown(p)}),n&2&&(S("id",i.id())("aria-expanded",i.active())("aria-controls",i.ariaControls())("aria-disabled",i.disabled())("role","button")("tabindex",i.disabled()?"-1":"0")("data-p-active",i.active())("data-p-disabled",i.disabled()),A(i.cx("header")),ot("user-select","none"))},features:[X([G,{provide:jt,useExisting:t},{provide:te,useExisting:t}]),W([St,C]),D],ngContentSelectors:je,decls:3,vars:1,consts:[[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],["data-p-icon","chevron-up",3,"class","pBind",4,"ngIf"],[3,"pBind"],["data-p-icon","chevron-up",3,"pBind"],["data-p-icon","chevron-down",3,"pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind"]],template:function(n,i){n&1&&(Z(),U(0),b(1,Mn,1,4)(2,Ln,2,2)),n&2&&(a(),w(i.toggleicon?1:2))},dependencies:[ee,Pe,Ne,Mt,Pt,ie,C],encapsulation:2,changeDetection:0})}return t})(),tt=(()=>{class t extends ne{$pcAccordionContent=u(Rt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}pcAccordion=u(oe(()=>ue));pcAccordionPanel=u(oe(()=>xe));active=h(()=>this.pcAccordionPanel.active());ariaLabelledby=h(()=>`${this.pcAccordion.id()}_accordionheader_${this.pcAccordionPanel.value()}`);id=h(()=>`${this.pcAccordion.id()}_accordioncontent_${this.pcAccordionPanel.value()}`);_componentStyle=u(G);ptParams=h(()=>({context:this.active()}));static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-accordion-content"],["p-accordioncontent"]],hostVars:6,hostBindings:function(n,i){n&2&&(S("id",i.id())("role","region")("data-p-active",i.active())("aria-labelledby",i.ariaLabelledby()),A(i.cx("contentContainer")))},features:[X([G,{provide:Rt,useExisting:t},{provide:te,useExisting:t}]),W([C]),D],ngContentSelectors:je,decls:2,vars:12,consts:[[3,"pBind"]],template:function(n,i){n&1&&(Z(),s(0,"div",0),U(1),c()),n&2&&(A(i.cx("content")),d("@content",i.active()?j(6,On,j(4,Ot,i.pcAccordion.transitionOptions)):j(10,Vn,j(8,Ot,i.pcAccordion.transitionOptions)))("pBind",i.ptm("content",i.ptParams())))},dependencies:[ee,ie,C],encapsulation:2,data:{animation:[Be("content",[ze("hidden",ce({height:"0",paddingBlockStart:"0",paddingBlockEnd:"0",borderBlockStartWidth:"0",borderBlockEndWidth:"0",visibility:"hidden"})),ze("visible",ce({height:"*"})),de("visible <=> hidden",[se("{{transitionParams}}")]),de("void => *",se(0))])]},changeDetection:0})}return t})(),ue=(()=>{class t extends ne{$pcAccordion=u($t,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=u(C,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}value=ae(void 0);multiple=re(!1,{transform:e=>Le(e)});styleClass;expandIcon;collapseIcon;selectOnFocus=re(!1,{transform:e=>Le(e)});transitionOptions="400ms cubic-bezier(0.86, 0, 0.07, 1)";onClose=new z;onOpen=new z;id=Q(wt("pn_id_"));_componentStyle=u(G);onKeydown(e){switch(e.code){case"ArrowDown":this.onTabArrowDownKey(e);break;case"ArrowUp":this.onTabArrowUpKey(e);break;case"Home":e.shiftKey||this.onTabHomeKey(e);break;case"End":e.shiftKey||this.onTabEndKey(e);break}}onTabArrowDownKey(e){let n=this.findNextHeaderAction(e.target.parentElement);n?this.changeFocusedTab(n):this.onTabHomeKey(e),e.preventDefault()}onTabArrowUpKey(e){let n=this.findPrevHeaderAction(e.target.parentElement);n?this.changeFocusedTab(n):this.onTabEndKey(e),e.preventDefault()}onTabHomeKey(e){let n=this.findFirstHeaderAction();this.changeFocusedTab(n),e.preventDefault()}changeFocusedTab(e){e&&Xe(e)}findNextHeaderAction(e,n=!1){let i=n?e:e.nextElementSibling,r=le(i,'[data-pc-section="accordionheader"]');return r?we(r,"data-p-disabled")?this.findNextHeaderAction(r.parentElement):le(r.parentElement,'[data-pc-section="accordionheader"]'):null}findPrevHeaderAction(e,n=!1){let i=n?e:e.previousElementSibling,r=le(i,'[data-pc-section="accordionheader"]');return r?we(r,"data-p-disabled")?this.findPrevHeaderAction(r.parentElement):le(r.parentElement,'[data-pc-section="accordionheader"]'):null}findFirstHeaderAction(){let e=this.el.nativeElement.firstElementChild;return this.findNextHeaderAction(e,!0)}findLastHeaderAction(){let e=this.el.nativeElement.lastElementChild;return this.findPrevHeaderAction(e,!0)}onTabEndKey(e){let n=this.findLastHeaderAction();this.changeFocusedTab(n),e.preventDefault()}getBlockableElement(){return this.el.nativeElement.children[0]}updateValue(e){let n=this.value();if(this.multiple()){let i=Array.isArray(n)?[...n]:[],r=i.indexOf(e);r!==-1?i.splice(r,1):i.push(e),this.value.set(i)}else n===e?this.value.set(void 0):this.value.set(e)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=k(t)))(i||t)}})();static \u0275cmp=T({type:t,selectors:[["p-accordion"]],hostVars:2,hostBindings:function(n,i){n&1&&y("keydown",function(p){return i.onKeydown(p)}),n&2&&A(i.cn(i.cx("root"),i.styleClass))},inputs:{value:[1,"value"],multiple:[1,"multiple"],styleClass:"styleClass",expandIcon:"expandIcon",collapseIcon:"collapseIcon",selectOnFocus:[1,"selectOnFocus"],transitionOptions:"transitionOptions"},outputs:{value:"valueChange",onClose:"onClose",onOpen:"onOpen"},features:[X([G,{provide:$t,useExisting:t},{provide:te,useExisting:t}]),W([C]),D],ngContentSelectors:je,decls:1,vars:0,template:function(n,i){n&1&&(Z(),U(0))},dependencies:[ee,$,ie],encapsulation:2,changeDetection:0})}return t})(),Gt=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=Te({type:t});static \u0275inj=Se({imports:[ue,$,xe,et,tt,ie,$,ie]})}return t})();var Gn=()=>({width:"70rem"}),Kn=()=>({"1199px":"75vw","575px":"90vw"}),qn=()=>({width:"25rem"}),qt=(t,o)=>o.id;function zn(t,o){if(t&1){let e=F();s(0,"button",20),y("click",function(){I(e);let i=l();return E(i.showQuestionModal.set(!0))}),s(1,"span",21),x(2,"Show Question"),c(),f(),s(3,"svg",22),m(4,"circle",23)(5,"path",24),c()()}}function Wn(t,o){if(t&1){let e=F();s(0,"button",27),y("click",function(){I(e);let i=l(2);return E(i.revisit())}),f(),s(1,"svg",28),m(2,"path",11),c(),ke(),s(3,"span"),x(4,"Revisit"),c()()}}function Zn(t,o){if(t&1){let e=F();s(0,"button",20),y("click",function(){I(e);let i=l(2);return E(i.revisit())}),s(1,"span",21),x(2,"Revisit"),c(),f(),s(3,"svg",29),m(4,"path",30)(5,"path",31)(6,"path",32),c()()}if(t&2){let e=l(2);_e("hidden",!e.isExamAlpha())}}function Un(t,o){if(t&1&&b(0,Wn,5,0,"button",25)(1,Zn,7,2,"button",26),t&2){let e,n=l();w(!((e=n.currentSectionSummary())==null||e.summary==null||e.summary.revisits==null)&&e.summary.revisits.includes(n.currentQuestionIndex())?0:1)}}function Xn(t,o){if(t&1){let e=F();s(0,"button",33),y("click",function(){I(e);let i=l();return E(i.readCurrentQuestion())}),s(1,"span",21),x(2,"Read aloud"),c(),f(),s(3,"svg",34),m(4,"polygon",35)(5,"path",36)(6,"path",37),c()()}}function Yn(t,o){if(t&1){let e=F();s(0,"button",3),y("click",function(){I(e);let i=l();return E(i.toggleLayout())}),f(),s(1,"svg",38),m(2,"path",39)(3,"path",40)(4,"path",41)(5,"path",42)(6,"path",43),c()()}}function Jn(t,o){if(t&1&&(s(0,"span",46),x(1),c()),t&2){let e=l(2);a(),De(e.currentBlockName())}}function ei(t,o){if(t&1&&(s(0,"div",44)(1,"span",45),x(2),c(),b(3,Jn,2,1,"span",46),c()),t&2){let e=l();a(2),be("Question ",e.currentQuestionIndex()+1),a(),w(e.currentBlockName()?3:-1)}}function ti(t,o){if(t&1&&(m(0,"div",13),Y(1,"safeHtml")),t&2){let e,n=l();d("innerHTML",J(1,1,(e=n.currentQuestion())==null?null:e.passage_stimulus),q)}}function ni(t,o){if(t&1&&(m(0,"div",13),Y(1,"safeHtml")),t&2){let e,n,i=l();_e("mt-5",(e=i.currentQuestion())==null?null:e.passage_stimulus),d("innerHTML",J(1,3,(n=i.currentQuestion())==null?null:n.stimulus),q)}}function ii(t,o){t&1&&(f(),s(0,"svg",51),m(1,"path",54),c())}function oi(t,o){t&1&&(f(),s(0,"svg",51),m(1,"path",54),c())}function ri(t,o){if(t&1&&(s(0,"div",48)(1,"div",49)(2,"span",50),x(3),c(),b(4,oi,2,0,":svg:svg",51),c(),m(5,"div",52),Y(6,"safeHtml"),c()),t&2){let e=o.$implicit,n=o.$index,i=l(4);_e("border-transparent",i.activeStoreId()!==e.id)("bg-blue-50",i.activeStoreId()===e.id&&!i.isAttempted(e.id))("border-blue-500",i.activeStoreId()===e.id&&!i.isAttempted(e.id))("bg-green-50",i.activeStoreId()===e.id&&i.isAttempted(e.id))("border-green-500",i.activeStoreId()===e.id&&i.isAttempted(e.id)),d("id","modal-sq-"+e.id),a(3),be("",i.getChildLabel(n),"."),a(),w(i.isAttempted(e.id)?4:-1),a(),d("innerHTML",J(6,14,e.stimulus),q)}}function ai(t,o){if(t&1&&(s(0,"div",53),Ie(1,ri,7,16,"div",55,qt),c()),t&2){let e=l().$implicit;a(),Ee(e.children)}}function si(t,o){if(t&1&&(s(0,"div",47)(1,"div",48)(2,"div",49)(3,"span",50),x(4),c(),b(5,ii,2,0,":svg:svg",51),c(),m(6,"div",52),Y(7,"safeHtml"),c(),b(8,ai,3,0,"div",53),c()),t&2){let e=o.$implicit,n=o.$index,i=l(2);a(),_e("border-transparent",i.activeStoreId()!==e.id)("bg-blue-50",i.activeStoreId()===e.id&&!i.isAttempted(e.id))("border-blue-500",i.activeStoreId()===e.id&&!i.isAttempted(e.id))("bg-green-50",i.activeStoreId()===e.id&&i.isAttempted(e.id))("border-green-500",i.activeStoreId()===e.id&&i.isAttempted(e.id)),d("id","modal-sq-"+e.id),a(3),be("",i.getParentLabel(n),"."),a(),w(i.isAttempted(e.id)?5:-1),a(),d("innerHTML",J(7,15,e.stimulus),q),a(2),w(e.children&&e.children.length?8:-1)}}function ci(t,o){if(t&1&&(s(0,"div",15),Ie(1,si,9,17,"div",47,qt),c()),t&2){let e,n=l();a(),Ee((e=n.currentQuestion())==null?null:e.sub_questions)}}function di(t,o){if(t&1&&(s(0,"p-accordion-panel",19)(1,"p-accordion-header"),x(2),c(),s(3,"p-accordion-content"),m(4,"div",13),Y(5,"safeHtml"),c()()),t&2){let e=o.$implicit,n=o.$index;d("value",rt(n)),a(2),be("",e.name," Instruction"),a(2),d("innerHTML",J(5,4,e.section_settings.section_instruction),q)}}var Kt=class t{_exam=u(_t);_store=u(ut);_konvaEventTools=u(Oe);_eventService=u(ft);_textToSpeech=u(At);_drawingStore=u(Ve);isTextToSpeechEnabled=h(()=>this._textToSpeech.isTextToSpeechEnabled());itemTypes=Q(mt);store=h(()=>this._store.store());currentQuestionIndex=h(()=>this.store().currentQuestionIndex);currentQuestion=h(()=>this.store().currentQuestion);currentSection=h(()=>this.store().currentSection);currentSectionSummary=h(()=>this._exam.currentSectionSummary());activeStoreId=h(()=>this.store().activeSubQuestionId||"default");allDrawingStores=h(()=>this._drawingStore.getAllStores());currentBlockName=h(()=>{let o=this.currentQuestion(),e=this.currentSection();return o&&e&&e?.blocks&&e.blocks.find(i=>i.id===o.block_id)?.blockName||""});showIntructionDrawer=Q(!1);showCalculator=ae(!1);showToggleLayoutButton=re(!1);showQuestionModal=Q(!1);showQuestionModalButton=ae(!0);isExamAlpha=h(()=>this._exam.isExamAlpha());constructor(){dt(o=>{let e=this.showIntructionDrawer();ct(()=>{if(e){this._eventService.logEvent({event_type:"INSTRUCTIONS_PANEL_TOGGLED"});let n=Date.now();o(()=>{let i=Date.now()-n;this._eventService.logEvent({event_type:"INSTRUCTIONS_PANEL_TOGGLED",duration_ms:i})})}})})}isAttempted(o){let n=this.allDrawingStores()[o];if(!n)return!1;let i=!1;return n.pages.forEach(r=>{r.strokes&&r.strokes.length&&(i=!0)}),i}onModalShow(){this.currentQuestion()?.item_type==="DRAWING_AND_WRITING"&&setTimeout(()=>{let o=document.getElementById("modal-sq-"+this.activeStoreId());o&&o.scrollIntoView({behavior:"smooth",block:"start"})},50)}revisit(){this._exam.addQuestionForRevisit();let o=this.store().currentQuestion?.revisit;this._eventService.logEvent({event_type:o?"QUESTION_FLAGGED":"QUESTION_UNFLAGGED",question_id:this.store().currentQuestion.id,section_id:this.store().currentSection.id})}readCurrentQuestion(){this._textToSpeech.announceCurrentQuestion()}getParentLabel(o){return ht(this.currentQuestionIndex(),o)}getChildLabel(o){return gt(o)}toggleLayout(){let o=this.store().drawingAndWritingConfig,e=v(g({},o),{layoutFullMode:!o.layoutFullMode});this._store.updateStore({drawingAndWritingConfig:e}),this._konvaEventTools._toggleDrawingAndWritingLayout$.next()}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=T({type:t,selectors:[["app-question-tools"]],inputs:{showCalculator:[1,"showCalculator"],showToggleLayoutButton:[1,"showToggleLayoutButton"],showQuestionModalButton:[1,"showQuestionModalButton"]},outputs:{showCalculator:"showCalculatorChange",showQuestionModalButton:"showQuestionModalButtonChange"},decls:33,vars:25,consts:[[1,"bg-gray-100","flex","items-center","gap-1","rounded-2xl","w-max","p-1"],[1,"bg-white","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-gray-200","text-sm","hover:border-primary","cursor-pointer"],["title","Read Question",1,"bg-white","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-gray-200","text-sm","hover:border-primary","cursor-pointer"],[1,"rounded-full","size-10","flex","items-center","justify-center","transition","duration-150","bg-white","border","border-transparent","hover:border-primary","cursor-pointer",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","20","height","20","fill","none","viewBox","0 0 24 24",1,"w-6","h-6","text-[#4a4a4a]"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","1.5","d","M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],[1,"rounded-full","size-10","flex","items-center","justify-center","transition","duration-150","bg-white","border","border-transparent","hover:border-primary","cursor-pointer"],[3,"visibleChange","onShow","appendTo","position","closable","dismissableMask","modal","visible","breakpoints"],["pTemplate","header"],["type","button",1,"absolute","top-3","right-3","bg-red-600","text-white","border-transparent","border","ring-0","outline-none","p-1","rounded","z-10","flex","items-center","gap-2","cursor-pointer","transition-colors","hover:bg-red-700",3,"click"],["xmlns","http://www.w3.org/2000/svg","fill","none","viewBox","0 0 24 24",1,"w-6","h-6","text-white"],["stroke","currentColor","stroke-linecap","round","stroke-linejoin","round","stroke-width","2","d","M6 18 17.94 6M18 18 6.06 6"],[1,"mb-8","p-6","select-none","pt-2"],[3,"innerHTML"],[3,"innerHTML","mt-5"],[1,"mt-6","flex","flex-col","gap-6","pl-4","border-l-2","border-gray-200"],["header","Instruction","position","right",3,"visibleChange","visible"],["value","0"],["value","1"],[3,"value"],[1,"bg-white","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-gray-200","text-sm","hover:border-primary","cursor-pointer",3,"click"],[1,"hidden","lg:inline"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","width","20","height","20","color","#3c3c3c","fill","none","stroke","#141B34","stroke-width","1.5"],["cx","12","cy","12","r","10"],["d","M16.0633 16.0634C16.5806 15.5461 16.4946 13.3483 16.4946 13.3483M16.0633 16.0634C15.546 16.5808 13.3483 16.4946 13.3483 16.4946M16.0633 16.0634L13 13M7.93655 7.93661C8.45388 7.41928 10.6516 7.50537 10.6516 7.50537M7.93655 7.93661C7.41923 8.45394 7.50538 10.6516 7.50538 10.6516M7.93655 7.93661L11 11"],[1,"bg-amber-200","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-amber-300","text-sm","hover:border-primary","cursor-pointer"],[1,"bg-white","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-gray-200","text-sm","hover:border-primary","cursor-pointer",3,"hidden"],[1,"bg-amber-200","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-amber-300","text-sm","hover:border-primary","cursor-pointer",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","10","height","10","fill","none","viewBox","0 0 24 24",1,"w-5","h-5"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","width","20","height","20","color","#3c3c3c","fill","none","stroke","#3c3c3c","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],["d","M8.76938 2.5C8.4973 2.59728 8.23058 2.70543 7.96979 2.8239M5.42501 4.46566C5.19851 4.66428 4.98106 4.87255 4.77334 5.08979M3.03178 7.56476C2.84599 7.93804 2.68313 8.32421 2.54498 8.72152M2.01608 11.3914C1.99387 11.7808 1.99471 12.1778 2.01835 12.5673M2.56845 15.2658C2.70147 15.6396 2.85641 16.0035 3.03178 16.3558M4.69086 18.7435C4.93508 19.005 5.19323 19.2539 5.46415 19.4891M7.77635 21.0064C8.17073 21.1954 8.57927 21.3606 9 21.5"],["d","M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"],["d","M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M12 13.5V16M12 10.5V6"],["title","Read Question",1,"bg-white","flex","items-center","gap-2","rounded-2xl","w-max","px-3","py-2","border","border-gray-200","text-sm","hover:border-primary","cursor-pointer",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","20","height","20","viewBox","0 0 24 24","fill","none","stroke","currentColor","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],["points","11 5 6 9 2 9 2 15 6 15 11 19 11 5"],["d","M15.54 8.46a5 5 0 0 1 0 7.07"],["d","M19.07 4.93a10 10 0 0 1 0 14.14"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","width","20","height","20","color","#292828","fill","none"],["d","M2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95491C5.3754 3 7.25027 3 11 3H13C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95491 18.9389C2 17.6246 2 15.7497 2 12Z","stroke","#292828","stroke-width","1.5","stroke-linejoin","round"],["d","M9.5 3.5L9.5 20.5","stroke","#292828","stroke-width","1.5","stroke-linejoin","round"],["d","M5 7C5 7 5.91421 7 6.5 7","stroke","#292828","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],["d","M5 11H6.5","stroke","#292828","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],["d","M17 10L15.7735 11.0572C15.2578 11.5016 15 11.7239 15 12C15 12.2761 15.2578 12.4984 15.7735 12.9428L17 14","stroke","#292828","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],[1,"flex","items-center","gap-4","mt-2"],[1,"text-xl","font-bold","text-gray-900"],[1,"text-lg","font-semibold","text-gray-600","border-l-2","border-gray-300","pl-4"],[1,"flex","flex-col","gap-2"],[1,"flex","gap-2","p-2","transition-all","duration-300","border-l-4",3,"id"],[1,"flex","flex-col","items-center","gap-1","mt-1"],[1,"font-bold","text-gray-800"],["fill","none","viewBox","0 0 24 24","stroke","currentColor","stroke-width","3",1,"size-4","text-green-600"],[1,"editor-content",3,"innerHTML"],[1,"flex","flex-col","gap-4","pl-6","mt-2","border-l","border-gray-100"],["stroke-linecap","round","stroke-linejoin","round","d","M5 13l4 4L19 7"],[1,"flex","gap-2","p-2","transition-all","duration-300","border-l-4",3,"id","border-transparent","bg-blue-50","border-blue-500","bg-green-50","border-green-500"]],template:function(e,n){if(e&1&&(s(0,"div",0),b(1,zn,6,0,"button",1),b(2,Un,2,1),b(3,Xn,7,0,"button",2),s(4,"button",3),y("click",function(){return n.showIntructionDrawer.set(!n.showIntructionDrawer())}),f(),s(5,"svg",4),m(6,"path",5),c()(),b(7,Yn,7,0,"button",6),c(),ke(),s(8,"p-dialog",7),qe("visibleChange",function(r){return Ke(n.showQuestionModal,r)||(n.showQuestionModal=r),r}),y("visibleChange",function(){return n.showQuestionModal.set(!1)})("onShow",function(){return n.onModalShow()}),_(9,ei,4,2,"ng-template",8),s(10,"button",9),y("click",function(){return n.showQuestionModal.set(!1)}),f(),s(11,"svg",10),m(12,"path",11),c(),x(13," Close "),c(),ke(),s(14,"div",12),b(15,ti,2,3,"div",13),b(16,ni,2,5,"div",14),b(17,ci,3,0,"div",15),c()(),s(18,"p-drawer",16),qe("visibleChange",function(r){return Ke(n.showIntructionDrawer,r)||(n.showIntructionDrawer=r),r}),y("visibleChange",function(){return n.showCalculator.set(!n.showCalculator())}),s(19,"p-accordion",17)(20,"p-accordion-panel",17)(21,"p-accordion-header"),x(22,"Exam Instruction"),c(),s(23,"p-accordion-content"),m(24,"div",13),Y(25,"safeHtml"),c()(),s(26,"p-accordion-panel",18)(27,"p-accordion-header"),x(28,"Section Instruction"),c(),s(29,"p-accordion-content")(30,"p-accordion"),Ie(31,di,6,6,"p-accordion-panel",19,it),c()()()()()),e&2){let i,r,p,O,N,Re,nt;a(),w(n.showQuestionModalButton()&&!n.isTextToSpeechEnabled()?1:-1),a(),w(!((i=n.currentSectionSummary())==null||i.summary==null||i.summary.attempted==null)&&i.summary.attempted.includes(n.currentQuestionIndex())?-1:2),a(),w(n.isTextToSpeechEnabled()?3:-1),a(4),w(((r=n.currentQuestion())==null?null:r.item_type)==n.itemTypes().DRAWING_AND_WRITING&&n.showToggleLayoutButton()?7:-1),a(),ve(Me(22,Gn)),d("appendTo","body")("position","top")("closable",!1)("dismissableMask",!0)("modal",!0),Ge("visible",n.showQuestionModal),d("breakpoints",Me(23,Kn)),a(7),w((p=n.currentQuestion())!=null&&p.passage_stimulus?15:-1),a(),w((O=n.currentQuestion())!=null&&O.stimulus?16:-1),a(),w(((N=n.currentQuestion())==null?null:N.item_type)===n.itemTypes().DRAWING_AND_WRITING&&(!((N=n.currentQuestion())==null||N.sub_questions==null)&&N.sub_questions.length)?17:-1),a(),ve(Me(24,qn)),Ge("visible",n.showIntructionDrawer),a(6),d("innerHTML",J(25,20,(Re=n.store().loginData)==null||Re.assessment_data==null?null:Re.assessment_data.start_exam_instruction),q),a(7),Ee((nt=n.store().loginData)==null?null:nt.sections_questions)}},dependencies:[Et,Ht,Je,Qe,Gt,ue,xe,et,tt,Dt],encapsulation:2})};export{Oe as a,Ve as b,Kt as c};
