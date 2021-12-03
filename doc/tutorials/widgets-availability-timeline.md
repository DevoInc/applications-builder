The availability timeline widget displays events during specific intervals shown chronologically along a line, indicating the availability and unavailability periods for each data group.

The widget is designed to provide a broad overview of a sequence of events in time.

<img src="widgets/availabilityTimeline.png" alt="Availability Timeline" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import availabilityTimelineWidget from '@devo/applications-builder/widgets/availabilityTimeline';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201 or 
clientIpAddress = 58.14.227.52 or 
clientIpAddress = 48.126.91.202 or 
clientIpAddress=65.150.230.164 or 
clientIpAddress=5.29.195.26 or 
clientIpAddress=58.14.227.52 or 
clientIpAddress=34.38.108.72
where isnotnull(clientIpAddress)
select mmcountry(clientIpAddress) as country
where isnotnull(country)
group every 1s by country
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'hour'),
});

let widget;
widget = bichordWidget('availability-timeline-example');
widget.setRequests([request]);
widget.setKey('country');
widget.setValue('count');
widget.setGrouping(1000);
```

<hr>

> [See API](module-AvailabilityTimeline.html)
