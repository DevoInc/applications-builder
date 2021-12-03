import '@babel/polyfill';
import sinon from 'sinon';
import template from '../template';
const series = require('@devo/applications-builder/widgets/series');
jest.mock('@devo/applications-builder/widgets/series');
jest.mock('@devo/applications-builder/widgets/helpers/exportDataSeries.js');
import processStructure from '@devo/applications-data-library/structures/series';
import { __ } from '@devo/applications-builder/i18n';
import widgetFactory from '@devo/applications-builder/widgetFactory';
jest.mock('@devo/applications-data-library/structures/series');
jest.mock('@devo/applications-builder/widgetFactory');
jest.mock('@devo/applications-builder/i18n');
jest.mock('@devo/applications-data-library/structures/series');

beforeEach(() => {
  let $ = (window.jQuery = window.$ = require('jquery'));
  document.body.innerHTML = template;
  global.stub = sinon.stub(console, 'error');
});
afterEach(() => {
  window.jQuery = undefined;
  window.$ = undefined;
  global.stub.restore();
  global.stub = undefined;
});
describe('Series:', () => {
  it('should exist', () => {
    expect(series).toBeDefined();
  });

  it('should create a series widgets when series is called with an ID', () => {
    let seriesWidget = series.default('stackedBarWidget');

    expect(seriesWidget).toBeDefined();
    expect(seriesWidget.getElementContainer()).toEqual(
      document.body.querySelector('#stackedBarWidget')
    );
  });

  it('should set Key to show when setKeys is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let key = 'key';
    seriesWidget.setKeys(key);
    expect(self.settings.keyToShow).toBe(key);
  });

  it('should set series names when setSeriesNames is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let seriesNames = ['serie1', 'serie2'];
    seriesWidget.setSeriesNames(seriesNames);
    expect(self.settings.seriesNames).toBe(seriesNames);
  });

  it('should set timestamp Key  when setTimestampKey is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let tsKey = 'tsKey';
    seriesWidget.setTimestampKey(tsKey);
    expect(self.settings.timestampKey).toBe(tsKey);
  });

  it('should set Value to show when setValToShow is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let value = 'value';
    seriesWidget.setValue(value);
    expect(self.settings.valToShow).toBe(value);
  });

  it('should set grouping to show when setGrouped is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let grouped = 'group';
    seriesWidget.setGrouped(grouped);
    expect(self.settings.groupped).toBe(grouped);
  });

  it('should set Y Axis title when setYAxisTitle is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let title = 'yAxisTitle';
    seriesWidget.setYAxisTitle(title);
    expect(self.settings.yaxis_title).toBe(title);
  });

  it('should set X Axis title  when setXAxisTitle is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let title = 'xAxisTitle';
    seriesWidget.setXAxisTitle(title);
    expect(self.settings.xaxis_title).toBe(title);
  });

  it('should fix data  when setFixedData is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let fixData = true;
    seriesWidget.setFixedData(fixData);
    expect(self.settings.fixData).toBeTruthy();
  });

  it('should set format  when setFormat is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let format = '.';
    seriesWidget.setFormat(format);
    expect(self.settings.format).toBe(format);
  });

  it('should set legend  when setLegend is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let legend = false;
    seriesWidget.setLegend(legend);
    expect(self.settings.legend).toBeFalsy();
  });

  it(`should set the default formatter legend when
    setDefaultFormaterLegend is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let defaultformaterlegend = () => {};
    seriesWidget.setDefaultFormaterLegend(defaultformaterlegend);
    expect(self.settings.defaultformaterlegend).toBe(defaultformaterlegend);
  });

  it('should set default formatter  when setDefaultFormater is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let defaultformater = () => {};
    seriesWidget.setDefaultFormater(defaultformater);
    expect(self.settings.defaultformater).toBe(defaultformater);
  });

  it('should set data accumulation when setAccumulated is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let accumulated = true;
    seriesWidget.setAccumulated(accumulated);
    expect(self.settings.accumulated).toBeTruthy();
  });

  it('should show average line when setShowAvgLine is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let showAvgLine = true;
    seriesWidget.setShowAvgLine(showAvgLine);
    expect(self.settings.showAvgLine).toBeTruthy();
  });

  it('should set discard method  when setDiscardMethod is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let discardMethod = 'discardMethod';
    seriesWidget.setDiscardMethod(discardMethod);
    expect(self.settings.discardMethod).toBe(discardMethod);
  });

  it('should set discard mode when setDiscardMode is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let discardMode = 'extremes';
    seriesWidget.setDiscardMode(discardMode);
    expect(self.settings.discardMode).toBe(discardMode);
  });

  it(`should set regression line type and set fixed data to false
  when setRegressionLine is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let regressionLine = 'linear';
    seriesWidget.setRegressionLine(regressionLine);
    expect(self.settings.regressionLine).toBe(regressionLine);
    expect(self.settings.fixData).toBeFalsy();
  });

  it('should set the Y axis scale type when setYscaleType is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let yScaleType = 'logarithmic';
    seriesWidget.setYscaleType(yScaleType);
    expect(self.settings.yScaleType).toBe(yScaleType);
  });

  it('should set data accumulation when setAccumulated is called', () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let accumulated = true;
    seriesWidget.setAccumulated(accumulated);
    expect(self.settings.accumulated).toBe(accumulated);
  });

  it(`should set max and min highlighting when
    setHighlightMaxMin is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let highlightMaxMin = true;
    seriesWidget.setHighlightMaxMin(highlightMaxMin);
    expect(self.settings.highlightMaxMin).toBeTruthy();
  });

  it(`should set Y Axis label formatter when
    setYAxisLabelsFormatter is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let yAxisLabelsFormatter = () => {};
    seriesWidget.setYAxisLabelsFormatter(yAxisLabelsFormatter);
    expect(self.settings.widgetTemplate.yAxis.labels.formatter).toBe(
      yAxisLabelsFormatter
    );
  });

  it(`should set X Axis label formatter when
  setXAxisFormatter is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let xAxisLabelsFormatter = () => {};
    seriesWidget.setXAxisFormatter(xAxisLabelsFormatter);
    expect(self.settings.widgetTemplate.xAxis.labels.formatter).toBe(
      xAxisLabelsFormatter
    );
  });

  it(`should force first element  when setForceFirstElement is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let forceFirstElement = true;
    seriesWidget.setForceFirstElement(forceFirstElement);
    expect(self.settings.forceFirstElement).toBeTruthy();
  });

  it(`should force last element  when setForceLastElement is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let forceLastElement = true;
    seriesWidget.setForceLastElement(forceLastElement);
    expect(self.settings.forceLastElement).toBeTruthy();
  });

  it(`should set keys limit when setAllKeysLimit is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let limit = 10;
    seriesWidget.setAllKeysLimit(limit);
    expect(self.settings.allKeysLimit).toBe(limit);
  });

  it(`should set date time label format
    limit when setAllKeysLimit is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let dateTimeFormatter = () => {};
    seriesWidget.setDateTimeLabelFormats(dateTimeFormatter);
    expect(self.settings.widgetTemplate.xAxis.dateTimeLabelFormats).toBe(
      dateTimeFormatter
    );
  });

  it(`should set x axis units when setXAxisUnits is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let units = ['unit1', 'unit2'];
    seriesWidget.setXAxisUnits(units);
    expect(self.settings.widgetTemplate.xAxis.units).toBe(units);
  });

  //TODO
  it(`should convert to bytes when setToBytes is called`, () => {
    // let self = {
    //   id: 'stackedBarWidget',
    //   settings: {}
    // }
    // let seriesWidget = series.mixin(self);
    // let limit = 10;
    // seriesWidget.setAllKeysLimit(limit);
    // expect(self.settings.allKeysLimit).toBe(limit);
  });

  it(`should set others when setOthers is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let others = false;
    seriesWidget.setOthers(others);
    expect(self.settings.others).toBeFalsy();
  });

  it(`should set top when setTop is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let top = 20;
    seriesWidget.setTop(top);
    expect(self.settings.top).toBe(top);
  });

  it(`should set grouping when setGrouping is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let grouping = 'days';
    seriesWidget.setGrouping(grouping);
    expect(self.settings.grouping).toBe(grouping);
  });

  it(`should set series order when setSeriesOrder is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let seriesOrder = 'order';
    seriesWidget.setSeriesOrder(seriesOrder);
    expect(self.settings.seriesOrder).toBe(seriesOrder);
  });

  it(`should set the parser function when setValuesParseFunction
    is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let parseFunction = () => {};
    seriesWidget.setValuesParseFunction(parseFunction);
    expect(self.settings.valuesParseFunction).toBe(parseFunction);
  });

  it(`should set series filter function when setValuesParseFunction
    is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let filter = () => {};
    seriesWidget.setSeriesFilter(filter);
    expect(self.settings.seriesFilter).toBe(filter);
  });

  it(`should set series properties function when setSeriesProperties
    is called`, () => {
    let self = {
      id: 'stackedBarWidget',
      settings: {},
    };
    let seriesWidget = series.mixin(self);
    let properties = ['prop'];
    seriesWidget.setSeriesProperties(properties);
    expect(self.settings.seriesProperties).toBe(properties);
  });
});
