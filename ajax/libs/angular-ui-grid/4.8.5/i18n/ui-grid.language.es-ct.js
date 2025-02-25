/*!
 * ui-grid - v4.8.5 - 2020-09-14
 * Copyright (c) 2020 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('es-ct', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtre per columna',
            removeFilter: 'Elimina el filtre',
            columnMenuButtonLabel: 'Menú de Columna',
            column: 'Columna'
          },
          priority: 'Priority:',
          filterLabel: 'Filtre per columna: '
        },
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Arrossegueu una capçalera de columna aquí i deixeu-lo anar per agrupar per aquesta columna.'
        },
        search: {
          aria: {
            selected: 'Fila seleccionada',
            notSelected: 'Fila no seleccionada'
          },
          placeholder: 'Cerca...',
          showingItems: 'Ítems Mostrats:',
          selectedItems: 'Ítems Seleccionats:',
          totalItems: 'Ítems Totals:',
          size: 'Mida de la pàgina:',
          first: 'Primera Pàgina',
          next: 'Propera Pàgina',
          previous: 'Pàgina Anterior',
          last: 'Última Pàgina'
        },
        menu: {
          text: 'Triar Columnes:'
        },
        sort: {
          ascending: 'Ordena Ascendent',
          descending: 'Ordena Descendent',
          none: 'Sense Ordre',
          remove: 'Eliminar Ordre'
        },
        column: {
          hide: 'Amaga la Columna'
        },
        aggregation: {
          count: 'Files Totals: ',
          sum: 'total: ',
          avg: 'mitjà: ',
          min: 'mín: ',
          max: 'màx: '
        },
        pinning: {
          pinLeft: "Fixar a l'Esquerra",
          pinRight: 'Fixar a la Dreta',
          unpin: 'Treure Fixació'
        },
        columnMenu: {
          close: 'Tanca'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Menú de Quadrícula'
          },
          columns: 'Columnes:',
          importerTitle: 'Importa el fitxer',
          exporterAllAsCsv: 'Exporta tot com CSV',
          exporterVisibleAsCsv: 'Exporta les dades visibles com a CSV',
          exporterSelectedAsCsv: 'Exporta les dades seleccionades com a CSV',
          exporterAllAsPdf: 'Exporta tot com PDF',
          exporterVisibleAsPdf: 'Exporta les dades visibles com a PDF',
          exporterSelectedAsPdf: 'Exporta les dades seleccionades com a PDF',
          exporterAllAsExcel: 'Exporta tot com Excel',
          exporterVisibleAsExcel: 'Exporta les dades visibles com Excel',
          exporterSelectedAsExcel: 'Exporta les dades seleccionades com Excel',
          clearAllFilters: 'Netejar tots els filtres'
        },
        importer: {
          noHeaders: "No va ser possible derivar els noms de les columnes, té encapçalats l'arxiu?",
          noObjects: "No va ser possible obtenir registres, conté dades l'arxiu, a part de les capçaleres?",
          invalidCsv: "No va ser possible processar l'arxiu, ¿és un CSV vàlid?",
          invalidJson: "No va ser possible processar l'arxiu, ¿és un JSON vàlid?",
          jsonNotArray: 'El fitxer json importat ha de contenir una matriu, avortant.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Page to first',
            pageBack: 'Page back',
            pageSelected: 'Selected page',
            pageForward: 'Page forward',
            pageToLast: 'Page to last'
          },
          sizes: 'ítems per pàgina',
          totalItems: 'ítems',
          through: 'a',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Compte',
          aggregate_sum: 'Agr: Sum',
          aggregate_max: 'Agr: Máx',
          aggregate_min: 'Agr: Mín',
          aggregate_avg: 'Agr: Mitjà',
          aggregate_remove: 'Agr: Treure'
        },
        validate: {
          error: 'Error:',
          minLength: 'El valor ha de tenir almenys caràcters THRESHOLD.',
          maxLength: 'El valor ha de tenir com a màxim caràcters THRESHOLD.',
          required: 'Un valor és necessari.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
