(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/Xfe":
/*!***********************************************!*\
  !*** ./src/app/services/dbcatcher.service.ts ***!
  \***********************************************/
/*! exports provided: DBCatcherService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DBCatcherService", function() { return DBCatcherService; });
/* harmony import */ var _classes_product_post__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../classes/product-post */ "Z6BE");
/* harmony import */ var _classes_tattoo_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/tattoo-post */ "2XHM");
/* harmony import */ var _classes_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../classes/user */ "UxUN");
/* harmony import */ var _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsons/user.json */ "76sm");
var _jsons_user_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../jsons/user.json */ "76sm", 1);
/* harmony import */ var _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../jsons/tattooposts.json */ "zOX/");
var _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../jsons/tattooposts.json */ "zOX/", 1);
/* harmony import */ var _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../jsons/product.json */ "4x0u");
var _jsons_product_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../jsons/product.json */ "4x0u", 1);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");








class DBCatcherService {
    constructor(db) {
        this.db = db;
        this.ID_postsT = 0; //tattoos
        this.ID_postsP = 0; //products
        this.UserList = [];
        this.TattooPostsList = [];
        this.ProductPostsList = [];
        for (let i = 0; i < _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__.length; i++) {
            this.tempuser = new _classes_user__WEBPACK_IMPORTED_MODULE_2__["User"](_jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].UserID.toString(), _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].nombre, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].apellidos, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].alias, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].password, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].email, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].isTatuador, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].tel, _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].imgUsuario);
            let tempavg = 0;
            this.tempuser.valoracionArray = _jsons_user_json__WEBPACK_IMPORTED_MODULE_3__[i].valoracion;
            this.tempuser.valoracionArray.forEach(element => {
                tempavg += element;
            });
            this.tempuser.valoracion = tempavg / this.tempuser.valoracionArray.length;
            this.UserList.push(this.tempuser);
            this.setTempUserToFirestore();
        }
        //TattooPost
        for (let i = 0; i < _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__.length; i++) {
            this.tempTattooPosts = new _classes_tattoo_post__WEBPACK_IMPORTED_MODULE_1__["TattooPost"](_jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].postNombre, _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].postImg, _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].descripcion, _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].Tags, _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].UserID.toString(), _jsons_tattooposts_json__WEBPACK_IMPORTED_MODULE_4__[i].Likes);
            this.tempTattooPosts.id = this.ID_postsT++;
            this.TattooPostsList.push(this.tempTattooPosts);
            this.setTempTattoosPostsToFirestore();
        }
        //Productos
        for (let i = 0; i < _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products.length; i++) {
            this.tempProductPost = new _classes_product_post__WEBPACK_IMPORTED_MODULE_0__["ProductPost"](_jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].postNombre, _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].postImg, _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].descripcion, _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].Tags, _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].UserID.toString(), _jsons_product_json__WEBPACK_IMPORTED_MODULE_5__.products[i].Precio);
            for (let counter = 0; counter < this.UserList.length; counter++) {
                if (this.tempProductPost.UserID == this.UserList[counter].id) {
                    this.tempProductPost.VendorValoracion =
                        this.UserList[counter].valoracion;
                }
            }
            this.tempProductPost.id = this.ID_postsP++;
            this.ProductPostsList.push(this.tempProductPost);
            this.setTempProductsToFirestore();
        }
    }
    getFromFireStoreDB() {
    }
    // --------------------------- USER FUNCTIONS ------------------------------------
    setNewUser(data) {
        this.tempuser = new _classes_user__WEBPACK_IMPORTED_MODULE_2__["User"](this.generateUID(), //AQUI IRA EL ID UNICO CON MATH RANDOM.
        (data.nombre) ? data.nombre : "", (data.apellidos) ? data.apellidos : "", data.alias, data.password, data.email, (data.isTatuador) ? data.isTatuador : false, (data.tel) ? data.tel : 111111111, (data.imgUsuario) ? data.imgUsuario : "../assets/imgs/user.png");
        this.setTempUserToFirestore();
    }
    generateUID() {
        let dateString = Date.now().toString(36);
        let randomChain = Math.random().toString(36).substr(2);
        return dateString + randomChain;
    }
    getUser() {
    }
    setTempUserToFirestore() {
        this.db.collection("Users").doc(this.tempuser.id.toString()).set({
            "UserID": this.tempuser.id,
            "nombre": this.tempuser.nombre,
            "apellidos": this.tempuser.apellidos,
            "alias": this.tempuser.alias,
            "password": this.tempuser.password,
            "email": this.tempuser.email,
            "isTatuador": this.tempuser.isTatuador,
            "tel": this.tempuser.tel,
            "imgUsuario": this.tempuser.imgUsuario,
            "valoraciones": this.tempuser.valoracionArray,
            "valoracionAvg": this.tempuser.valoracion,
        })
            .then(docRef => {
            console.log("New User Created");
        })
            .catch(error => {
            console.error(error);
        });
    }
    // ------------------------------ POST FUNCTIONS ------------------------------------
    setTempProductsToFirestore() {
        this.db.collection("Productos").doc(this.tempProductPost.id.toString()).set({
            "postName": this.tempProductPost.postNombre,
            "postImg": this.tempProductPost.postImg,
            "Description": this.tempProductPost.Descripcion,
            "Tags": this.tempProductPost.Tags,
            "VendorID": this.tempProductPost.UserID.toString(),
            "VendorValoration": this.tempProductPost.VendorValoracion,
        })
            .then(docRef => {
            console.log("New Post type Product Created");
        })
            .catch(error => {
            console.error(error);
        });
    }
    setTempTattoosPostsToFirestore() {
        this.db.collection("Tattoos").doc(this.tempTattooPosts.id.toString()).set({
            "postName": this.tempTattooPosts.postNombre,
            "postImg": this.tempTattooPosts.postImg,
            "Description": this.tempTattooPosts.Descripcion,
            "Tags": this.tempTattooPosts.Tags,
            "UserID": this.tempTattooPosts.UserID.toString(),
            "Likes": this.tempTattooPosts.likes,
        })
            .then(docRef => {
            console.log("New Post type Tattoo Created");
        })
            .catch(error => {
            console.error(error);
        });
    }
    setNewPost(data, postType, userID) {
    }
}
DBCatcherService.ɵfac = function DBCatcherService_Factory(t) { return new (t || DBCatcherService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestore"])); };
DBCatcherService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({ token: DBCatcherService, factory: DBCatcherService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Trabajo\Barcelona Activa\Programación HTML Y CSS\Proyectos\MaquetacionHTML_BA_JM\MaquetacionHTML_BA_JM\ProyectosFInales_Modulo6\Tagora-2.0\src\main.ts */"zUnb");


/***/ }),

/***/ "10O5":
/*!****************************************************!*\
  !*** ./src/app/pages/product/product.component.ts ***!
  \****************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ProductComponent {
    constructor() { }
    ngOnInit() {
    }
}
ProductComponent.ɵfac = function ProductComponent_Factory(t) { return new (t || ProductComponent)(); };
ProductComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProductComponent, selectors: [["app-product"]], decls: 2, vars: 0, template: function ProductComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "product works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9kdWN0LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "2MiI":
/*!*******************************************************!*\
  !*** ./src/app/components/header/header.component.ts ***!
  \*******************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class HeaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 24, vars: 0, consts: [["id", "container"], ["id", "header"], ["id", "logo", "src", "../../../assets/imgs/tagora_logosSketch.png"], ["id", "buscador"], ["src", "../../../assets/imgs/search.svg"], ["type", "text", "placeholder", "Buscar tattoo o material"], ["id", "nav"], ["id", "home", "src", "../../../assets/imgs/1x/home-white.png"], ["id", "machine", "src", "../../../assets/imgs/machine-tattoo-white-10.svg"], ["id", "perfil", "src", "../../../assets/imgs/plus-circle-user-02.svg"], ["id", "shop", "src", "../../../assets/imgs/1x/shop-white.png"], ["id", "community", "src", "../../../assets/imgs/1x/community-white.png"], ["id", "containerPc"], ["id", "perfil", "src", "../../../assets/imgs/plus-circle-user.svg"], ["id", "home", "src", "../../../assets/imgs/1x/home-black.png"], ["id", "machine", "src", "../../../assets/imgs/machine-black-09.svg"], ["id", "shop", "src", "../../../assets/imgs/1x/shop-black.png"], ["id", "community", "src", "../../../assets/imgs/1x/comunity-black.png"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "img", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["@media screen and (max-width:767px) {\r\n#container[_ngcontent-%COMP%]{\r\n  flex-direction: column;\r\n  position:fixed;\r\n  display:flex;\r\n  justify-content: space-between;\r\n  width:100vw;\r\n  height:100vh;\r\n  margin:0px;\r\n  z-index: 1;\r\n}\r\n\r\n#containerPc[_ngcontent-%COMP%]{\r\n  display:none;\r\n}\r\n\r\n#header[_ngcontent-%COMP%]{\r\n  padding: 3% 3% 3% 3%;\r\n  width:100vw;\r\n  height:10vh;\r\n  display:flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  box-shadow: 0px 2px 8px 2px rgb(19, 19, 19, 0.4);\r\n  background-color: var(--white-bones-color);\r\n}\r\n\r\n\r\n#logo[_ngcontent-%COMP%]{\r\n  width:16.5%;\r\n  height:100%;\r\n}\r\n\r\n#buscador[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  height:85%;\r\n  width:65%;\r\n  border-radius: 40px;\r\n  border: 2px solid black;\r\n}\r\n\r\n#buscador[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  margin-left:0.8em;\r\n  width:1.4em;\r\n  color:black;\r\n}\r\n\r\ninput[_ngcontent-%COMP%]{\r\n  background-color: transparent;\r\n  border:none;\r\n  padding:1.2em 1.6em 1.2em 0.8em;\r\n  width:90%;\r\n  outline: none;\r\n  font-size: 0.8em;\r\n  font-family: 'Poppins', sans-serif;\r\n  text-align: center;\r\n}\r\ninput[_ngcontent-%COMP%]::placeholder{\r\n  color: rgb(36, 36, 36);\r\n  font-size: 0.8em;\r\n  font-family: 'Poppins', sans-serif;\r\n  outline: none;\r\n  text-align: center;\r\n}\r\n\r\n\r\n#nav[_ngcontent-%COMP%]{\r\n  padding:30px;\r\n  height:14vh;\r\n  display:flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n  position:relative;\r\n  background-color: black;\r\n  border-radius: 10000px 10000px 0px 0px;\r\n  border-top: 3px solid var(--white-bones-color);\r\n  border-right:3px solid var(--white-bones-color) ;\r\n  border-left:3px solid var(--white-bones-color) ;\r\n  border-bottom:0px none var(--white-bones-color) ;;\r\n  box-shadow: 0px -2px 8px 2px rgb(19, 19, 19, 0.4);\r\n\r\n}\r\n\r\n#perfil[_ngcontent-%COMP%]{\r\n  position:absolute;\r\n  width:3.9em;\r\n  height: 3.9em;\r\n  border-radius: 100px;\r\n  border:3px solid var(--white-bones-color);\r\n  top:-2em;\r\n  box-shadow: 0px -2px 8px 2px rgb(19, 19, 19, 0.4);\r\n  background-color: var(--white-bones-color);\r\n}\r\n\r\n\r\n#home[_ngcontent-%COMP%], #machine[_ngcontent-%COMP%], #shop[_ngcontent-%COMP%], #community[_ngcontent-%COMP%]{\r\n  padding-top:20px;\r\n  color:var(--white-bones-color);\r\n  width:2.6em;\r\n  height:3.6em;\r\n}\r\n\r\n#machine[_ngcontent-%COMP%]{\r\n  transform:translateY(360);\r\n  margin-right: 25px;\r\n}\r\n\r\n#shop[_ngcontent-%COMP%]{\r\n  margin-left:25px;\r\n}\r\n\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width:768px) and (max-width:1023px){\r\n\r\n  #container[_ngcontent-%COMP%]{\r\n    flex-direction: column;\r\n    position:fixed;\r\n    display:flex;\r\n    justify-content: space-between;\r\n    width:100vw;\r\n    height:100vh;\r\n    margin:0px;\r\n  }\r\n\r\n  #containerPc[_ngcontent-%COMP%]{\r\n    display:none;\r\n  }\r\n\r\n  #header[_ngcontent-%COMP%]{\r\n    width:100vw;\r\n    height:10vh;\r\n    display:flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    box-shadow: 0px 2px 8px 2px rgb(19, 19, 19, 0.4);\r\n    background-color: var(--white-bones-color);\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]{\r\n    width:53.25px;\r\n    height:69.85px;\r\n  }\r\n\r\n  #buscador[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    width:230px;\r\n    border-radius: 40px;\r\n    border: 2px solid black;\r\n  }\r\n\r\n  #buscador[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:20px;\r\n    color:black;\r\n  }\r\n\r\n  input[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    border:none;\r\n    padding:12px;\r\n    outline: none;\r\n  }\r\n\r\n  input[_ngcontent-%COMP%]::placeholder{\r\n    color: rgb(36, 36, 36);\r\n    font-size: 12px;\r\n    font-family: 'Poppins', sans-serif;\r\n    outline: none;\r\n  }\r\n\r\n\r\n  #nav[_ngcontent-%COMP%]{\r\n    padding:40px;\r\n    display:flex;\r\n    justify-content: space-around;\r\n    align-items: center;\r\n    position:relative;\r\n    background-color: black;\r\n    border-radius: 100px 100px 0px 0px;\r\n    border-top: 3px solid var(--white-bones-color);\r\n    border-right:3px solid var(--white-bones-color) ;\r\n    border-left:3px solid var(--white-bones-color) ;\r\n    border-bottom:0px none var(--white-bones-color) ;;\r\n    box-shadow: 0px -2px 8px 2px rgb(19, 19, 19, 0.4);\r\n    height:14vh;\r\n  }\r\n\r\n  #perfil[_ngcontent-%COMP%]{\r\n    position:absolute;\r\n    background-color: var(--red-color);\r\n    width:70px;\r\n    height: 70px;\r\n    border-radius: 100px;\r\n    border:3px solid var(--white-bones-color);\r\n    top:-35%;\r\n    box-shadow: 0px -2px 8px 2px rgb(19, 19, 19, 0.4);\r\n  }\r\n\r\n  #home[_ngcontent-%COMP%], #machine[_ngcontent-%COMP%], #shop[_ngcontent-%COMP%], #community[_ngcontent-%COMP%]{\r\n    padding-top:20px;\r\n    color:var(--white-bones-color);\r\n    width:50px;\r\n    height:50px;\r\n  }\r\n\r\n  #machine[_ngcontent-%COMP%]{\r\n    transform:translateX(180);\r\n  }\r\n\r\n  }\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width: 1024px) {\r\n\r\n\r\n  #container[_ngcontent-%COMP%]{\r\n   display:none\r\n  }\r\n\r\n  #containerPc[_ngcontent-%COMP%]{\r\n    position:fixed;\r\n    display:flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width:100vw;\r\n    height:12vh;\r\n    margin:0px;\r\n    box-shadow: 0px -2px 8px 2px rgb(19, 19, 19, 0.4);\r\n    background-color: var(--white-bones-color);\r\n  }\r\n\r\n  #header[_ngcontent-%COMP%]{\r\n    padding:20px;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]{\r\n    width:100px;\r\n    height:80px;\r\n    padding:4px 25px 4px 4px;\r\n    order:2;\r\n  }\r\n\r\n  #buscador[_ngcontent-%COMP%]{\r\n    padding-left:20px;\r\n    display:flex;\r\n    align-items: center;\r\n    width:350px;\r\n    height:40px;\r\n    border-radius: 40px;\r\n    border: 2px solid black;\r\n    margin-right:20px;\r\n  }\r\n\r\n  #buscador[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:25px;\r\n    color:black;\r\n    margin-right:20px;\r\n  }\r\n\r\n  input[_ngcontent-%COMP%]{\r\n    background-color: transparent;\r\n    border:none;\r\n    font-size: 12px;\r\n    font-family: 'Poppins', sans-serif;\r\n    width:80%;\r\n    outline: none;text-align:center;\r\n\r\n  }\r\n\r\n\r\n  input[_ngcontent-%COMP%]::placeholder{\r\n    color: rgb(36, 36, 36);\r\n    font-size: 12px;\r\n    font-family: 'Poppins', sans-serif;\r\n    outline: none;\r\n  }\r\n\r\n\r\n  #nav[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    height:12vh;\r\n    border-radius:0px 90px 90px 0px;\r\n    padding:0px 25px;\r\n    box-shadow: -2px 0px 8px 2px rgb(19, 19, 19, 0.4);\r\n  }\r\n\r\n  #perfil[_ngcontent-%COMP%]{\r\n    background-color: var(--red-color);\r\n    width:60px;\r\n    height: 60px;\r\n    border-radius: 100px;\r\n    border:3px solid var(--white-bones-color);\r\n    top:-35%;\r\n    box-shadow: 2px 2px 4px 1px rgb(19, 19, 19, 0.4);\r\n    margin-right:20px;\r\n    background-color: var(--white-bones-color);\r\n  }\r\n\r\n\r\n  #home[_ngcontent-%COMP%], #machine[_ngcontent-%COMP%], #shop[_ngcontent-%COMP%], #community[_ngcontent-%COMP%]{\r\n    width:30px;\r\n    height:30px;\r\n    margin-right:20px;\r\n  }\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,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YWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo3NjdweCkge1xyXG4jY29udGFpbmVye1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcG9zaXRpb246Zml4ZWQ7XHJcbiAgZGlzcGxheTpmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICB3aWR0aDoxMDB2dztcclxuICBoZWlnaHQ6MTAwdmg7XHJcbiAgbWFyZ2luOjBweDtcclxuICB6LWluZGV4OiAxO1xyXG59XHJcblxyXG4jY29udGFpbmVyUGN7XHJcbiAgZGlzcGxheTpub25lO1xyXG59XHJcblxyXG4jaGVhZGVye1xyXG4gIHBhZGRpbmc6IDMlIDMlIDMlIDMlO1xyXG4gIHdpZHRoOjEwMHZ3O1xyXG4gIGhlaWdodDoxMHZoO1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbn1cclxuXHJcblxyXG4jbG9nb3tcclxuICB3aWR0aDoxNi41JTtcclxuICBoZWlnaHQ6MTAwJTtcclxufVxyXG5cclxuI2J1c2NhZG9ye1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDo4NSU7XHJcbiAgd2lkdGg6NjUlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XHJcbn1cclxuXHJcbiNidXNjYWRvciBpbWd7XHJcbiAgbWFyZ2luLWxlZnQ6MC44ZW07XHJcbiAgd2lkdGg6MS40ZW07XHJcbiAgY29sb3I6YmxhY2s7XHJcbn1cclxuXHJcbmlucHV0e1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGJvcmRlcjpub25lO1xyXG4gIHBhZGRpbmc6MS4yZW0gMS42ZW0gMS4yZW0gMC44ZW07XHJcbiAgd2lkdGg6OTAlO1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgZm9udC1zaXplOiAwLjhlbTtcclxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5pbnB1dDo6cGxhY2Vob2xkZXJ7XHJcbiAgY29sb3I6IHJnYigzNiwgMzYsIDM2KTtcclxuICBmb250LXNpemU6IDAuOGVtO1xyXG4gIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcblxyXG4jbmF2e1xyXG4gIHBhZGRpbmc6MzBweDtcclxuICBoZWlnaHQ6MTR2aDtcclxuICBkaXNwbGF5OmZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAxMDAwMHB4IDEwMDAwcHggMHB4IDBweDtcclxuICBib3JkZXItdG9wOiAzcHggc29saWQgdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gIGJvcmRlci1yaWdodDozcHggc29saWQgdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpIDtcclxuICBib3JkZXItbGVmdDozcHggc29saWQgdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpIDtcclxuICBib3JkZXItYm90dG9tOjBweCBub25lIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKSA7O1xyXG4gIGJveC1zaGFkb3c6IDBweCAtMnB4IDhweCAycHggcmdiKDE5LCAxOSwgMTksIDAuNCk7XHJcblxyXG59XHJcblxyXG4jcGVyZmlse1xyXG4gIHBvc2l0aW9uOmFic29sdXRlO1xyXG4gIHdpZHRoOjMuOWVtO1xyXG4gIGhlaWdodDogMy45ZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgYm9yZGVyOjNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgdG9wOi0yZW07XHJcbiAgYm94LXNoYWRvdzogMHB4IC0ycHggOHB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbn1cclxuXHJcblxyXG4jaG9tZSwjbWFjaGluZSwjc2hvcCwjY29tbXVuaXR5e1xyXG4gIHBhZGRpbmctdG9wOjIwcHg7XHJcbiAgY29sb3I6dmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gIHdpZHRoOjIuNmVtO1xyXG4gIGhlaWdodDozLjZlbTtcclxufVxyXG5cclxuI21hY2hpbmV7XHJcbiAgdHJhbnNmb3JtOnRyYW5zbGF0ZVkoMzYwKTtcclxuICBtYXJnaW4tcmlnaHQ6IDI1cHg7XHJcbn1cclxuXHJcbiNzaG9we1xyXG4gIG1hcmdpbi1sZWZ0OjI1cHg7XHJcbn1cclxuXHJcblxyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLVRhYmxldCovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjc2OHB4KSBhbmQgKG1heC13aWR0aDoxMDIzcHgpe1xyXG5cclxuICAjY29udGFpbmVye1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIHBvc2l0aW9uOmZpeGVkO1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgd2lkdGg6MTAwdnc7XHJcbiAgICBoZWlnaHQ6MTAwdmg7XHJcbiAgICBtYXJnaW46MHB4O1xyXG4gIH1cclxuXHJcbiAgI2NvbnRhaW5lclBje1xyXG4gICAgZGlzcGxheTpub25lO1xyXG4gIH1cclxuXHJcbiAgI2hlYWRlcntcclxuICAgIHdpZHRoOjEwMHZ3O1xyXG4gICAgaGVpZ2h0OjEwdmg7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAycHggcmdiKDE5LCAxOSwgMTksIDAuNCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgfVxyXG5cclxuICAjbG9nb3tcclxuICAgIHdpZHRoOjUzLjI1cHg7XHJcbiAgICBoZWlnaHQ6NjkuODVweDtcclxuICB9XHJcblxyXG4gICNidXNjYWRvcntcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOjIzMHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xyXG4gIH1cclxuXHJcbiAgI2J1c2NhZG9yIGltZ3tcclxuICAgIHdpZHRoOjIwcHg7XHJcbiAgICBjb2xvcjpibGFjaztcclxuICB9XHJcblxyXG4gIGlucHV0e1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICAgIHBhZGRpbmc6MTJweDtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgfVxyXG5cclxuICBpbnB1dDo6cGxhY2Vob2xkZXJ7XHJcbiAgICBjb2xvcjogcmdiKDM2LCAzNiwgMzYpO1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjtcclxuICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgfVxyXG5cclxuXHJcbiAgI25hdntcclxuICAgIHBhZGRpbmc6NDBweDtcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweCAxMDBweCAwcHggMHB4O1xyXG4gICAgYm9yZGVyLXRvcDogM3B4IHNvbGlkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGJvcmRlci1yaWdodDozcHggc29saWQgdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpIDtcclxuICAgIGJvcmRlci1sZWZ0OjNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcikgO1xyXG4gICAgYm9yZGVyLWJvdHRvbTowcHggbm9uZSB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcikgOztcclxuICAgIGJveC1zaGFkb3c6IDBweCAtMnB4IDhweCAycHggcmdiKDE5LCAxOSwgMTksIDAuNCk7XHJcbiAgICBoZWlnaHQ6MTR2aDtcclxuICB9XHJcblxyXG4gICNwZXJmaWx7XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJlZC1jb2xvcik7XHJcbiAgICB3aWR0aDo3MHB4O1xyXG4gICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICBib3JkZXI6M3B4IHNvbGlkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIHRvcDotMzUlO1xyXG4gICAgYm94LXNoYWRvdzogMHB4IC0ycHggOHB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICB9XHJcblxyXG4gICNob21lLCNtYWNoaW5lLCNzaG9wLCNjb21tdW5pdHl7XHJcbiAgICBwYWRkaW5nLXRvcDoyMHB4O1xyXG4gICAgY29sb3I6dmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gICAgd2lkdGg6NTBweDtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gIH1cclxuXHJcbiAgI21hY2hpbmV7XHJcbiAgICB0cmFuc2Zvcm06dHJhbnNsYXRlWCgxODApO1xyXG4gIH1cclxuXHJcbiAgfVxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS1QQyovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcclxuXHJcblxyXG4gICNjb250YWluZXJ7XHJcbiAgIGRpc3BsYXk6bm9uZVxyXG4gIH1cclxuXHJcbiAgI2NvbnRhaW5lclBje1xyXG4gICAgcG9zaXRpb246Zml4ZWQ7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6MTAwdnc7XHJcbiAgICBoZWlnaHQ6MTJ2aDtcclxuICAgIG1hcmdpbjowcHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggLTJweCA4cHggMnB4IHJnYigxOSwgMTksIDE5LCAwLjQpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gIH1cclxuXHJcbiAgI2hlYWRlcntcclxuICAgIHBhZGRpbmc6MjBweDtcclxuICB9XHJcblxyXG4gICNsb2dve1xyXG4gICAgd2lkdGg6MTAwcHg7XHJcbiAgICBoZWlnaHQ6ODBweDtcclxuICAgIHBhZGRpbmc6NHB4IDI1cHggNHB4IDRweDtcclxuICAgIG9yZGVyOjI7XHJcbiAgfVxyXG5cclxuICAjYnVzY2Fkb3J7XHJcbiAgICBwYWRkaW5nLWxlZnQ6MjBweDtcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB3aWR0aDozNTBweDtcclxuICAgIGhlaWdodDo0MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgbWFyZ2luLXJpZ2h0OjIwcHg7XHJcbiAgfVxyXG5cclxuICAjYnVzY2Fkb3IgaW1ne1xyXG4gICAgd2lkdGg6MjVweDtcclxuICAgIGNvbG9yOmJsYWNrO1xyXG4gICAgbWFyZ2luLXJpZ2h0OjIwcHg7XHJcbiAgfVxyXG5cclxuICBpbnB1dHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgYm9yZGVyOm5vbmU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xyXG4gICAgd2lkdGg6ODAlO1xyXG4gICAgb3V0bGluZTogbm9uZTt0ZXh0LWFsaWduOmNlbnRlcjtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgaW5wdXQ6OnBsYWNlaG9sZGVye1xyXG4gICAgY29sb3I6IHJnYigzNiwgMzYsIDM2KTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnUG9wcGlucycsIHNhbnMtc2VyaWY7XHJcbiAgICBvdXRsaW5lOiBub25lO1xyXG4gIH1cclxuXHJcblxyXG4gICNuYXZ7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6MTJ2aDtcclxuICAgIGJvcmRlci1yYWRpdXM6MHB4IDkwcHggOTBweCAwcHg7XHJcbiAgICBwYWRkaW5nOjBweCAyNXB4O1xyXG4gICAgYm94LXNoYWRvdzogLTJweCAwcHggOHB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICB9XHJcblxyXG4gICNwZXJmaWx7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1yZWQtY29sb3IpO1xyXG4gICAgd2lkdGg6NjBweDtcclxuICAgIGhlaWdodDogNjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgYm9yZGVyOjNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgICB0b3A6LTM1JTtcclxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNHB4IDFweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICAgIG1hcmdpbi1yaWdodDoyMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gIH1cclxuXHJcblxyXG4gICNob21lLCNtYWNoaW5lLCNzaG9wLCNjb21tdW5pdHl7XHJcbiAgICB3aWR0aDozMHB4O1xyXG4gICAgaGVpZ2h0OjMwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6MjBweDtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ "2XHM":
/*!****************************************!*\
  !*** ./src/app/classes/tattoo-post.ts ***!
  \****************************************/
/*! exports provided: TattooPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TattooPost", function() { return TattooPost; });
class TattooPost {
    constructor(postName, postImg, description, tags, UserID, likes) {
        this.Tags = [];
        this.postNombre = postName;
        this.postImg = postImg;
        this.Descripcion = description;
        this.Tags = tags;
        this.UserID = UserID;
        this.likes = likes;
    }
}


/***/ }),

