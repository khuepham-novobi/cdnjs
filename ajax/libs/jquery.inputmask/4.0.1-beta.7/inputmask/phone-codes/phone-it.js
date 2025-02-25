/*!
* phone-codes/phone-it.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.1-beta.7
*/

!function(factory) {
    "function" == typeof define && define.amd ? define([ "../inputmask" ], factory) : "object" == typeof exports ? module.exports = factory(require("../inputmask")) : factory(window.Inputmask);
}(function(Inputmask) {
    return Inputmask.extendAliases({
        phoneit: {
            alias: "abstractphone",
            countrycode: 39,
            phoneCodes: [ {
                mask: "+39 004191 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Campione d'Italia (CO)",
                city: "Campione d'Italia"
            }, {
                mask: "+39 010 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Genova",
                city: [ "Arenzano", "Busalla", "Genova" ]
            }, {
                mask: "+39 011 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Torino",
                city: [ "Avigliana", "Carmagnola", "Caselle Torinese", "Chieri", "Chivasso", "Ciriè", "Gassino Torinese", "None", "Orbassano", "Rivoli", "Torino", "Vinovo", "Volpiano" ]
            }, {
                mask: "+39 0121 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pinerolo (TO)",
                city: "Pinerolo"
            }, {
                mask: "+39 0122 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Susa (TO)",
                city: "Susa"
            }, {
                mask: "+39 0123 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lanzo Torinese (TO)",
                city: "Lanzo Torinese"
            }, {
                mask: "+39 0124 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rivarolo Canavese (TO)",
                city: "Rivarolo Canavese"
            }, {
                mask: "+39 0125 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ivrea (TO)",
                city: [ "Ivrea", "Pont-Saint-Martin" ]
            }, {
                mask: "+39 0131 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Alessandria",
                city: [ "Alessandria", "Tortona" ]
            }, {
                mask: "+39 0141 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Asti",
                city: [ "Asti", "Canelli", "Montechiaro d'Asti", "Nizza Monferrato", "Villafranca d'Asti" ]
            }, {
                mask: "+39 0142 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Casale Monferrato (AL)",
                city: "Casale Monferrato"
            }, {
                mask: "+39 0143 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Novi Ligure (AL)",
                city: [ "Novi Ligure", "Ovada" ]
            }, {
                mask: "+39 0144 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Acqui Terme (AL)",
                city: "Acqui Terme"
            }, {
                mask: "+39 015 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Biella",
                city: [ "Biella", "Valle Mosso" ]
            }, {
                mask: "+39 0161 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vercelli",
                city: [ "Cigliano", "Santhià", "Vercelli" ]
            }, {
                mask: "+39 0163 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Borgosesia (VC)",
                city: [ "Borgosesia", "Gattinara", "Varallo" ]
            }, {
                mask: "+39 0165 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Aosta",
                city: [ "Aosta", "Courmayeur", "Quart", "Villeneuve" ]
            }, {
                mask: "+39 0166 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Saint-Vincent (AO)",
                city: "Saint-Vincent"
            }, {
                mask: "+39 0171 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cuneo",
                city: [ "Busca", "Cuneo", "Limone Piemonte" ]
            }, {
                mask: "+39 0172 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Savigliano (CN)",
                city: [ "Bra", "Fossano", "Racconigi", "Savigliano" ]
            }, {
                mask: "+39 0173 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Alba (CN)",
                city: "Alba"
            }, {
                mask: "+39 0174 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Mondovì (CN)",
                city: [ "Ceva", "Mondovì" ]
            }, {
                mask: "+39 0175 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Saluzzo (CN)",
                city: [ "Barge", "Saluzzo" ]
            }, {
                mask: "+39 0182 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Albenga (SV)",
                city: [ "Alassio", "Albenga", "Ceriale" ]
            }, {
                mask: "+39 0183 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Imperia",
                city: "Imperia"
            }, {
                mask: "+39 0184 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sanremo (IM)",
                city: [ "Sanremo", "Taggia", "Ventimiglia" ]
            }, {
                mask: "+39 0185 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rapallo (GE)",
                city: [ "Chiavari", "Rapallo", "Recco" ]
            }, {
                mask: "+39 0187 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "La Spezia",
                city: [ "Aulla", "La Spezia", "Levanto", "Sarzana" ]
            }, {
                mask: "+39 019 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Savona",
                city: [ "Carcare", "Finale Ligure", "Savona", "Varazze" ]
            }, {
                mask: "+39 02 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Milano",
                city: [ "Abbiategrasso", "Binasco", "Cernusco sul Naviglio", "Cinisello Balsamo", "Gorgonzola", "Locate di Triulzi", "Magenta", "Melegnano", "Milano", "Paullo", "Rho", "Saronno", "Sedriano", "Senago", "Sesto San Giovanni", "Trezzo sull'Adda" ]
            }, {
                mask: "+39 030 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Brescia",
                city: [ "Brescia", "Chiari", "Desenzano del Garda", "Gottolengo", "Iseo", "Leno", "Montichiari", "Palazzolo sull'Oglio", "Rovato", "Sarezzo", "Verolanuova" ]
            }, {
                mask: "+39 031 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Como",
                city: [ "Appiano Gentile", "Asso", "Cantù", "Como", "Erba", "Mariano Comense", "Molteno", "Solbiate" ]
            }, {
                mask: "+39 0321 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Novara",
                city: [ "Novara", "Oleggio", "Trecate" ]
            }, {
                mask: "+39 0322 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Arona (NO)",
                city: [ "Arona", "Borgomanero" ]
            }, {
                mask: "+39 0323 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Baveno (VB)",
                city: [ "Baveno", "Verbania" ]
            }, {
                mask: "+39 0324 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Domodossola (VB)",
                city: "Domodossola"
            }, {
                mask: "+39 0331 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Busto Arsizio (VA)",
                city: [ "Busto Arsizio", "Gallarate", "Legnano" ]
            }, {
                mask: "+39 0332 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Varese",
                city: [ "Besozzo", "Cunardo", "Laveno-Mombello", "Luino", "Varese" ]
            }, {
                mask: "+39 0341 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lecco",
                city: [ "Barzio", "Bellano", "Calolziocorte", "Lecco" ]
            }, {
                mask: "+39 0342 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sondrio",
                city: [ "Morbegno", "Sondrio", "Tirano" ]
            }, {
                mask: "+39 0343 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Chiavenna (SO)",
                city: "Chiavenna"
            }, {
                mask: "+39 0344 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Menaggio (CO)",
                city: "Menaggio"
            }, {
                mask: "+39 0345 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "San Pellegrino Terme (BG)",
                city: "San Pellegrino Terme"
            }, {
                mask: "+39 0346 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Clusone (BG)",
                city: "Clusone"
            }, {
                mask: "+39 035 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bergamo",
                city: [ "Albino", "Bergamo", "Bonate Sotto", "Cisano Bergamasco", "Fiorano al Serio", "Grumello del Monte", "Lovere", "Sarnico", "Verdellino" ]
            }, {
                mask: "+39 0362 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Seregno (MB)",
                city: [ "Carate Brianza", "Cesano Maderno", "Seregno" ]
            }, {
                mask: "+39 0363 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Treviglio (BG)",
                city: [ "Romano di Lombardia", "Treviglio" ]
            }, {
                mask: "+39 0364 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Breno (BS)",
                city: [ "Breno", "Darfo Boario Terme", "Edolo" ]
            }, {
                mask: "+39 0365 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Salò (BS)",
                city: [ "Salò", "Vestone" ]
            }, {
                mask: "+39 0371 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lodi",
                city: "Lodi"
            }, {
                mask: "+39 0372 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cremona",
                city: [ "Cremona", "Vescovato" ]
            }, {
                mask: "+39 0373 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Crema (CR)",
                city: "Crema"
            }, {
                mask: "+39 0374 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Soresina (CR)",
                city: "Soresina"
            }, {
                mask: "+39 0375 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Casalmaggiore (CR)",
                city: "Casalmaggiore"
            }, {
                mask: "+39 0376 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Mantova",
                city: [ "Asola", "Bozzolo", "Guidizzolo", "Mantova", "Suzzara Casalmoro" ]
            }, {
                mask: "+39 0377 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Codogno (LO)",
                city: "Codogno"
            }, {
                mask: "+39 0381 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vigevano (PV)",
                city: "Vigevano"
            }, {
                mask: "+39 0382 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pavia",
                city: [ "Garlasco", "Pavia", "Santa Cristina e Bissone" ]
            }, {
                mask: "+39 0383 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Voghera (PV)",
                city: [ "Casteggio", "Varzi", "Voghera" ]
            }, {
                mask: "+39 0384 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Mortara (PV)",
                city: [ "Mede", "Mortara" ]
            }, {
                mask: "+39 0385 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Stradella (PV)",
                city: "Stradella"
            }, {
                mask: "+39 0386 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ostiglia (MN)",
                city: "Ostiglia"
            }, {
                mask: "+39 039 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Monza",
                city: [ "Merate", "Monza", "Vimercate" ]
            }, {
                mask: "+39 040 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Trieste",
                city: "Trieste"
            }, {
                mask: "+39 041 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Venezia",
                city: [ "Chioggia", "Dolo", "Mirano", "Mogliano Veneto", "Noale", "Scorzè", "Spinea", "Venezia" ]
            }, {
                mask: "+39 0421 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "San Donà di Piave (VE)",
                city: [ "Jesolo", "Portogruaro", "San Donà di Piave" ]
            }, {
                mask: "+39 0422 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Treviso",
                city: [ "Oderzo", "Roncade", "Treviso" ]
            }, {
                mask: "+39 0423 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Montebelluna (TV)",
                city: [ "Castelfranco Veneto", "Montebelluna" ]
            }, {
                mask: "+39 0424 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bassano del Grappa (VI)",
                city: [ "Asiago", "Bassano del Grappa", "Marostica" ]
            }, {
                mask: "+39 0425 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rovigo",
                city: [ "Badia Polesine", "Lendinara", "Rovigo" ]
            }, {
                mask: "+39 0426 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Adria (RO)",
                city: [ "Adria", "Contarina di Porto Viro" ]
            }, {
                mask: "+39 0427 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Spilimbergo (PN)",
                city: "Spilimbergo"
            }, {
                mask: "+39 0428 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Tarvisio (UD)",
                city: "Tarvisio"
            }, {
                mask: "+39 0429 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Este (PD)",
                city: [ "Este", "Monselice", "Montagnana" ]
            }, {
                mask: "+39 0431 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cervignano del Friuli (UD)",
                city: [ "Cervignano del Friuli", "Latisana", "Lignano Sabbiadoro" ]
            }, {
                mask: "+39 0432 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Udine",
                city: [ "Cividale del Friuli", "Codroipo", "Gemona del Friuli", "Palmanova", "Udine" ]
            }, {
                mask: "+39 0433 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Tolmezzo (UD)",
                city: [ "Comeglians", "Tolmezzo" ]
            }, {
                mask: "+39 0434 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pordenone",
                city: [ "Pordenone", "Prata di Pordenone", "Sacile", "San Vito al Tagliamento" ]
            }, {
                mask: "+39 0435 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pieve di Cadore (BL)",
                city: "Pieve di Cadore"
            }, {
                mask: "+39 0436 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cortina d'Ampezzo (BL)",
                city: "Cortina d'Ampezzo"
            }, {
                mask: "+39 0437 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Belluno",
                city: [ "Agordo", "Belluno", "Sedico" ]
            }, {
                mask: "+39 0438 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Conegliano (TV)",
                city: [ "Conegliano", "Pieve di Soligo", "Vittorio Veneto" ]
            }, {
                mask: "+39 0439 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Feltre (BL)",
                city: [ "Feltre", "Fiera di Primiero" ]
            }, {
                mask: "+39 0442 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Legnago (VR)",
                city: [ "Cerea", "Legnago" ]
            }, {
                mask: "+39 0444 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vicenza",
                city: [ "Arzignano", "Montecchio Maggiore", "Sossano", "Vicenza" ]
            }, {
                mask: "+39 0445 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Schio (VI)",
                city: [ "Schio", "Thiene", "Valdagno" ]
            }, {
                mask: "+39 045 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Verona",
                city: [ "Bovolone", "Bussolengo", "Costermano", "Isola della Scala", "Peschiera del Garda", "San Bonifacio", "San Pietro in Cariano", "Tregnago", "Verona", "Villafranca di Verona" ]
            }, {
                mask: "+39 0461 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Trento",
                city: [ "Mezzolombardo", "Pergine Valsugana", "Trento" ]
            }, {
                mask: "+39 0462 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cavalese (TN)",
                city: "Cavalese"
            }, {
                mask: "+39 0463 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cles (TN)",
                city: "Cles"
            }, {
                mask: "+39 0464 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rovereto (TN)",
                city: [ "Riva del Garda", "Rovereto" ]
            }, {
                mask: "+39 0465 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Tione di Trento (TN)",
                city: "Tione di Trento"
            }, {
                mask: "+39 0471 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bolzano",
                city: [ "Bolzano", "Egna", "Ortisei" ]
            }, {
                mask: "+39 0472 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bressanone (BZ)",
                city: "Bressanone"
            }, {
                mask: "+39 0473 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Merano (BZ)",
                city: [ "Merano", "Silandro" ]
            }, {
                mask: "+39 0474 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Brunico (BZ)",
                city: "Brunico"
            }, {
                mask: "+39 0481 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Gorizia",
                city: [ "Gorizia", "Monfalcone" ]
            }, {
                mask: "+39 049 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Padova",
                city: [ "Camposampiero", "Cittadella", "Conselve", "Padova", "Piove di Sacco", "Teolo" ]
            }, {
                mask: "+39 050 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pisa",
                city: [ "Cascina", "Pisa" ]
            }, {
                mask: "+39 051 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bologna",
                city: [ "Bazzano", "Bologna", "Budrio", "Castel San Pietro Terme", "Cento", "Malalbergo", "San Giorgio di Piano", "San Giovanni in Persiceto", "Sasso Marconi" ]
            }, {
                mask: "+39 0521 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Parma",
                city: [ "Collecchio", "Langhirano", "Parma", "San Secondo Parmense" ]
            }, {
                mask: "+39 0522 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Reggio nell'Emilia",
                city: [ "Castelnovo ne' Monti", "Guastalla", "Reggio Emilia" ]
            }, {
                mask: "+39 0523 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Piacenza",
                city: [ "Bettola", "Castel San Giovanni", "Fiorenzuola d'Arda", "Monticelli d'Ongina", "Piacenza" ]
            }, {
                mask: "+39 0524 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Fidenza (PR)",
                city: "Fidenza"
            }, {
                mask: "+39 0525 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Fornovo di Taro (PR)",
                city: [ "Borgo Val di Taro", "Fornovo di Taro" ]
            }, {
                mask: "+39 0532 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ferrara",
                city: [ "Argenta", "Bondeno", "Copparo", "Ferrara" ]
            }, {
                mask: "+39 0533 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Comacchio (FE)",
                city: "Comacchio"
            }, {
                mask: "+39 0534 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Porretta Terme (BO)",
                city: "Porretta Terme"
            }, {
                mask: "+39 0535 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Mirandola (MO)",
                city: "Mirandola"
            }, {
                mask: "+39 0536 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sassuolo (MO)",
                city: [ "Maranello", "Pievepelago", "Sassuolo" ]
            }, {
                mask: "+39 0541 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rimini",
                city: [ "Cattolica", "Rimini", "Savignano sul Rubicone" ]
            }, {
                mask: "+39 0542 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Imola (BO)",
                city: "Imola"
            }, {
                mask: "+39 0543 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Forlì",
                city: "Forlì"
            }, {
                mask: "+39 0544 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ravenna",
                city: [ "Cervia", "Ravenna" ]
            }, {
                mask: "+39 0545 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lugo (RA)",
                city: [ "Bagnacavallo", "Lugo" ]
            }, {
                mask: "+39 0546 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Faenza (RA)",
                city: "Faenza"
            }, {
                mask: "+39 0547 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cesena",
                city: [ "Cesena", "Cesenatico" ]
            }, {
                mask: "+39 0549 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Repubblica di San Marino",
                city: [ "Repubblica di San Marino[4]", "San Marino" ]
            }, {
                mask: "+39 055 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Firenze",
                city: [ "Borgo San Lorenzo", "Firenze", "Pontassieve", "San Giovanni Valdarno", "Signa" ]
            }, {
                mask: "+39 0564 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Grosseto",
                city: [ "Arcidosso", "Grosseto", "Orbetello", "Roccastrada" ]
            }, {
                mask: "+39 0565 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Piombino (LI)",
                city: [ "Piombino", "Portoferraio" ]
            }, {
                mask: "+39 0566 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Follonica (GR)",
                city: "Follonica"
            }, {
                mask: "+39 0571 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Empoli (FI)",
                city: [ "Empoli", "San Miniato" ]
            }, {
                mask: "+39 0572 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Montecatini Terme (PT)",
                city: "Montecatini Terme"
            }, {
                mask: "+39 0573 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pistoia",
                city: "Pistoia"
            }, {
                mask: "+39 0574 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Prato",
                city: "Prato"
            }, {
                mask: "+39 0575 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Arezzo",
                city: [ "Arezzo", "Cortona", "Sansepolcro" ]
            }, {
                mask: "+39 0577 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Siena",
                city: [ "Abbadia San Salvatore", "Poggibonsi", "Siena", "Sinalunga" ]
            }, {
                mask: "+39 0578 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Chianciano Terme (SI)",
                city: [ "Chianciano Terme", "Chiusi" ]
            }, {
                mask: "+39 0583 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lucca",
                city: [ "Altopascio", "Barga", "Castelnuovo di Garfagnana", "Lucca" ]
            }, {
                mask: "+39 0584 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Viareggio (LU)",
                city: [ "Pietrasanta", "Viareggio" ]
            }, {
                mask: "+39 0585 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Massa",
                city: [ "Carrara", "Massa" ]
            }, {
                mask: "+39 0586 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Livorno",
                city: [ "Cecina", "Livorno", "Rosignano Marittimo" ]
            }, {
                mask: "+39 0587 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pontedera (PI)",
                city: "Pontedera"
            }, {
                mask: "+39 0588 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Volterra (PI)",
                city: "Volterra"
            }, {
                mask: "+39 059 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Modena",
                city: [ "Carpi", "Castelfranco Emilia", "Modena", "Vignola" ]
            }, {
                mask: "+39 06 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Roma",
                city: [ "Albano Laziale", "Anzio", "Bracciano", "Castelnuovo di Porto", "Città del Vaticano", "Colleferro", "Fiumicino", "Frascati", "Ladispoli", "Monterotondo", "Palestrina", "Pomezia", "Roma", "Velletri" ]
            }, {
                mask: "+39 070 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cagliari",
                city: [ "Cagliari", "Decimomannu", "Quartu Sant'Elena", "Sanluri", "Senorbì" ]
            }, {
                mask: "+39 071 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ancona",
                city: [ "Ancona", "Loreto", "Osimo", "Senigallia" ]
            }, {
                mask: "+39 0721 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pesaro",
                city: [ "Cagli", "Fano", "Mondolfo", "Pesaro" ]
            }, {
                mask: "+39 0722 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Urbino",
                city: "Urbino"
            }, {
                mask: "+39 0731 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Jesi (AN)",
                city: "Jesi"
            }, {
                mask: "+39 0732 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Fabriano (AN)",
                city: "Fabriano"
            }, {
                mask: "+39 0733 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Macerata",
                city: [ "Civitanova Marche", "Macerata", "Tolentino" ]
            }, {
                mask: "+39 0734 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Fermo",
                city: [ "Fermo", "Sant'Elpidio a Mare" ]
            }, {
                mask: "+39 0735 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "San Benedetto del Tronto (AP)",
                city: "San Benedetto del Tronto"
            }, {
                mask: "+39 0736 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ascoli Piceno",
                city: [ "Ascoli Piceno", "Castel di Lama" ]
            }, {
                mask: "+39 0737 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Camerino (MC)",
                city: "Camerino"
            }, {
                mask: "+39 0742 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Foligno (PG)",
                city: "Foligno"
            }, {
                mask: "+39 0743 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Spoleto (PG)",
                city: "Spoleto"
            }, {
                mask: "+39 0744 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Terni",
                city: [ "Amelia", "Narni", "Terni" ]
            }, {
                mask: "+39 0746 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rieti",
                city: [ "Amatrice", "Borgorose", "Rieti" ]
            }, {
                mask: "+39 075 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Perugia",
                city: [ "Assisi", "Città di Castello", "Gubbio", "Magione", "Marsciano", "Perugia", "Todi" ]
            }, {
                mask: "+39 0761 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Viterbo",
                city: [ "Civita Castellana", "Montefiascone", "Ronciglione", "Soriano nel Cimino", "Valentano", "Viterbo" ]
            }, {
                mask: "+39 0763 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Orvieto (TR)",
                city: "Orvieto"
            }, {
                mask: "+39 0765 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Poggio Mirteto (RI)",
                city: [ "Poggio Mirteto", "Poggio Moiano" ]
            }, {
                mask: "+39 0766 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Civitavecchia (RM)",
                city: [ "Civitavecchia", "Tarquinia" ]
            }, {
                mask: "+39 0771 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Formia (LT)",
                city: [ "Fondi", "Formia", "Minturno" ]
            }, {
                mask: "+39 0773 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Latina",
                city: [ "Latina", "Priverno", "Sabaudia", "Terracina" ]
            }, {
                mask: "+39 0774 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Tivoli (RM)",
                city: [ "Guidonia Montecelio", "Subiaco", "Tivoli" ]
            }, {
                mask: "+39 0775 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Frosinone",
                city: [ "Ceccano", "Fiuggi", "Frosinone" ]
            }, {
                mask: "+39 0776 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cassino (FR)",
                city: [ "Atina", "Cassino", "Pontecorvo", "Sora" ]
            }, {
                mask: "+39 0781 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Iglesias (SU)",
                city: [ "Carbonia", "Iglesias", "Narcao" ]
            }, {
                mask: "+39 0782 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lanusei (NU)",
                city: "Lanusei"
            }, {
                mask: "+39 0783 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Oristano",
                city: [ "Oristano", "Terralba" ]
            }, {
                mask: "+39 0784 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Nuoro",
                city: [ "Nuoro", "Siniscola", "Sorgono" ]
            }, {
                mask: "+39 0785 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Macomer (NU)",
                city: "Macomer"
            }, {
                mask: "+39 0789 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Olbia (SS)",
                city: [ "Olbia", "Palau" ]
            }, {
                mask: "+39 079 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sassari",
                city: [ "Alghero", "Ozieri", "Sassari", "Tempio Pausania", "Thiesi" ]
            }, {
                mask: "+39 080 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Bari",
                city: [ "Acquaviva delle Fonti", "Altamura", "Bari", "Bisceglie", "Bitetto", "Bitonto", "Casamassima", "Fasano", "Gioia del Colle", "Martina Franca", "Molfetta", "Monopoli", "Putignano", "Rutigliano", "Ruvo di Puglia", "Triggiano" ]
            }, {
                mask: "+39 081 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Napoli",
                city: [ "Acerra", "Afragola", "Aversa", "Capri", "Casal di Principe", "Casalnuovo di Napoli", "Casoria", "Castellammare di Stabia", "Crispano", "Ercolano", "Giugliano in Campania", "Ischia", "Marano di Napoli", "Napoli", "Nocera Inferiore", "Nola", "Poggiomarino", "Pomigliano d'Arco", "Portici", "Pozzuoli", "San Giuseppe Vesuviano", "Sant'Anastasia", "Scafati", "Sorrento", "Torre Annunziata", "Torre del Greco" ]
            }, {
                mask: "+39 0823 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Caserta",
                city: [ "Caserta", "Piedimonte Matese", "Santa Maria Capua Vetere", "Sessa Aurunca" ]
            }, {
                mask: "+39 0824 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Benevento",
                city: [ "Benevento", "Cerreto Sannita", "Foiano di Val Fortore", "Telese Terme" ]
            }, {
                mask: "+39 0825 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Avellino",
                city: [ "Ariano Irpino", "Avellino", "Prata di Principato Ultra", "Solofra" ]
            }, {
                mask: "+39 0827 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sant'Angelo dei Lombardi (AV)",
                city: [ "Montella", "Sant'Angelo dei Lombardi", "Vallata" ]
            }, {
                mask: "+39 0828 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Battipaglia (SA)",
                city: [ "Battipaglia", "Capaccio", "Contursi Terme" ]
            }, {
                mask: "+39 0831 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Brindisi",
                city: [ "Brindisi", "Francavilla Fontana", "Mesagne", "Ostuni", "San Pietro Vernotico", "San Vito dei Normanni" ]
            }, {
                mask: "+39 0832 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lecce",
                city: [ "Campi Salentina", "Lecce", "Vernole" ]
            }, {
                mask: "+39 0833 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Gallipoli (LE)",
                city: [ "Alessano", "Gallipoli", "Nardò", "Parabita" ]
            }, {
                mask: "+39 0835 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Matera",
                city: [ "Ferrandina", "Grassano", "Matera", "Pisticci", "Scanzano Jonico" ]
            }, {
                mask: "+39 0836 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Maglie (LE)",
                city: [ "Galatina", "Maglie", "Poggiardo" ]
            }, {
                mask: "+39 085 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Pescara",
                city: [ "Giulianova", "Penne", "Pescara", "Scafa", "Silvi", "Torre de' Passeri" ]
            }, {
                mask: "+39 0861 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Teramo",
                city: [ "Alba Adriatica", "Bisenti", "Nereto", "Teramo" ]
            }, {
                mask: "+39 0862 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "L'Aquila",
                city: [ "L'Aquila", "San Demetrio ne' Vestini" ]
            }, {
                mask: "+39 0863 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Avezzano (AQ)",
                city: [ "Avezzano", "Pescina", "Tagliacozzo" ]
            }, {
                mask: "+39 0864 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sulmona (AQ)",
                city: [ "Roccaraso", "Sulmona" ]
            }, {
                mask: "+39 0865 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Isernia",
                city: [ "Agnone", "Isernia", "Venafro" ]
            }, {
                mask: "+39 0871 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Chieti",
                city: [ "Chieti", "Guardiagrele" ]
            }, {
                mask: "+39 0872 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lanciano (CH)",
                city: [ "Atessa", "Lanciano" ]
            }, {
                mask: "+39 0873 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vasto (CH)",
                city: [ "Casalbordino", "Vasto" ]
            }, {
                mask: "+39 0874 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Campobasso",
                city: [ "Bojano", "Campobasso", "Larino", "Trivento" ]
            }, {
                mask: "+39 0875 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Termoli (CB)",
                city: "Termoli"
            }, {
                mask: "+39 0881 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Foggia",
                city: [ "Bovino", "Foggia", "Lucera", "Motta Montecorvino" ]
            }, {
                mask: "+39 0882 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "San Severo (FG)",
                city: [ "San Marco in Lamis", "San Severo", "Sannicandro Garganico" ]
            }, {
                mask: "+39 0883 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Andria",
                city: [ "Andria", "Barletta", "Canosa di Puglia", "Trani", "Trinitapoli" ]
            }, {
                mask: "+39 0884 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Manfredonia (FG)",
                city: [ "Manfredonia", "Vico del Gargano" ]
            }, {
                mask: "+39 0885 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cerignola (FG)",
                city: [ "Ascoli Satriano", "Candela", "Carapelle", "Cerignola", "Ordona", "Orta Nova", "Rocchetta Sant'Antonio", "Stornara", "Stornarella" ]
            }, {
                mask: "+39 089 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Salerno",
                city: [ "Amalfi", "Baronissi", "Cava de' Tirreni", "Salerno" ]
            }, {
                mask: "+39 090 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Messina",
                city: [ "Barcellona Pozzo di Gotto", "Messina", "Milazzo", "Spadafora" ]
            }, {
                mask: "+39 091 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Palermo",
                city: [ "Bagheria", "Carini", "Lercara Friddi", "Misilmeri", "Palermo", "Partinico", "Termini Imerese", "Villafrati" ]
            }, {
                mask: "+39 0921 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cefalù (PA)",
                city: [ "Cefalù", "Petralia Sottana", "Santo Stefano di Camastra" ]
            }, {
                mask: "+39 0922 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Agrigento",
                city: [ "Agrigento", "Alessandria della Rocca", "Canicattì", "Casteltermini", "Licata", "Palma di Montechiaro" ]
            }, {
                mask: "+39 0923 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Trapani",
                city: [ "Marsala", "Mazara del Vallo", "Trapani" ]
            }, {
                mask: "+39 0924 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Alcamo (TP)",
                city: [ "Alcamo", "Castelvetrano", "Salemi" ]
            }, {
                mask: "+39 0925 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sciacca (AG)",
                city: [ "Menfi", "Sciacca" ]
            }, {
                mask: "+39 0931 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Siracusa",
                city: [ "Augusta", "Avola", "Floridia", "Palazzolo Acreide", "Siracusa" ]
            }, {
                mask: "+39 0932 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Ragusa",
                city: [ "Comiso", "Modica", "Pozzallo", "Ragusa", "Scicli", "Vittoria" ]
            }, {
                mask: "+39 0933 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Caltagirone (CT)",
                city: [ "Caltagirone", "Gela", "Grammichele" ]
            }, {
                mask: "+39 0934 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Caltanissetta",
                city: [ "Caltanissetta", "Mussomeli", "Pietraperzia" ]
            }, {
                mask: "+39 0935 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Enna",
                city: [ "Enna", "Leonforte", "Piazza Armerina", "Regalbuto" ]
            }, {
                mask: "+39 0941 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Patti (ME)",
                city: [ "Capo d'Orlando", "Furnari", "Patti", "Sant'Agata di Militello" ]
            }, {
                mask: "+39 0942 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Taormina (ME)",
                city: "Taormina"
            }, {
                mask: "+39 095 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Catania",
                city: [ "Acireale", "Adrano", "Bronte", "Catania", "Giarre", "Lentini", "Nicolosi", "Palagonia", "Paternò" ]
            }, {
                mask: "+39 0961 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Catanzaro",
                city: [ "Catanzaro", "Cropani", "Tiriolo" ]
            }, {
                mask: "+39 0962 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Crotone",
                city: [ "Cirò Marina", "Crotone", "Petilia Policastro" ]
            }, {
                mask: "+39 0963 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vibo Valentia",
                city: [ "Soriano Calabro", "Tropea", "Vibo Valentia" ]
            }, {
                mask: "+39 0964 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Locri (RC)",
                city: [ "Bianco", "Gioiosa Ionica", "Locri" ]
            }, {
                mask: "+39 0965 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Reggio di Calabria",
                city: [ "Melito di Porto Salvo", "Reggio Calabria" ]
            }, {
                mask: "+39 0966 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Palmi (RC)",
                city: [ "Palmi", "Polistena", "Taurianova" ]
            }, {
                mask: "+39 0967 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Soverato (CZ)",
                city: [ "Badolato", "Chiaravalle Centrale", "Soverato" ]
            }, {
                mask: "+39 0968 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lamezia Terme (CZ)",
                city: [ "Lamezia Terme", "Maida", "Nocera Terinese" ]
            }, {
                mask: "+39 0971 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Potenza",
                city: [ "Avigliano", "Laurenzana", "Potenza" ]
            }, {
                mask: "+39 0972 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Melfi (PZ)",
                city: [ "Melfi", "Venosa" ]
            }, {
                mask: "+39 0973 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Lagonegro (PZ)",
                city: [ "Chiaromonte", "Lagonegro", "Lauria", "Sapri" ]
            }, {
                mask: "+39 0974 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Vallo della Lucania (SA)",
                city: [ "Roccagloriosa", "Torchiara", "Vallo della Lucania" ]
            }, {
                mask: "+39 0975 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Sala Consilina (SA)",
                city: [ "Polla", "Sala Consilina", "Viggiano" ]
            }, {
                mask: "+39 0976 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Muro Lucano (PZ)",
                city: "Muro Lucano"
            }, {
                mask: "+39 0981 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Castrovillari (CS)",
                city: [ "Cassano all'Ionio", "Castrovillari", "Trebisacce" ]
            }, {
                mask: "+39 0982 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Paola (CS)",
                city: "Paola"
            }, {
                mask: "+39 0983 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Rossano (CS)",
                city: [ "Cariati", "Corigliano Calabro", "Rossano" ]
            }, {
                mask: "+39 0984 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Cosenza",
                city: [ "Bisignano", "Cosenza", "Mendicino", "San Giovanni in Fiore", "San Marco Argentano" ]
            }, {
                mask: "+39 0985 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Scalea (CS)",
                city: "Scalea"
            }, {
                mask: "+39 099 ########",
                cc: "IT",
                cd: "Italy",
                reguib: "Taranto",
                city: [ "Fragagnano", "Ginosa", "Grottaglie", "Manduria", "Massafra", "Taranto" ]
            }, {
                mask: "+39 3## #######",
                cc: "IT",
                cd: "Italy",
                reguib: "Mobile",
                city: ""
            } ]
        }
    }), Inputmask;
});