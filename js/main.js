var model      = new Model('model');
var view       = new View('view');
var controller = new IndexController('controller');

view.registerEvent('BUTTON_CLICKED');
view.clickedButton = function(method, number) {
    // console.log('clicked method:', method);
    this.publish('BUTTON_CLICKED', parseInt(method, 10), parseInt(number, 10));
};

controller.registerEvent('CONVERTED');
controller.subscribeTo('view', 'BUTTON_CLICKED', function(data) {
    controller.setMethod(data[0]);
    controller.setNumber(data[1]);
    controller.generateRomanNumeral();
    controller.publish('CONVERTED', controller.getResult());
});


// --------------------------------------------------------------------------------------------


(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    function loadPage(href, containerId, callback) {
        var req = new XMLHttpRequest();
        var $container = document.getElementById(containerId);
        req.open("GET", href, true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var parser = new DOMParser();
                    var content = parser.parseFromString(req.responseText, "text/xml");
                    $container.innerHTML = content.firstChild.innerHTML;
                    callback();
                }
            }
        };
    }

    loadPage('main.html', 'content', function() {
        var $method = document.getElementById('method');
        var $number = document.getElementById('number');
        var $button = document.getElementById('button');
        var $result = document.getElementById('result');

        $button.onclick = function() {
            // console.log('dom method:', $method.value);
            view.clickedButton($method.value, $number.value);
        };

        view.subscribeTo('controller', 'CONVERTED', function(data) {
            $result.innerHTML = data[0];
        });

    });

},false);
})();