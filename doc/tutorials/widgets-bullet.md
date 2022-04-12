The bullet chart displays a single measure and compares that
measure to one or more measures to complement its meaning and
displays it in the context of qualitative ranges (as varying
intensities of a single hue) of performance, such as poor,
satisfactory and good.

In the chart, the background fill colors represents the qualitive ranges. The dark center line represents the actual value. The dark vertical line represents a target value.

<img src="widgets/bullet.png" alt="Bullet" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import bulletWidget from '@devoinc/applications-builder/widgets/bullet';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201 
or clientIpAddress = 58.14.227.52 
or clientIpAddress = 48.126.91.202
or clientIpAddress = 65.150.230.164 
or clientIpAddress = 5.29.195.26
group by str(clientIpAddress)
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = bulletWidget('bullet-example');
widget.setRequests([request]);
widget.setKey('clientIpAddress');
widget.setValue('count');
```

<hr>

> [See API](module-Bullet.html)