/***/ "3DrK":
/*!**************************************************!*\
  !*** ./src/app/pages/events/events.component.ts ***!
  \**************************************************/
/*! exports provided: EventsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsComponent", function() { return EventsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/login/login.component */ "W3Zi");


class EventsComponent {
    constructor() { }
    ngOnInit() {
    }
}
EventsComponent.ɵfac = function EventsComponent_Factory(t) { return new (t || EventsComponent)(); };
EventsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EventsComponent, selectors: [["app-events"]], decls: 1, vars: 0, template: function EventsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-login");
    } }, directives: [_components_login_login_component__WEBPACK_IMPORTED_MODULE_1__["LoginComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJldmVudHMuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "4x0u":
/*!************************************!*\
  !*** ./src/app/jsons/product.json ***!
  \************************************/
/*! exports provided: products, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"products\":[{\"postNombre\":\"Test de Producto 1\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Maquinas\",\"Others\"],\"UserID\":1,\"Precio\":10},{\"postNombre\":\"Test de Producto 2\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Tintas\"],\"UserID\":2,\"Precio\":500},{\"postNombre\":\"Test de Producto 3\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Agujas\"],\"UserID\":2,\"Precio\":40},{\"postNombre\":\"Test de Producto 4\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Higiene\",\"Agujas\",\"Tintas\"],\"UserID\":5,\"Precio\":600},{\"postNombre\":\"Test de Producto 5\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"GripsTubo\"],\"UserID\":2,\"Precio\":600},{\"postNombre\":\"Test de Producto 6\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"TransferDiseño\"],\"UserID\":7,\"Precio\":600},{\"postNombre\":\"Test de Producto 7\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Fuentes\",\"TransferDiseño\"],\"UserID\":7,\"Precio\":600},{\"postNombre\":\"Test de Producto 8\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"GripsTubo\",\"Agujas\"],\"UserID\":7,\"Precio\":600},{\"postNombre\":\"Test de Producto 9\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Others\",\"Maquinas\"],\"UserID\":7,\"Precio\":600},{\"postNombre\":\"Test de Producto 10\",\"postImg\":\"https://media.istockphoto.com/photos/tattoo-machine-with-needle-close-up-picture-id471391012?k=6&m=471391012&s=170667a&w=0&h=rsNkw8PKAaxK_NEtbMq_17ys7PKlwLYvB7vMoE_QoE4=\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Higiene\"],\"UserID\":7,\"Precio\":600}]}");

/***/ }),

