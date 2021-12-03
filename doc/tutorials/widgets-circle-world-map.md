The circle world map widget shows a map where the number of
values for each area is represented by colored circles.

<img src="widgets/circleWorldMap.png" alt="Circle World Map" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import circleWorldMapWidget from '@devo/applications-builder/widgets/circleWorldMap';

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
widget = circleWorldMapWidget('circle-world-map-example');
widget.setRequests([request]);
widget.setKeys([{ lat: 'latitude', lon: 'longitude' }]);
widget.setValue('count');
```

<hr>

> [See API](module-CircleWorldMap.html)
