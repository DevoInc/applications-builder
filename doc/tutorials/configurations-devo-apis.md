You can use any public APIs or clients of Devo within the apps.

In general, to authenticate with the available APIs or clients you will need the endpoint and the access token.
This information can be obtained by importing the _user_ object of this package, accessing the credentials object.

```javascript
import user from '@devo/applications-builder/libs/user';

const credentials = user.getCredentials();
```

## Examples

### Alerts API

You can use de Alerts API client who use the Alerts API to manage alerts in Devo.

```javascript
import user from '@devo/applications-builder/libs/user';
import { AlertsAPIClient } from '@devoinc/alerts-api-client';

const alertsAPIClient = new AlertsAPIClient(
  user.getCredentials().standAloneToken,
  user.getCredentials().alertsURI
);

alertsAPIClient.alertDefinition
  .get()
  .then((resp) => {
    console.log(resp);
  })
  .error((error) => {
    console.log(error);
  });
```