/***/ "5zag":
/*!************************!*\
  !*** ./credentials.ts ***!
  \************************/
/*! exports provided: FB_CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FB_CONFIG", function() { return FB_CONFIG; });
// CREDENCIALES DEL FIREBASE
const FB_CONFIG = {
    apiKey: "AIzaSyB0ru-_rYQfyheqpa_dIE7QPiRlT54o1gc",
    authDomain: "tagora-a73c6.firebaseapp.com",
    databaseURL: "https://tagora-a73c6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tagora-a73c6",
    storageBucket: "tagora-a73c6.appspot.com",
    messagingSenderId: "212914797480",
    appId: "1:212914797480:web:fa37ace07f9e7869df7b9d",
    measurementId: "G-7ZZ1PMF69T"
};
//APIS
//Otra info privada


/***/ }),

/***/ "76sm":
/*!*********************************!*\
  !*** ./src/app/jsons/user.json ***!
  \*********************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"UserID\":1,\"nombre\":\"Maria\",\"apellidos\":\"Dhoe Doinks\",\"alias\":\"Jhonny\",\"password\":\"PotatoKawaii\",\"email\":\"tatuadorA@gmail.com\",\"isTatuador\":true,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,4,3,2.5,4.5]},{\"UserID\":2,\"nombre\":\"Marc\",\"apellidos\":\"Jupiter Patagonia\",\"alias\":\"Yuing\",\"password\":\"123456\",\"email\":\"tatuadorB@gmail.com\",\"isTatuador\":true,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,4,3,2,2]},{\"UserID\":3,\"nombre\":\"Nora\",\"apellidos\":\"Fern\",\"alias\":\"Teteju\",\"password\":\"PotatoKawaii\",\"email\":\"userA@gmail.com\",\"isTatuador\":false,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,3,2,3,3]},{\"UserID\":4,\"nombre\":\"Dwayne\",\"apellidos\":\"Gerbil\",\"alias\":\"aaaaaaaa\",\"password\":\"PotatoKawaii\",\"email\":\"tatuadorC@gmail.com\",\"isTatuador\":true,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,3,2,3,3]},{\"UserID\":5,\"nombre\":\"Lucas\",\"apellidos\":\"Arietti\",\"alias\":\"aaaaaaaa\",\"password\":\"PotatoKawaii\",\"email\":\"userB@gmail.com\",\"isTatuador\":false,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,3,2,3,3]},{\"UserID\":6,\"nombre\":\"Dwayne\",\"apellidos\":\"Gerbil\",\"alias\":\"aaaaaaaa\",\"password\":\"PotatoKawaii\",\"email\":\"userC@gmail.com\",\"isTatuador\":false,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,3,2,3,3]},{\"UserID\":7,\"nombre\":\"Jordi\",\"apellidos\":\"Tyrone\",\"alias\":\"aaaaaaaa\",\"password\":\"PotatoKawaii\",\"email\":\"tatuadorD@gmail.com\",\"isTatuador\":true,\"tel\":111111111,\"imgUsuario\":\"https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg\",\"valoracion\":[3.5,3,2,3,3]}]");

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Cy06":
/*!****************************************************************!*\
  !*** ./src/app/pages/user-personal/user-personal.component.ts ***!
  \****************************************************************/
/*! exports provided: UserPersonalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPersonalComponent", function() { return UserPersonalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class UserPersonalComponent {
    constructor() { }
    ngOnInit() {
    }
}
UserPersonalComponent.ɵfac = function UserPersonalComponent_Factory(t) { return new (t || UserPersonalComponent)(); };
UserPersonalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserPersonalComponent, selectors: [["app-user-personal"]], decls: 2, vars: 0, template: function UserPersonalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "user-personal works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXBlcnNvbmFsLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "JNri":
/*!**************************************************!*\
  !*** ./src/app/pages/tattoo/tattoo.component.ts ***!
  \**************************************************/
