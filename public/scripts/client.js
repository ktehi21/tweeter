/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

*/


$(document).ready(() => {

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

  // const renderTweets = function(tweets) {
  //   // loops through tweets
  //   // calls createTweetElement for each tweet
  //   // takes return value and appends it to the tweets container
    
  //   for (const user of data){
  //     const $tweet = createTweetElement(user);
  //     $('#tweets-container').prepend($tweet);
  //   }
  // }
  // renderTweets(data);

  // grab the form
  $('.new-tweet-form').submit(function(event){
    // stop default behavior form
    event.preventDefault();
    
    // get tweet data
    const tweetData = $('#tweet-text').val();
    
    // seserialize data
    const formData = $(this).serialize();
    console.log("formData: ", formData);


    const fetchTweets = () => {
      $.ajax({
        mothod: 'GET',
        url: '/tweets',
      }).then((tweets) => {
        console.log(tweets);
        for (const user of data){
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
      console.log("newTweet: ", newTweet);
      // fetch 
      fetchTweets();
    });


  });


});

