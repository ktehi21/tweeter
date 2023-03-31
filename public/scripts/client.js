/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

*/
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(() => {
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    
    for (const user of data){
      const $tweet = createTweetElement(user);
      $('#tweets-container').append($tweet);
    }
  }
  
  const createTweetElement = function (tweetData) {
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
          <p>10 days ago</p>
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

  renderTweets(data);

});