/*! exports provided: TattooComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TattooComponent", function() { return TattooComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class TattooComponent {
    constructor() { }
    ngOnInit() {
    }
}
TattooComponent.ɵfac = function TattooComponent_Factory(t) { return new (t || TattooComponent)(); };
TattooComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TattooComponent, selectors: [["app-tattoo"]], decls: 2, vars: 0, template: function TattooComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "tattoo works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YXR0b28uY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "LmEr":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 61, vars: 0, consts: [["id", "footerContainer"], ["id", "logo"], ["src", "../../../assets/imgs//tagora-white-logo-06.svg"], ["id", "registrar"], ["id", "politicas"], ["id", "about"], ["src", "../../../assets/imgs/chevron-down-white.svg"], ["id", "policies"], ["id", "Community"], ["id", "empresa"], ["id", "copy"], ["src", "../../../assets/imgs/copyright.svg"], ["id", "footerContainerPc"], ["id", "propuestaFooter"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Centro del comercio y la cultura del TATTOO ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "\u00BFEres profesional del tattoo o deseas tatuarte?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Registrate!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "About us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Policies");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Community");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "TAGORA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Barcelona 2021");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Centro del comercio y la cultura del TATTOO ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "\u00BFEres profesional del tattoo o deseas tatuarte?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Registrate!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "About us");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Policies");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Community");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "img", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "TAGORA");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, "Barcelona 2021");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["@media screen and (max-width:767px) {\r\n\r\n  #footerContainerPc[_ngcontent-%COMP%]{\r\n    display:none;\r\n  }\r\n\r\n  #footerContainer[_ngcontent-%COMP%]{\r\n  background-color: black;\r\n  padding:2vh 5vw 20vh 5vw;\r\n  color:white;\r\n  margin: 20px auto 0px auto;\r\n  display:block;\r\n}\r\n\r\n#logo[_ngcontent-%COMP%]{\r\n  border-bottom: 3px solid var(--white-bones-color);\r\n  margin-bottom:20px;\r\n}\r\n\r\n#logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  width:55px;\r\n  height:65px;\r\n}\r\n\r\n#logo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n  font-size:14px;\r\n  padding-bottom:4px;\r\n}\r\n\r\n#registrar[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width:90vw;\r\n  margin-bottom:30px;\r\n}\r\n\r\n#registrar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{\r\n  background-color: var(--red-color);\r\n  color:white;\r\n  width:300px;\r\n  height:50px;\r\n  border-radius: 90px;\r\n  border:none;\r\n  font-family: 'Poller One', cursive;\r\n  font-size: 0.7em;\r\n  text-transform: uppercase;\r\n  margin-left:1.2em;\r\n}\r\n\r\n#politicas[_ngcontent-%COMP%]{\r\n  display:block;\r\n  width:90vw;\r\n  margin-bottom:40px;\r\n}\r\n\r\n#politicas[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  width:20px;\r\n  margin-right:10px;\r\n}\r\n\r\n#politicas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n  margin-right:5px;\r\n}\r\n\r\n#about[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  width:100%;\r\n  margin-bottom:20px;\r\n  padding-bottom:5px;\r\n  border-bottom: 2px dashed var(--white-bones-color);\r\n}\r\n\r\n#policies[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  width:100%;\r\n  margin-bottom:20px;\r\n  padding-bottom:5px;\r\n  border-bottom: 2px dashed var(--white-bones-color);\r\n}\r\n\r\n\r\n#Community[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n  width:100%;\r\n  padding-bottom:5px;\r\n  border-bottom: 2px dashed var(--white-bones-color);\r\n}\r\n\r\n#empresa[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content:space-around;\r\n  align-items: center;\r\n  font-size: 20px;\r\n  font-family: 'Josefin Sans';\r\n}\r\n\r\n#copy[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n\r\n#empresa[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  width:20px;\r\n}\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width:768px) and (max-width:1023px){\r\n\r\n  #footerContainerPc[_ngcontent-%COMP%]{\r\n    display:none;\r\n  }\r\n\r\n  #footerContainer[_ngcontent-%COMP%]{\r\n  background-color: black;\r\n  padding:2vh 5vw 20vh 5vw;\r\n  color:white;\r\n  margin: 20px auto 0px auto;\r\n  display:block;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]{\r\n    border-bottom: 3px solid var(--white-bones-color);\r\n    margin-bottom:20px;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:65px;\r\n    height:75px;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size:14px;\r\n    padding-bottom:4px;\r\n  }\r\n\r\n  #registrar[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width:90vw;\r\n    margin-bottom:30px;\r\n  }\r\n\r\n  #registrar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{\r\n    background-color: var(--red-color);\r\n    color:white;\r\n    width:300px;\r\n    height:50px;\r\n    border-radius: 90px;\r\n    border:none;\r\n    font-family: 'Poller One', cursive;\r\n    font-size: 12px;\r\n    text-transform: uppercase;\r\n  }\r\n\r\n  #politicas[_ngcontent-%COMP%]{\r\n    display:block;\r\n    width:90vw;\r\n    margin-bottom:40px;\r\n  }\r\n\r\n  #politicas[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:20px;\r\n    margin-right:10px;\r\n  }\r\n\r\n  #politicas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    margin-right:5px;\r\n  }\r\n\r\n  #about[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    margin-bottom:20px;\r\n    padding-bottom:5px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n  }\r\n\r\n  #policies[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    margin-bottom:20px;\r\n    padding-bottom:5px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n  }\r\n\r\n\r\n  #Community[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    padding-bottom:5px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n  }\r\n\r\n  #empresa[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content:space-around;\r\n    align-items: center;\r\n    font-size: 20px;\r\n    font-family: 'Josefin Sans';\r\n  }\r\n\r\n  #copy[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n  }\r\n\r\n  #empresa[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:20px;\r\n  }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width: 1024px) {\r\n\r\n  #footerContainer[_ngcontent-%COMP%]{\r\n    display:none\r\n  }\r\n\r\n  #footerContainerPc[_ngcontent-%COMP%]{\r\n    margin: 2px auto 0px auto;\r\n    padding:4vh 2vw 6vh 2vw;\r\n    display:flex;\r\n    justify-content:space-between;\r\n    bottom:0;\r\n    background-color: black;\r\n    color:white;\r\n  }\r\n\r\n\r\n  #propuestaFooter[_ngcontent-%COMP%]{\r\n    display:block;\r\n    width:35vw;\r\n    padding: 0px 25px 0px 25px;\r\n   }\r\n\r\n  #logo[_ngcontent-%COMP%]{\r\n    border-bottom: 3px solid var(--white-bones-color);\r\n    margin-bottom:20px;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:75px;\r\n    height:85px;\r\n  }\r\n\r\n  #logo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    font-size:14px;\r\n    padding-bottom:4px;\r\n  }\r\n\r\n\r\n  #registrar[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    width:auto;\r\n  }\r\n\r\n  #registrar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{\r\n    background-color: var(--red-color);\r\n    color:white;\r\n    width:300px;\r\n    margin-left:15px;\r\n    height:50px;\r\n    border-radius: 90px;\r\n    border:none;\r\n    font-family: 'Poller One', cursive;\r\n    font-size: 12px;\r\n    text-transform: uppercase;\r\n  }\r\n\r\n  #politicas[_ngcontent-%COMP%]{\r\n    display:block;\r\n    margin:auto;\r\n    align-items: center;\r\n    width:35vw;\r\n    height:100%;\r\n    padding: 0px 25px 0px 25px;\r\n  }\r\n\r\n  #politicas[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:20px;\r\n    margin-right:10px;\r\n  }\r\n\r\n  #about[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    padding-bottom:15px;\r\n    margin-bottom:35px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n  }\r\n\r\n\r\n  #policies[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    margin-bottom:35px;\r\n    padding-bottom:15px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n  }\r\n\r\n\r\n  #Community[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: flex-start;\r\n    align-items: center;\r\n    width:100%;\r\n    padding-bottom:5px;\r\n    border-bottom: 2px dashed var(--white-bones-color);\r\n   }\r\n\r\n  #empresa[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content:space-around;\r\n    align-items: flex-end;\r\n    font-size: 25px;\r\n    font-family: 'Josefin Sans';\r\n    width:35vw;\r\n    padding: 0px 25px 0px 25px;\r\n  }\r\n\r\n\r\n#copy[_ngcontent-%COMP%]{\r\n  display:flex;\r\n  justify-content: flex-start;\r\n  align-items: center;\r\n}\r\n\r\n#empresa[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n  width:20px;\r\n}\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0VBQ0EsdUJBQXVCO0VBQ3ZCLHdCQUF3QjtFQUN4QixXQUFXO0VBQ1gsMEJBQTBCO0VBQzFCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGlEQUFpRDtFQUNqRCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsV0FBVztBQUNiOztBQUVBO0VBQ0UsY0FBYztFQUNkLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsV0FBVztFQUNYLFdBQVc7RUFDWCxXQUFXO0VBQ1gsbUJBQW1CO0VBQ25CLFdBQVc7RUFDWCxrQ0FBa0M7RUFDbEMsZ0JBQWdCO0VBQ2hCLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsVUFBVTtFQUNWLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixrREFBa0Q7QUFDcEQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osMkJBQTJCO0VBQzNCLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1Ysa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixrREFBa0Q7QUFDcEQ7OztBQUdBO0VBQ0UsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQixtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLGtCQUFrQjtFQUNsQixrREFBa0Q7QUFDcEQ7O0FBRUE7RUFDRSxZQUFZO0VBQ1osNEJBQTRCO0VBQzVCLG1CQUFtQjtFQUNuQixlQUFlO0VB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QUEyQjtJQUMzQixtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixrREFBa0Q7R0FDbkQ7O0VBRUQ7SUFDRSxZQUFZO0lBQ1osNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsMkJBQTJCO0lBQzNCLFVBQVU7SUFDViwwQkFBMEI7RUFDNUI7OztBQUdGO0VBQ0UsWUFBWTtFQUNaLDJCQUEyQjtFQUMzQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxVQUFVO0FBQ1o7O0FBRUEiLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2N3B4KSB7XHJcblxyXG4gICNmb290ZXJDb250YWluZXJQY3tcclxuICAgIGRpc3BsYXk6bm9uZTtcclxuICB9XHJcblxyXG4gICNmb290ZXJDb250YWluZXJ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgcGFkZGluZzoydmggNXZ3IDIwdmggNXZ3O1xyXG4gIGNvbG9yOndoaXRlO1xyXG4gIG1hcmdpbjogMjBweCBhdXRvIDBweCBhdXRvO1xyXG4gIGRpc3BsYXk6YmxvY2s7XHJcbn1cclxuXHJcbiNsb2dve1xyXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgbWFyZ2luLWJvdHRvbToyMHB4O1xyXG59XHJcblxyXG4jbG9nbyBpbWd7XHJcbiAgd2lkdGg6NTVweDtcclxuICBoZWlnaHQ6NjVweDtcclxufVxyXG5cclxuI2xvZ28gcHtcclxuICBmb250LXNpemU6MTRweDtcclxuICBwYWRkaW5nLWJvdHRvbTo0cHg7XHJcbn1cclxuXHJcbiNyZWdpc3RyYXJ7XHJcbiAgZGlzcGxheTpmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6OTB2dztcclxuICBtYXJnaW4tYm90dG9tOjMwcHg7XHJcbn1cclxuXHJcbiNyZWdpc3RyYXIgYnV0dG9ue1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJlZC1jb2xvcik7XHJcbiAgY29sb3I6d2hpdGU7XHJcbiAgd2lkdGg6MzAwcHg7XHJcbiAgaGVpZ2h0OjUwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogOTBweDtcclxuICBib3JkZXI6bm9uZTtcclxuICBmb250LWZhbWlseTogJ1BvbGxlciBPbmUnLCBjdXJzaXZlO1xyXG4gIGZvbnQtc2l6ZTogMC43ZW07XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBtYXJnaW4tbGVmdDoxLjJlbTtcclxufVxyXG5cclxuI3BvbGl0aWNhc3tcclxuICBkaXNwbGF5OmJsb2NrO1xyXG4gIHdpZHRoOjkwdnc7XHJcbiAgbWFyZ2luLWJvdHRvbTo0MHB4O1xyXG59XHJcblxyXG4jcG9saXRpY2FzIGltZ3tcclxuICB3aWR0aDoyMHB4O1xyXG4gIG1hcmdpbi1yaWdodDoxMHB4O1xyXG59XHJcblxyXG4jcG9saXRpY2FzIHB7XHJcbiAgbWFyZ2luLXJpZ2h0OjVweDtcclxufVxyXG5cclxuI2Fib3V0e1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDoxMDAlO1xyXG4gIG1hcmdpbi1ib3R0b206MjBweDtcclxuICBwYWRkaW5nLWJvdHRvbTo1cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IGRhc2hlZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbn1cclxuXHJcbiNwb2xpY2llc3tcclxuICBkaXNwbGF5OmZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBtYXJnaW4tYm90dG9tOjIwcHg7XHJcbiAgcGFkZGluZy1ib3R0b206NXB4O1xyXG4gIGJvcmRlci1ib3R0b206IDJweCBkYXNoZWQgdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG59XHJcblxyXG5cclxuI0NvbW11bml0eXtcclxuICBkaXNwbGF5OmZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6MTAwJTtcclxuICBwYWRkaW5nLWJvdHRvbTo1cHg7XHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IGRhc2hlZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbn1cclxuXHJcbiNlbXByZXNhe1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYXJvdW5kO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiAnSm9zZWZpbiBTYW5zJztcclxufVxyXG5cclxuI2NvcHl7XHJcbiAgZGlzcGxheTpmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4jZW1wcmVzYSBpbWd7XHJcbiAgd2lkdGg6MjBweDtcclxufVxyXG5cclxufVxyXG5cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tVEFCTEVUKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NzY4cHgpIGFuZCAobWF4LXdpZHRoOjEwMjNweCl7XHJcblxyXG4gICNmb290ZXJDb250YWluZXJQY3tcclxuICAgIGRpc3BsYXk6bm9uZTtcclxuICB9XHJcblxyXG4gICNmb290ZXJDb250YWluZXJ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgcGFkZGluZzoydmggNXZ3IDIwdmggNXZ3O1xyXG4gIGNvbG9yOndoaXRlO1xyXG4gIG1hcmdpbjogMjBweCBhdXRvIDBweCBhdXRvO1xyXG4gIGRpc3BsYXk6YmxvY2s7XHJcbiAgfVxyXG5cclxuICAjbG9nb3tcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgICBtYXJnaW4tYm90dG9tOjIwcHg7XHJcbiAgfVxyXG5cclxuICAjbG9nbyBpbWd7XHJcbiAgICB3aWR0aDo2NXB4O1xyXG4gICAgaGVpZ2h0Ojc1cHg7XHJcbiAgfVxyXG5cclxuICAjbG9nbyBwe1xyXG4gICAgZm9udC1zaXplOjE0cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTo0cHg7XHJcbiAgfVxyXG5cclxuICAjcmVnaXN0cmFye1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6OTB2dztcclxuICAgIG1hcmdpbi1ib3R0b206MzBweDtcclxuICB9XHJcblxyXG4gICNyZWdpc3RyYXIgYnV0dG9ue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLWNvbG9yKTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgd2lkdGg6MzAwcHg7XHJcbiAgICBoZWlnaHQ6NTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDkwcHg7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICAgIGZvbnQtZmFtaWx5OiAnUG9sbGVyIE9uZScsIGN1cnNpdmU7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIH1cclxuXHJcbiAgI3BvbGl0aWNhc3tcclxuICAgIGRpc3BsYXk6YmxvY2s7XHJcbiAgICB3aWR0aDo5MHZ3O1xyXG4gICAgbWFyZ2luLWJvdHRvbTo0MHB4O1xyXG4gIH1cclxuXHJcbiAgI3BvbGl0aWNhcyBpbWd7XHJcbiAgICB3aWR0aDoyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OjEwcHg7XHJcbiAgfVxyXG5cclxuICAjcG9saXRpY2FzIHB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6NXB4O1xyXG4gIH1cclxuXHJcbiAgI2Fib3V0e1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBtYXJnaW4tYm90dG9tOjIwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTo1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggZGFzaGVkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICB9XHJcblxyXG4gICNwb2xpY2llc3tcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgbWFyZ2luLWJvdHRvbToyMHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206NXB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IGRhc2hlZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgfVxyXG5cclxuXHJcbiAgI0NvbW11bml0eXtcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgcGFkZGluZy1ib3R0b206NXB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IGRhc2hlZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgfVxyXG5cclxuICAjZW1wcmVzYXtcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdKb3NlZmluIFNhbnMnO1xyXG4gIH1cclxuXHJcbiAgI2NvcHl7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuXHJcbiAgI2VtcHJlc2EgaW1ne1xyXG4gICAgd2lkdGg6MjBweDtcclxuICB9XHJcblxyXG59XHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVBDKi9cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMjRweCkge1xyXG5cclxuICAjZm9vdGVyQ29udGFpbmVye1xyXG4gICAgZGlzcGxheTpub25lXHJcbiAgfVxyXG5cclxuICAjZm9vdGVyQ29udGFpbmVyUGN7XHJcbiAgICBtYXJnaW46IDJweCBhdXRvIDBweCBhdXRvO1xyXG4gICAgcGFkZGluZzo0dmggMnZ3IDZ2aCAydnc7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcclxuICAgIGJvdHRvbTowO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICB9XHJcblxyXG5cclxuICAjcHJvcHVlc3RhRm9vdGVye1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIHdpZHRoOjM1dnc7XHJcbiAgICBwYWRkaW5nOiAwcHggMjVweCAwcHggMjVweDtcclxuICAgfVxyXG5cclxuICAjbG9nb3tcclxuICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgICBtYXJnaW4tYm90dG9tOjIwcHg7XHJcbiAgfVxyXG5cclxuICAjbG9nbyBpbWd7XHJcbiAgICB3aWR0aDo3NXB4O1xyXG4gICAgaGVpZ2h0Ojg1cHg7XHJcbiAgfVxyXG5cclxuICAjbG9nbyBwe1xyXG4gICAgZm9udC1zaXplOjE0cHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTo0cHg7XHJcbiAgfVxyXG5cclxuXHJcbiAgI3JlZ2lzdHJhcntcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOmF1dG87XHJcbiAgfVxyXG5cclxuICAjcmVnaXN0cmFyIGJ1dHRvbntcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJlZC1jb2xvcik7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIHdpZHRoOjMwMHB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6MTVweDtcclxuICAgIGhlaWdodDo1MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOTBweDtcclxuICAgIGJvcmRlcjpub25lO1xyXG4gICAgZm9udC1mYW1pbHk6ICdQb2xsZXIgT25lJywgY3Vyc2l2ZTtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgfVxyXG5cclxuICAjcG9saXRpY2Fze1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIG1hcmdpbjphdXRvO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOjM1dnc7XHJcbiAgICBoZWlnaHQ6MTAwJTtcclxuICAgIHBhZGRpbmc6IDBweCAyNXB4IDBweCAyNXB4O1xyXG4gIH1cclxuXHJcbiAgI3BvbGl0aWNhcyBpbWd7XHJcbiAgICB3aWR0aDoyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OjEwcHg7XHJcbiAgfVxyXG5cclxuICAjYWJvdXR7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIHBhZGRpbmctYm90dG9tOjE1cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOjM1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggZGFzaGVkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICB9XHJcblxyXG5cclxuICAjcG9saWNpZXN7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6MTAwJTtcclxuICAgIG1hcmdpbi1ib3R0b206MzVweDtcclxuICAgIHBhZGRpbmctYm90dG9tOjE1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggZGFzaGVkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICB9XHJcblxyXG5cclxuICAjQ29tbXVuaXR5e1xyXG4gICAgZGlzcGxheTpmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTo1cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggZGFzaGVkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgfVxyXG5cclxuICAjZW1wcmVzYXtcclxuICAgIGRpc3BsYXk6ZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1hcm91bmQ7XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgICBmb250LXNpemU6IDI1cHg7XHJcbiAgICBmb250LWZhbWlseTogJ0pvc2VmaW4gU2Fucyc7XHJcbiAgICB3aWR0aDozNXZ3O1xyXG4gICAgcGFkZGluZzogMHB4IDI1cHggMHB4IDI1cHg7XHJcbiAgfVxyXG5cclxuXHJcbiNjb3B5e1xyXG4gIGRpc3BsYXk6ZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuI2VtcHJlc2EgaW1ne1xyXG4gIHdpZHRoOjIwcHg7XHJcbn1cclxuXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "Rn8K":
/*!****************************************************!*\
  !*** ./src/app/pages/options/options.component.ts ***!
  \****************************************************/
/*! exports provided: OptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsComponent", function() { return OptionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class OptionsComponent {
    constructor() { }
    ngOnInit() {
    }
}
OptionsComponent.ɵfac = function OptionsComponent_Factory(t) { return new (t || OptionsComponent)(); };
OptionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OptionsComponent, selectors: [["app-options"]], decls: 2, vars: 0, template: function OptionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "options works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvcHRpb25zLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer/footer.component */ "LmEr");




class AppComponent {
    constructor() {
        this.title = 'tagoraWeb';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
    } }, directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_1__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"], _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "TAFX":
/*!****************************************************************!*\
  !*** ./src/app/pages/detail-tattoo/detail-tattoo.component.ts ***!
  \****************************************************************/
/*! exports provided: DetailTattooComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailTattooComponent", function() { return DetailTattooComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DetailTattooComponent {
    constructor() { }
    ngOnInit() {
    }
}
DetailTattooComponent.ɵfac = function DetailTattooComponent_Factory(t) { return new (t || DetailTattooComponent)(); };
DetailTattooComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DetailTattooComponent, selectors: [["app-detail-tattoo"]], decls: 2, vars: 0, template: function DetailTattooComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "detail-tattoo works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRhaWwtdGF0dG9vLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "UxUN":
/*!*********************************!*\
  !*** ./src/app/classes/user.ts ***!
  \*********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
class User {
    constructor(newID, newNombre, newApellidos, newAlias, newPassword, newEmail, newIsTatuador = false, newTel = 111111111, newImgUsuario = "https://media.istockphoto.com/photos/handsome-and-happy-picture-id516065432?k=6&m=516065432&s=612x612&w=0&h=0On1LTM9MSRBK7DlQPd71uakgMR74moV4LSgv-ZLQmk=") {
        this.id = newID;
        this.nombre = newNombre;
        this.apellidos = newApellidos;
        this.alias = newAlias;
        this.password = newPassword;
        this.email = newEmail;
        this.tel = newTel;
        this.imgUsuario = newImgUsuario;
        this.isTatuador = newIsTatuador;
        this.valoracionArray = [];
        this.valoracion = 0;
        this.TattooPosts = [];
        this.ProductPosts = [];
    }
    getPersonAlias() {
        return this.alias;
    }
    getPersonPassword() {
        return this.password;
    }
    getPersonJobStatus() {
        return this.isTatuador;
    }
}


/***/ }),

