$(document).ready(function() {

  const $newTweetCounter = document.getElementById('tweet-text');
//   const $counter = document.getElementsByClassName('counter');
  $newTweetCounter.addEventListener('input', function () {
    const $charNum = this.value.length;
    const $result = 140 - $charNum;
    console.log($result, $charNum);
    $(".counter").text($result);
    return
  });
});