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
        console.log('dom method:', $method.value);
    };

});