/***/ "W3Zi":
/*!*****************************************************!*\
  !*** ./src/app/components/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "qfBg");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class LoginComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    ngOnInit() { }
    login() {
        const user = { email: this.email, password: this.password };
        this.userService.login(user).subscribe((datos) => {
            datos.forEach((doc) => {
                // devuelve el id.
                console.log(doc.id);
                // insertamos el token para que se guarde en la cookie
                this.userService.setToken(doc.id);
                // te lleva al inicio si coincide
                this.router.navigateByUrl('/');
            });
        });
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 8, vars: 2, consts: [[1, "login"], ["method", "post", 1, "custom-form"], ["type", "email", "name", "email", "placeholder", "Email", "required", "required", 3, "ngModel", "ngModelChange"], ["type", "password", "name", "password", "placeholder", "Password", "required", "required", 3, "ngModel", "ngModelChange"], ["type", "submit", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_4_listener($event) { return ctx.email = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_5_listener($event) { return ctx.password = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_6_listener() { return ctx.login(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Log in");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.email);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.password);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"]], styles: ["*[_ngcontent-%COMP%] {\r\n  box-sizing: border-box;\r\n}\r\nhtml[_ngcontent-%COMP%], body[_ngcontent-%COMP%] {\r\n  background: #ecf0f3;\r\n}\r\nh1[_ngcontent-%COMP%] {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n.custom-form[_ngcontent-%COMP%] {\r\n  min-width: 300px;\r\n  max-width: 60%;\r\n  margin: 0px auto;\r\n  background: rgba(255, 255, 255, 0.15);\r\n  padding: 2rem 3rem;\r\n  margin: auto;\r\n  border-radius: 2.5rem;\r\n  background-color: #ecf0f3;\r\n  box-shadow: 13px 13px 20px #cbced1, -13px -13px 20px #ffffff;\r\n  color: black;\r\n  margin-top: 10rem;\r\n}\r\n.custom-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin: 2rem 0;\r\n  width: 100%;\r\n  border-radius: 0.5rem;\r\n  padding: 1rem;\r\n  border: none;\r\n  box-shadow: inset -5px -5px 15px rgba(255, 255, 255, 0.8),\r\n    inset 5px 5px 10px rgba(0, 0, 0, 0.1);\r\n  border: 0 none;\r\n  background: #ebf5fc;\r\n}\r\n.custom-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.15em;\r\n  border: none;\r\n  font-size: 0.875rem;\r\n  color: #ffffff;\r\n  font-weight: bold;\r\n  background-color: #bcd8c1;\r\n  width: 100%;\r\n  display: block;\r\n  padding: 0.875rem 1rem;\r\n  border-radius: 1.5rem;\r\n  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;\r\n  cursor: pointer;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBc0I7QUFDeEI7QUFDQTs7RUFFRSxtQkFBbUI7QUFDckI7QUFDQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0FBQ1o7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZ0JBQWdCO0VBQ2hCLHFDQUFxQztFQUNyQyxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQix5QkFBeUI7RUFDekIsNERBQTREO0VBQzVELFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGNBQWM7RUFDZCxjQUFjO0VBQ2QsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixhQUFhO0VBQ2IsWUFBWTtFQUNaO3lDQUN1QztFQUN2QyxjQUFjO0VBQ2QsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsV0FBVztFQUNYLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLHNEQUFzRDtFQUN0RCxlQUFlO0FBQ2pCIiwiZmlsZSI6ImxvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIqIHtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcbmh0bWwsXHJcbmJvZHkge1xyXG4gIGJhY2tncm91bmQ6ICNlY2YwZjM7XHJcbn1cclxuaDEge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbi5jdXN0b20tZm9ybSB7XHJcbiAgbWluLXdpZHRoOiAzMDBweDtcclxuICBtYXgtd2lkdGg6IDYwJTtcclxuICBtYXJnaW46IDBweCBhdXRvO1xyXG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSk7XHJcbiAgcGFkZGluZzogMnJlbSAzcmVtO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBib3JkZXItcmFkaXVzOiAyLjVyZW07XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZjBmMztcclxuICBib3gtc2hhZG93OiAxM3B4IDEzcHggMjBweCAjY2JjZWQxLCAtMTNweCAtMTNweCAyMHB4ICNmZmZmZmY7XHJcbiAgY29sb3I6IGJsYWNrO1xyXG4gIG1hcmdpbi10b3A6IDEwcmVtO1xyXG59XHJcbi5jdXN0b20tZm9ybSBpbnB1dCB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgbWFyZ2luOiAycmVtIDA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xyXG4gIHBhZGRpbmc6IDFyZW07XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJveC1zaGFkb3c6IGluc2V0IC01cHggLTVweCAxNXB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSxcclxuICAgIGluc2V0IDVweCA1cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbiAgYm9yZGVyOiAwIG5vbmU7XHJcbiAgYmFja2dyb3VuZDogI2ViZjVmYztcclxufVxyXG4uY3VzdG9tLWZvcm0gYnV0dG9uIHtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjE1ZW07XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JjZDhjMTtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwYWRkaW5nOiAwLjg3NXJlbSAxcmVtO1xyXG4gIGJvcmRlci1yYWRpdXM6IDEuNXJlbTtcclxuICBib3gtc2hhZG93OiAzcHggM3B4IDhweCAjYjFiMWIxLCAtM3B4IC0zcHggOHB4ICNmZmZmZmY7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ "WSoB":
/*!**********************************************!*\
  !*** ./src/app/pages/chat/chat.component.ts ***!
  \**********************************************/
/*! exports provided: ChatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatComponent", function() { return ChatComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ChatComponent {
    constructor() { }
    ngOnInit() {
    }
}
ChatComponent.ɵfac = function ChatComponent_Factory(t) { return new (t || ChatComponent)(); };
ChatComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChatComponent, selectors: [["app-chat"]], decls: 2, vars: 0, template: function ChatComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "chat works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGF0LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "Z6BE":
/*!*****************************************!*\
  !*** ./src/app/classes/product-post.ts ***!
  \*****************************************/
/*! exports provided: ProductPost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPost", function() { return ProductPost; });
class ProductPost {
    constructor(postName, postImg, description, tags, UserID, price, vendorValoracion = 0) {
        this.Tags = [];
        this.postNombre = postName;
        this.postImg = postImg;
        this.Descripcion = description;
        this.Tags = tags;
        this.UserID = UserID;
        this.Precio = price;
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/header/header.component */ "2MiI");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/footer/footer.component */ "LmEr");
/* harmony import */ var _components_searcher_searcher_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/searcher/searcher.component */ "mnRk");
/* harmony import */ var _pages_homepage_homepage_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/homepage/homepage.component */ "ojyh");
/* harmony import */ var _pages_tattoo_tattoo_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/tattoo/tattoo.component */ "JNri");
/* harmony import */ var _pages_product_product_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/product/product.component */ "10O5");
/* harmony import */ var _pages_events_events_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/events/events.component */ "3DrK");
/* harmony import */ var _pages_user_personal_user_personal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/user-personal/user-personal.component */ "Cy06");
/* harmony import */ var _pages_user_personal_externo_user_personal_externo_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/user-personal-externo/user-personal-externo.component */ "xcG4");
/* harmony import */ var _pages_chat_chat_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/chat/chat.component */ "WSoB");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/register/register.component */ "fNfI");
/* harmony import */ var _pages_options_options_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/options/options.component */ "Rn8K");
/* harmony import */ var _pages_detail_tattoo_detail_tattoo_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/detail-tattoo/detail-tattoo.component */ "TAFX");
/* harmony import */ var _pages_detail_product_detail_product_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/detail-product/detail-product.component */ "d4Z3");
/* harmony import */ var _pages_detail_event_detail_event_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/detail-event/detail-event.component */ "q33e");
/* harmony import */ var _credentials__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../credentials */ "5zag");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/login/login.component */ "W3Zi");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-cookie-service */ "b6Qw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ "fXoL");


















//credential

//firebase imports




// Formulario


//Cookie



class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineInjector"]({ providers: [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_25__["CookieService"]], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            _angular_fire__WEBPACK_IMPORTED_MODULE_19__["AngularFireModule"].initializeApp(_credentials__WEBPACK_IMPORTED_MODULE_18__["FB_CONFIG"]),
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_20__["AngularFirestoreModule"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_22__["AngularFireAuthModule"],
            _angular_fire_storage__WEBPACK_IMPORTED_MODULE_21__["AngularFireStorageModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__["ReactiveFormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_23__["FormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _components_header_header_component__WEBPACK_IMPORTED_MODULE_3__["HeaderComponent"],
        _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
        _components_searcher_searcher_component__WEBPACK_IMPORTED_MODULE_5__["SearcherComponent"],
        _pages_homepage_homepage_component__WEBPACK_IMPORTED_MODULE_6__["HomepageComponent"],
        _pages_tattoo_tattoo_component__WEBPACK_IMPORTED_MODULE_7__["TattooComponent"],
        _pages_product_product_component__WEBPACK_IMPORTED_MODULE_8__["ProductComponent"],
        _pages_events_events_component__WEBPACK_IMPORTED_MODULE_9__["EventsComponent"],
        _pages_user_personal_user_personal_component__WEBPACK_IMPORTED_MODULE_10__["UserPersonalComponent"],
        _pages_user_personal_externo_user_personal_externo_component__WEBPACK_IMPORTED_MODULE_11__["UserPersonalExternoComponent"],
        _pages_chat_chat_component__WEBPACK_IMPORTED_MODULE_12__["ChatComponent"],
        _pages_register_register_component__WEBPACK_IMPORTED_MODULE_13__["RegisterComponent"],
        _pages_options_options_component__WEBPACK_IMPORTED_MODULE_14__["OptionsComponent"],
        _pages_detail_tattoo_detail_tattoo_component__WEBPACK_IMPORTED_MODULE_15__["DetailTattooComponent"],
        _pages_detail_product_detail_product_component__WEBPACK_IMPORTED_MODULE_16__["DetailProductComponent"],
        _pages_detail_event_detail_event_component__WEBPACK_IMPORTED_MODULE_17__["DetailEventComponent"],
        _components_login_login_component__WEBPACK_IMPORTED_MODULE_24__["LoginComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_19__["AngularFireModule"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_20__["AngularFirestoreModule"],
        _angular_fire_auth__WEBPACK_IMPORTED_MODULE_22__["AngularFireAuthModule"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_21__["AngularFireStorageModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__["ReactiveFormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_23__["FormsModule"]] }); })();


/***/ }),

/***/ "d4Z3":
/*!******************************************************************!*\
  !*** ./src/app/pages/detail-product/detail-product.component.ts ***!
  \******************************************************************/
/*! exports provided: DetailProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailProductComponent", function() { return DetailProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DetailProductComponent {
    constructor() { }
    ngOnInit() {
    }
}
DetailProductComponent.ɵfac = function DetailProductComponent_Factory(t) { return new (t || DetailProductComponent)(); };
DetailProductComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DetailProductComponent, selectors: [["app-detail-product"]], decls: 2, vars: 0, template: function DetailProductComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "detail-product works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRhaWwtcHJvZHVjdC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "fNfI":
/*!******************************************************!*\
  !*** ./src/app/pages/register/register.component.ts ***!
  \******************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_dbcatcher_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/dbcatcher.service */ "/Xfe");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/header/header.component */ "2MiI");






