export class WeatherData {
    constructor(cityName, description) {
        this.cityName = cityName;
        this.description = description;
        this.temperature = '';
    }
}

// handler for proxy to get/set 'temperature' by converting from celcius to farenheit
export const WEATHER_PROXY_HANDLER = {
    // 'get' property trap
    get: function(target, property) {
        return Reflect.get(target, property);
    },
    // 'set' property trap
    set: function(target, property, value) {
        const newValue = (value * 1.8 + 32).toFixed(2) + 'F.';
        return Reflect.set(target, property, newValue);
    }
};