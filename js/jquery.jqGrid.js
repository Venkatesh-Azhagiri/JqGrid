
// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
/**
* @license jqGrid 4.5.4 - jQuery Grid
* Copyright (c) 2008, Tony Tomov, tony@trirand.com
* Dual licensed under the MIT and GPL licenses
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl-2.0.html
* Date: 2013-10-06
*/
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*global jQuery */
(function ($) {
"use strict";
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
version : "4.5.4",
htmlDecode : function(value){
if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
},
htmlEncode : function (value){
return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
},
format : function(format){ //jqgformat
var args = $.makeArray(arguments).slice(1);
if(format==null) { format = ""; }
return format.replace(/\{(\d+)\}/g, function(m, i){
return args[i];
});
},
msie : navigator.appName === 'Microsoft Internet Explorer',
msiever : function () {
var rv = -1;
var ua = navigator.userAgent;
var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
if (re.exec(ua) != null) {
rv = parseFloat( RegExp.$1 );
}
return rv;
},
getCellIndex : function (cell) {
var c = $(cell);
if (c.is('tr')) { return -1; }
c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
if ($.jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
return c.cellIndex;
},
stripHtml : function(v) {
v = String(v);
var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
if (v) {
v = v.replace(regexp,"");
return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,"'") : "";
}
return v;
},
stripPref : function (pref, id) {
var obj = $.type( pref );
if( obj === "string" || obj === "number") {
pref = String(pref);
id = pref !== "" ? String(id).replace(String(pref), "") : id;
}
return id;
},
parse : function(jsonString) {
var js = jsonString;
if (js.substr(0,9) === "while(1);") { js = js.substr(9); }
if (js.substr(0,2) === "/*") { js = js.substr(2,js.length-4); }
if(!js) { js = "{}"; }
return ($.jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
JSON.parse(js) :
eval('(' + js + ')');
},
parseDate : function(format, date, newformat, opts) {
