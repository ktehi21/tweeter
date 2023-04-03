$(document).ready(function() {

  // 140 counting 
  // if exceed 140 error messege shows
  $("#tweet-text").addEventListener('input', function () {
    const $charNum = this.value.length;
    let $result = 140 - $charNum;
    if($result<0) {
      $result = 140 - $charNum;
      $(".counter").text($result).addClass("exceedCounter");
      $(".errorMsg")
        .text("You can't exceed 140 characters")
        .slideDown(800);
      return
    }
    $(".errorMsg")
      .slideUp(800);
    $(".counter").text($result).removeClass("exceedCounter");
    return
  });
});