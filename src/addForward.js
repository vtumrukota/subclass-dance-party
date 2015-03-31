var addForward = function(top, left, timeBetweenSteps){
  // var blinkyDancer = (top, left, timeBetweenSteps);

  makeDancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('forward');


};

addForward.prototype = Object.create(makeDancer.prototype);
addForward.prototype.constructor = addForward;

addForward.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
    makeDancer.prototype.step.call(this);

    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.

    // blinkyDancer.$node.toggle();

    // this.$node.toggle().call(this);
    this.$node.toggle();
};

