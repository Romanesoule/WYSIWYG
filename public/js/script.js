//declarer le plugin 

(function($) {

    $.fn.my_wysiwyg = function( options ) {

    // Déclare link
    let Link;

    // Definie le textarea, l'éditeur et les buttons code via leur ID
    let wysiwygTextarea = $('#wysiwyg-textarea')
    let wysiwygEditor = $('#wysiwyg-editor')
    let codeShow = $("#code-show");
    let codeHide = $("#code-hide");

    //upload image 
    var inputFile = document.createElement('input'); // crée l'input pour la recherche d'image 
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.style.color = "white";   
    document.getElementsByTagName('div')[1].appendChild(inputFile);

    inputFile.addEventListener('change', function () {
        const reader = new FileReader();
        reader.addEventListener("load" , () => {//lance le fonction au chargement de l'image 
            var image = document.createElement('img'); // crée l'emplacement de l'image.
            image.src = reader.result;
            document.getElementsByTagName('div')[1].appendChild(image);
            console.log('Done');
        });
        reader.readAsDataURL(inputFile.files[0]);

    });


    // Cache l'éditeur par défaut
    wysiwygEditor.hide();

    // Quand on clique sur l'icon #code-show on:
    codeShow.click(function () {
        wysiwygTextarea.hide(); // Cache le textarea
        wysiwygEditor.show(); // Affiche l'éditeur

        wysiwygEditor.html(wysiwygTextarea.val()); // Remplace la valeur de l'éditeur (si textarea vide)

        codeShow.addClass('hidden'); // Ajoute la classe hidden a l'icon #code-show
        codeHide.removeClass('hidden'); // Enlève la classe hidden de l'icon #code-hide
    });

    codeHide.click(function () {
        wysiwygTextarea.show(); // Affiche le textarea
        wysiwygEditor.hide(); // Cache le l'éditeur

        codeHide.addClass('hidden'); // Ajoute la classe hidden a l'icon #code-hide
        codeShow.removeClass('hidden'); // Enlève la classe hidden de l'icon #code-show
    });

    //ajoute un paragraphe a chaque saut de ligne 
        onkeypress = function(event) {//ajoute un paragraphe a chaque appui sur la touche entrée
        if (event.keyCode == 13) {
            wrapText("</p>", "<p>");
        }
      }

    // Change la police
    let policeSelect = $("#police"); // Definie le select
    policeSelect.change(function () {
        const size = policeSelect.val(); // Valeur de l'option choisie
        wrapText("<span style=\"font-size: " + size + "px\">", "</span>");
    });

    // Mets le texte en gras
    $("#bold").click(function () {
        wrapText("<b>", "</b>");
    });

    // Mets le texte en italic
    $("#italic").click(function () {
        wrapText("<i>", "</i>");
    });

    // Barre le texte
    $("#strikethrough").click(function () {
        wrapText("<del>", "</del>");
    });

    // Surligne le texte
    $("#underline").click(function () {
        wrapText("<u>", "</u>");
    });

    // Change la couleur
    let colorSelect = $("#color"); // Definie le select
    let SvgToFill = $("#svg-to-fill"); // Definie l'svg a remplir
    colorSelect.change(function () {
        const color = colorSelect.val(); // Valeur de l'option choisie
        SvgToFill.css({ fill: color }); // Remplie le SVG de la couleur

        wrapText("<span style=\"color: " + color + "\">", "</span>");
    });

    // Quand on click sur link lance un prompt et prend l'url
    $("#link").click(function () {
        getLink();

        wrapText("<a href=\"" + Link + "\" target=\"nofollow\">", "</a>");
    });

    // Aligne le texte a gauche
    $("#align-left").click(function () {
        wrapText('<div align="left">', "</div>");
    });

    // Aligne le texte a droite
    $("#align-right").click(function () {
        wrapText('<div align="right">', "</div>");
    });

    // Aligne le texte au centre
    $("#align-center").click(function () {
        wrapText('<div align="center">', "</div>");
    });

    // Jusitifie le texte
    $("#align-justify").click(function () {
        wrapText('<div align="justify">', "</div>");
    });

    // Fonction pour prendre le lien
    function getLink()
    {
        // Enregistre la valeur du prompt dans Link
        Link = prompt("Veuillez entrer un lien:");

        // Si la valeur est vide re-lance la fonction
        if (Link === "") {
            getLink();
        }
    }

    // Fonction pour envelopper le texte avec les balises
    function wrapText(openTag, closeTag)
    {
        // valeur du textarea
        const value = wysiwygTextarea.val();
        // console.log(value)

        // donne le nombre de la position sur la selection (début et fin)
        const textStart = wysiwygTextarea[0].selectionStart;
        const textEnd = wysiwygTextarea[0].selectionEnd;
        // console.log(textStart)
        // console.log(textEnd)

        // le texte sera la valeur qui ce situe entre la premiere et dernière selection
        const text = value.substring(textStart, textEnd);
        // console.log(text)

        // permet de savoir ou ce situe la balise qu'on change actuellement
        const before = value.substring(value, textStart);
        const after = value.substring(textEnd, value.length);
        // console.log(before)

        // Remplace la valeur du textarea
        wysiwygTextarea.val(before + openTag + text + closeTag + after);

        // Remplace la valeur de l'éditeur
        wysiwygEditor.html(wysiwygTextarea.val());
    }


     // Déclarations de valeurs par défaut
     var settings = $.extend({
        color           : 'white',
        fontStyle       : 'normal',
        fontFamily      : 'Arial',
        fontSize        : '100%'

    }, options );

    // Application des valeurs 'par défaut si non renseignées'
    return this.css({
        color           : settings.color,
        fontStyle       : settings.fontStyle,
        fontFamily      : settings.fontFamily,
        fontSize        : settings.fontSize
    });
};

})(jQuery);


//appeler le plugin

$("textarea").my_wysiwyg({
    color : 'blue', //on modifie les options 
    fontStyle : 'italic',
    fontSize :'150%'
   });