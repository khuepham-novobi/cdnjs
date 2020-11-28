import * as L from 'leaflet';
import { IGeocoder, GeocoderOptions, GeocodingCallback } from './api';
export interface HereOptions extends GeocoderOptions {
    app_id: string;
    app_code: string;
    reverseGeocodeProxRadius: null;
}
/**
 * Implementation of the [HERE Geocoder API](https://developer.here.com/documentation/geocoder/topics/introduction.html)
 */
export declare class HERE implements IGeocoder {
    options: HereOptions;
    constructor(options?: Partial<HereOptions>);
    geocode(query: string, cb: GeocodingCallback, context?: any): void;
    reverse(location: L.LatLngLiteral, scale: number, cb: GeocodingCallback, context?: any): void;
    getJSON(url: string, params: any, cb: GeocodingCallback, context?: any): void;
}
/**
 * [Class factory method](https://leafletjs.com/reference.html#class-class-factories) for {@link HERE}
 * @param options the options
 */
export declare function here(options?: Partial<HereOptions>): HERE;
