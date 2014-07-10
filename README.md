# Satellite Streams

A node module with streams that emit satellite data.

##RawSatelliteStream
An object-mode stream that emits the raw objects collected from [wheretheiss.at](http://wheretheiss.at/w/developer). Subclasses [stream.Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable).

* **ctor([options])**: Optionally specify the ID of the satellite (default 25544) and the request rate (default 2500ms).

```javascript
var ss = require('satellite-streams');  

var rawStream = new ss.RawSatelliteStream();
// or
var rawStream = new ss.RawSatelliteStream({ id: 25544, requestRate: 1700 });
```

##PerSecondSatelliteStream
An object-mode stream that transforms a stream of positional data into longitude and latitude per-second data. Subclasses [stream.Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform).

* **ctor([options])**: Optionally specify the underlying raw stream object, or one will be constructed with the ID of the satellite and the request rate. If those are not provided, defaults will be used. After the raw stream is obtained, its `pipe()` function is called to pipe it into the newly-constructed per-second stream.

```javascript
var ss = require('satellite-streams');  

var perSecondStream = new ss.PerSecondSatelliteStream();
// or
var perSecondStream = new ss.PerSecondSatelliteStream({ id: 25544, requestRate: 1700 });
// or
var rawStream = new ss.RawSatelliteStream({ id: 25544, requestRate: 1700 });
var perSecondStream = new ss.PerSecondSatelliteStream({ rawStream: rawStream });
```

### Installing
`sh install.sh`

### Running tests
`npm test` or `mocha`

### Demos
To demo RawSatelliteStream: `node demo-raw.js`  

To demo PerSecondSatelliteStream: `node demo-per-second.js`

#### Dependencies
[Mocha](http://visionmedia.github.io/mocha/) is used for running unit tests. [Chai](http://chaijs.com/api/bdd/) for BDD-style unit tests.