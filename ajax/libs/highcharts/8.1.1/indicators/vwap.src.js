/**
 * @license Highstock JS v8.1.1 (2020-06-09)
 *
 * Indicator series type for Highstock
 *
 * (c) 2010-2019 Paweł Dalek
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/indicators/vwap', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'indicators/vwap.src.js', [_modules['parts/Utilities.js']], function (U) {
        /* *
         *
         *  (c) 2010-2020 Paweł Dalek
         *
         *  Volume Weighted Average Price (VWAP) indicator for Highstock
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var error = U.error,
            isArray = U.isArray,
            seriesType = U.seriesType;
        /**
         * The Volume Weighted Average Price (VWAP) series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.vwap
         *
         * @augments Highcharts.Series
         */
        seriesType('vwap', 'sma', 
        /**
         * Volume Weighted Average Price indicator.
         *
         * This series requires `linkedTo` option to be set.
         *
         * @sample stock/indicators/vwap
         *         Volume Weighted Average Price indicator
         *
         * @extends      plotOptions.sma
         * @since        6.0.0
         * @product      highstock
         * @requires     stock/indicators/indicators
         * @requires     stock/indicators/vwap
         * @optionparent plotOptions.vwap
         */
        {
            /**
             * @excluding index
             */
            params: {
                period: 30,
                /**
                 * The id of volume series which is mandatory. For example using
                 * OHLC data, volumeSeriesID='volume' means the indicator will be
                 * calculated using OHLC and volume values.
                 */
                volumeSeriesID: 'volume'
            }
        }, 
        /**
         * @lends Highcharts.Series#
         */
        {
            /**
             * Returns the final values of the indicator ready to be presented on a
             * chart
             * @private
             * @param {Highcharts.VWAPIndicator} this indicator
             * @param {Highcharts.Series} series - series for indicator
             * @param {object} params - params
             * @return {object} - computed VWAP
             **/
            getValues: function (series, params) {
                var indicator = this,
                    chart = series.chart,
                    xValues = series.xData,
                    yValues = series.yData,
                    period = params.period,
                    isOHLC = true,
                    volumeSeries;
                // Checks if volume series exists
                if (!(volumeSeries = (chart.get(params.volumeSeriesID)))) {
                    error('Series ' +
                        params.volumeSeriesID +
                        ' not found! Check `volumeSeriesID`.', true, chart);
                    return;
                }
                // Checks if series data fits the OHLC format
                if (!(isArray(yValues[0]))) {
                    isOHLC = false;
                }
                return indicator.calculateVWAPValues(isOHLC, xValues, yValues, volumeSeries, period);
            },
            /**
             * Main algorithm used to calculate Volume Weighted Average Price (VWAP)
             * values
             * @private
             * @param {boolean} isOHLC - says if data has OHLC format
             * @param {Array<number>} xValues - array of timestamps
             * @param {Array<number|Array<number,number,number,number>>} yValues -
             * array of yValues, can be an array of a four arrays (OHLC) or array of
             * values (line)
             * @param {Array<*>} volumeSeries - volume series
             * @param {number} period - number of points to be calculated
             * @return {object} - Object contains computed VWAP
             **/
            calculateVWAPValues: function (isOHLC, xValues, yValues, volumeSeries, period) {
                var volumeValues = volumeSeries.yData,
                    volumeLength = volumeSeries.xData.length,
                    pointsLength = xValues.length,
                    cumulativePrice = [],
                    cumulativeVolume = [],
                    xData = [],
                    yData = [],
                    VWAP = [],
                    commonLength,
                    typicalPrice,
                    cPrice,
                    cVolume,
                    i,
                    j;
                if (pointsLength <= volumeLength) {
                    commonLength = pointsLength;
                }
                else {
                    commonLength = volumeLength;
                }
                for (i = 0, j = 0; i < commonLength; i++) {
                    // Depending on whether series is OHLC or line type, price is
                    // average of the high, low and close or a simple value
                    typicalPrice = isOHLC ?
                        ((yValues[i][1] + yValues[i][2] +
                            yValues[i][3]) / 3) :
                        yValues[i];
                    typicalPrice *= volumeValues[i];
                    cPrice = j ?
                        (cumulativePrice[i - 1] + typicalPrice) :
                        typicalPrice;
                    cVolume = j ?
                        (cumulativeVolume[i - 1] + volumeValues[i]) :
                        volumeValues[i];
                    cumulativePrice.push(cPrice);
                    cumulativeVolume.push(cVolume);
                    VWAP.push([xValues[i], (cPrice / cVolume)]);
                    xData.push(VWAP[i][0]);
                    yData.push(VWAP[i][1]);
                    j++;
                    if (j === period) {
                        j = 0;
                    }
                }
                return {
                    values: VWAP,
                    xData: xData,
                    yData: yData
                };
            }
        });
        /**
         * A `Volume Weighted Average Price (VWAP)` series. If the
         * [type](#series.vwap.type) option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.vwap
         * @since     6.0.0
         * @product   highstock
         * @excluding dataParser, dataURL
         * @requires  stock/indicators/indicators
         * @requires  stock/indicators/vwap
         * @apioption series.vwap
         */
        ''; // to include the above in the js output

    });
    _registerModule(_modules, 'masters/indicators/vwap.src.js', [], function () {


    });
}));