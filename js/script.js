
var $body = $('body');
var content = $('#content');
var sidebar = $('#sidebar');

class Cat {
    constructor(name, counter, filename) {
        this.name = name;
        this.counter = counter;
        this.filename = filename;
    }
    clicked(){
        this.counter += 1;
        return this.counter;
    }
}

var cats = [];
cats.push(new Cat("Bolly", 0, "cat1.jpg"));
cats.push(new Cat("Dolly", 0, "cat2.jpg"));
cats.push(new Cat("Folly", 0, "cat3.jpg"));
cats.push(new Cat("Golly", 0, "cat4.jpg"));
cats.push(new Cat("Molly", 0, "cat5.jpg"));
//initialize


//content.empty();
/*var cats = [{ img: "cat1", counter: "click1" }, 
    {img: "cat2", counter: "click2" }];
*/
$.each( cats, function(index, cat) {
    sidebar.append(
        $('<li>').append(
            $('<a>', {
                href: '#',
                id:  cat.name, 
                text: cat.name 
            })
        )
    );
    var catElem = $('#' + cat.name);
    catElem.click(function(e) {
        content.empty();
        var imgid = cat.name + "-img";
        content.append(
            $('<div>', {'class': 'container'}).append(
                $('<div>', {
                    'class': 'col-md-8',
                }).append(   
                    $('<img>', {
                        'id':  imgid,
                        'style': "max-height: 100%; max-width: 100%;",
                        'src': cat.filename
                    })
                )
            )
    /*    )
    .append(
        $('<div>', {'class': 'counter-container'}).append(
            $('<h3>', {
                text: 'You clicked the above picture this many times:'
            })
        )
        .append(
            $('<ul>', {
                'id': counterid,
                'class': 'click-counter',
                text: '0'
            })
        )*/
    );
    });
});
