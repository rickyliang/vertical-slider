// MIT License (MIT)

// vertical-slider.js | Copyright (c) 2014 Ricky Liang | www.github.com/rickyliang

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



function Slide(slider, slideSpeed, slideIOSpeed, delay) {
    // Declare instance variables
    var all_slides = slider.children('.vslide');    // Object that holds all of the .vslides.                   DO NOT CHANGE.
    
    if (all_slides.length === 1) {
        var count = 0;     // Counter that loops through each slide in the object all_slides.                   DO NOT CHANGE.
    } else {                // Assigning to 0 accounts for the case where there is only one image in all_slides.
        var count = 1;
    }
    
    var imgHeightCss = all_slides.eq(count).css('height'),
        imgParentHeightCss = all_slides.eq(count).parent().css('height'),
        imgHeightDiff = parseInt(imgHeightCss)/parseInt(imgParentHeightCss),    // Ratio of heights for positioning.
        opened_slide = all_slides.eq(0),    // Tracker of the opened slide.
        self = this,                        // Necessary for calling setInterval within the object.             DO NOT CHANGE.
        toSlide = true;                     // True: an image slides. False: switch images.                     DO NOT CHANGE.
    
    // Setting default parameters
    // http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function
    this.delay = delay !== undefined ? delay : 6000;    // The time (ms) between each call of toggleSlide().
                                                        // The image is shown for twice this duration.
                                                        // Once as a still image, and once again as it slides.  Default: 6000
    this.slideSpeed = slideSpeed !== undefined ? slideSpeed : 3000;     // The time (ms) an image takes to slide
                                                                        // from top to botom in toggleSlide().  Default: 3000
    this.slideIOSpeed = slideIOSpeed !== undefined ? slideIOSpeed : 300;// The time (ms) an image takes to
                                                                        // slideIn() and slideOut().            Default: 300
    
    // Declare class methods
    this.toggleSlide = toggleSlide;
    this.toggleSwitch = toggleSwitch;
    this.slideOut = slideOut;
    this.slideIn = slideIn;
    this.resetPosition = resetPosition;
    
    this.start = function startInterval() {
        // Reason for using a function with self:
        // http://www.aaronkjackson.com/2012/03/javascript-using-setinterval-within-an-object/
        setInterval(function() { self.toggleSlide(); }, this.delay);
    }
    
    function toggleSlide() {
        if (toSlide) {
            opened_slide.animate({ top: -(imgHeightDiff - 1)*100 + '%' }, this.slideSpeed);
            toSlide = false;
        } else {
            this.toggleSwitch();
            toSlide = true;
        }
    }
    
    function toggleSwitch() {
        var next_slide = all_slides.eq(count);
        
        this.slideOut(opened_slide);
        this.resetPosition(opened_slide);
        this.slideIn(next_slide);
        
        opened_slide = next_slide;
        
        count = (count + 1) % all_slides.length;
    }
    
    function slideOut(el) {
        el.animate({ top: '180%' }, this.slideIOSpeed); // Slides an image down and out the frame _% in _ms.
    }
    
    function slideIn(el) {
        el.animate({ top: '0' }, this.slideIOSpeed); // Slides an image down and in the frame _% in _ms.
    }
    
    function resetPosition(el) {
        var prev_left_position = el.css('left');
        
        // Rather than setting the .css, using .animate is much smoother and reduces artifacts.
        el.animate({ left: '-1000px' }, 25);
        el.animate({ top: -(imgHeightDiff*100) + '%' }, 25);
        el.animate({ left: prev_left_position }, 25);
    }
}