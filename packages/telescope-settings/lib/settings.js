Settings = new Meteor.Collection("settings");

var settingsSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
    autoform: {
      group: "01_general"
    }
  },
  siteUrl: {
    type: String,
    optional: true,
    autoform: {
      group: "01_general",
      instructions: 'Your site\'s URL (with trailing "/"). Will default to Meteor.absoluteUrl()'
    }
  },
  tagline: {
    type: String,
    optional: true,
    autoform: {
      group: "01_general"
    }
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      group: "01_general",
      rows: 5,
      instructions: 'A short description used for SEO purposes.'
    }
  },
  siteImage: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Url,
    autoform: {
      group: "01_general",
      instructions: "URL to an image for the open graph image tag for all pages"
    }
  },
  navLayout: {
    type: String,
    optional: true,
    autoform: {
      group: "01_general",
      instructions: 'The layout used for the main menu',
      options: [
        {value: 'top-nav', label: 'Top'},
        {value: 'side-nav', label: 'Side'}
      ]
    }
  },
  requireViewInvite: {
    type: Boolean,
    optional: true,
    autoform: {
      group: 'invites',
      leftLabel: 'Require View Invite'
    }
  },
  requirePostInvite: {
    type: Boolean,
    optional: true,
    autoform: {
      group: 'invites',
      leftLabel: 'Require Post Invite'
    }
  },
  requirePostsApproval: {
    type: Boolean,
    optional: true,
    autoform: {
      group: "01_general",
      instructions: "Posts must be approved by admin",
      leftLabel: "Require Posts Approval"
    }
  },
  defaultEmail: {
    type: String,
    optional: true,
    private: true,
    autoform: {
      group: "06_email",
      instructions: 'The address all outgoing emails will be sent from.',
      class: "private-field"
    }
  },
  mailUrl: {
    type: String,
    optional: true,
    private: true,
    autoform: {
      group: "06_email",
      instructions: 'MAIL_URL environment variable (requires restart).',
      class: "private-field"
    }
  },
  scoreUpdateInterval: {
    type: Number,
    optional: true,
    defaultValue: 30,
    private: true,
    autoform: {
      group: 'scoring',
      instructions: 'How often to recalculate scores, in seconds (default to 30)',
      class: "private-field"
    }
  },
  defaultView: {
    type: String,
    optional: true,
    autoform: {
      group: "02_posts",
      instructions: 'The view used for the front page',
      options: function () {
        return _.map(Telescope.menus.get("viewsMenu"), function (view) {
          return {
            value: Telescope.utils.camelCaseify(view.label),
            label: view.label
          };
        });
      }
    }
  },
  postsLayout: {
    type: String,
    optional: true,
    autoform: {
      group: "02_posts",
      instructions: 'The layout used for post lists',
      options: [
        {value: 'posts-list', label: 'List'},
        {value: 'posts-grid', label: 'Grid'}
      ]
    }
  },
  postViews: {
    type: [String],
    optional: true,
    autoform: {
      group: "02_posts",
      instructions: 'Posts views showed in the views menu',
      editable: true,
      noselect: true,
      options: function () {
        return _.map(Telescope.menus.get("viewsMenu"), function (item){
          return {
            value: item.route,
            label: item.label
          }
        });
      }
    }
  },
  postInterval: {
    type: Number,
    optional: true,
    defaultValue: 30,
    autoform: {
      group: "02_posts",
      instructions: 'Minimum time between posts, in seconds (defaults to 30)'
    }
  },
  commentInterval: {
    type: Number,
    optional: true,
    defaultValue: 15,
    autoform: {
      group: "03_comments",
      instructions: 'Minimum time between comments, in seconds (defaults to 15)'
    }
  },
  maxPostsPerDay: {
    type: Number,
    optional: true,
    defaultValue: 30,
    autoform: {
      group: "02_posts",
      instructions: 'Maximum number of posts a user can post in a day (default to 30).'
    }
  },
  startInvitesCount: {
    type: Number,
    defaultValue: 3,
    optional: true,
    autoform: {
      group: 'invites'
    }
  },
  postsPerPage: {
    type: Number,
    defaultValue: 10,
    optional: true,
    autoform: {
      group: "02_posts"
    }
  },
  logoUrl: {
    type: String,
    optional: true,
    autoform: {
      group: "04_logo"
    }
  },
  logoHeight: {
    type: Number,
    optional: true,
    autoform: {
      group: "04_logo"
    }
  },
  logoWidth: {
    type: Number,
    optional: true,
    autoform: {
      group: "04_logo"
    }
  },
  faviconUrl: {
    type: String,
    optional: true,
    autoform: {
      group: "04_logo"
    }
  },
  language: {
    type: String,
    defaultValue: 'en',
    optional: true,
    autoform: {
      group: "01_general",
      instructions: 'The app\'s language. Defaults to English.',
      options: function () {
        var languages = _.map(TAPi18n.getLanguages(), function (item, key) {
          return {
            value: key,
            label: item.name
          }
        });
        return languages
      }
    }
  },
  backgroundCSS: {
    type: String,
    optional: true,
    autoform: {
      group: 'extras',
      instructions: 'CSS code for the <body>\'s "background" property',
      rows: 5
    }
  },
  accentColor: {
    type: String,
    optional: true,
    autoform: {
      group: "05_colors",
      instructions: 'Used for button backgrounds.'
    }
  },
  accentContrastColor: {
    type: String,
    optional: true,
    autoform: {
      group: "05_colors",
      instructions: 'Used for button text.'
    }
  },
  secondaryColor: {
    type: String,
    optional: true,
    autoform: {
      group: "05_colors",
      instructions: 'Used for the navigation background.'
    }
  },
  secondaryContrastColor: {
    type: String,
    optional: true,
    autoform: {
      group: "05_colors",
      instructions: 'Used for header text.'
    }
  },
  fontUrl: {
    type: String,
    optional: true,
    autoform: {
      group: 'fonts',
      instructions: '@import URL (e.g. https://fonts.googleapis.com/css?family=Source+Sans+Pro)'
    }
  },
  fontFamily: {
    type: String,
    optional: true,
    autoform: {
      group: 'fonts',
      instructions: 'font-family (e.g. "Source Sans Pro", sans-serif)'
    }
  },
  twitterAccount: {
    type: String,
    optional: true,
    autoform: {
      group: "07_integrations"
    }
  },
  googleAnalyticsId: {
    type: String,
    optional: true,
    autoform: {
      group: "07_integrations"
    }
  },
  mixpanelId: {
    type: String,
    optional: true,
    autoform: {
      group: "07_integrations"
    }
  },
  clickyId: {
    type: String,
    optional: true,
    autoform: {
      group: "07_integrations"
    }
  },
  footerCode: {
    type: String,
    optional: true,
    autoform: {
      group: 'extras',
      instructions: 'Footer content (accepts Markdown).',
      rows: 5
    }
  },
  extraCode: {
    type: String,
    optional: true,
    autoform: {
      group: 'extras',
      instructions: 'Any extra HTML code you want to include on every page.',
      rows: 5
    }
  },
  emailFooter: {
    type: String,
    optional: true,
    private: true,
    autoform: {
      group: "06_email",
      instructions: 'Content that will appear at the bottom of outgoing emails (accepts HTML).',
      rows: 5,
      class: "private-field"
    }
  },
  notes: {
    type: String,
    optional: true,
    private: true,
    autoform: {
      group: 'extras',
      instructions: 'You can store any notes or extra information here.',
      rows: 5,
      class: "private-field"
    }
  },
  debug: {
    type: Boolean,
    optional: true,
    autoform: {
      group: 'debug',
      instructions: 'Enable debug mode for more details console logs'
    }
  },
  authMethods: {
    type: [String],
    optional: true,
    autoform: {
      group: 'auth',
      editable: true,
      noselect: true,
      options: [
        {
          value: 'email',
          label: 'Email/Password'
        },
        {
          value: 'twitter',
          label: 'Twitter'
        },
        {
          value: 'facebook',
          label: 'Facebook'
        }
      ],
      instructions: 'Authentication methods (default to email only)'
    }
  }
});


