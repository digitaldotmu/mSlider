# mSlider
Lightweight jQuery slider that just works!

## Usage

``` html
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
```
    
## Demo

[http://matilis.mu/labs/mslider/demo.html](http://matilis.mu/labs/mslider/demo.html)
    
[http://matilis.mu]
