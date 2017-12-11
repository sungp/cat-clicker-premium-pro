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
        selectACat: function(catName) {
            this.currentlySelected = catName;
        },
        getSelectedCat: function() {
            return this.getCats().get(this.currentlySelected);
        },
        getSelectedCatName: function() {
            return this.currentlySelected;
        },
        getSelectedCatCount: function() {
            return this.getSelectedCat().counter; 
        },
        getSelectedCatImage: function() {
            return this.getSelectedCat().filename;
        },
        selectedCatClicked: function() {
            var cats = this.getCats();
            var catObj = cats.get(this.currentlySelected);
            var cat = new Cat(catObj.name, catObj.counter, catObj.filename);
            cat.clicked();
            cats.set(this.currentlySelected, cat);
            this.setCats(cats); 
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
            contentView.init();
        },
        selectCat: function(catName) {
            model.selectACat(catName);
            contentView.render();
            console.log(catName + " selected");
        },
        getCatNames: function() {
            return model.cats();
        },
        getSelectedCatName: function() {
            return model.getSelectedCatName(); 
        },
        getSelectedCatCount: function() {
            return model.getSelectedCatCount(); 
        },
        getSelectedCatImage: function() {
            return model.getSelectedCatImage(); 
        },
        selectedCatClicked: function() {
            model.selectedCatClicked();
            contentView.render();
        }
    };

    var sidebarView = {
        init: function() {
            var catElems = new Map();
            octopus.getCatNames().forEach(function(catName) {
                catElems.set(catName, 
                    $('<a>', {
                        href: '#',
                        id: catName,
                        text: catName
                    })
                );
            });
            this.catElems = catElems;
            sidebarView.render();
        },
        render: function() {
            //console.log(this.catElems);
            var elems = this.catElems;
            octopus.getCatNames().forEach(function(catName) {
                //console.log(catName);
                var myElem = elems.get(catName);
                $('#sidebar').append(
                    $('<li>').append(myElem)
                );
                $('#' + catName).click(function(e) {
                    console.log(catName + " selected in the view");
                    octopus.selectCat(catName);
                });
            });
        }
    };

    var contentView = {
        init: function() {
            contentView.render();
        },
        render: function() {
            $('#content').empty();
            var catName = octopus.getSelectedCatName();
            var catCount = octopus.getSelectedCatCount();
            var catImage = octopus.getSelectedCatImage();
            var imgid = catName + "-img";
            var countid = catName + "-count";
            var counterString = 'Your clicks for ' + catName + ' so far: ';
            $('#content').append(
                $('<div>', {'class': 'row'}).append(
                    $('<h1>', {
                        'class': 'my-4',
                        text: 'Here is ' + catName
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
                            'src': catImage 
                        })
                    )
                )
            )
            .append(
                $('<div>', {'class': 'row'}).append(
                    $('<h1>', {
                        id: countid, 
                        'class': 'my-3',
                        text: counterString + catCount.toString()
                    })
                )
            );
            var imgElem = $('#' + imgid);
            var countElem = $('#' + countid);
            imgElem.click(function(e) {
                console.log(catName + "image clicked");
                octopus.selectCat(catName);
                octopus.selectedCatClicked();
                countElem.text(counterString + 
                    octopus.getSelectedCatCount().toString());
            });
        }
    }

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
