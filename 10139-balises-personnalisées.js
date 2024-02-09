/*
 *  Application: Create New BBCode Tags - Creation de nouvelles balises BBCode
 *  Date: 18/05/2018 - Adaptation pour le forum des forums mai 2022
 *  Version: 1.321052018
 *  Copyright (c) 2018 Daemon <help.forumotion.com>
 *  This work is free. You can redistribute it and/or modify it - Code libre. Vous pouvez le redistribuer et/ou le modifier
 */

(function() {
    BBParser = {
        initialize: function() {
            $(function() {
                BBParser.setupBBParser();
            });
        },
        add: [

            // Note : N'oubliez pas d'ajouter une virgule après chaque entrée
            // '{option}' correspond à l'attribut (optionnel) de la balise elle-même '{content}' correspond au contenu du bloc, entre les deux balises.
            {
                tag: 'latex',
                close: true,
                defaultOption: 'latex',
                replacement: '<span class="{option}">{content}</span>',
            }
            //Ajoutez ici les balises supplémentaires souhaitées ou vos balises personnalisées - Ne pas oublier de mettre une virgule après l'accolade fermante } de la balise précédente./
            // Note  : Ne pas ajouter de virgule après la dernière entrée
        ],
        // Il est conseillé de ne rien modifier en dessous de cette ligne
        validateTag: function(a) {
            if (!/^\w+$/.test(a)) throw new RangeError("You added an invalid tag: " + a);
        },
        replacers: function(a, b, c) {
            return (a || "").replace(/{option}/g, b || "").replace(/{content}/g, c || "");
        },
        optionReg: /.*?=("|'|)(.*?)\1\]/,
        parsedContent: function(a, b, c) {
            return a.replace(c ? RegExp("(\\[" + b.tag + "[^\\]]*\\])([\\s\\S]*?)\\[/" + b.tag + "]", "g" + (b.insensitive ? "i" : "")) : RegExp("\\[" + b.tag + "[^\\]]*\\]", "g" + (b.insensitive ? "i" : "")), function(d, e, f) {
                c || (e = d);
                e = BBParser.optionReg.test(e) ? e.replace(BBParser.optionReg, "$2") : b.defaultOption;
                if("undefined" !== typeof b.replace) {
                    d = c ? b.replace(e, f) : b.replace(e);
                    "string" === typeof d ? c ? f = d : e = d : d;
                    "object" === typeof d && (e = d.option || e, f = d.content || f);
                }
                return BBParser.replacers(b.replacement, e, f);
            });
        },
        setupBBParser: function() {
            var selectors = {
                "subsilver": 'div.postbody, .forumline.mod_news .content, div.blog_message',
                "prosilver": 'div.postbody div, div.post.search .postbody, div.blog_message, .module.mod_news .content',
                "punbb": 'div.post-entry, .module.mod_news .body, div.blog_message',
                "invision": 'div.post-entry, .box-content.mod_news .postbody-entry, div.blog_message',
                "modernbb": 'div.postbody div, div.post.search .postbody, div.blog_message, .mod_news .content',
                "awesomebb": 'div.post-content, div.block-blogrow-content, div.block.block-comment .content, div.block-pm .content, div.mod-news .content',
                "mobi_modern" : 'div.post-content, .mod-news-header + .content '
            };
            if($("#mpage-body-modern").length) {
                var postBody = $(selectors["mobi_modern"]);
            }
            else if(selectors.hasOwnProperty(_userdata["tpl_used"])) {
                var postBody = $(selectors[_userdata["tpl_used"]]);
            }
            else {
                var postBody = $(selectors["prosilver"]);
            }
            for (var i = 0, e;(e = postBody[i++]);) {
                for (var j in BBParser.add) {
                    var item = BBParser.add[j];
                    // Validating tag
                    BBParser.validateTag(item.tag);
                    e.innerHTML = BBParser.parsedContent(e.innerHTML, item, item.close);
                }
            }
        }
    };

    BBParser.initialize()
})();

$(function() {
    //Si vous souhaitez ajouter une ou des balises proposées nécessitant un ou des JS complémentaire-s, ajoutez-le-s ici/
});
