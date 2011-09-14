(function($) {
  Drupal.behaviors.alohaEditor = {
    attach: function (context, settings) {
      // Run only if aloha is required
      if (settings.aloha) {
        // Aloha settings
        GENTICS.Aloha.settings = settings.aloha.alohaSettings;

        for (id in settings.aloha.nodes) {
          // Retrieving container
          var container = $(id);

          // Setting up Aloha and events associated
          container.aloha();
          container.blur(function() {
            var html = $(this).html();
            if (settings.aloha.nodes[id].html != html) {
              Drupal.behaviors.alohaEditor.save(id, html);
              // Update HTML
              settings.aloha.nodes[id].html = html;
            }
            $(this).removeClass('aloha-edit');
          });
          container.focus(function() {
            $(this).addClass('aloha-edit');
          });

          // Store HTML
          settings.aloha.nodes[id].html = container.html();

          // Setting up exit event
          $(window).unload(function() {
            var html = $('#aloha-container-' + id).html();
            if (settings.aloha.nodes[id].html != html) {
              Drupal.behaviors.alohaEditor.save(id, html);
            }
          });
        }
      }
    },
    save: function(id, html) {
      // Save node
      var body = Drupal.settings.aloha.nodes[id];
      
      if(Drupal.settings.aloha.cleanurls){
        var cleanUrl = '';
      } else {
        var cleanUrl = '?q=';
      }
      
      $.ajax({
        type: "POST",
        url: Drupal.settings.basePath + cleanUrl + 'node/' + body.nid + '/aloha/save',
        data: {body: html, lang: body.lang},
        success: function(obj) {
          if (obj.status == 'saved') {
            var element = '<div class="aloha-status">' + Drupal.t('%title has been saved.', {'%title': obj.title}) + '</div>';
            $(element).insertBefore($(id)).delay(1300).fadeOut(function () {
              $(this).remove();
            });
          }
        }
      });
    }
  };
}(jQuery));