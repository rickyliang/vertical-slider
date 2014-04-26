vertical-slider
===============

A(n) (awesome) jQuery vertical image slider/rotater that mimics the Windows Phone 8 Photo live tile.



Dependencies
---------------
jQuery



Usage
---------------
For a basic, no-fluff example, [download](https://github.com/rickyliang/vertical-slider/archive/master.zip) and unzip the files and open index.html in your browser.

To use the plug-in, structure your html such that there is a wrapper div with class "slider". Inside, have a *minimum* of 2 images. The first image must have the classes "vslide opened". The rest should just be "vslide". For example:

        <div id="myFirstSliderWow" class="slider">
            <img class="vslide opened" src="path/to/image.jpg">
            <img class="vslide" src="path/to/image2.jpg">
            <img class="vslide" src="path/to/image3.jpg">
        </div>
        
Somewhere in your html document, load jquery and vertical-slider.js, and initialize the slider. As shown below, constructing a new Slide takes in four arguments. However, the former three are optional and default to the values shown.

        <script type="text/javascript">
            $(document).ready(function() {
                var slideSpeed = 3000,      // meant to show the arguments that Slide takes in.
                    slideInOutSpeed = 600,  // creating a new Slide with just the DOM object passed
                    delay = 6000,           //     in will automatically default to these values.
                    slider1 = new Slide($('#myFirstSliderWow'), slideSpeed, slideInOutSpeed, delay);
                
                slider1.start();
            });
        </script>
