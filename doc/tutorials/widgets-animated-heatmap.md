This chart displays data animated over time, represented as heat points and geolocated on a world map using coordinates (latitude and longitude). The higher the values the brighter the color and bigger the area of the
heat points.

<img src="widgets/animatedHeatmap.png" alt="Animated Heatmap" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import animatedHeatMapWidget from '@devoinc/applications-builder/widgets/animatedHeatMap';

let query = `from demo.ecommerce.data
where isnotnull(clientIpAddress) 
select mmlatitude(clientIpAddress) as latitude,
mmlongitude(clientIpAddress) as longitude
group every 30m by latitude, longitude
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = animatedHeatMapWidget('animated-heatmap-example');
widget.setRequests([request]);
widget.setKeys([{ lat: 'latitude', lon: 'longitude' }]);
widget.setValue('count');
```

<hr>

> [See API](module-AnimatedHeatmap.html)