class RegisterComponent {
    constructor(fb, dbCatcher) {
        this.fb = fb;
        this.dbCatcher = dbCatcher;
    }
    ngOnInit() {
        this.registerForm = this.fb.group({
            alias: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            isTatuador: [false],
        });
    }
    onSubmit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.warn(this.registerForm.getRawValue());
            const data = this.registerForm.getRawValue();
            yield this.dbCatcher.setNewUser(data);
        });
    }
}
RegisterComponent.ɵfac = function RegisterComponent_Factory(t) { return new (t || RegisterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_dbcatcher_service__WEBPACK_IMPORTED_MODULE_3__["DBCatcherService"])); };
RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RegisterComponent, selectors: [["app-register"]], decls: 24, vars: 2, consts: [["id", "contenidoLogin"], ["id", "tabla"], ["id", "formRegistro", 3, "formGroup", "ngSubmit"], ["for", "alias"], ["type", "text", "name", "alias", "formControlName", "alias", "placeholder", "Escribe tu nick"], ["for", "email"], ["type", "text", "name", "email", "formControlName", "email", "placeholder", "Escribe tu email"], ["for", "Pasword"], ["type", "text", "formControlName", "password", "name", "pasword", "placeholder", "Escribe tu pasword"], [1, "selector"], ["for", "tipo"], ["type", "checkbox", "name", "", "id", "", "formControlName", "isTatuador"], ["type", "submit", "id", "registro", 3, "disabled"], ["id", "registroExterno"]], template: function RegisterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function RegisterComponent_Template_form_ngSubmit_3_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Alias*");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Email*");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Pasword*");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Tauador ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18, " Log In ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Log in with");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "button");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Log in with");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.registerForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.registerForm.valid);
    } }, directives: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["CheckboxControlValueAccessor"]], styles: ["#contenidoLogin[_ngcontent-%COMP%] {\r\n  padding-top: 12vh;\r\n  width: 90vw;\r\n  display: block;\r\n  margin: auto;\r\n}\r\n\r\n#tabla[_ngcontent-%COMP%] {\r\n  width: 80vw;\r\n  margin: auto;\r\n  padding: 20px;\r\n  border: 4px solid black;\r\n  border-radius: 20px;\r\n}\r\n\r\n#formRegistro[_ngcontent-%COMP%] {\r\n  width: 60vw;\r\n  display: block;\r\n  margin: auto;\r\n}\r\n\r\nlabel[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n  font-family: \"Josefin Sans\";\r\n  font-weight: 800;\r\n}\r\n\r\ninput[_ngcontent-%COMP%] {\r\n  display: block;\r\n  margin: 5px auto 15px auto;\r\n  padding: 10px 15px;\r\n  width: 100%;\r\n  border: 3px solid black;\r\n  border-radius: 20px;\r\n  background-color: transparent;\r\n  font-size: 14px;\r\n  font-family: \"Poppins\";\r\n}\r\n\r\ninput[_ngcontent-%COMP%]::placeholder {\r\n  color: rgb(255, 72, 72);\r\n}\r\n\r\n#selector[_ngcontent-%COMP%] {\r\n  position: relative;\r\n  overflow: hidden;\r\n  overflow: -moz-hidden-unscrollable;\r\n}\r\n\r\nselect[_ngcontent-%COMP%] {\r\n  margin: 5px auto 15px auto;\r\n  padding: 15px 15px;\r\n  width: 100%;\r\n  border-radius: 40px;\r\n  color: rgb(255, 248, 233);\r\n  background-color: black;\r\n  font-family: \"Josefin Sans\";\r\n  font-size: 14px;\r\n  text-transform: uppercase;\r\n  -webkit-appearance: none;\r\n  -moz-appearance: none;\r\n  appearance: none;\r\n}\r\n\r\n#politica[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: 20% 80%;\r\n  margin: 5px 10px 20px 10px;\r\n}\r\n\r\n#politica[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  border: 2px dashed rgb(255, 72, 72);\r\n  border-radius: 100px;\r\n  background-color: transparent;\r\n  width: 20px;\r\n  height: 20px;\r\n  margin: auto;\r\n}\r\n\r\n#politica[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n  border: 2px solid rgb(255, 72, 72);\r\n  border-radius: 100px;\r\n  background-color: rgb(255, 72, 72);\r\n}\r\n\r\n#politica[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  color: black;\r\n}\r\n\r\nbutton#registro[_ngcontent-%COMP%] {\r\n  background-color: rgb(255, 72, 72);\r\n  border: 4px solid rgb(255, 248, 233);\r\n  border-radius: 90px;\r\n  width: 70%;\r\n  height: 50px;\r\n  color: rgb(255, 248, 233);\r\n  font-size: 20px;\r\n  padding: 10px;\r\n  display: block;\r\n  text-align: center;\r\n  margin: auto;\r\n  box-shadow: 0px 0px 1px 3px black;\r\n  text-transform: uppercase;\r\n  font-family: \"Josefin Sans\";\r\n}\r\n\r\nbutton#registro[_ngcontent-%COMP%]:hover {\r\n  transform: scale(1.1);\r\n}\r\n\r\n#registroExterno[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: auto;\r\n  width: 90vw;\r\n}\r\n\r\n#registroExterno[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  width: 160px;\r\n  height: 70px;\r\n  background-color: rgb(56, 56, 155);\r\n  border: none;\r\n  border-radius: 90px;\r\n  box-shadow: 0px 2px 6px 2px rgb(17, 17, 17, 0.4);\r\n  padding: 20px;\r\n  margin-top: 14px;\r\n  color: rgb(255, 248, 233);\r\n  font-family: \"Poppins\";\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  text-align: left;\r\n}\r\n\r\n#registroExterno[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n  width: 160px;\r\n  height: 70px;\r\n  background-color: rgb(56, 56, 155);\r\n  border: none;\r\n  border-radius: 90px;\r\n  box-shadow: 0px 2px 6px 2px rgb(17, 17, 17, 0.4);\r\n  padding: 20px;\r\n  margin-top: 14px;\r\n  color: rgb(255, 248, 233);\r\n  font-family: \"Poppins\";\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  text-align: left;\r\n  transform: scale(1.1);\r\n}\r\n\r\n#registroExterno[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(2) {\r\n  background-color: rgb(255, 248, 233);\r\n  color: rgb(255, 72, 72);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsMkJBQTJCO0VBQzNCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGNBQWM7RUFDZCwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSwwQkFBMEI7RUFDMUIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QiwyQkFBMkI7RUFDM0IsZUFBZTtFQUNmLHlCQUF5QjtFQUN6Qix3QkFBd0I7RUFDeEIscUJBQXFCO0VBRXJCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYiw4QkFBOEI7RUFDOUIsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLG9CQUFvQjtFQUNwQiw2QkFBNkI7RUFDN0IsV0FBVztFQUNYLFlBQVk7RUFDWixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsb0JBQW9CO0VBQ3BCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsb0NBQW9DO0VBQ3BDLG1CQUFtQjtFQUNuQixVQUFVO0VBQ1YsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsYUFBYTtFQUNiLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGlDQUFpQztFQUNqQyx5QkFBeUI7RUFDekIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDhCQUE4QjtFQUM5QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZ0RBQWdEO0VBQ2hELGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsZ0RBQWdEO0VBQ2hELGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIseUJBQXlCO0VBQ3pCLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxvQ0FBb0M7RUFDcEMsdUJBQXVCO0FBQ3pCIiwiZmlsZSI6InJlZ2lzdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGVuaWRvTG9naW4ge1xyXG4gIHBhZGRpbmctdG9wOiAxMnZoO1xyXG4gIHdpZHRoOiA5MHZ3O1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuI3RhYmxhIHtcclxuICB3aWR0aDogODB2dztcclxuICBtYXJnaW46IGF1dG87XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBib3JkZXI6IDRweCBzb2xpZCBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG59XHJcblxyXG4jZm9ybVJlZ2lzdHJvIHtcclxuICB3aWR0aDogNjB2dztcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW46IGF1dG87XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgZm9udC1mYW1pbHk6IFwiSm9zZWZpbiBTYW5zXCI7XHJcbiAgZm9udC13ZWlnaHQ6IDgwMDtcclxufVxyXG5cclxuaW5wdXQge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbjogNXB4IGF1dG8gMTVweCBhdXRvO1xyXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcclxuICB3aWR0aDogMTAwJTtcclxuICBib3JkZXI6IDNweCBzb2xpZCBibGFjaztcclxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCI7XHJcbn1cclxuXHJcbmlucHV0OjpwbGFjZWhvbGRlciB7XHJcbiAgY29sb3I6IHJnYigyNTUsIDcyLCA3Mik7XHJcbn1cclxuXHJcbiNzZWxlY3RvciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3c6IC1tb3otaGlkZGVuLXVuc2Nyb2xsYWJsZTtcclxufVxyXG5cclxuc2VsZWN0IHtcclxuICBtYXJnaW46IDVweCBhdXRvIDE1cHggYXV0bztcclxuICBwYWRkaW5nOiAxNXB4IDE1cHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcclxuICBjb2xvcjogcmdiKDI1NSwgMjQ4LCAyMzMpO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG4gIGZvbnQtZmFtaWx5OiBcIkpvc2VmaW4gU2Fuc1wiO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAtbW96LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgLW1zLWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgYXBwZWFyYW5jZTogbm9uZTtcclxufVxyXG5cclxuI3BvbGl0aWNhIHtcclxuICBkaXNwbGF5OiBncmlkO1xyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjAlIDgwJTtcclxuICBtYXJnaW46IDVweCAxMHB4IDIwcHggMTBweDtcclxufVxyXG5cclxuI3BvbGl0aWNhIGJ1dHRvbiB7XHJcbiAgYm9yZGVyOiAycHggZGFzaGVkIHJnYigyNTUsIDcyLCA3Mik7XHJcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XHJcbiAgd2lkdGg6IDIwcHg7XHJcbiAgaGVpZ2h0OiAyMHB4O1xyXG4gIG1hcmdpbjogYXV0bztcclxufVxyXG5cclxuI3BvbGl0aWNhIGJ1dHRvbjpob3ZlciB7XHJcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDI1NSwgNzIsIDcyKTtcclxuICBib3JkZXItcmFkaXVzOiAxMDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA3MiwgNzIpO1xyXG59XHJcblxyXG4jcG9saXRpY2EgcCB7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG4gIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuYnV0dG9uI3JlZ2lzdHJvIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCA3MiwgNzIpO1xyXG4gIGJvcmRlcjogNHB4IHNvbGlkIHJnYigyNTUsIDI0OCwgMjMzKTtcclxuICBib3JkZXItcmFkaXVzOiA5MHB4O1xyXG4gIHdpZHRoOiA3MCU7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGNvbG9yOiByZ2IoMjU1LCAyNDgsIDIzMyk7XHJcbiAgZm9udC1zaXplOiAyMHB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogYXV0bztcclxuICBib3gtc2hhZG93OiAwcHggMHB4IDFweCAzcHggYmxhY2s7XHJcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICBmb250LWZhbWlseTogXCJKb3NlZmluIFNhbnNcIjtcclxufVxyXG5cclxuYnV0dG9uI3JlZ2lzdHJvOmhvdmVyIHtcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XHJcbn1cclxuXHJcbiNyZWdpc3Ryb0V4dGVybm8ge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luOiBhdXRvO1xyXG4gIHdpZHRoOiA5MHZ3O1xyXG59XHJcblxyXG4jcmVnaXN0cm9FeHRlcm5vIGJ1dHRvbiB7XHJcbiAgd2lkdGg6IDE2MHB4O1xyXG4gIGhlaWdodDogNzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNTYsIDU2LCAxNTUpO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiA5MHB4O1xyXG4gIGJveC1zaGFkb3c6IDBweCAycHggNnB4IDJweCByZ2IoMTcsIDE3LCAxNywgMC40KTtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIG1hcmdpbi10b3A6IDE0cHg7XHJcbiAgY29sb3I6IHJnYigyNTUsIDI0OCwgMjMzKTtcclxuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCI7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG5cclxuI3JlZ2lzdHJvRXh0ZXJubyBidXR0b246aG92ZXIge1xyXG4gIHdpZHRoOiAxNjBweDtcclxuICBoZWlnaHQ6IDcwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDU2LCA1NiwgMTU1KTtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogOTBweDtcclxuICBib3gtc2hhZG93OiAwcHggMnB4IDZweCAycHggcmdiKDE3LCAxNywgMTcsIDAuNCk7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBtYXJnaW4tdG9wOiAxNHB4O1xyXG4gIGNvbG9yOiByZ2IoMjU1LCAyNDgsIDIzMyk7XHJcbiAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIHRleHQtYWxpZ246IGxlZnQ7XHJcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xyXG59XHJcblxyXG4jcmVnaXN0cm9FeHRlcm5vIGJ1dHRvbjpudGgtY2hpbGQoMikge1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDI0OCwgMjMzKTtcclxuICBjb2xvcjogcmdiKDI1NSwgNzIsIDcyKTtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ "mnRk":
/*!***********************************************************!*\
  !*** ./src/app/components/searcher/searcher.component.ts ***!
  \***********************************************************/
/*! exports provided: SearcherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearcherComponent", function() { return SearcherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class SearcherComponent {
    constructor() { }
    ngOnInit() { }
}
SearcherComponent.ɵfac = function SearcherComponent_Factory(t) { return new (t || SearcherComponent)(); };
SearcherComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SearcherComponent, selectors: [["app-searcher"]], decls: 3, vars: 0, consts: [["id", "buscador"], ["src", "../../../assets/imgs/search.svg"], ["type", "text", "placeholder", "Buscar tattoo o material"]], template: function SearcherComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWFyY2hlci5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "ojyh":
/*!******************************************************!*\
  !*** ./src/app/pages/homepage/homepage.component.ts ***!
  \******************************************************/
/*! exports provided: HomepageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepageComponent", function() { return HomepageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_dbcatcher_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/dbcatcher.service */ "/Xfe");


