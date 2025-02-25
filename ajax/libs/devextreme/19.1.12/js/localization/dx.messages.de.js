/*!
* DevExtreme (dx.messages.de.js)
* Version: 19.1.12
* Build date: Fri Oct 09 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

! function(root, factory) {
    if ("function" === typeof define && define.amd) {
        define(function(require) {
            factory(require("devextreme/localization"))
        })
    } else {
        if ("object" === typeof module && module.exports) {
            factory(require("devextreme/localization"))
        } else {
            factory(DevExpress.localization)
        }
    }
}(this, function(localization) {
    localization.loadMessages({
        de: {
            Yes: "Ja",
            No: "Nein",
            Cancel: "Abbrechen",
            Clear: "L\xf6schen",
            Done: "Fertig",
            Loading: "Laden...",
            Select: "Ausw\xe4hlen...",
            Search: "Suchen...",
            Back: "Zur\xfcck",
            OK: "OK",
            "dxCollectionWidget-noDataText": "Keine Daten verf\xfcgbar",
            "dxDropDownEditor-selectLabel": "Ausw\xe4hlen",
            "validation-required": "Pflichtfeld",
            "validation-required-formatted": "{0} ist ein Pflichtfeld",
            "validation-numeric": "Der Wert muss eine Zahl sein",
            "validation-numeric-formatted": "{0} muss eine Zahl sein",
            "validation-range": "Der Wert ist nicht im g\xfcltigen Bereich",
            "validation-range-formatted": "{0} ist nicht im g\xfcltigen Bereich",
            "validation-stringLength": "Die L\xe4nge des Wertes ist nicht korrekt",
            "validation-stringLength-formatted": "Die L\xe4nge von {0} ist nicht korrekt",
            "validation-custom": "Der Wert ist ung\xfcltig",
            "validation-custom-formatted": "{0} ist ung\xfcltig",
            "validation-compare": "Der Wert ist unpassend",
            "validation-compare-formatted": "{0} ist unpassend",
            "validation-pattern": "Der Wert passt nicht zum Muster",
            "validation-pattern-formatted": "{0} passt nicht zum Muster",
            "validation-email": "Die Email-Adresse ist ung\xfcltig",
            "validation-email-formatted": "{0} ist ung\xfcltig",
            "validation-mask": "Der Wert ist ung\xfcltig",
            "dxLookup-searchPlaceholder": "Minimale Anzahl Zeichen: {0}",
            "dxList-pullingDownText": "Zum Aktualisieren nach unten ziehen",
            "dxList-pulledDownText": "Zum Aktualisieren loslassen",
            "dxList-refreshingText": "Aktualisiere...",
            "dxList-pageLoadingText": "Laden...",
            "dxList-nextButtonText": "Mehr",
            "dxList-selectAll": "Alles ausw\xe4hlen",
            "dxListEditDecorator-delete": "Entfernen",
            "dxListEditDecorator-more": "Mehr",
            "dxScrollView-pullingDownText": "Zum Aktualisieren nach unten ziehen",
            "dxScrollView-pulledDownText": "Zum Aktualisieren loslassen",
            "dxScrollView-refreshingText": "Aktualisiere...",
            "dxScrollView-reachBottomText": "Laden...",
            "dxDateBox-simulatedDataPickerTitleTime": "Zeit ausw\xe4hlen",
            "dxDateBox-simulatedDataPickerTitleDate": "Datum ausw\xe4hlen",
            "dxDateBox-simulatedDataPickerTitleDateTime": "Datum und Zeit ausw\xe4hlen",
            "dxDateBox-validation-datetime": "Der Wert muss ein Datum oder eine Uhrzeit sein",
            "dxFileUploader-selectFile": "Datei ausw\xe4hlen",
            "dxFileUploader-dropFile": "oder hierher ziehen",
            "dxFileUploader-bytes": "Bytes",
            "dxFileUploader-kb": "kb",
            "dxFileUploader-Mb": "Mb",
            "dxFileUploader-Gb": "Gb",
            "dxFileUploader-upload": "Hochladen",
            "dxFileUploader-uploaded": "Hochgeladen",
            "dxFileUploader-readyToUpload": "Bereit zum hochladen",
            "dxFileUploader-uploadFailedMessage": "Fehler beim hochladen",
            "dxFileUploader-invalidFileExtension": "Unzul\xe4ssiger Dateityp",
            "dxFileUploader-invalidMaxFileSize": "Datei ist zu gro\xdf",
            "dxFileUploader-invalidMinFileSize": "Datei ist zu klein",
            "dxRangeSlider-ariaFrom": "Von",
            "dxRangeSlider-ariaTill": "Bis",
            "dxSwitch-switchedOnText": "EIN",
            "dxSwitch-switchedOffText": "AUS",
            "dxForm-optionalMark": "optional",
            "dxForm-requiredMessage": "{0} ist ein Pflichtfeld",
            "dxNumberBox-invalidValueMessage": "Der Wert muss eine Zahl sein",
            "dxNumberBox-noDataText": "Keine Daten",
            "dxDataGrid-columnChooserTitle": "Spaltenauswahl",
            "dxDataGrid-columnChooserEmptyText": "Ziehen Sie Spalten hierhin, um sie zu verstecken",
            "dxDataGrid-groupContinuesMessage": "Weiter auf der n\xe4chsten Seite",
            "dxDataGrid-groupContinuedMessage": "Weiter von der vorherigen Seite",
            "dxDataGrid-groupHeaderText": "Nach dieser Spalte gruppieren",
            "dxDataGrid-ungroupHeaderText": "Gruppierung entfernen",
            "dxDataGrid-ungroupAllText": "Alle Gruppierungen entfernen",
            "dxDataGrid-editingEditRow": "Bearbeiten",
            "dxDataGrid-editingSaveRowChanges": "Speichern",
            "dxDataGrid-editingCancelRowChanges": "Abbrechen",
            "dxDataGrid-editingDeleteRow": "Entfernen",
            "dxDataGrid-editingUndeleteRow": "Wiederherstellen",
            "dxDataGrid-editingConfirmDeleteMessage": "Sind Sie sicher, dass Sie diesen Datensatz l\xf6schen wollen?",
            "dxDataGrid-validationCancelChanges": "\xc4nderungen verwerfen",
            "dxDataGrid-groupPanelEmptyText": "Ziehen Sie eine Spalte hierhin, um danach zu gruppieren",
            "dxDataGrid-noDataText": "Keine Daten",
            "dxDataGrid-searchPanelPlaceholder": "Suchen...",
            "dxDataGrid-filterRowShowAllText": "(Alle)",
            "dxDataGrid-filterRowResetOperationText": "Zur\xfccksetzen",
            "dxDataGrid-filterRowOperationEquals": "Ist gleich",
            "dxDataGrid-filterRowOperationNotEquals": "Ist nicht gleich",
            "dxDataGrid-filterRowOperationLess": "Kleiner als",
            "dxDataGrid-filterRowOperationLessOrEquals": "Kleiner oder gleich",
            "dxDataGrid-filterRowOperationGreater": "Gr\xf6\xdfer als",
            "dxDataGrid-filterRowOperationGreaterOrEquals": "Gr\xf6\xdfer oder gleich",
            "dxDataGrid-filterRowOperationStartsWith": "Beginnt mit",
            "dxDataGrid-filterRowOperationContains": "Enth\xe4lt",
            "dxDataGrid-filterRowOperationNotContains": "Enth\xe4lt nicht",
            "dxDataGrid-filterRowOperationEndsWith": "Endet mit",
            "dxDataGrid-filterRowOperationBetween": "Zwischen",
            "dxDataGrid-filterRowOperationBetweenStartText": "Anfang",
            "dxDataGrid-filterRowOperationBetweenEndText": "Ende",
            "dxDataGrid-applyFilterText": "Filter anwenden",
            "dxDataGrid-trueText": "wahr",
            "dxDataGrid-falseText": "falsch",
            "dxDataGrid-sortingAscendingText": "Aufsteigend sortieren",
            "dxDataGrid-sortingDescendingText": "Absteigend sortieren",
            "dxDataGrid-sortingClearText": "Sortierung aufheben",
            "dxDataGrid-editingSaveAllChanges": "\xc4nderungen speichern",
            "dxDataGrid-editingCancelAllChanges": "\xc4nderungen verwerfen",
            "dxDataGrid-editingAddRow": "Neue Zeile",
            "dxDataGrid-summaryMin": "Min: {0}",
            "dxDataGrid-summaryMinOtherColumn": "Minimum von {1} ist {0}",
            "dxDataGrid-summaryMax": "Max: {0}",
            "dxDataGrid-summaryMaxOtherColumn": "Maximum von {1} ist {0}",
            "dxDataGrid-summaryAvg": "\xd8: {0}",
            "dxDataGrid-summaryAvgOtherColumn": "Durchschnitt von {1} ist {0}",
            "dxDataGrid-summarySum": "Summe: {0}",
            "dxDataGrid-summarySumOtherColumn": "Summe von {1} ist {0}",
            "dxDataGrid-summaryCount": "Anzahl: {0}",
            "dxDataGrid-columnFixingFix": "Fixieren",
            "dxDataGrid-columnFixingUnfix": "L\xf6sen",
            "dxDataGrid-columnFixingLeftPosition": "Nach links",
            "dxDataGrid-columnFixingRightPosition": "Nach rechts",
            "dxDataGrid-exportTo": "Exportieren",
            "dxDataGrid-exportToExcel": "Exportieren als Excel-Datei",
            "dxDataGrid-exporting": "Exportieren ...",
            "dxDataGrid-excelFormat": "Excel-Datei",
            "dxDataGrid-selectedRows": "Ausgew\xe4hlte Zeilen",
            "dxDataGrid-exportAll": "Alle Daten exportieren",
            "dxDataGrid-exportSelectedRows": "Ausgew\xe4hlte Zeilen exportieren",
            "dxDataGrid-headerFilterEmptyValue": "(Leerwerte)",
            "dxDataGrid-headerFilterOK": "OK",
            "dxDataGrid-headerFilterCancel": "Abbrechen",
            "dxDataGrid-ariaColumn": "Spalte",
            "dxDataGrid-ariaValue": "Wert",
            "dxDataGrid-ariaFilterCell": "Filterzelle",
            "dxDataGrid-ariaCollapse": "Zusammenklappen",
            "dxDataGrid-ariaExpand": "Aufklappen",
            "dxDataGrid-ariaDataGrid": "Datentabelle",
            "dxDataGrid-ariaSearchInGrid": "Suchen in der Datentabelle",
            "dxDataGrid-ariaSelectAll": "Alle ausw\xe4hlen",
            "dxDataGrid-ariaSelectRow": "Zeile ausw\xe4hlen",
            "dxDataGrid-filterBuilderPopupTitle": "Filter-Generator",
            "dxDataGrid-filterPanelCreateFilter": "Filter erzeugen",
            "dxDataGrid-filterPanelClearFilter": "Zur\xfccksetzen",
            "dxDataGrid-filterPanelFilterEnabledHint": "Filter aktivieren",
            "dxTreeList-ariaTreeList": "Strukturliste",
            "dxTreeList-editingAddRowToNode": "Hinzuf\xfcgen",
            "dxPager-infoText": "Seite {0} von {1} ({2} Elemente)",
            "dxPager-pagesCountText": "von",
            "dxPivotGrid-grandTotal": "Gesamt",
            "dxPivotGrid-total": "{0} Gesamt",
            "dxPivotGrid-fieldChooserTitle": "Feldauswahl",
            "dxPivotGrid-showFieldChooser": "Feldauswahl anzeigen",
            "dxPivotGrid-expandAll": "Alle aufklappen",
            "dxPivotGrid-collapseAll": "Alle zusammenklappen",
            "dxPivotGrid-sortColumnBySummary": '"{0}" nach dieser Spalte sortieren',
            "dxPivotGrid-sortRowBySummary": '"{0}" nach dieser Zeile sortieren',
            "dxPivotGrid-removeAllSorting": "Sortierungen entfernen",
            "dxPivotGrid-dataNotAvailable": "Entf.",
            "dxPivotGrid-rowFields": "Zeilenfelder",
            "dxPivotGrid-columnFields": "Spaltenfelder",
            "dxPivotGrid-dataFields": "Datenfelder",
            "dxPivotGrid-filterFields": "Filterfelder",
            "dxPivotGrid-allFields": "Alle Felder",
            "dxPivotGrid-columnFieldArea": "Spaltenfelder hierher ziehen",
            "dxPivotGrid-dataFieldArea": "Datenfelder hierher ziehen",
            "dxPivotGrid-rowFieldArea": "Zeilenfelder hierher ziehen",
            "dxPivotGrid-filterFieldArea": "Filterfelder hierher ziehen",
            "dxScheduler-editorLabelTitle": "Betreff",
            "dxScheduler-editorLabelStartDate": "Anfangszeit",
            "dxScheduler-editorLabelEndDate": "Endzeit",
            "dxScheduler-editorLabelDescription": "Beschreibung",
            "dxScheduler-editorLabelRecurrence": "Wiederholen",
            "dxScheduler-openAppointment": "Termin \xf6ffnen",
            "dxScheduler-recurrenceNever": "Nie",
            "dxScheduler-recurrenceDaily": "T\xe4glich",
            "dxScheduler-recurrenceWeekly": "W\xf6chentlich",
            "dxScheduler-recurrenceMonthly": "Monatlich",
            "dxScheduler-recurrenceYearly": "J\xe4hrlich",
            "dxScheduler-recurrenceRepeatEvery": "Wiederholen alle",
            "dxScheduler-recurrenceRepeatOn": "Wiederholen an",
            "dxScheduler-recurrenceEnd": "Wiederholungsende",
            "dxScheduler-recurrenceAfter": "Nach",
            "dxScheduler-recurrenceOn": "Am",
            "dxScheduler-recurrenceRepeatDaily": "Tag(e)",
            "dxScheduler-recurrenceRepeatWeekly": "Woche(n)",
            "dxScheduler-recurrenceRepeatMonthly": "Monat(e)",
            "dxScheduler-recurrenceRepeatYearly": "Jahr(e)",
            "dxScheduler-switcherDay": "Tag",
            "dxScheduler-switcherWeek": "Woche",
            "dxScheduler-switcherWorkWeek": "Arbeitswoche",
            "dxScheduler-switcherMonth": "Monat",
            "dxScheduler-switcherTimelineDay": "Zeitstrahl Tag",
            "dxScheduler-switcherTimelineWeek": "Zeitstrahl Woche",
            "dxScheduler-switcherTimelineWorkWeek": "Zeitstrahl Arbeitswoche",
            "dxScheduler-switcherTimelineMonth": "Zeitstrahl Monat",
            "dxScheduler-switcherAgenda": "Agenda",
            "dxScheduler-recurrenceRepeatOnDate": "am Datum",
            "dxScheduler-recurrenceRepeatCount": "Ereignisse",
            "dxScheduler-allDay": "Ganzt\xe4gig",
            "dxScheduler-confirmRecurrenceEditMessage": "M\xf6chten Sie nur diesen Termin bearbeiten, oder die gesamte Serie?",
            "dxScheduler-confirmRecurrenceDeleteMessage": "M\xf6chten Sie nur diesen Termin l\xf6schen, oder die gesamte Serie?",
            "dxScheduler-confirmRecurrenceEditSeries": "Serie bearbeiten",
            "dxScheduler-confirmRecurrenceDeleteSeries": "Serie l\xf6schen",
            "dxScheduler-confirmRecurrenceEditOccurrence": "Termin bearbeiten",
            "dxScheduler-confirmRecurrenceDeleteOccurrence": "Termin l\xf6schen",
            "dxScheduler-noTimezoneTitle": "Keine Zeitzone",
            "dxScheduler-moreAppointments": "{0} weitere",
            "dxCalendar-todayButtonText": "Heute",
            "dxCalendar-ariaWidgetName": "Kalendar",
            "dxColorView-ariaRed": "Rot",
            "dxColorView-ariaGreen": "Gr\xfcn",
            "dxColorView-ariaBlue": "Blau",
            "dxColorView-ariaAlpha": "Transparenz",
            "dxColorView-ariaHex": "Farbwert",
            "dxTagBox-selected": "{0} ausgew\xe4hlt",
            "dxTagBox-allSelected": "Alle ausgew\xe4hlt ({0})",
            "dxTagBox-moreSelected": "{0} weitere",
            "vizExport-printingButtonText": "Drucken",
            "vizExport-titleMenuText": "Export/Druck",
            "vizExport-exportButtonText": "{0}-Datei",
            "dxFilterBuilder-and": "Und",
            "dxFilterBuilder-or": "Oder",
            "dxFilterBuilder-notAnd": "Nicht Und",
            "dxFilterBuilder-notOr": "Nicht Oder",
            "dxFilterBuilder-addCondition": "Bedingung hinzuf\xfcgen",
            "dxFilterBuilder-addGroup": "Gruppe hinzuf\xfcgen",
            "dxFilterBuilder-enterValueText": "<Wert eingeben>",
            "dxFilterBuilder-filterOperationEquals": "Ist gleich",
            "dxFilterBuilder-filterOperationNotEquals": "Ist nicht gleich",
            "dxFilterBuilder-filterOperationLess": "Kleiner als",
            "dxFilterBuilder-filterOperationLessOrEquals": "Kleiner oder gleich",
            "dxFilterBuilder-filterOperationGreater": "Gr\xf6\xdfer als",
            "dxFilterBuilder-filterOperationGreaterOrEquals": "Gr\xf6\xdfer oder gleich",
            "dxFilterBuilder-filterOperationStartsWith": "Beginnt mit",
            "dxFilterBuilder-filterOperationContains": "Enth\xe4lt",
            "dxFilterBuilder-filterOperationNotContains": "Enth\xe4lt nicht",
            "dxFilterBuilder-filterOperationEndsWith": "Endet mit",
            "dxFilterBuilder-filterOperationIsBlank": "Ist leer",
            "dxFilterBuilder-filterOperationIsNotBlank": "Ist nicht leer",
            "dxFilterBuilder-filterOperationBetween": "Zwischen",
            "dxFilterBuilder-filterOperationAnyOf": "Ist enthalten in",
            "dxFilterBuilder-filterOperationNoneOf": "Ist nicht enthalten in",
            "dxHtmlEditor-dialogColorCaption": "Schriftfarbe \xe4ndern",
            "dxHtmlEditor-dialogBackgroundCaption": "Hintergrundfarbe \xe4ndern",
            "dxHtmlEditor-dialogLinkCaption": "Link hinzuf\xfcgen",
            "dxHtmlEditor-dialogLinkUrlField": "URL",
            "dxHtmlEditor-dialogLinkTextField": "Text",
            "dxHtmlEditor-dialogLinkTargetField": "Link in neuem Fenster \xf6ffnen",
            "dxHtmlEditor-dialogImageCaption": "Bild hinzuf\xfcgen",
            "dxHtmlEditor-dialogImageUrlField": "URL",
            "dxHtmlEditor-dialogImageAltField": "Alternativer Text",
            "dxHtmlEditor-dialogImageWidthField": "Breite (px)",
            "dxHtmlEditor-dialogImageHeightField": "Bildh\xf6he (px)",
            "dxHtmlEditor-heading": "\xdcberschrift",
            "dxHtmlEditor-normalText": "Normaler Text",
            "dxFileManager-newFolderName": "Ohne Titel",
            "dxFileManager-errorNoAccess": "Zugriff verweigert. Die Operation kann nicht durchgef\xfchrt werden.",
            "dxFileManager-errorDirectoryExistsFormat": "Ordner {0} existiert bereits.",
            "dxFileManager-errorFileExistsFormat": "Datei {0} existiert bereits.",
            "dxFileManager-errorFileNotFoundFormat": "Datei {0} wurde nicht gefunden.",
            "dxFileManager-errorDefault": "Unbekannter Fehler"
        }
    })
});
