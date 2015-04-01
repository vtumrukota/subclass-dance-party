$(document).ready(function(){
  window.dancers = [];

  var clicked = false;

  $("#goback").click(function(){
    window.dancers.forEach(function(el) {
      el.$node.animate({top: el.top, left: el.left}, 600, 'swing', function() {
        console.log('goback')
      });
    });
  });

      //Jump Ball feature
  $("#jump").click(function(){

    console.log('clicked');
    $(".guard").animate({left: "10px"}, 600, 'swing', function(){
      $(this).fadeOut('slow');
      $(this).fadeIn('fast');
    });

    var right = $("body").width() - 200;
    right += "px";

    $(".center").animate({left: right}, 600, 'swing', function(){
      $(this).fadeOut('slow');
      $(this).fadeIn('fast');
    });

    var bottom = $("body").height() - 150;
    bottom += "px";

    $(".forward").animate({top: bottom}, 600, 'swing', function(){
      $(this).fadeOut('slow');
      $(this).fadeIn('fast');
    });
  });

  $(document).on('click', '.dancer', function(){
    var clickedIndex = $(this).data().index;
    var x1 = window.dancers[clickedIndex].top;
    var y1 = window.dancers[clickedIndex].left;
    var shortest = [];

    // console.log(x1 + ':' + y1);

    // console.log($(this).css('transform'));

    var theShortest = 1000000;
    var theShortestDancer;

    window.dancers.forEach(function(dancer, index) {
      var distance = Math.sqrt(Math.pow(dancer.left - x1, 2) + Math.pow(dancer.top - y1, 2));
      if (distance < theShortest && index !== clickedIndex) {
        theShortest = distance;
        theShortestDancer = dancer;
      }
    });

    // console.log(theShortest)
    console.log(theShortestDancer)

    theShortestDancer.$node.css({'transform': 'rotate(90deg)'});
    theShortestDancer.$node.css({'transform': 'rotate(0deg)'});
  });

  $(document).on('mouseover', '.dancer', function(){
    $(this).animate({ "background-size": "200px" }, 10);
  });

  $(document).on('mouseout', '.dancer', function(){
    $(this).animate({ "background-size": "175px" }, 10);
  });

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );

    window.dancers.push(dancer);
    dancer.$node.attr('data-index', window.dancers.length-1);

    if (dancerMakerFunctionName === 'addGuard') {
      $('#guards').append(dancer.$node);
    } else if (dancerMakerFunctionName === 'addForward') {
      $('#forwards').append(dancer.$node);
    } else {
      $('#centers').append(dancer.$node);
    }
    // $('body').append(dancer.$node);
  });
});