class HomepageComponent {
    constructor(dbCatcher) {
        this.dbCatcher = dbCatcher;
    }
    ngOnInit() {
    }
}
HomepageComponent.ɵfac = function HomepageComponent_Factory(t) { return new (t || HomepageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_dbcatcher_service__WEBPACK_IMPORTED_MODULE_1__["DBCatcherService"])); };
HomepageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomepageComponent, selectors: [["app-homepage"]], decls: 153, vars: 0, consts: [[1, "tagsContainer"], [1, "tags"], ["type", "button", 1, "tag", "OldSchool"], ["type", "button", 1, "tag", "NewSchool"], ["type", "button", 1, "tag", "Japanese"], ["type", "button", 1, "tag", "Pattern"], ["type", "button", 1, "tag", "Comic"], ["type", "button", 1, "tag", "Black"], ["type", "button", 1, "tag", "Geometric"], ["id", "line1"], ["id", "line2"], ["id", "container"], ["id", "propuesta"], ["id", "prop-Valor", "src", "../../../assets/imgs/prop-valor-homepage-02.svg"], ["id", "pattern-button"], ["id", "line-pattern", "src", "../../../assets/imgs/graphics-elements-homepage-03.svg"], ["type", "button", "id", "button-registro"], ["id", "tattoo"], [1, "titular-categoria"], ["src", "../../../assets/imgs/arrow-titular-black-04.svg"], ["id", "second-arrow", "src", "../../../assets/imgs/arrow-titular-black-04.svg"], [1, "img-tatto-product"], [1, "img-name"], ["src", "../../../assets/imgs/allef-vinicius-hxNiXP498UI-unsplash.jpg"], ["type", "button", 1, "button-tattoo"], ["id", "market"], ["id", "line3"], ["id", "eventos"], ["id", "prop-eventos-boton"], ["id", "prop-valor-eventos", "src", "../../../assets/imgs/prop-valor-eventos-07.svg"], ["type", "button", "id", "button-evento"], ["type", "button", 1, "button-eventos"], ["id", "products"], ["id", "events"], ["rel", "script", "href", "scroll.ts"]], template: function HomepageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Old School");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "New School");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Japanese");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Pattern");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Comic");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Black");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Gemotric");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "hr", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "hr", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Registrate!!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "Tattos +");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, " Valorados");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Rodrigo Kalaka");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](87, "hr", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "img", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "Material en");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Oferta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "img", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](100, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](104, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](112, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](125, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](130, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](132, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, "400$");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](135, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "hr", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](139, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](140, "button", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](143, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, "Expo Zaragoza 2021");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta dolorem magnam accusamus voluptatibus repellat ullam, voluptas voluptate, aut quam temporibus unde sequi quo, impedit nostrum porro nobis consectetur eligendi iure.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](149, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](150, "div", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](151, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "link", 34);
    } }, styles: ["@media screen and (max-width:767px) {\r\n\r\n\r\n.tagsContainer[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n    overflow-x: scroll;\r\n    overflow-y: hidden;\r\n    width:100vw;\r\n}\r\n\r\n.tags[_ngcontent-%COMP%] {\r\n    padding-top:9vh;\r\n    margin-bottom: 5px;\r\n    position: relative;\r\n    width: 100vw;\r\n    overflow-x: scroll;\r\n    overflow-y: hidden;\r\n    white-space: nowrap;\r\n    transition: all 0.2s;\r\n    transform: scale(0.98);\r\n    will-change: transform;\r\n    -webkit-user-select: none;\r\n            user-select: none;\r\n    cursor: pointer;\r\n  }\r\n\r\n.tags.active[_ngcontent-%COMP%] {\r\n    cursor: grabbing;\r\n    cursor: -webkit-grabbing;\r\n    transform: scale(1);\r\n  }\r\n\r\n.tag[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    background: var(--white-bones-color);\r\n    height: 40px;\r\n    width: 130px;\r\n    border-radius: 90px;\r\n    border:none;\r\n    box-shadow: 0px 0px 4px 2px rgb(22, 22, 22, 0.5);\r\n    margin: 30px 10px 20px 20px;\r\n    font-family: 'Josefin Sans';\r\n    font-size: 14px;\r\n    font-weight: 800;\r\n  }\r\n\r\n  .tag[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--red-color);\r\n    color:white;\r\n    box-shadow: none;\r\n  }\r\n\r\n  #line1[_ngcontent-%COMP%]{\r\n    height: 10px;\r\n    background-image: linear-gradient(90deg,currentColor,currentColor 33.33%,transparent 33.33%,transparent 100%);\r\n    background-size: 3px 100%;\r\n    width: 100vw;\r\n    margin-bottom:5px;\r\n  }\r\n\r\n  #line2[_ngcontent-%COMP%]{\r\n    height:10px;\r\n    border-top:2px solid black;\r\n    border-radius: none;\r\n    border-left: none;\r\n    border-bottom: none;\r\n    width:100vw;\r\n  }\r\n\r\n\r\n  #container[_ngcontent-%COMP%]{\r\n    width:90vw;\r\n    height:auto;\r\n    display:block;\r\n    margin:auto;\r\n  }\r\n\r\n\r\n  #prop-Valor[_ngcontent-%COMP%]{\r\n    margin-top:12px;\r\n  }\r\n\r\n  #pattern-button[_ngcontent-%COMP%]{\r\n    position:relative;\r\n    width:100%;\r\n    height:100%;\r\n  }\r\n\r\n  #button-registro[_ngcontent-%COMP%]{\r\n    position:absolute;\r\n    bottom:0px;\r\n    right:0vw;\r\n    left: 0;\r\n    top:0;\r\n    margin:auto;\r\n    width:14em;\r\n    height:5em;\r\n    background-color: var(--red-color);\r\n    border-radius: 90px;\r\n    border: 0.5em solid var(--white-bones-color);\r\n    box-shadow: 0px 0px 24px 400px  solid black;\r\n    color: var(--white-bones-color);\r\n    font-family: 'Poller One';\r\n    font-size: 1em;\r\n    text-transform: uppercase;\r\n  }\r\n\r\n  #tattoo[_ngcontent-%COMP%]{\r\n    display:block;\r\n    margin:auto;\r\n  }\r\n\r\n  #market[_ngcontent-%COMP%]{\r\n    display:block;\r\n    margin:10px auto auto auto;\r\n  }\r\n\r\n  #eventos[_ngcontent-%COMP%]{\r\n    display:block;\r\n    margin:10px auto auto auto;\r\n  }\r\n\r\n  #line3[_ngcontent-%COMP%]{\r\n    height: 10px;\r\n    background-image: linear-gradient(90deg,currentColor,currentColor 33.33%,transparent 33.33%,transparent 100%);\r\n    background-size: 3px 100%;\r\n    width: 90vw;\r\n    margin-bottom:5px;\r\n  }\r\n\r\n  .titular-categoria[_ngcontent-%COMP%]{\r\n    display:flex;\r\n    justify-content: space-around;\r\n    align-items:center;\r\n    margin:auto auto 10px auto;\r\n    width:80vw;\r\n    height:4em;\r\n    font-family:'Poppins';\r\n    font-weight: lighter;\r\n    color:rgb(20, 20, 20);\r\n    font-size:0.9em;\r\n\r\n  }\r\n\r\n  .titular-categoria[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{\r\n    font-weight: 800;\r\n    font-size: 1.3em;\r\n    font-family:'Josefin Sans';\r\n    color:var(--red-color);\r\n  }\r\n\r\n\r\n\r\n  .titular-categoria[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:15%;\r\n  }\r\n\r\n  #second-arrow[_ngcontent-%COMP%]{\r\n    transform:rotate(180deg);\r\n    -ms-transform:rotate(180deg); \r\n    -webkit-transform:rotate(180deg); \r\n  }\r\n\r\n\r\n  .img-tatto-product[_ngcontent-%COMP%]{\r\n    display:grid;\r\n    grid-template-columns: repeat(2, 0.5fr);\r\n    width:90vw;\r\n    margin:auto;\r\n  }\r\n\r\n\r\n  .img-name[_ngcontent-%COMP%]{\r\n    box-shadow: 0px 0px 4px 2px rgb(19, 19, 19, 0.4);\r\n    height:300px;\r\n    width:95%;\r\n    border-radius: 20px;\r\n    display:block;\r\n    margin:auto auto 10px auto;\r\n    position:relative;\r\n    background-color: transparent;\r\n  }\r\n\r\n  .img-name[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\r\n    width:100%;\r\n    height:85%;\r\n    object-fit: cover;\r\n    border-radius: 20px 20px 0px 0px;\r\n  }\r\n\r\n  .img-name[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n    background-color: var(--white-bones-color);\r\n    border-radius: 0px 0px 20px 20px;\r\n    width:100%;\r\n    height:10%;\r\n    padding:5px;\r\n  }\r\n\r\n  .button-tattoo[_ngcontent-%COMP%]{\r\n    display:block;\r\n    margin:auto;\r\n    position:absolute;\r\n    left:0;\r\n    right:0;\r\n    bottom:0;\r\n    top:50%;\r\n    width:40px;\r\n    height:40px;\r\n    border-radius: 90px;\r\n    border:none;\r\n    background-color: transparent;\r\n    background-image: url('plus-circle-white-02.svg');\r\n    background-repeat: no-repeat;\r\n    box-shadow: 0px 0px 5px 2px rgb(19, 19, 19, 0.4);\r\n  }\r\n\r\n  #prop-eventos-boton[_ngcontent-%COMP%]{\r\n    position:relative;\r\n    margin-bottom:10px;\r\n  }\r\n\r\n  #prop-valor-eventos[_ngcontent-%COMP%]{\r\n    display: block;\r\n    margin:auto;\r\n    width:80vw;\r\n  }\r\n\r\n  #button-evento[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    background-image: url('plus-circle-black-03-03.svg');\r\n    background-repeat: no-repeat;\r\n    background-color: black;\r\n    top:79%;\r\n    right:2.5%;\r\n    width:3em;\r\n    height:3em;\r\n    border:5px solid var(--white-bones-color);\r\n    border-radius: 100px;\r\n  }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n@media screen and (min-width: 1024px) {\r\n\r\n  .tagsContainer[_ngcontent-%COMP%] {\r\n    padding: 0;\r\n    overflow-x: scroll;\r\n    overflow-y: hidden;\r\n    width:100vw;\r\n}\r\n\r\n.tags[_ngcontent-%COMP%] {\r\n    padding-top:9vh;\r\n    margin-bottom: 5px;\r\n    position: relative;\r\n    width: 100vw;\r\n    overflow-x: scroll;\r\n    overflow-y: hidden;\r\n    white-space: nowrap;\r\n    transition: all 0.2s;\r\n    transform: scale(0.98);\r\n    will-change: transform;\r\n    -webkit-user-select: none;\r\n            user-select: none;\r\n    cursor: pointer;\r\n  }\r\n\r\n.tags.active[_ngcontent-%COMP%] {\r\n    cursor: grabbing;\r\n    cursor: -webkit-grabbing;\r\n    transform: scale(1);\r\n  }\r\n\r\n.tag[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n    background: var(--white-bones-color);\r\n    height: 40px;\r\n    width: 130px;\r\n    border-radius: 90px;\r\n    border:none;\r\n    box-shadow: 0px 0px 4px 2px rgb(22, 22, 22, 0.5);\r\n    margin: 30px 10px 20px 20px;\r\n    font-family: 'Josefin Sans';\r\n    font-size: 14px;\r\n    font-weight: 800;\r\n  }\r\n\r\n  .tag[_ngcontent-%COMP%]:hover{\r\n    background-color: var(--red-color);\r\n    color:white;\r\n    box-shadow: none;\r\n  }\r\n\r\n  #line1[_ngcontent-%COMP%]{\r\n    height: 10px;\r\n    background-image: linear-gradient(90deg,currentColor,currentColor 33.33%,transparent 33.33%,transparent 100%);\r\n    background-size: 3px 100%;\r\n    width: 100vw;\r\n    margin-bottom:5px;\r\n  }\r\n\r\n  #line2[_ngcontent-%COMP%]{\r\n    height:10px;\r\n    border-top:2px solid black;\r\n    border-radius: none;\r\n    border-left: none;\r\n    border-bottom: none;\r\n    width:100vw;\r\n  }\r\n\r\n\r\n  #container[_ngcontent-%COMP%]{\r\n    width:90vw;\r\n    height:auto;\r\n    display:block;\r\n    margin:auto;\r\n\r\n  }\r\n\r\n  #patter-button[_ngcontent-%COMP%]{\r\n    position:relative;\r\n  }\r\n\r\n  #prop-Valor[_ngcontent-%COMP%]{\r\n    margin-top:12px;\r\n  }\r\n\r\n\r\n  #button-registro[_ngcontent-%COMP%]{\r\n    position:absolute;\r\n    bottom:42px;\r\n    right:18vw;\r\n    width:200px;\r\n    height:60px;\r\n    background-color: var(--red-color);\r\n    border-radius: 90px;\r\n    border: 10px solid var(--white-bones-color);\r\n    box-shadow: 0px 0px 24px 400px  solid black;\r\n    color: var(--white-bones-color);\r\n    font-family: 'Poller One';\r\n    font-size: 16px;\r\n    text-transform: uppercase;\r\n  }\r\n\r\n\r\n\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWVwYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBO0lBQ0ksVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsV0FBVztBQUNmOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLHlCQUFpQjtZQUFqQixpQkFBaUI7SUFDakIsZUFBZTtFQUNqQjs7QUFFRjtJQUNJLGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsbUJBQW1CO0VBQ3JCOztBQUVGO0lBQ0kscUJBQXFCO0lBQ3JCLG9DQUFvQztJQUNwQyxZQUFZO0lBQ1osWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsZ0RBQWdEO0lBQ2hELDJCQUEyQjtJQUMzQiwyQkFBMkI7SUFDM0IsZUFBZTtJQUNmLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLGtDQUFrQztJQUNsQyxXQUFXO0lBQ1gsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsWUFBWTtJQUNaLDZHQUE2RztJQUM3Ryx5QkFBeUI7SUFDekIsWUFBWTtJQUNaLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLFdBQVc7SUFDWCwwQkFBMEI7SUFDMUIsbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixtQkFBbUI7SUFDbkIsV0FBVztFQUNiOzs7RUFHQTtJQUNFLFVBQVU7SUFDVixXQUFXO0lBQ1gsYUFBYTtJQUNiLFdBQVc7RUFDYjs7O0VBR0E7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsaUJBQWlCO0lBQ2pCLFVBQVU7SUFDVixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxpQkFBaUI7SUFDakIsVUFBVTtJQUNWLFNBQVM7SUFDVCxPQUFPO0lBQ1AsS0FBSztJQUNMLFdBQVc7SUFDWCxVQUFVO0lB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QixZQUFZO0lBQ1osaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsV0FBVztJQUNYLDBCQUEwQjtJQUMxQixtQkFBbUI7SUFDbkIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixXQUFXO0VBQ2I7OztFQUdBO0lBQ0UsVUFBVTtJQUNWLFdBQVc7SUFDWCxhQUFhO0lBQ2IsV0FBVzs7RUFFYjs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQjs7RUFFQTtJQUNFLGVBQWU7RUFDakI7OztFQUdBO0lBQ0UsaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxVQUFVO0lBQ1YsV0FBVztJQUNYLFdBQVc7SUFDWCxrQ0FBa0M7SUFDbEMsbUJBQW1CO0lBQ25CLDJDQUEyQztJQUMzQywyQ0FBMkM7SUFDM0MsK0JBQStCO0lBQy9CLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YseUJBQXlCO0VBQzNCOzs7OztBQUtGIiwiZmlsZSI6ImhvbWVwYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjc2N3B4KSB7XHJcblxyXG5cclxuLnRhZ3NDb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgIHdpZHRoOjEwMHZ3O1xyXG59XHJcblxyXG4udGFncyB7XHJcbiAgICBwYWRkaW5nLXRvcDo5dmg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xyXG4gICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbi50YWdzLmFjdGl2ZSB7XHJcbiAgICBjdXJzb3I6IGdyYWJiaW5nO1xyXG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICB9XHJcblxyXG4udGFnIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDkwcHg7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDJweCByZ2IoMjIsIDIyLCAyMiwgMC41KTtcclxuICAgIG1hcmdpbjogMzBweCAxMHB4IDIwcHggMjBweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnSm9zZWZpbiBTYW5zJztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgfVxyXG5cclxuICAudGFnOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLWNvbG9yKTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICB9XHJcblxyXG4gICNsaW5lMXtcclxuICAgIGhlaWdodDogMTBweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg5MGRlZyxjdXJyZW50Q29sb3IsY3VycmVudENvbG9yIDMzLjMzJSx0cmFuc3BhcmVudCAzMy4zMyUsdHJhbnNwYXJlbnQgMTAwJSk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDNweCAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgbWFyZ2luLWJvdHRvbTo1cHg7XHJcbiAgfVxyXG5cclxuICAjbGluZTJ7XHJcbiAgICBoZWlnaHQ6MTBweDtcclxuICAgIGJvcmRlci10b3A6MnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxuICAgIHdpZHRoOjEwMHZ3O1xyXG4gIH1cclxuXHJcblxyXG4gICNjb250YWluZXJ7XHJcbiAgICB3aWR0aDo5MHZ3O1xyXG4gICAgaGVpZ2h0OmF1dG87XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOmF1dG87XHJcbiAgfVxyXG5cclxuXHJcbiAgI3Byb3AtVmFsb3J7XHJcbiAgICBtYXJnaW4tdG9wOjEycHg7XHJcbiAgfVxyXG5cclxuICAjcGF0dGVybi1idXR0b257XHJcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBoZWlnaHQ6MTAwJTtcclxuICB9XHJcblxyXG4gICNidXR0b24tcmVnaXN0cm97XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGJvdHRvbTowcHg7XHJcbiAgICByaWdodDowdnc7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgdG9wOjA7XHJcbiAgICBtYXJnaW46YXV0bztcclxuICAgIHdpZHRoOjE0ZW07XHJcbiAgICBoZWlnaHQ6NWVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLWNvbG9yKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDkwcHg7XHJcbiAgICBib3JkZXI6IDAuNWVtIHNvbGlkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggMjRweCA0MDBweCAgc29saWQgYmxhY2s7XHJcbiAgICBjb2xvcjogdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gICAgZm9udC1mYW1pbHk6ICdQb2xsZXIgT25lJztcclxuICAgIGZvbnQtc2l6ZTogMWVtO1xyXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcclxuICB9XHJcblxyXG4gICN0YXR0b297XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOmF1dG87XHJcbiAgfVxyXG5cclxuICAjbWFya2V0e1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIG1hcmdpbjoxMHB4IGF1dG8gYXV0byBhdXRvO1xyXG4gIH1cclxuXHJcbiAgI2V2ZW50b3N7XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOjEwcHggYXV0byBhdXRvIGF1dG87XHJcbiAgfVxyXG5cclxuICAjbGluZTN7XHJcbiAgICBoZWlnaHQ6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsY3VycmVudENvbG9yLGN1cnJlbnRDb2xvciAzMy4zMyUsdHJhbnNwYXJlbnQgMzMuMzMlLHRyYW5zcGFyZW50IDEwMCUpO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAzcHggMTAwJTtcclxuICAgIHdpZHRoOiA5MHZ3O1xyXG4gICAgbWFyZ2luLWJvdHRvbTo1cHg7XHJcbiAgfVxyXG5cclxuICAudGl0dWxhci1jYXRlZ29yaWF7XHJcbiAgICBkaXNwbGF5OmZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIGFsaWduLWl0ZW1zOmNlbnRlcjtcclxuICAgIG1hcmdpbjphdXRvIGF1dG8gMTBweCBhdXRvO1xyXG4gICAgd2lkdGg6ODB2dztcclxuICAgIGhlaWdodDo0ZW07XHJcbiAgICBmb250LWZhbWlseTonUG9wcGlucyc7XHJcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcclxuICAgIGNvbG9yOnJnYigyMCwgMjAsIDIwKTtcclxuICAgIGZvbnQtc2l6ZTowLjllbTtcclxuXHJcbiAgfVxyXG5cclxuICAudGl0dWxhci1jYXRlZ29yaWEgc3BhbntcclxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgICBmb250LXNpemU6IDEuM2VtO1xyXG4gICAgZm9udC1mYW1pbHk6J0pvc2VmaW4gU2Fucyc7XHJcbiAgICBjb2xvcjp2YXIoLS1yZWQtY29sb3IpO1xyXG4gIH1cclxuXHJcblxyXG5cclxuICAudGl0dWxhci1jYXRlZ29yaWEgaW1ne1xyXG4gICAgd2lkdGg6MTUlO1xyXG4gIH1cclxuXHJcbiAgI3NlY29uZC1hcnJvd3tcclxuICAgIHRyYW5zZm9ybTpyb3RhdGUoMTgwZGVnKTtcclxuICAgIC1tcy10cmFuc2Zvcm06cm90YXRlKDE4MGRlZyk7IC8qIElFIDkgKi9cclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgxODBkZWcpOyAvKiBPcGVyYSwgQ2hyb21lLCBhbmQgU2FmYXJpICovXHJcbiAgfVxyXG5cclxuXHJcbiAgLmltZy10YXR0by1wcm9kdWN0e1xyXG4gICAgZGlzcGxheTpncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMC41ZnIpO1xyXG4gICAgd2lkdGg6OTB2dztcclxuICAgIG1hcmdpbjphdXRvO1xyXG4gIH1cclxuXHJcblxyXG4gIC5pbWctbmFtZXtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICAgIGhlaWdodDozMDBweDtcclxuICAgIHdpZHRoOjk1JTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOmF1dG8gYXV0byAxMHB4IGF1dG87XHJcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gIH1cclxuXHJcbiAgLmltZy1uYW1lIGltZ3tcclxuICAgIHdpZHRoOjEwMCU7XHJcbiAgICBoZWlnaHQ6ODUlO1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4IDIwcHggMHB4IDBweDtcclxuICB9XHJcblxyXG4gIC5pbWctbmFtZSBwe1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0td2hpdGUtYm9uZXMtY29sb3IpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMHB4IDBweCAyMHB4IDIwcHg7XHJcbiAgICB3aWR0aDoxMDAlO1xyXG4gICAgaGVpZ2h0OjEwJTtcclxuICAgIHBhZGRpbmc6NXB4O1xyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbi10YXR0b297XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOmF1dG87XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGxlZnQ6MDtcclxuICAgIHJpZ2h0OjA7XHJcbiAgICBib3R0b206MDtcclxuICAgIHRvcDo1MCU7XHJcbiAgICB3aWR0aDo0MHB4O1xyXG4gICAgaGVpZ2h0OjQwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA5MHB4O1xyXG4gICAgYm9yZGVyOm5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi8uLi9hc3NldHMvaW1ncy9wbHVzLWNpcmNsZS13aGl0ZS0wMi5zdmcpO1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDJweCByZ2IoMTksIDE5LCAxOSwgMC40KTtcclxuICB9XHJcblxyXG4gICNwcm9wLWV2ZW50b3MtYm90b257XHJcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgIG1hcmdpbi1ib3R0b206MTBweDtcclxuICB9XHJcblxyXG4gICNwcm9wLXZhbG9yLWV2ZW50b3N7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjphdXRvO1xyXG4gICAgd2lkdGg6ODB2dztcclxuICB9XHJcblxyXG4gICNidXR0b24tZXZlbnRve1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWdzL3BsdXMtY2lyY2xlLWJsYWNrLTAzLTAzLnN2Zyk7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XHJcbiAgICB0b3A6NzklO1xyXG4gICAgcmlnaHQ6Mi41JTtcclxuICAgIHdpZHRoOjNlbTtcclxuICAgIGhlaWdodDozZW07XHJcbiAgICBib3JkZXI6NXB4IHNvbGlkIHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS1QQyovXHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcclxuXHJcbiAgLnRhZ3NDb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG92ZXJmbG93LXg6IHNjcm9sbDtcclxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgIHdpZHRoOjEwMHZ3O1xyXG59XHJcblxyXG4udGFncyB7XHJcbiAgICBwYWRkaW5nLXRvcDo5dmg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XHJcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xyXG4gICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxuICAgIHVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbi50YWdzLmFjdGl2ZSB7XHJcbiAgICBjdXJzb3I6IGdyYWJiaW5nO1xyXG4gICAgY3Vyc29yOiAtd2Via2l0LWdyYWJiaW5nO1xyXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICB9XHJcblxyXG4udGFnIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGJhY2tncm91bmQ6IHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIHdpZHRoOiAxMzBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDkwcHg7XHJcbiAgICBib3JkZXI6bm9uZTtcclxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNHB4IDJweCByZ2IoMjIsIDIyLCAyMiwgMC41KTtcclxuICAgIG1hcmdpbjogMzBweCAxMHB4IDIwcHggMjBweDtcclxuICAgIGZvbnQtZmFtaWx5OiAnSm9zZWZpbiBTYW5zJztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XHJcbiAgfVxyXG5cclxuICAudGFnOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcmVkLWNvbG9yKTtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICB9XHJcblxyXG4gICNsaW5lMXtcclxuICAgIGhlaWdodDogMTBweDtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg5MGRlZyxjdXJyZW50Q29sb3IsY3VycmVudENvbG9yIDMzLjMzJSx0cmFuc3BhcmVudCAzMy4zMyUsdHJhbnNwYXJlbnQgMTAwJSk7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDNweCAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgbWFyZ2luLWJvdHRvbTo1cHg7XHJcbiAgfVxyXG5cclxuICAjbGluZTJ7XHJcbiAgICBoZWlnaHQ6MTBweDtcclxuICAgIGJvcmRlci10b3A6MnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgYm9yZGVyLXJhZGl1czogbm9uZTtcclxuICAgIGJvcmRlci1sZWZ0OiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxuICAgIHdpZHRoOjEwMHZ3O1xyXG4gIH1cclxuXHJcblxyXG4gICNjb250YWluZXJ7XHJcbiAgICB3aWR0aDo5MHZ3O1xyXG4gICAgaGVpZ2h0OmF1dG87XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgbWFyZ2luOmF1dG87XHJcblxyXG4gIH1cclxuXHJcbiAgI3BhdHRlci1idXR0b257XHJcbiAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICB9XHJcblxyXG4gICNwcm9wLVZhbG9ye1xyXG4gICAgbWFyZ2luLXRvcDoxMnB4O1xyXG4gIH1cclxuXHJcblxyXG4gICNidXR0b24tcmVnaXN0cm97XHJcbiAgICBwb3NpdGlvbjphYnNvbHV0ZTtcclxuICAgIGJvdHRvbTo0MnB4O1xyXG4gICAgcmlnaHQ6MTh2dztcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgaGVpZ2h0OjYwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1yZWQtY29sb3IpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOTBweDtcclxuICAgIGJvcmRlcjogMTBweCBzb2xpZCB2YXIoLS13aGl0ZS1ib25lcy1jb2xvcik7XHJcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDI0cHggNDAwcHggIHNvbGlkIGJsYWNrO1xyXG4gICAgY29sb3I6IHZhcigtLXdoaXRlLWJvbmVzLWNvbG9yKTtcclxuICAgIGZvbnQtZmFtaWx5OiAnUG9sbGVyIE9uZSc7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xyXG4gIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ "q33e":
/*!**************************************************************!*\
  !*** ./src/app/pages/detail-event/detail-event.component.ts ***!
  \**************************************************************/
/*! exports provided: DetailEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailEventComponent", function() { return DetailEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DetailEventComponent {
    constructor() { }
    ngOnInit() {
    }
}
DetailEventComponent.ɵfac = function DetailEventComponent_Factory(t) { return new (t || DetailEventComponent)(); };
DetailEventComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DetailEventComponent, selectors: [["app-detail-event"]], decls: 2, vars: 0, template: function DetailEventComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "detail-event works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXRhaWwtZXZlbnQuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "qfBg":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "b6Qw");



class UserService {
    constructor(db, cookies) {
        this.db = db;
        this.cookies = cookies;
    }
    login(user) {
        const filter = (ref) => ref
            .where('email', '==', user.email)
            .where('password', '==', user.password);
        //  buscar en base de datos y comprar email y contraseña, devuelve ID
        return this.db.collection('Users', filter).get();
    }
    setToken(token) {
        this.cookies.set('token', token);
    }
    getToken() {
        return this.cookies.get('token');
    }
    // aqui abria que devolver el usuario
    getUser() {
        const token = this.getUserLogged;
        const filter = (ref) => ref.where('userID', '==', token);
        return this.db.collection('Users', filter).get();
    }
    getUserLogged() {
        return this.getToken();
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_1__["AngularFirestore"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _pages_chat_chat_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/chat/chat.component */ "WSoB");
/* harmony import */ var _pages_detail_event_detail_event_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/detail-event/detail-event.component */ "q33e");
/* harmony import */ var _pages_detail_product_detail_product_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/detail-product/detail-product.component */ "d4Z3");
/* harmony import */ var _pages_detail_tattoo_detail_tattoo_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/detail-tattoo/detail-tattoo.component */ "TAFX");
/* harmony import */ var _pages_events_events_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/events/events.component */ "3DrK");
/* harmony import */ var _pages_homepage_homepage_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/homepage/homepage.component */ "ojyh");
/* harmony import */ var _pages_options_options_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/options/options.component */ "Rn8K");
/* harmony import */ var _pages_product_product_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/product/product.component */ "10O5");
/* harmony import */ var _pages_register_register_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/register/register.component */ "fNfI");
/* harmony import */ var _pages_tattoo_tattoo_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/tattoo/tattoo.component */ "JNri");
/* harmony import */ var _pages_user_personal_externo_user_personal_externo_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/user-personal-externo/user-personal-externo.component */ "xcG4");
/* harmony import */ var _pages_user_personal_user_personal_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/user-personal/user-personal.component */ "Cy06");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");















