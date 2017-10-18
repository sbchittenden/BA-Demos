'use strict';

;(function ($) {
  var defaults = {
    // set defaults
  };

  var getDate = function getDate(element) {
    var date = element.attr('date');
    if (!date && element.text()) {
      date = element.text();
    }
    if (!date) {
      throw "No date could be found for", element;
    }
    return date;
  };

  function Timeago(element, options) {
    this.config = $.extend({}, defaults, options);
    this.element = element;
    this.element.data('timeago', this);
    this.init();
  }

  Timeago.prototype.init = function () {
    console.log('timeago initiated');
    this.date = getDate(this.element);
    this.dateMoment = moment(this.date);
    this.render();
  };

  Timeago.prototype.render = function () {
    var str = this.dateMoment.fromNow();
    this.element.text(str);
    var self = this;
    this.renderTimeout = setTimeout(function () {
      self.render();
    }, 1000);
    return this;
  };

  Timeago.prototype.stop = function () {
    if (this.renderTimeout) {
      clearTimeout(this.renderTimeout);
    }
    return this;
  };

  $.fn.timeago = function (options) {
    this.each(function () {
      var $el = $(this),
          instance;
      if (instance = $el.data('timeago')) {
        if (typeof options === 'string' && typeof instance[options] == 'function') {
          instance[options]();
        } else {
          console.warn('Timeago already initialized on', this, 'and', options, 'is not a valid instance method');
        }
        return;
      }
      new Timeago($el, options);
    });
    return this;
  };
})(jQuery);
'use strict';

var currentUser = {
    'id': 76,
    'name': 'Sam Chittenden',
    'username': 'Sam',
    'email': 'sam@chittenden.com',
    'address': {
        'street': '1000 Diamond Lane',
        'suite': '',
        'city': 'Amazingtown',
        'zipcode': '12345',
        'geo': {
            'lat': '-32.8129',
            'lng': '68.5342'
        }
    },
    'phone': '(123)456-1234',
    'website': 'super.co.ol',
    'company': {
        'name': 'Amazeballs Inc',
        'catchPhrase': 'That is Amazeballs',
        'bs': 'Don\'t just amaze, Amazeballs'
    }
};
'use strict';

(function ($, Handlebars, currentUser) {
    var rootURL = 'https://jsonplaceholder.typicode.com/';
    var $posts = $('#posts');
    var $postsTemplate = $('#posts-template').html();
    var $postItemPartial = $('#post-item-partial').html();
    var $recent = $('#recent-activity');
    var $recentTemplate = $('#recent-activity-template').html();
    var forumData = {
        'users': null,
        'posts': null,
        'comments': null

        // ajax calls for different api data
    };var usersCall = $.get(rootURL + 'users', function (data) {
        forumData.users = data;
    });
    var postsCall = $.get(rootURL + 'posts', function (data) {
        forumData.posts = data;
    });
    var commentsCall = $.get(rootURL + 'comments', function (data) {
        forumData.comments = data;
    });

    // when calls complete initiate templates
    $.when(usersCall, postsCall, commentsCall).done(function () {
        initTemplates();
    });

    function initTemplates() {

        forumData.users.push(currentUser);

        var forumPosts = {};
        forumPosts.posts = forumData.posts ? randomArray(forumData.posts) : [];

        // compile templates
        var postItemCompiled = Handlebars.compile($postItemPartial);
        Handlebars.registerPartial('postItem', postItemCompiled);

        var postsCompiled = Handlebars.compile($postsTemplate);
        var postsData = postsCompiled(forumPosts);
        $posts.html(postsData);

        var recentCompiled = Handlebars.compile($recentTemplate);
        var recentData = recentCompiled(forumPosts);
        $recent.html(recentData);
        $(document).trigger('templateComplete');
    }

    function randomArray(arr) {
        var objArr = [];
        var random = [];
        var length = arr.length;
        var i = 0;
        while (i < 50) {
            var num = Math.floor(Math.random() * length);
            if (random.indexOf(num) === -1) {
                random.push(num);
                i++;
            }
        }
        objArr = random.map(function (idx) {
            return arr[idx];
        });
        return objArr;
    }
    // register helpers
    Handlebars.registerHelper('userID', function (context, options) {
        return forumData.users.filter(function (obj) {
            return obj.id === context;
        })[0].name;
    });

    Handlebars.registerHelper('getComments', function (context, options) {
        this.comments = forumData.comments.filter(function (obj) {
            return obj.postId === context;
        });
    });

    Handlebars.registerHelper('getRecent', function (context, options) {
        var num = Math.floor(Math.random() * 50);
        var post = context[num];
        return options.fn(post);
    });

    Handlebars.registerHelper('getComment', function (context, options) {
        if (context !== undefined) {
            var comment = context[Math.floor(Math.random() * context.length)];
            return comment[options];
        }
    });

    Handlebars.registerHelper('newDate', function () {
        return new Date().toISOString();;
    });
})(jQuery, Handlebars, currentUser);
'use strict';

