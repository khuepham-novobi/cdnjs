/*!
 * ui-grid - v4.9.0 - 2020-09-27
 * Copyright (c) 2020 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('he', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו.'
        },
        search: {
          placeholder: 'חפש...',
          showingItems: 'מציג:',
          selectedItems: 'סה"כ נבחרו:',
          totalItems: 'סה"כ רשומות:',
          size: 'תוצאות בדף:',
          first: 'דף ראשון',
          next: 'דף הבא',
          previous: 'דף קודם',
          last: 'דף אחרון'
        },
        menu: {
          text: 'בחר עמודות:'
        },
        sort: {
          ascending: 'סדר עולה',
          descending: 'סדר יורד',
          remove: 'בטל'
        },
        column: {
          hide: 'טור הסתר'
        },
        aggregation: {
          count: 'total rows: ',
          sum: 'total: ',
          avg: 'avg: ',
          min: 'min: ',
          max: 'max: '
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf',
          exporterAllAsExcel: 'Export all data as excel',
          exporterVisibleAsExcel: 'Export visible data as excel',
          exporterSelectedAsExcel: 'Export selected data as excel',
          clearAllFilters: 'Clean all filters'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
