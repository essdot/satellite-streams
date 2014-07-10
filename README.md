# Satellite Streams

A module with streams that emit satellite data.

##RawSatelliteStream

An object-mode stream that emits the raw objects collected from api.wheretheiss.at. Subclasses [stream.Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable).

* **ctor([options])**: Optionally specify the ID of the satellite (default 25544) and the request rate (default 2500ms).

##PerSecondSatelliteStream

An object-mode stream that transforms a stream of positional data into longitude and latitude per-second data. Subclasses [stream.Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform).

* **ctor([options])**: Optionally specify the underlying raw stream object, or one will be constructed with the ID of the satellite and the request rate. If those are not provided, defaults will be used. This constructor pipes the raw stream into the new per-second stream

### Installing

`sh install.sh`

### Running tests

`npm test` or `mocha`

### Demos

To demo RawSatelliteStream: `node demo-raw.js`  

To demo PerSecondSatelliteStream: `node demo-per-second.js`
