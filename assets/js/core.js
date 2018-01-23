var hexToRgba = function(hex, opacity) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var rgb = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;

    return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', '+ opacity + ')';
};

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();
	$('[data-toggle="popover"]').popover({
		html: true
    });


    if($('[data-sparkline]').length) {
        var generateSparkline = function($elem, data, params) {
            $elem.sparkline(data, {
                type: $elem.attr('data-sparkline-type'),
                height: '100%',
                barColor: params.color,
                lineColor: params.color,
                fillColor: 'transparent',
                spotColor: params.color,
                spotRadius: 0,
                lineWidth: 2,
                highlightColor: hexToRgba(params.color, .6),
                highlightLineColor: '#666',
                defaultPixelsPerValue: 5
            });
        };

        require(['sparkline'], function(){
            $('[data-sparkline]').each(function(){
                var $chart = $(this);

                generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
                    color: $chart.attr('data-sparkline-color')
                });
            });
        });
    }


    // $('[data-selectize]').selectize({
    // onInitialize: function() {
    //     $(this)[0].$wrapper.removeClass('form-control custom-select');
    //     $(this)[0].$dropdown.removeClass('form-control custom-select');
    //     },
    //
    // render: {
    // 	item: function(item, escape) {
    // 	    console.log(item);
    // 		return "<div><i class='flag flag-" + item.value.toLowerCase() + " mr-2' />" + escape(item.text) + "</div>";
    // 	},
    // 	option: function(item, escape) {
    // 		return "<div><i class='flag flag-" + item.value.toLowerCase() + " mr-2' />" + escape(item.text) + "</div>";
    // 	}
    // }
    // });

    if($('.chart-circle').length) {
        require(['circle-progress'], function () {
            $('.chart-circle').each(function () {
                var $this = $(this);
                $this.circleProgress({
                    fill: {
                        color: $this.attr('data-color') || dashboard.colors.blue
                    },
                    size: $this.height(),
                    startAngle: -Math.PI / 4 * 2,
                    emptyFill: '#F4F4F4',
                    lineCap: 'round'
                });
            });
        });
    }
});