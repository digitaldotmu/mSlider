# mSlider
Lightweight jQuery slider that just works!

Usage:

    <script src="jquery.js"></script>
    <script src="mSlider.0.0.1.js"></script>
    
    <script>

        $(function(){
            $('#slider').mSlider({
                width: 800,
                height: 300,
                slideDuration: 3000,
                slideSpeed: 300,
                auto: true,
                orientation: 'h',
                controls: true,
                startSlide: 0,
                onSliderStart: function(){},
                onSlideChange: function(slide, index){},
                onSliderEnd: function(){}
            });
        });
    </script>
    
    <ul id="slider" class="mSlider">
        <li><img src="img/1.jpeg"></li>
        <li><img src="img/2.jpeg"></li>
        <li><img src="img/3.jpeg"></li>
        <li><img src="img/4.jpeg"></li>
    </ul>    
    
http://matilis.mu
