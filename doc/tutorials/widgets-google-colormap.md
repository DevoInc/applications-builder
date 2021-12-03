This chart displays information on a world map using country codes, representing data with different colors.

<img src="widgets/googleColormap.png" alt="Google Colormap" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import googleColormapWidget from '@devo/applications-builder/widgets/googleColorMap';

let query = `from demo.ecommerce.data
where isnotnull(clientIpAddress)
select mmcountry(clientIpAddress) as country
group every 1h by country
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = googleColormapWidget('goole-colormap-example');
widget.setRequests([request]);
widget.setKeys('country');
widget.setValue('count');
```

<hr>

> [See API](module-GoogleColormap.html)
