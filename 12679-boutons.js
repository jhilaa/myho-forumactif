$(function () {
    $(function () {
        var editoR = $('#text_editor_textarea').sceditor("instance");

        // Définition des boutons à ajouter
        var buttons = [
            {
                img: "https://i.ibb.co/txkQt72/Calculette.png",
                title: "Equation",
                action: function () {
                    editoR.insert('[latex][/latex]');
                }
            },
            {
                img: "https://i.ibb.co/YX1nMm6/fraction2.png",
                title: "Fraction",
                action: function () {
                    editoR.insert('\\frac{a}{b}');
                }
            }
        ];

        $('<div class="sceditor-group before"></div>').insertBefore('.sceditor-group:first');
        // Boucle sur le tableau d'objets pour générer les boutons dynamiquement
        buttons.forEach(function (button, index) {
            $('<a class="sceditor-button sceditor-' + (index + 1) + '" title="' + button.title + '"><div style="background:url(' + button.img + ') no-repeat;"></div></a>').appendTo('div.sceditor-group.before');
            // L'action du bouton
            $('.sceditor-' + (index + 1)).click(button.action);
        });
    })
});
