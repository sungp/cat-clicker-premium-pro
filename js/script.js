$(function() {
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
    var model = {
        init: function() {
            var cats = new Map();
            cats.set("Bolly", new Cat("Bolly", 0, "cat1.jpg"));
            cats.set("Dolly", new Cat("Dolly", 0, "cat2.jpg"));
            cats.set("Folly", new Cat("Folly", 0, "cat3.jpg"));
            cats.set("Golly", new Cat("Golly", 0, "cat4.jpg"));
            cats.set("Molly", new Cat("Molly", 0, "cat5.jpg"));
            //console.log(cats);
            var serializedCats = JSON.stringify(Array.from(cats.entries())); 
            localStorage.cats = serializedCats;
            //console.log(serializedCats);
            this.currentlySelected = "Bolly";
        },
        getCats: function() {
            if (!localStorage.cats) {
                return Map.empty();
            } else {
                return new Map(JSON.parse(localStorage.cats)); 
            }
        },
        setCats: function(cats) {
            localStorage.cats = JSON.stringify(Array.from(cats.entries()));
        },
        clicked: function(catName) {
            getCats().get(catName).clicked();
        },
        selectACat: function(catName) {
            this.currentlySelected = catName;
        },
        
        cats: function() {
            var cats = new Map(JSON.parse(localStorage.cats));
            //console.log(cats);
            return Array.from(cats.keys());
        }
    };

    var octopus = {
        init: function() {
            model.init();
            sidebarView.init();
        },
        selectCat: function(catName) {
            model.selectACat(catName);
            alert(catName + " selected");
        },
        getCatNames: function() {
            return model.cats();
        }
    };

    var sidebarView = {
        init: function() {
            sidebarView.render();
        },
        render: function() {
            octopus.getCatNames().forEach(function(catName) {
                //console.log(catName);
                $('#sidebar').append(
                    $('<li>').append(
                        $('<a>', {
                            href: '#',
                            id: catName,
                            text: catName
                        })
                    )
                );

                $('#' + catName).click(function(e) {
                    console.log(catName + " selected in the view");
                    octopus.selectCat(catName);
                });
            });
        }
    };

    octopus.init();
});


/*var $body = $('body');
var content = $('#content');
var sidebar = 
*/

//initialize


//content.empty();
/*var cats = [{ img: "cat1", counter: "click1" }, 
    {img: "cat2", counter: "click2" }];
*/
/*$.each( localStorage.cats, function(key, cat) {
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
    var imgid = cat.name + "-img";
    var countid = cat.name + "-count";
    var counterString = 'Your clicks for ' + cat.name + ' so far: ';
    catElem.click(function(e) {
        content.empty();
        content.append(
            $('<div>', {'class': 'row'}).append(
                $('<h1>', {
                    'class': 'my-4',
                    text: 'Here is ' + cat.name
                })
            )
        )
        .append(
            $('<div>', {'class': 'container'}).append(
                $('<div>', {
                    'class': 'col-md-8',
                }).append(   
                    $('<img>', {
                        id:  imgid,
                        'style': "max-height: 100%; max-width: 100%;",
                        'src': cat.filename
                    })
                )
            )
        )
        .append(
            $('<div>', {'class': 'row'}).append(
                $('<h1>', {
                    id: countid, 
                    'class': 'my-3',
                    text: counterString + cat.counter.toString()
                })
            )
        );

        var imgElem = $('#' + imgid);
        var countElem = $('#' + countid);
        imgElem.click(function(e) {
            cat.clicked();
            countElem.text(counterString + cat.counter.toString());
        });
    });

});
*/
