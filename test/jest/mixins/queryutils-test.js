import { fixQueryForLoxcope } from '@devo/applications-builder/libs/queryutils';

describe('Loxcope utilities: ', () => {
  test('Auto fix query for loxcope', () => {
    let original = `
      from edr.crowdstrike.cannon

      where event_simpleName="ProcessRollup2" or event_simpleName="SynthethicProcessRollup2"
      where aid="{{aid}}"

      select formatdate(timestamp(int(peek(message, re("\\\\"timestamp\\\\":\\\\"(.*?)\\\\""), 1))), "MM/DD/YYYY HH:mm:ss.SSS") as time
      select "{{hostname}}" as HostName
      select lu("woofwoofiron","usersid_uname","UserName", UserSid) as _userName
      select lower(FileName) as _FileName

      group by event_simpleName

      pragma preaggr.transparent.allowed: true
      pragma tz: tz("{{ timezone }}")
    `;
    let expected = `
      from edr.crowdstrike.cannon

      where event_simpleName="ProcessRollup2" or event_simpleName="SynthethicProcessRollup2"
      where aid="{{aid}}"

      select formatdate(timestamp(int(peek(message, re("\\\\"timestamp\\\\":\\\\"(.*?)\\\\""), 1))), "MM/DD/YYYY HH:mm:ss.SSS") as time
      select "{{hostname}}" as HostName
      select \`lu/usersid_uname/UserName\`(UserSid) as _userName
      select lower(FileName) as _FileName

      group every 30m by event_simpleName



    `;

    expect(fixQueryForLoxcope(original)).toBe(expected);
  });

  test('Auto fix query for loxcope with custom fixes', () => {
    expect(
      fixQueryForLoxcope('original', [
        (query) => {
          return 'custom_fixed';
        },
      ])
    ).toBe('custom_fixed');
  });

  test('Should fix limit', () => {
    expect(fixQueryForLoxcope('limit 100')).toBe('');
  });

  test('Should fix lookup', () => {
    expect(
      fixQueryForLoxcope(
        'select lu("woofwoofiron","usersid_uname","UserName", UserSid) as _userName'
      )
    ).toBe('select `lu/usersid_uname/UserName`(UserSid) as _userName');
    expect(
      fixQueryForLoxcope(
        'select lu(   "woofwoofiron"  ,  "usersid_uname"   ,  "UserName",   UserSid  ) as _userName'
      )
    ).toBe('select `lu/usersid_uname/UserName`(UserSid) as _userName');
  });

  test('Should fix group by', () => {
    expect(fixQueryForLoxcope('group by something')).toBe(
      'group every 30m by something'
    );
  });

  test('Should fix int', () => {
    expect(fixQueryForLoxcope('select int8(something) as _something')).toBe(
      'select int(something) as _something'
    );
  });

  test('Should fix pragmas', () => {
    expect(fixQueryForLoxcope('pragma preaggr.transparent.allowed: true')).toBe(
      ''
    );
  });

  test('Should fix midnight', () => {
    let original = `
    from firewall.cisco.asa select decode(action, 'Built', 'allowed', 'permitted', 'allowed', 'est-allowed', 'allowed', 'Deny', 'blocked') as actionParsed
    where ifaceIn="outside", (eventId=302013 or eventId=302014 or eventId=419002 or eventId=419003 or eventId=302015 or eventId=302016 or eventId=302021 or eventId=302020 or eventId=302021 or eventId=313005 or eventId=106020 or eventId=106021 or eventId=106022 or eventId=106023 or eventId=106024)
    select decode(eventId, 302013, "Built", 106023, "ACL Denied", 302014, "Teardown", 302015, "Built", 302016, "Teardown", 302020, "Built", 302021, "Teardown", 313005, "Mismatch", 419002, "Duplicate", 302013, "Built", 106023, "ACL Denied", 302014, "Teardown") as eventIDStr
    select eventIDStr + " " + protocol as messageTransport
    where isnotnull(messageTransport) group every 1m | midnight(timestamp(1532693760000)) by messageTransport
    select count(srcIp) as Concurrent, floor(hllppcount(srcIp)) as Unique"`;

    let expected = `
    from firewall.cisco.asa select decode(action, 'Built', 'allowed', 'permitted', 'allowed', 'est-allowed', 'allowed', 'Deny', 'blocked') as actionParsed
    where ifaceIn="outside", (eventId=302013 or eventId=302014 or eventId=419002 or eventId=419003 or eventId=302015 or eventId=302016 or eventId=302021 or eventId=302020 or eventId=302021 or eventId=313005 or eventId=106020 or eventId=106021 or eventId=106022 or eventId=106023 or eventId=106024)
    select decode(eventId, 302013, "Built", 106023, "ACL Denied", 302014, "Teardown", 302015, "Built", 302016, "Teardown", 302020, "Built", 302021, "Teardown", 313005, "Mismatch", 419002, "Duplicate", 302013, "Built", 106023, "ACL Denied", 302014, "Teardown") as eventIDStr
    select eventIDStr + " " + protocol as messageTransport
    where isnotnull(messageTransport) group every 1m by messageTransport
    select count(srcIp) as Concurrent, floor(hllppcount(srcIp)) as Unique"`;

    expect(fixQueryForLoxcope(original)).toBe(expected);
  });

  test('Should remove domain in a  my lookuplist query', () => {
    const original = 'my.lookuplist.domain.lookupName';
    const expected = 'my.lookuplist.lookupName';
    expect(fixQueryForLoxcope(original)).toBe(expected);
  });

  test('Should remove select * in a query', () => {
    const original = 'from firewall.cisco.asa where ifaceIn="outside" select *';
    const expected = 'from firewall.cisco.asa where ifaceIn="outside" ';
    expect(fixQueryForLoxcope(original)).toBe(expected);
  });
});
