This chart displays information on a world map using latitude and
longitude coordinates, representing data with different colors.
Information can be clustered on the map by an optional additional value.

<img src="widgets/googleHeatmap.png" alt="Google Heatmap" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import googleHeatmapWidget from '@devoinc/applications-builder/widgets/googleHeatMap';

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
widget = googleHeatmapWidget('goole-heatmap-example');
widget.setRequests([request]);
widget.setKeys([{ lat: 'latitude', lon: 'longitude' }]);
widget.setValue('count');
```

<hr>

> [See API](module-GoogleHeatmap.html)
