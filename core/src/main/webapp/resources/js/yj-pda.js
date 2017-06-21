/**
 * Created by Rebs on 2017/6/13.
 */

/**
 * 定义报工过账字段
 */
var barcode;            //条码
var postingDate;        //过账日期
var orderno;            //生产订单
var operation;          //工序
var yeild;              //合格数量
var workScrap;          //工废数量
var rowScrap;           //料废数量
var classgrp;           //班组
var line;               //生产线
var modelNo;            //模号

var plant;              //工厂
var dispatch;           //报工单号
var dispatchLogicNo;    //报工单流水号
var creationDate;       //创建日期、报工日期
var createdBy;          //创建人ID

var attr1;              //扩充字段1
var attr2;              //扩充字段2
var attr3;              //扩充字段3
var attr4;              //扩充字段4
var attr5;              //扩充字段5
var attr6;              //扩充字段6
var attr7;              //扩充字段7
var attr8;              //扩充字段8
var attr9;              //扩充字段9
var attr10;             //扩充字段10
var attr11;             //扩充字段11
var attr12;             //扩充字段12
var attr13;             //扩充字段13
var attr14;             //扩充字段14
var attr15;             //扩充字段15

/**
 * 获取报工过账字段的值
 */
function getDispatchValues() {
    barcode = document.getElementById("barcode").value;
    postingDate = document.getElementById("postingDate").options[document.getElementById("postingDate").selectedIndex].value;
    orderno = document.getElementById("orderno").value;
    operation = document.getElementById("operation").value;
    yeild = document.getElementById("yeild").value;
    workScrap = document.getElementById("workScrap").value;
    rowScrap = document.getElementById("rowScrap").value;
    classgrp = document.getElementById("classgrp").value;
    line = document.getElementById("line").value;
    modelNo = document.getElementById("modelNo").value;
    plant = barcode.substring(0,4);
    dispatch = barcode.substring(4,barcode.length-4);
    dispatchLogicNo = barcode.substring(barcode.length-8,barcode.length-4);

    attr1 = document.getElementById("attr1").value;
    attr2 = document.getElementById("attr2").value;
    attr3 = document.getElementById("attr3").value;
    attr4 = document.getElementById("attr4").value;
    attr5 = document.getElementById("attr5").value;
    attr6 = document.getElementById("attr6").value;
    attr7 = document.getElementById("attr7").value;
    attr8 = document.getElementById("attr8").value;
    attr9 = document.getElementById("attr9").value;
    attr10 = document.getElementById("attr10").value;
    attr11 = document.getElementById("attr11").value;
    attr12 = document.getElementById("attr12").value;
    attr13 = document.getElementById("attr13").value;
    attr14 = document.getElementById("attr14").value;
    attr15 = document.getElementById("attr15").value;
}

/**
 * 清空报工过账字段的值
 */
function delDispatchValues() {
    document.getElementById("barcode").value = "";

    document.getElementById("orderno").value = "";
    document.getElementById("operation").value = "";
    document.getElementById("yeild").value = "";
    document.getElementById("workScrap").value = "";
    document.getElementById("rowScrap").value = "";
    document.getElementById("classgrp").value = "";
    document.getElementById("line").value = "";
    document.getElementById("modelNo").value = "";

    document.getElementById("attr1").value = "";
    document.getElementById("attr2").value = "";
    document.getElementById("attr3").value = "";
    document.getElementById("attr4").value = "";
    document.getElementById("attr5").value = "";
    document.getElementById("attr6").value = "";
    document.getElementById("attr7").value = "";
    document.getElementById("attr8").value = "";
    document.getElementById("attr9").value = "";
    document.getElementById("attr10").value = "";
    document.getElementById("attr11").value = "";
    document.getElementById("attr12").value = "";
    document.getElementById("attr13").value = "";
    document.getElementById("attr14").value = "";
    document.getElementById("attr15").value = "";

}

/**
 * 检查报工过账必输字段 及字段格式
 */
function checkDispatchValues() {
    if(barcode == "" || barcode == null){
        return "请扫码";
    }
    if(yeild == "" || yeild == null){
        return "请输入合格数量";
    }
    if(workScrap == "" || workScrap == null){
        return "请输入工废数量";
    }
    if(rowScrap == "" || rowScrap == null){
        return "请输入料废数量";
    }
    return null;
}

/**
 * 定义报工数据传递json
 */
var dispatchData;

/**
 * 设置报工数据传递json
 */
function setDispatchData() {
    dispatchData={
        "barcode":barcode,
        "postingDate":postingDate,
        "orderno":orderno,
        "operation":operation,
        "yeild":yeild,
        "workScrap":workScrap,
        "rowScrap":rowScrap,
        "classgrp":classgrp,
        "line":line,
        "modelNo":modelNo,
        "plant":plant,
        "dispatch":dispatch,
        "dispatchLogicNo":dispatchLogicNo,
        "creationDate":creationDate,
        "createdBy":createdBy,
        "attr1":attr1,
        "attr2":attr2,
        "attr3":attr3,
        "attr4":attr4,
        "attr5":attr5,
        "attr6":attr6,
        "attr7":attr7,
        "attr8":attr8,
        "attr9":attr9,
        "attr10":attr10,
        "attr11":attr11,
        "attr12":attr12,
        "attr13":attr13,
        "attr14":attr14,
        "attr15":attr15
    };
}

/**
 * using for formatting the Date
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

/**
 * using for setting cookie
 * @param name
 * @param value
 */
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ value + ";expires=" + exp.toGMTString()+"domain=1;path=/";
}

/**
 * using for getting cookie
 * @param name
 * @returns {*}
 */
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return arr[2];
    else
        return null;
}

/**
 * using for deleting cookie
 * @param name
 * @returns {*}
 */
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"domain=1;path=/";
}

/**
 * using for getting the date of the same day
 * @returns {*}
 */
function getTodayDate() {
    return new Date().format("yyyy-MM-dd");
}

/**
 * using for getting the date of yesterday
 * @returns {*}
 */
function getYesterdayDate() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    return yesterday.format("yyyy-MM-dd");
}

/**
 * using for appending the mask Dialog
 */
function appendMaskDialog() {
    var oMaskD=document.createElement("div");
    oMaskD.id="mask";
    oMaskD.style.height="320px";
    oMaskD.style.width="240px";
    document.body.appendChild(oMaskD);
}

/**
 * using for removing the mask Dialog
 */
function removeMaskDialog() {
    var oMaskD=document.getElementById("mask");
    document.body.removeChild(oMaskD);
}