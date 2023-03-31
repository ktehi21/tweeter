/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

*/
// const timeAgo = new TimeAgo('en-US');
// const timePrint = timeAgo.format(tweetData.created_at - 2 * 60 * 60 * 1000);
// const timePrint = timeago().format($(tweetData.created_at));

$(document).ready(() => {

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
          <p><img src="${tweetData.user.avatars}" class="avatar"> </p>
          <p>${tweetData.user.handle}</p>
        </div>
        <div class="user-id">
          <p>${tweetData.user.name}</p>
        </div>
      </header>
      <div class="tweet-content">${tweetData.content.text}</div>
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
  $('.new-tweet-form').submit(function(event){
    // stop default behavior form
    event.preventDefault();
    
    // get tweet data
    const tweetData = $('#tweet-text');
    // validate empty or exceed 140
    if (tweetData === '') {
      alert("Please input messege");
      return
    }
    
    // seserialize data
    const formData = $(this).serialize();

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
      });
    }

    // post seserialize data to backend
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formData
    }).then((newTweet) => {
      fetchTweets();
    });
    
    // clean the textarea
    $('#tweet-text').innerHTML = "";
  });


});