const routes = [
    { path: '', component: _pages_homepage_homepage_component__WEBPACK_IMPORTED_MODULE_6__["HomepageComponent"] },
    { path: 'tattoos', component: _pages_tattoo_tattoo_component__WEBPACK_IMPORTED_MODULE_10__["TattooComponent"] },
    { path: 'product', component: _pages_product_product_component__WEBPACK_IMPORTED_MODULE_8__["ProductComponent"] },
    { path: 'chat', component: _pages_chat_chat_component__WEBPACK_IMPORTED_MODULE_1__["ChatComponent"] },
    { path: 'events/detail/:id', component: _pages_detail_event_detail_event_component__WEBPACK_IMPORTED_MODULE_2__["DetailEventComponent"] },
    { path: 'product/detail/:id', component: _pages_detail_product_detail_product_component__WEBPACK_IMPORTED_MODULE_3__["DetailProductComponent"] },
    { path: 'tattoos/detail/:id', component: _pages_detail_tattoo_detail_tattoo_component__WEBPACK_IMPORTED_MODULE_4__["DetailTattooComponent"] },
    { path: 'envents', component: _pages_events_events_component__WEBPACK_IMPORTED_MODULE_5__["EventsComponent"] },
    { path: 'options', component: _pages_options_options_component__WEBPACK_IMPORTED_MODULE_7__["OptionsComponent"] },
    { path: 'register', component: _pages_register_register_component__WEBPACK_IMPORTED_MODULE_9__["RegisterComponent"] },
    { path: 'user', component: _pages_user_personal_user_personal_component__WEBPACK_IMPORTED_MODULE_12__["UserPersonalComponent"] },
    { path: 'user/external', component: _pages_user_personal_externo_user_personal_externo_component__WEBPACK_IMPORTED_MODULE_11__["UserPersonalExternoComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "xcG4":
/*!********************************************************************************!*\
  !*** ./src/app/pages/user-personal-externo/user-personal-externo.component.ts ***!
  \********************************************************************************/
/*! exports provided: UserPersonalExternoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPersonalExternoComponent", function() { return UserPersonalExternoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class UserPersonalExternoComponent {
    constructor() { }
    ngOnInit() {
    }
}
UserPersonalExternoComponent.ɵfac = function UserPersonalExternoComponent_Factory(t) { return new (t || UserPersonalExternoComponent)(); };
UserPersonalExternoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UserPersonalExternoComponent, selectors: [["app-user-personal-externo"]], decls: 2, vars: 0, template: function UserPersonalExternoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "user-personal-externo works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXBlcnNvbmFsLWV4dGVybm8uY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "zOX/":
/*!****************************************!*\
  !*** ./src/app/jsons/tattooposts.json ***!
  \****************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"postNombre\":\"Test de Tattoo 1\",\"postImg\":\"../../assets/images/aleks-marinkovic-SU0K64C51M0-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"OldSchool\",\"Pattern\"],\"UserID\":1,\"Likes\":400},{\"postNombre\":\"Test de Tattoo 2\",\"postImg\":\"../../assets/images/allef-vinicius-hxNiXP498UI-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"NewSchool\",\"Geometric\",\"Others\"],\"UserID\":2,\"Likes\":0},{\"postNombre\":\"Test de Tattoo 3\",\"postImg\":\"../../assets/images/mary-pokatova-uZEyO4vL014-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Pattern\"],\"UserID\":1,\"Likes\":10},{\"postNombre\":\"Test de Tattoo 4\",\"postImg\":\"../../assets/images/nathalie-stimpfl-m0EDPy_qA34-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Japanese\"],\"UserID\":4,\"Likes\":5},{\"postNombre\":\"Test de Tattoo 5\",\"postImg\":\"../../assets/images/priscilla-du-preez-NMIR4Xpvz_0-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"NewSchool\",\"Black\"],\"UserID\":4,\"Likes\":90},{\"postNombre\":\"Test de Tattoo 6\",\"postImg\":\"../../assets/images/joel-muniz-yb5VUJo_Ddw-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Comic\",\"Others\"],\"UserID\":1,\"Likes\":1},{\"postNombre\":\"Test de Tattoo 7\",\"postImg\":\"../../assets/images/nathalie-stimpfl-m0EDPy_qA34-unsplash.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Pattern\",\"Black\"],\"UserID\":7,\"Likes\":4000},{\"postNombre\":\"Test de Tattoo 8\",\"postImg\":\"https://freedesignfile.com/upload/2018/05/person-with-tattoo-on-body-Stock-Photo.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Geometric\",\"OldSchool\"],\"UserID\":7,\"Likes\":0},{\"postNombre\":\"Test de Tattoo 9\",\"postImg\":\"https://freedesignfile.com/upload/2018/05/person-with-tattoo-on-body-Stock-Photo.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"Other\"],\"UserID\":4,\"Likes\":50},{\"postNombre\":\"Test de Tattoo 10\",\"postImg\":\"https://freedesignfile.com/upload/2018/05/person-with-tattoo-on-body-Stock-Photo.jpg\",\"descripcion\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\",\"Tags\":[\"OldSchool\"],\"UserID\":2,\"Likes\":18}]");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map