i18n.internationalizeSchema(settingsSchema);

Settings.attachSchema(settingsSchema);

Settings.get = function(setting, defaultValue) {
  var settings = Settings.collection.find().fetch()[0];

  if (Meteor.isServer && Meteor.settings && !!Meteor.settings[setting]) { // if on the server, look in Meteor.settings
    return Meteor.settings[setting];

  } else if (Meteor.settings && Meteor.settings.public && !!Meteor.settings.public[setting]) { // look in Meteor.settings.public
    return Meteor.settings.public[setting];

  } else if(settings && (typeof settings[setting] !== 'undefined')) { // look in Settings collection
    return settings[setting];

  } else if (typeof defaultValue !== 'undefined') { // fallback to default
    return  defaultValue;

  } else { // or return undefined
    return undefined;
  }
};

// use custom template for checkboxes - not working yet
// if(Meteor.isClient){
//   AutoForm.setDefaultTemplateForType('afCheckbox', 'settings');
// }

Meteor.startup(function () {
  Settings.collection.allow({
    insert: Users.isAdminById,
    update: Users.isAdminById,
    remove: Users.isAdminById
  });
});

Meteor.startup(function () {
  // override Meteor.absoluteUrl() with URL provided in settings
  Meteor.absoluteUrl.defaultOptions.rootUrl = Settings.get('siteUrl', Meteor.absoluteUrl());
  debug = Settings.get('debug', false);
});