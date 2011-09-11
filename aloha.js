$(document).ready(function(){
  GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha,"editableActivated",function(event,eventinfo){
    aloha_focus_box(eventinfo.editable.getId());
  });
  GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha,"editableDeactivated",function(event,eventinfo){
  
    var id = eventinfo.editable.getId();
    var nid = id.replace("aloha-","");
    var html = $(id).html();
    
    aloha_unfocus_box(id);
    
    $.ajax({
      type: "POST",
      url: Drupal.settings.basePath + "aloha/save/node/" + nid,
      data: ({ body: eventinfo.editable.getContents(), }),
      success: function(msg){
        aloha_display_saved(msg);
      },
    });
  })
  function aloha_display_saved(msg){
    var obj = jQuery.parseJSON(msg);
    if(obj.status == 'saved'){
      $('#aloha-' + obj.nid + '-saved').show().delay(1300).fadeOut();
    }
  }
  function aloha_focus_box(element){
    $('#' + element).css({
      background:"rgb(255,255,235)"
    });
  }
  function aloha_unfocus_box(element){
    $('#' + element).css({
      background:"none"
    });
  }
});