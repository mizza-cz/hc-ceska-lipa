// Shared Select2 initialization across the site
function initProjectSelects(){
  if(!window.jQuery || !window.jQuery.fn || !window.jQuery.fn.select2)return;
  window.jQuery("select.js-select2").each(function(){
    const select=window.jQuery(this);
    if(select.hasClass("select2-hidden-accessible"))return;
    select.select2({width:"100%",minimumResultsForSearch:Infinity,dropdownAutoWidth:false});
  });
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",initProjectSelects,{once:true})}else{initProjectSelects()}