;
(function ($, Handlebars, currentUser) {
  var formPostTemplate = $('#post-item-from-form').html();
  var formPostCompiled = Handlebars.compile(formPostTemplate);
  var recentCommentTemplate = $('#recent-comment-partial').html();
  var recentCommentCompiled = Handlebars.compile(recentCommentTemplate);
  var postTotal = 101;

  $(document).on('templateComplete', forumInit);

  function forumInit() {

    $('.timestamp').timeago();

    var $forumPostList = $('.forum__post-list');
    $forumPostList.on('click', '.forum__post-title', function () {
      $('.forum__post-item').removeClass('--is-active');
      $('.forum__post-body').filter(function () {
        return $(this).closest('.forum__post-title') !== event.target;
      }).slideUp(400);
      $('.forum__comments-list').slideUp(300);
      $(this).parent().find('.forum__post-body').slideToggle(300);
      $(this).parent().toggleClass('--is-active');
      $('body').animate({ scrollTop: $(this).offset().top - $(window).height() * 0.4 }, 400);
    });

    $('.forum__post-body').on('click', function () {
      $(this).slideToggle(300);
      $(this).parent().removeClass('--is-active');
    });

    $forumPostList.on('click', '.comments-toggle', function () {
      $(this).closest('.forum__comments').find('.forum__comments-list').slideToggle(300);
    });

    $forumPostList.on('click', '.close-icon', function () {
      $('.forum__post-item').removeClass('--is-active');
      $(this).parent().find('.forum__post-body').slideToggle(300);
      $('.forum__comments-list').slideUp(300);
      $(this).parent().removeClass('--is-active');
    });

    $('#new-post__title, #new-post__body').on('focus', function () {
      $('.left-sidebar').addClass('--is-expanded');
    });
    $('#new-post__title, #new-post__body').on('blur', function () {
      $('.left-sidebar').removeClass('--is-expanded');
    });

    // new post form submission
    $('#new-post-form').submit(postNewItem);

    // new comment submission
    $('#posts').on('click', '.comment-submit', postNewComment);

    // scroll to commented post on click
    $('#recent-activity').on('click', '.recent-post__title', activateRelatedPost);
  }

  function postNewItem() {
    event.preventDefault();
    if ($('#new-post__title').val() !== '') {
      var newPost = {};
      newPost.title = $('#new-post__title').val();
      newPost.body = $('#new-post__body').val();
      newPost.userId = currentUser.id;
      newPost.id = postTotal;
      newPost.name = currentUser.name;

      // const context = [newPost];

      var newPostMarkup = formPostCompiled(newPost);
      $('.forum__post-list').prepend(newPostMarkup);
      // alert(newPost);
      postTotal++;

      $('body').animate({ scrollTop: 0 }, 400);

      // clear form inputs
      $('#new-post__title, #new-post__body').val('');
    } else {
      alert('Oops! You didn\'t post anything.');
    }
  }

  function postNewComment() {
    // initiate timestamp
    var now = new Date();
    var commentInput = $(this).siblings('.comment-submission');

    var comment = {};
    comment.body = commentInput.val();
    comment.postTitle = $(this).parents().contents('.forum__post-title').text();
    comment.email = currentUser.email;
    comment.id = $(this).parents().contents('.forum__post-title').attr('data-post-id');
    comment.date = now;

    if (comment.body !== '') {
      // append to comments list
      $(this).parent().before('<li class="forum__comments-item"><p>' + comment.body + '</p></li>');
      // add to recent activity sidebar
      $('#recent-activity').append(recentCommentCompiled(comment));
    }
    // add timestamp to latest comment
    $('.timestamp').last().text(now.toISOString()).timeago();
    // clear comment input
    commentInput.val('');
  }

  function activateRelatedPost() {
    var postId = $(this).parent().attr('data-post-id');
    var relatedPost = $('.forum__post-title[data-post-id=' + postId + ']');
    openPost(relatedPost);
  }

  function openPost(targetPost) {
    $('.forum__post-item').removeClass('--is-active');
    $('.forum__post-body').slideUp(400);
    $('.forum__comments-list').slideUp(300);
    targetPost.parent().find('.forum__post-body').slideToggle(300);
    targetPost.parent().toggleClass('--is-active');
    $('body').animate({ scrollTop: targetPost.offset().top - $(window).height() * 0.4 }, 400);
  }
})(jQuery, Handlebars, currentUser);