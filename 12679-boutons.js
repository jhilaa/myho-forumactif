$(function () {
    $(function () {
        var editoR = $('#text_editor_textarea').sceditor("instance");

        // Fonction associée au bouton pour masquer/afficher le groupe
        function mathsButtonsToogleView() {
            var mathsButtons = $('.maths').not(':first');
            // Masquer ou afficher les autres boutons selon leur visibilité actuelle
            if (mathsButtons.is(':visible')) {
                mathsButtons.hide();
            } else {
                mathsButtons.show();
            }
        };


        // Définition des boutons à ajouter et des actions associées
        var buttons = [{
                img: "https://i.ibb.co/txkQt72/Calculette.png",
                title: "Equation",
                action: mathsButtonsToogleView
            },
                {
                    //img: "https://i.ibb.co/GTkBZ4Y/lx.png",
                    img:"https://i.ibb.co/b72Vkmm/lxred.png",
                    title: "Latex",
                    action: function () {
                        //ajoute les balises [latex] de chaque côté du texte sélectionné
                        editoR.insertText('[latex]','[/latex]');
                    }
                },
                {
                    img: "https://i.ibb.co/YX1nMm6/fraction2.png",
                    title: "Fraction",
                    action: function () {
                        editoR.insert('\\frac{a}{b}');
                    }
                },

                {
                    img: "https://i.ibb.co/Wvdx00w/add.png",
                    title: "Add",
                    action: function () {
                        editoR.insert('+');
                    }
                },
                {
                    img: "https://i.ibb.co/3zQ6ztC/equal.png",
                    title: "Equal",
                    action: function () {
                        editoR.insert('=');
                    }
                },

                {
                    img: "https://i.ibb.co/Zx6yW7g/greater-than.png",
                    title: "Greater than",
                    action: function () {
                        editoR.insert('>');
                    }
                },
                {
                    img: "https://i.ibb.co/Zx6yW7g/greater-than.png",
                    title: "Less than",
                    action: function () {
                        editoR.insert('<');
                    }
                },

                {
                    img: "https://i.ibb.co/vPcxH54/pi.png",
                    title: "Pi",
                    action: function () {
                        editoR.insert('\\pi');
                    }
                },
                {
                    img: "https://i.ibb.co/QMS34Pk/root.png",
                    title: "Root",
                    action: function () {
                        editoR.insert('\\sqrt{a}');
                    }
                }
            ]
        ;

        $('<div class="sceditor-group before"></div>').insertBefore('.sceditor-group:first');
        // Boucle sur le tableau d'objets pour générer les boutons dynamiquement
        buttons.forEach(function (button, index) {
            $('<a class="sceditor-button sceditor-' + (index + 1) + ' maths" title="' + button.title + '"><div style="background:url(' + button.img + ') no-repeat;"></div></a>').appendTo('div.sceditor-group.before');
            // L'action du bouton
            $('.sceditor-' + (index + 1)).click(button.action);
        });
        mathsButtonsToogleView(); // Appel initial pour masquer les boutons au chargement de l'éditeur
    });
})
