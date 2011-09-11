function aloha_display_saved(msg){
  var obj = jQuery.parseJSON(msg);
  if(obj.status == 'saved'){
    $('#aloha-' + obj.nid + '-saved').show().delay(1300).fadeOut();
  }
}
function aloha_focus_box(element){
  $(element).css({
    background:"rgb(255,255,235)"
  });
}
function aloha_unfocus_box(element){
  $(element).css({
    background:"none"
  });
}