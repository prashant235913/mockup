define([
  'jquery',
  'backbone',
  'underscore',
  'mockup-ui-url/views/base',
  'bootstrap-tooltip'
], function($, Backbone, _, BaseView) {
  'use strict';

  var ButtonView = BaseView.extend({
    tagName: 'a',
    className: 'btn',
    eventPrefix: 'button',
    context: 'default',
    attributes: {
      'href': '#'
    },
    extraClasses: [],
    tooltip: null,
    template: '<% if (icon) { %><span class="glyphicon glyphicon-<%= icon %>"></span><% } %> <%= title %>',
    events: {
      'click': 'handleClick'
    },
    initialize: function(options) {
      if (!options.id) {
        var title = options.title || '';
        options.id = title !== '' ? title.toLowerCase().replace(' ', '-') : this.cid;
      }
      BaseView.prototype.initialize.apply(this, [options]);

      this.on('disable', function() {
        this.disable();
      }, this);

      this.on('enable', function() {
        this.enable();
      }, this);

      this.on('render', function() {
        if (this.context !== null) {
          this.$el.addClass('btn-' + this.context);
        }
        _.each(this.extraClasses, function(klass){
          this.$el.addClass(klass);
        });

        if (this.tooltip !== null) {
          this.$el.tooltip({
            title: this.tooltip
          });
          // XXX since tooltip triggers hidden
          // suppress so it plays nice with modals, backdrops, etc
          this.$el.on('hidden', function(e) {
            if (e.type === 'hidden') {
              e.stopPropagation();
            }
          });
        }
      }, this);
    },
    handleClick: function(e) {
      e.preventDefault();
      if (!this.$el.is('.disabled')) {
        this.uiEventTrigger('click', this, e);
      }
    },
    serializedModel: function() {
      return _.extend({'icon': '', 'title': ''}, this.options);
    },
    disable: function() {
      this.options.disabled = true;
      this.$el.addClass('disabled');
    },
    enable: function() {
      this.options.disabled = false;
      this.$el.removeClass('disabled');
    }
  });

  return ButtonView;
});