/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {
  // click Write a new tweet then go to textarea and focus
  $("#goToWrite").on('click', (e) => {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $('#tweet-text').offset().top - 170
    }, 500);
    $('#tweet-text').focus();
  });


  const createTweetElement = function (tweetData) {
    const timestamp = tweetData.created_at;
    const date = new Date(timestamp);
    const isoDate = date.toISOString();

    // Use isoDate with the timeago plugin
    $("time.timeago").attr("datetime", isoDate).timeago();

    let $tweet = $(
    `<article class="tweet">
      <header>
        <div class="user-name">
          <p><img src="./images/${tweetData.user.avatars}" class="avatar"> </p>
          <p>${tweetData.user.handle}</p>
        </div>
        <div class="user-id">
          <p>${tweetData.user.name}</p>
        </div>
      </header>
      <div class="tweet-content">${escape(tweetData.content.text)}</div>
      <footer>
        <div class="tweet-date">
          <time class="timeago" datetime="${tweetData.created_at}">less than a minute ago</time>
        </div>
        <div class="tweet-react">
          <a href="#">
            <i class="fa-solid fa-flag"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-retweet"></i>
          </a>
          <a href="#">
            <i class="fa-solid fa-heart"></i>
          </a>
        </div>
      </footer>
    </article>`
    )
    return $tweet;
  };

  // load previous tweet
  const loadTweets = function() {
    $.ajax({
      mothod: 'GET',
      url: '/tweets',
    }).then((tweets) => {
      for (const user of tweets){
        const $tweet = createTweetElement(user);
        $('#tweets-container').prepend($tweet);
      }
    });
  }
  loadTweets();


  // grab the form
  // stop default behavior form
  // get tweet data
  // validate empty , exceed 140 can't submit: composer-char-counter.js
  // Can't exceed 140 character!
  // seserialize data
  // post seserialize data to backend
  // clean the textarea
  $('.new-tweet-form').submit(function(event){
    event.preventDefault();
    
    const tweetData = $('#tweet-text');

    if (tweetData.val() === '') {
      $(".errorMsg")
        .text("Please fill in the text area before submitting")
        .slideDown(800);
      return
    } else {
      $(".errorMsg")
        .slideUp(800);
    }

    if (tweetData.val().length > 140) {
      return 
    }

    const formData = $(this).serialize();

    // added fail capture by 4/2 
    const fetchTweets = () => {
      $.ajax({
        mothod: 'GET',
        url: '/tweets',
      }).then((tweets) => {
        $('#tweets-container').empty();
        for (const user of tweets){
          const $tweet = createTweetElement(user);
          $('#tweets-container').prepend($tweet);
        }
      }).fail((err) => {
        console.error(err.message);
        alert("Sorry can't load tweet. Try it again");
      });
    }

    // added fail capture by 4/2 
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData
    }).then((newTweet) => {
      fetchTweets();
      $('#tweet-text').val("");
      $(".counter").text(140);
    }).fail((err) => {
      console.error(err.message);
      alert("Sorry can't post tweet. Try it again");
    });
    
  });

});

