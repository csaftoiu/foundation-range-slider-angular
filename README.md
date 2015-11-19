# foundation-range-slider-angular

## The Problem

Foundation has <a href="http://foundation.zurb.com/docs/components/range_slider.html">Range Sliders</a>. You want
 to use them. <a href="https://pineconellc.github.io/angular-foundation/">Angular Foundation</a> does not support them.
 This makes you sad.

## The Solution

Not to worry! Foundation Range-Slider Angular is here!

### Install

    bower install --save foundation-range-slider-angular
    
### Create App Dependency

    angular.module('app', ['foundation-range-slider-angular']);

### Use

Check out the <a href="http://csaftoiu.github.io/foundation-range-slider-angular/">demo page</a> to see everything it
can do for you.

## Contributing

* Make your changes. Run `grunt serve` to preview as you are developing.
* Modify the demo page to show off the new feature/bug fix, if necessary.
* Once you are done, `grunt` to build the demo site and dist files.
* `http-server demosite` to test demo site as it will appear on github.io .
* Commit changes, make pull request.

## Releasing

### Bower Package
* `git checkout master`
* Edit `bower.json`, bump `"version"` number.
* `grunt`
* `git commit -am "New version"
* `git tag vVERSION` with the new version number, e.g. `git tag v0.0.1`
* `git push --tags`

### Demo Site
* `git checkout gh-pages`
* `git merge master`
* `grunt`
* `git add --all .; git commit -m "New demo site"`
* `git push`