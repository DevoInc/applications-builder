This chart tracks live attacks going from one location to another over a
world map, depicted as arrows whose colors and widths are defined by the
values in the specified fields.

<img src="widgets/pewPewMap.png" alt="Pew Pew Map" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import pewPewMapWidget from '@devo/applications-builder/widgets/pewPewMap';

let query = `from demo.ecommerce.data
where isnotnull(clientIpAddress)
select mmlongitude(clientIpAddress) as lon,
  mmlatitude(clientIpAddress) as lat
group by method
select first(lon) as from_lon,
  first(lat) as from_lat,
  last(lon) as to_lon,
  last(lat) as to_lat
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = pewPewMapWidget('pew-pew-map-example');
widget.setRequests([request]);
widget.setKeys({
  from: { lat: 'from_lat', lon: 'from_lon' },
  to: { lat: 'to_lat', lon: 'to_lon' },
});
widget.setValue('count');
```

<hr>

> [See API](module-PewPewMap.html)
