(function($) {
  Drupal.behaviors.alohaEditor = {
    attach: function (context, settings) {
      // Run only if aloha is required
      if (settings.aloha) {
        // Aloha settings
        GENTICS.Aloha.settings = settings.aloha.alohaSettings;

        for (nid in settings.aloha.nodes) {
          // Retrieving container
          var container = $('#aloha-container-' + nid);

          // Setting up Aloha and events associated
          container.aloha();
          container.blur(function() {
            var html = $(this).html();
            if (settings.aloha.nodes[nid].html != html) {
              Drupal.behaviors.alohaEditor.save(nid, html);
              // Update HTML
              settings.aloha.nodes[nid].html = html;
            }
            $(this).removeClass('aloha-edit');
          });
          container.focus(function() {
            $(this).addClass('aloha-edit');
          });

          // Store HTML
          settings.aloha.nodes[nid].html = container.html();

          // Setting up exit event
          $(window).unload(function() {
            var html = $('#aloha-container-' + nid).html();
            if (settings.aloha.nodes[nid].html != html) {
              Drupal.behaviors.alohaEditor.save(nid, html);
            }
          });
        }
      }
    },
    save: function(nid, html) {
      // Save node
      $.ajax({
        type: "POST",
        url: Drupal.settings.basePath + 'node/' + nid + '/aloha/save',
        data: {body: html, lang: Drupal.settings.aloha.nodes[nid].lang},
        success: function(obj) {
          if (obj.status == 'saved') {
            var element = '<div class="aloha-status">' + Drupal.t('%title has been saved.', {'%title': obj.title}) + '</div>';
            $(element).insertBefore($('#aloha-container-' + obj.nid)).delay(1300).fadeOut(function () {
              $(this).remove();
            });
          }
        }
      });
    }
  };
}(jQuery));