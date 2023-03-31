$(document).ready(function() {

  const $newTweetCounter = document.getElementById('tweet-text');
//   const $counter = document.getElementsByClassName('counter');
  $newTweetCounter.addEventListener('input', function () {
    const $charNum = this.value.length;
    const $result = 140 - $charNum;
    if($result<0) {
      // $(".counter").addClass('exceedCounter');
      // $(".counter").text($result);

      alert("You can't exceed 140 characters");
      const $newTweetValue = $newTweetCounter.value;
      $newTweetCounter.value = $newTweetValue.slice(0, -1);
      return
    }
    $(".counter").text($result);
    return
  });
});