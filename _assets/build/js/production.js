var createjs = createjs||{},
	animations = animations||{};
	animations.magnetisedTrees = {
		lib: {},
		images: {}
	};

(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1901,
	height: 1050,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"/_assets/animations/magnetised-trees/images/Bitmap1.jpg", id:"Bitmap1"},
		{src:"/_assets/animations/magnetised-trees/images/Bitmap2.jpg", id:"Bitmap2"},
		{src:"/_assets/animations/magnetised-trees/images/Bitmap4.png", id:"Bitmap4"},
		{src:"/_assets/animations/magnetised-trees/images/treemask.png", id:"treemask"}
	]
};

// stage content:
(lib.tree2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ROD-1
	this.instance = new lib.ROD1();
	this.instance.setTransform(861.4,580.5,1,1,0,0,0,43.2,188.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(685));

	// ROD-2
	this.instance_1 = new lib.ROD2();
	this.instance_1.setTransform(916.8,569.5,1,1,0,0,0,27.6,177.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(685));

	// ROD-3
	this.instance_2 = new lib.ROD3();
	this.instance_2.setTransform(1041.1,557.6,1,1,0,0,0,53.3,147.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(685));

	// ROD-4
	this.instance_3 = new lib.ROD4();
	this.instance_3.setTransform(1067.8,565.2,1,1,0,0,0,41.2,137.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(685));

	// ROD-5
	this.instance_4 = new lib.ROD5();
	this.instance_4.setTransform(1286.2,544.2,1,1,0,0,0,145.2,227.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(685));

	// BKG
	this.instance_5 = new lib.Bitmap1();
	this.instance_5.setTransform(0,0,1,1.011);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(685));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(950.5,525,1901,1056);


// symbols:
(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1901,1044);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,609,459);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,500,742);


(lib.treemask = function() {
	this.initialize(img.treemask);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,623,475);


(lib.Symbol1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.Bitmap4, null, new cjs.Matrix2D(-1.027,0,0,0.814,107.6,-302)).s().p("ArCd4MAAAg7vIWEAAMAAAA7vg");
	this.shape.setTransform(178.2,238.3,2.52,1.246);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,356.4,476.5);


(lib.ROD5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rod (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("EgWqAjbQgEgGALgPQAAgPAKgDQAEgBARABQAQgZAjgRIA7gbIAlgNQAYgbAegKQAGgLAMgCQAFgBAOABIAAgCQACgQATgNIAggRQAEgLAMgCIAYgSQAKgPAXgMIAlgVIAXgSQAMgLAGgNIA5g1IALgHQAKgLARgWQARgTARgIIAcgXIBGg6QAUgRAmgkQAjgfAcgQQAMgkAbgQQAGgPAOgFIAJgIIAhgnQAFgPAOgGQAFgEAggnQAWgbAVgKIAVgdQAEgQAOgFQAIgTAUgMQAZgmAdgUQAGgQAMgFQALgaASgGIAMgRIAdggQAAgUATgKIAggmQALgGAKgSQALgUAIgGQAKgFAJgVQAIgUANgEIAbgqQARgWAXgHQAAgWAPgVQAHgMAUgXIAmghQgBgEADgEQgBgOABgDQACgHAOADIAqgpQgagmAugCQADgeAcACQgCgxAfgWIAEgJQANgeAOgLQABgSAYgbQAWgaAAgTIBciqIAOgYQAIgPAQgBQgCgNAIgKQAFgHAMgKIAnhRIANggQAHgSAKgLQgBgOAIgFIAJgWQAGgNAIgHQAAgNAKgEQAAgOAIgFIADgLQADgFAFgDIACgLQACgHAGgCIAMgVQAFgZAOgOQABgPAKgEQAKgkAUgYIAKgUQgBgNALgHQACgRASgXIAKgUQAEgXAQgSIABABIAdhGQgCgOAMgHIASgoQAIgiANgPQAHghAOgRQAHgjAPgPQgEgOAOgPQAAgXASgTQAIgcAHgPQAKgWAPgPIALgTIgBgaQABgPALgJQACgZAQgPQAKgjAHgQQAMgbAfgFQgBADADADIABgDIgDgDQgTgfAOgoQAVgsAEgXIABgMQACgHAGgDQgDgWARgPIAPglIABgFQgBgFAEgDIAlhcQgBgTAMgKQAKg6AUgfQgBgOAMgaQABgZAPgaQAAgUAJgZIAQgsQAGgeALgNIADgRQACgRADgKQAEgOAJgJQAFgHADggQACgYAUgHQgCgEABgDQgDgUAIgZIAQgpQgCgUALgKQAEgiAQgXQgBgdAMgNQgCgEAEgEIALgpQAHgXAJgRIANg7IAHgaQAEgQAIgIIATgzQAPgbAUAOQASANgKAXIggBGQgIA+gWA5QACAFgDAEQgCAVgJAaIgSAtIgEAbQgFAOgLAIQADAPgIARIgRAbQAGAfgZAeIACAQQACAUgLAYQgGAOgPAaIABAfQgCARgKAMIgFAWQgEANgLAFQAFAggOASQgEAjgQAbQgBARgKAKQgBAmgTAhQADAPgNAOQgGAIgCAUQgCATgJAIQgBAQgJAPQgGALgPAPQADAXgKAYQgGAOgRAbQgFALgGAlQgGAegMAPQgFAYgLAbIgXAwQgCAUgVAcIgGAjQgGASgRAJQABAMgJARQgLAUgBAJQACARgKASIgVAdQADAVgMAYIgWApQgCADgGAaQgEARgQAFIgCATQACAZgXAXIgJAWQAAATgJAVQgFALgNAYIgDAFIAAAAQgEAhgRAPIgJAMIgFAaQgFAPgLAHQgGALgdBDQgWAwgWAaQgDAHgDAPQgEANgLAEQgUAOAAAbQgKAKgLAgQgKAbgQAKQgBAUgTAeQgVAhgDAQQgBASgOAZQgTAggDAIQgEARgTATQgWAXgFAJIABABQgGAcgaAeQgFASgGAHQgJAKgQgCQAKAYgPAYQgUAagHAOIgfArQgLAogIAQQgPAegaAPQACAJgJgDQAJAWgOASQgUATgHALQgFALgDAGQgGAIgJADQgIAEgJASQgIAQgLAEQABAOgJANIgSAVQgHANgEAFQgHAJgKACQgDADgFAAQgCATgFAJQgGANgRACQACALgHAHQgDAEgNAGQgCAegbALQADAIgGAHIgKAMQgFARgUAQIgUAcQgJAYgWAQIgKAJQgTAmgcAXQgDAIgCADQgFAEgHgCQgHAjgeALIgTAVQABAFgDAEQgCALgKALIgRARIhuB5QAAAMgMAKQgRAOgCAEQgCAMgRAFQgHAHgxA/QghArgfATIgxAzQADAIgKAEIg0A1IgKAGQgPAZgiAPQgNAVgYATIgtAeIgSAVQgFANgRAHQgQAZgsAXQgGAQgIAHQgLAJgPgBQgBARgNALQgFAEgWAOIgmAYIgMASQgIALgMgBQgOAEgYAZQgWAWgTACQADAFgFADQgHANgNAFQgKAEgRAAIgKAJQgSAcgiALIgRAOQgLAHgMgCQgfAggdAIIgdAFQACALgGAHQgFAEgLAEIgVAIIgdANQgQAIgMADQgHACgFAAQgGAAgDgEgAS33PIgBgFIgCAEIADABg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:145.2,y:227.1}).wait(45));

	// grdt
	this.instance = new lib.Symbol1();
	this.instance.setTransform(43.6,-200,1,1,0,0,0,70.7,191.2);
	this.instance._off = true;

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:178.2,regY:238.3,x:151.1,y:-117.8},0).wait(1).to({y:-82.7},0).wait(1).to({y:-47.6},0).wait(1).to({y:-12.5},0).wait(1).to({y:22.6},0).wait(1).to({y:57.6},0).wait(1).to({y:92.7},0).wait(1).to({y:127.8},0).wait(1).to({y:162.9},0).wait(1).to({y:198},0).wait(1).to({y:233.1},0).wait(1).to({y:272.1},0).wait(1).to({y:311.2},0).wait(1).to({y:350.3},0).wait(1).to({y:389.4},0).wait(1).to({y:428.5},0).wait(1).to({y:467.6},0).wait(1).to({y:506.6},0).wait(1).to({y:545.7},0).wait(1).to({y:584.8},0).wait(1).to({y:623.9},0).wait(1).to({y:663},0).wait(1).to({y:702.1},0).wait(22));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.ROD4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rod (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AmWVSQgMgQAQgKQAXgPACgEQAKgGARgaQAPgXASgEQADgDAEgBIAOgcQgFgQAMgJIAXgOQAHghAKgTQAOgaAYgOQgGgVANgbQAUglABgGQAFgTALgZIAUgrIAQg1QAFgUADgKQAGgQAKgLIAVgyIAPgqQAKgYAOgOIAKgoIAHgLQgBgcAQgvQAPg0ACgXQASgbAPguIAYhNIAhiLQAEgyAOgeIABgKIAGglQAEgVAKgMIAbhnQAPg+AFgtQACgsADgbQAFgnALgeIACgSQgCgRALgPQAHhQAXg8QACgzAShDIAqksQgCgmATgsIABABQACgvAOgtQABgFACgFQgCgFAEgCIABgXQABgNAGgJQgDgDAEgCQABhlADglQgBgTABgKQACgQAOgIQAPgRAPAUQAXAygWA6IABABIgJAbIgBAAQASAUgFAbQgDAPgLAgQgKAHABAXQACAWgNAHQADAWgOAkQACAhgHAsIgOBMQgCAZgDAyQgDAsgMAdIgnDfQgKBUgfBpIAAAjQgBAUgIAOIgCAkQgCAUgGAOIgCATQAEA0ggA3QAAAigQAuQgXBCgDAOIAAALQgJAVgBAmIgFAlQgEAWgJAOQgIAPgHAnQgHAkgLARQgBAJACASQAAARgIAJQgHAbgbBCQgYA6gFAlQgBAIABAQQgCAOgRACQgBADgFAAQgBADABAVQAAAPgKAIIABAAIgfBTIgLATQACALgLAHQgCAHgCAQQgDAOgNAEQADAKgFALIgKASIgRAsIABACIgCACQAAAPgJAVQgLAagCAJQABAMgNAOQgPAPgBAJQABAOgHAOQgEAJgLAOIgIALQgCALgLALQgMALgFAGIgKAlQgJAUgUAFQABAVgNAIQgQAcgiAfQgUAUgFADQgWAQgFACQgGADgFAAQgKAAgHgJg");
	mask.setTransform(41.2,137.1);

	// grdt
	this.instance = new lib.Symbol1();
	this.instance.setTransform(43.6,-200,1,1,0,0,0,70.7,191.2);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:178.2,regY:238.3,x:151.1,y:-117.8},0).wait(1).to({y:-82.7},0).wait(1).to({y:-47.6},0).wait(1).to({y:-12.5},0).wait(1).to({y:22.6},0).wait(1).to({y:57.6},0).wait(1).to({y:92.7},0).wait(1).to({y:127.8},0).wait(1).to({y:162.9},0).wait(1).to({y:198},0).wait(1).to({y:233.1},0).wait(1).to({y:265.5},0).wait(1).to({y:297.9},0).wait(1).to({y:330.3},0).wait(1).to({y:362.7},0).wait(1).to({y:395.1},0).wait(1).to({y:427.6},0).wait(1).to({y:460},0).wait(1).to({y:492.4},0).wait(1).to({y:524.8},0).wait(1).to({y:557.2},0).wait(1).to({y:589.6},0).wait(1).to({y:622.1},0).wait(22));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,82.5,274.3);


(lib.ROD3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rod (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("An8XDQgDgCgQgPQgJgIAHgKQAFgIANgHQAJgTAVgCQAJgUAFgGQAKgMAPgDIALgSQAIgKAMABIAAAAIABAAQAMg/AvgcIgBgLQACgGAGgCQAKgPAOgiQAOgcAagIIARgcIABgDQgJgTAPgSQAUgXACgGQAGgaAZggQAHgMAMgoQAJghAQgPQgEgeAXgUQgFgNAKgKIAQgSQgBgXADgJQAGgQAUgEQgIgUAIgVIATgmIAIgZQAGgOAIgJQABgaARgaIAKgTIAxiBQADgSADgJQAFgOAQgDQgIgJACgKQACgGAIgLIAKgeQAEgiAPgRIALgTQABgkASgaIAnhwQAHgHACgKIADgTQgFgPAIgLIASgWQgEgQAGgSQADgKALgUIABgPQACgHAHgFIADgJQgCgUAKgLQgCgUALgQIACgEIACgTQgCgIAJgDQAHg2AWgvQABgcAKgOIAUhYQgCgFAEgDQgBgPABgHQACgNAGgIIAHg3QAFgfAJgXIAAgZQACgOAIgKIAAgVQABgNAHgIIADAGIABgBQgCgBgBgEQAAgdAJgkQAEgSAPguIANgoQACgfANgoIAYhEQADg6ACgRQAEgqAKgfQgHgsAKhDQANhbAAgSQACgiAGgeQAEgTAGgHQAKgKATAJQARAFgDAWIgIBYQgGAzgJAkQACAFgDADQAAAlgCASQgCAfgHAYQgCAhgCBBQgFA4gSAmQgIA0gNAaQAAAVgKALIgDASIgSA+IgGApQgFAYgIAPQACAegKAVIABADIgDADQgDA4gPAqIgCAFQgJAJgCAOIAAAZQgBAMABAZQAAAWgJAOQgLAFABAUQABATgMAFQAAAFABALQAAAKgKADIgVBZQAFAbgOAQQgLAOgEAjQgDAigOAOIgKAKIgIAUIAIAHIgHADQACAxgaAwQgIArgSAkIgCAEQgEAMgFAZQgGAVgPALQAAAFgBAFQAFAagYAOQAAAFgCAEQAFAagNAcIgcAvQgDAmgUAfQgCACgEAPQgEAMgJADIgBAcQgBAQgDAGQgFAMgLAFIgVA9QACAYgTAQQgBAdgZAqQgcAwgFAVQgBAggSAWQACALgLANQgMAOAAAIQADAVgOAIIgHAdQgGAQgMAIQgEAJgBATQgDARgQAEIABAAQAEAIgGAIIgKANQAFAOgIAOIgPAXIgTAeQgGAcgSAJQAAAUgTAMQgHAagTAPIgYAnQgDAQgPAPQgJAdgXATQgFAXgQAGQgEARgYAQQgEAJgIAIIgQANIgzAyQgJAKgKAAQgFAAgFgCgAh4NuIADAAIAAgCg");
	mask.setTransform(53.3,147.8);

	// grdt\
	this.instance = new lib.Symbol1();
	this.instance.setTransform(43.6,-200,1,1,0,0,0,70.7,191.2);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:178.2,regY:238.3,x:151.1,y:-110},0).wait(1).to({y:-67.1},0).wait(1).to({y:-24.2},0).wait(1).to({y:18.7},0).wait(1).to({y:61.6},0).wait(1).to({y:104.4},0).wait(1).to({y:147.3},0).wait(1).to({y:190.2},0).wait(1).to({y:233.1},0).wait(1).to({y:272},0).wait(1).to({y:310.9},0).wait(1).to({y:349.8},0).wait(1).to({y:388.7},0).wait(1).to({y:427.6},0).wait(1).to({y:466.5},0).wait(1).to({y:505.4},0).wait(1).to({y:544.3},0).wait(1).to({y:583.2},0).wait(1).to({y:622.1},0).wait(18));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,106.7,295.6);


(lib.ROD2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ROD (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_4 = new cjs.Graphics().p("Aj9bwQgJgBgIgLQgKgOAOgSIAtg3QAAgRAQgZIAHgXQAEgNAKgFIABgIIgDgHIABgDQgEgdAWgXIAJgeQAGgSAJgKQgDgOAGgOQADgKALgPIADgRIAKgqQAHgYALgQQAGg0APgbIAVhZIAGgzQAFgcAIgWIABgdQgEgMAGgKQAEgHAMgJQgNgPAHgVQAJgegBgGQgDgWAMgIIABgKIAKhhQAHg6AJglIACgmQgDgVACgLQADgRAQgJQgMgJAAgOQAAgJAGgPQADgGAIAEQAMAFADAAQAAgHgOgPQgMgNAIgNQgFgcAZgXIgCgJQgOgQAGgYQAKgaAAgNQACgXAGghIAKg4IACgpQACgWAHgRIAQiQQgBgJAEgHIAMhhQACiLAPhzIADgaQgDgeABgSQACgaAHgUIADguQgEgmAMgjIAAAAIACgSQgCgmABgTQACghASgUIgJgUIAKi0QgBglAAgTQAAggAIgYIADgbIAAgLIgBguQABgbAIgUIACgQQAIhwABidIABkOIADgVIAFgWQAGgNAKACQAGABALAJIAGAHIAAABIACADQANATgCAbQAAAHgJApIABAEQAAADgCACIgBAHIgJAWQADAFAKAJQAGAJgLAIQgLAJAGALQAHAQAAACIAEAVQABAMgFAIIgBAeQAOAMgJAWQgKAYAGAJIgHAEIAAAAIADADQADgCABgFQAIAJgFAMQgFAQABAFQAHANgCARIgFAeIAAAqQAAAYgIAQQAAAEgDADQgIAUADApQADApgHATQgBAHABAjQACAZgLAPQACADgCAFQAJATgBAWQgBARgIAXIgBAnQADB3gVB8IgLARQAAADAGAGQAFAGgCAGIAAAmQABAXgHAOQAAACgDADIABA1QgCAegGAWQAAAEgCADIgMCyIABA0QAAAegHAVQABAEgDAEIgCA6QgCAwgRBHIAAATIAAAgQgBASgIAMIgRApQgHAXAPAVQADAFgCAIQgDAIgIADIgCAUQADAggGAoQgCAUgLA0QAAAKgDAIIgKAyQADAEgEADIABAXQgBANgIAHIgCAcIABAmQAAAXgJAPIgDAiQAEAcgMAaIACADIgCADIgCAdIgEAbQgEAPgLAIQAGArgHAcIAAAaQgBAPgIAJIgKAdIADAhQgBATgKAMIgKBEQADAEgFAFQgEAJgBAbQgBAZgKALIgCgHIgCAAIADAHQACAagGAeQgEATgMAiQgBAegSAVQADAFgEADQgCAIACARQgBAPgKAIQgDAEgFgBQAEAYgIAbQgEANgPAiQgCARgEAJQgHAMgPAEQABAFgBAEQADARgHATQgEAMgLAWQACAVgPAcQABAKgGAJIgNAOIgBAPQgDAIgHAEIAAABIAAAAQgFARgPARIgdAcQgJAIgJAAIgCAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(4).to({graphics:mask_graphics_4,x:27.6,y:177.7}).wait(41));

	// GRDT
	this.instance = new lib.Symbol1();
	this.instance.setTransform(43.6,-200,1,1,0,0,0,70.7,191.2);
	this.instance._off = true;

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).wait(1).to({regX:178.2,regY:238.3,x:151.1,y:-117.8},0).wait(1).to({y:-82.7},0).wait(1).to({y:-47.6},0).wait(1).to({y:-12.5},0).wait(1).to({y:22.6},0).wait(1).to({y:57.6},0).wait(1).to({y:92.7},0).wait(1).to({y:127.8},0).wait(1).to({y:162.9},0).wait(1).to({y:198},0).wait(1).to({y:233.1},0).wait(1).to({y:265.5},0).wait(1).to({y:297.9},0).wait(1).to({y:330.3},0).wait(1).to({y:362.7},0).wait(1).to({y:395.1},0).wait(1).to({y:427.6},0).wait(1).to({y:460},0).wait(1).to({y:492.4},0).wait(1).to({y:524.8},0).wait(1).to({y:557.2},0).wait(1).to({y:589.6},0).wait(1).to({y:622.1},0).wait(18));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.ROD1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// rod (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AmqdWQgKgjALgjQAJgaAYgkQADgoAQgeQgCgQAGgQQADgKALgTIANgUQgDgNAIgNIAOgXQgBgDAAgGQgFgSAHgUQAFgOANgTIAAgBQAEgmAZg2QgBgEADgEQAAgNAHgRQAKgUADgKQgBgFADgEIANhIQAJgqAUgZIgCgLQACgkAMgtIAXhPIABgbQABgOAKgJQACgcACgKQAEgUAJgPQACgbADgNQAFgWAUgJQgbgeAmgQQAOgKgIgZQgHgaANgJQAEgfAFgRQAHgZAPgSQgEgSAAgIQABgOAJgLQAJh0AqiFIACgTIALhCQAIgmAKgbIAShQQACguAPglIACgGQAAgpAUg8QAEgyAQgeQgHgfARgbQgBgTABgIQACgPAIgLQgDgEAEgCQABgzASgqQAAgfALgQIABgaQACgPAHgJIABgLQgDgMAGgSQAHgXAAgGQgBg2AUglIABgWQABgNAGgIIADglIAKgnQgDgIAIgEIAEgeQACgTAIgKIAUhPQgBgYAGgeIAOg4IAHglQgBgDAEgPQgBgeABgOQACgZAHgSQgDgFAFgDIAMh4QgFgqANgdIgBAAIAAg8QACgiAHgaIADgnQADgfACgPQAFgaAJgTQACg7ARgrQgDgEAEgDIAGgtIAIgsQAEgRAGgIQAJgLAQADQAOADADANQACAJgDAQIgXBvIgGgCIAAABQADACADgBQgDA0gTA6IAAAbQgBAQgIAKQACAFgDACQgCAFACAbQACAUgLALIACA2QgBAegNAWQAHAVgCAdIgFAyQAJAcgTAhQAAAfgJAjQgIAkgKAKQgBAGAIARQAHAOgIAKIgSAfQAUAQgTANIAEAQQABAIgFAHQgNARgCAfQgEAsgCAHQgBAHgBAOQgBAMgIAHQgBAJACARQAAAQgJAJQgBAzgTAyQABAcgKAOQABAkgMAVQgFA4gNAbQAAAEgDADQAAAhgKArQgFAZgOAxQADAjgNAYIgKAeQgBA3gPAtQgBAHgEAEQACAXgOAhQgQAngCAPQAIALABAEQABAIgKAGQgFAIADAUQAEATgMAJQgCAEgFAAQABAIAGAQQADAOgNAJQgKAMACAeQACAdgNAMQACAFgEADQAEAPgMAQIgBATIgUBRIgIAKQgDAIABAcQABAWgJAMQACAIgFAIIgKANQgDBRgfBvQgDAFABAUQAAAPgMAGQgGADgBAHIgCANQgBAYgDANQgEAVgKAOIgDAcQgCAagQAYQADAcgNAPIgBAZQgBAOgIAJIgLAdQAEAKgIAPQgJAQACAIQADAlgUAkIgBARQgBAKgJAEIgBAbQABAfgUAfQACAEgEADQAEArgWAnQgBAggFAPQgHAZgSAPQgGAQgHAlQgGAjgHASQgEALgFADQgFADgKgBQADADgCAEQAIAlgNAnQgJAcgZAoQgBApgIAbQgKAjgXAaQAEASgIAXIgQAnQgDAVgKAGQgEADgFAAQgJAAgMgIgAiuPaIADACIABgCIAAgBIgDgCgAE81IIAEgDIgEgCgAGX7EgAGX7Eg");
	mask.setTransform(43.2,188.6);

	// GRDT
	this.instance = new lib.Symbol1();
	this.instance.setTransform(43.6,-200,1,1,0,0,0,70.7,191.2);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:178.2,regY:238.3,x:151.1,y:-117.8},0).wait(1).to({y:-82.7},0).wait(1).to({y:-47.6},0).wait(1).to({y:-12.5},0).wait(1).to({y:22.6},0).wait(1).to({y:57.6},0).wait(1).to({y:92.7},0).wait(1).to({y:127.8},0).wait(1).to({y:162.9},0).wait(1).to({y:198},0).wait(1).to({y:233.1},0).wait(1).to({y:265.5},0).wait(1).to({y:297.9},0).wait(1).to({y:330.3},0).wait(1).to({y:362.7},0).wait(1).to({y:395.1},0).wait(1).to({y:427.6},0).wait(1).to({y:460},0).wait(1).to({y:492.4},0).wait(1).to({y:524.8},0).wait(1).to({y:557.2},0).wait(1).to({y:589.6},0).wait(1).to({y:622.1},0).wait(22));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,86.5,377.3);

})(animations.magnetisedTrees.lib, animations.magnetisedTrees.images, createjs);

function _(str) {
    return document.querySelector(str);
}


var capabilities = (function(w, $, undefined) {

    var mod = {
        aspectRatio: 1900 / 1050,
        supportsTouch: false,
        innerHeight: 0,
        innerWidth: 0,
        orientation: 'landscape',
        level: 0,

        calcSupportsTouch: function() {
            return ('ontouchstart' in w) || (w.DocumentTouch && document instanceof DocumentTouch);
        },
        calcOrientation: function() {
            return (this.innerWidth / this.innerHeight) > 1.2 ? 'landscape' : 'portrait';
        },
        calcAspectRatio: function() {
            return (this.orientation === 'landscape') ? (1900 / 1050) : (1050 / 1900);
        },
        /*
                Do a few checks on screen size and touch abilities to allocate a level to the current device. This will be used to determine
                what gets loaded when.

                Need to further refine the levels.
            */
        getEnhancementLevel: function() {
            // small screen
            var level = 0;

            // small to mid screens
            if (w.innerWidth >= 480)
                level = 1;

            // ~ iPad portrait (mid screens) or Nexus 7 ()
            if (w.innerWidth >= 768 && this.supportsTouch)
                level = 2;

            // ~ Nexus 7 landscape (mid screens)
            if (w.innerWidth >= 960 && this.supportsTouch)
                level = 3;

            // Desktop
            if (w.innerWidth >= 768 && !this.supportsTouch)
                level = 4;


            return level;
        },
        getDisplaySettings: function() {
            this.innerWidth = w.innerWidth;
            this.innerHeight = w.innerHeight;

            this.orientation = this.calcOrientation();
            this.supportsTouch = this.calcSupportsTouch();
            this.level = this.getEnhancementLevel();
        },
        init: function() {
            w.addEventListener('resize', (this.getDisplaySettings).bind(this), false);
        }
    };

    mod.getDisplaySettings();
    mod.init();

    return mod;

}(this, jQuery));



var Pathways = (function(w, _, sys, $, undefined) {

    'use strict';

    var doc = w.document,

        isMuted = false,
        minHeight = 550,
        muteButton,
        globalAudio,

        panelVideos,
        panelTracks,

        startPanel,
        panels,
        ratioedPanels,

        scenesLoaded = false,
        componentsLoaded = false,

        sceneController,

        panelHeightDecreased = false,

        mod = {
            MIN_COMPONENT_LEVEL: 2,
            MIN_SCROLL_LEVEL: 4,
            panelHeight: calcPanelHeight(minHeight),
            getPanelHeight: function() {
                return this.panelHeight;
            }
        };

    function calcPanelHeight(oldHeight) {
        var newHeight = sys.innerHeight < minHeight ? minHeight : sys.innerHeight;

        if (oldHeight > newHeight) {
            panelHeightDecreased = true;
        } else {
            panelHeightDecreased = false;
        }


        return newHeight;
    }

    function camelCase(str) {
        str = str || '';
        return str.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    }

    function toTitleCase(str) {
        str = str || '';
        str = str.replace(/-/g, ' ').replace(/_/g, ' ');
        str = str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1);
        });
        return str.replace(/\W/g, '');
    }

    function positionCenter($elm) {
        var width = $elm.width(),
            height = $elm.height(),

            top = (sys.innerHeight / 2) - (height / 2),
            left = (sys.innerWidth / 2) - (width / 2);

        $elm.css({
            position: 'absolute',
            top: top,
            left: left
        });
    }



    function initPanel(panel) {

        var $panel = $(panel),
            data = $panel.attr('data-config'),
            bg = $panel.find('.bg-container').get(0),
            configData = {};

        if (data) configData = JSON.parse(data);

        return {
            elem: panel,
            config: configData,
            bg: bg
        };
    }

    function initPanels(panelSelector) {
        var $panels = $(panelSelector),
            panels = [];

        $panels.each(function(index, panel) {
            panels.push(initPanel(panel));
        });
        return panels;
    }

    function initRatioedPanels(panels) {
        var rPanels = [];
        for (var i = 0; i < panels.length; i++) {
            var preserveRatio = panels[i].config.background.preserve_ratio;

            if (preserveRatio) {
                rPanels.push(panels[i]);
            }
        }
        return rPanels;
    }


    function loadComponents(context, height) {
        var $components = $('[data-component]');

        $components.each(function(index, component) {

            var $component = $(component),
                handlerName = $component.attr('data-component'),
                id = camelCase($component.attr('id')),
                handlerClass = camelCase(handlerName),
                method = context[handlerClass],
                data;

            if (typeof method === 'undefined') return console.warn('Could not load the necessary component: ' + handlerClass);

            if (id && method[id] && method[id].data) data = method[id].data;

            method(component, data);
        });
    }



    function setElementHeight(el, height) {
        $(el).css('height', parseInt(height, 10) + 'px');
    }

    function unSetElementHeight(el) {
        $(el).css('height', '');
    }

    function translatePanelElem(_el, currentHeight) {

        var newHeight = sys.innerWidth / sys.aspectRatio,
            prefixes = ['-moz-', '-webkit-', ''],
            y = parseInt(((currentHeight - newHeight) / 2), 10);

        if (currentHeight > newHeight) {
            for (var p = 0; p < prefixes.length; p++) {
                _el.style[prefixes[p] + 'transform'] = 'translate(0, ' + y + 'px)';
            }
        }
    }

    function unTranslatePanelElem(_el) {
        var prefixes = ['-moz-', '-webkit-', ''];

        for (var p = 0; p < prefixes.length; p++) {
            _el.style[prefixes[p] + 'transform'] = '';
        }
    }

    function unsizePanels(panels) {
        if (startPanel) unSetElementHeight(startPanel);

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem,
                _bg = panels[i].bg;

            $(_panel).removeAttr('style');
            $(_bg).removeAttr('style');

            //unSetElementHeight(_panel);
            //unSetElementHeight(_bg);

            var preserveRatio = panels[i].config.background.preserve_ratio;

            if (preserveRatio) {
                $(_panel).children().each(function(index, child) {
                    $(child).removeAttr('style');
                    //unSetElementHeight(child);
                    //unTranslatePanelElem(child);
                });
            }
        }
    }

    function resizePanel(panel, panelHeight) {
        var _panel = panel.elem;

        unSetElementHeight(_panel);

        var config = panel.config,
            _bg = panel.bg,

            currentHeight = _panel.offsetHeight,
            offset = config ? ((sys.supportsTouch || !config.offset_height) ? 0 : config.offset_height) : 0,
            largerHeight = currentHeight < panelHeight ? panelHeight : currentHeight;

        if (largerHeight !== currentHeight || offset) {
            setElementHeight(_panel, (largerHeight + offset));
        }

        if (_bg) setElementHeight(_bg, panelHeight);
    }

    function resizePanelChild(index, child) {
        var newHeight = sys.innerWidth / sys.aspectRatio;
        setElementHeight(child, newHeight);
        translatePanelElem(child, mod.panelHeight);
    }

    function resizePanels(startPanel, panels) {

        if (startPanel) setElementHeight(startPanel, mod.panelHeight);

        for (var i = 0; i < panels.length; i++) {
            resizePanel(panels[i], mod.panelHeight);

            var preserveRatio = panels[i].config.background.preserve_ratio;
            if (preserveRatio) {
                $(panels[i].elem).children().each(resizePanelChild);
            }
        }
    }

    function removeScrollSceneStyling() {

        if (startPanel) $(startPanel).removeAttr('style');
        $('.comic-panel').removeAttr('style');

        for (var i = 0; i < panels.length; i++) {
            var panel = panels[i],
                $bg = $(panel.bg),
                $panel = $(panel.elem),
                panelID = $panel.attr('id'),
                $library_panel = $panel.find('[data-panel="' + panelID + '"]').first(),
                $gallery = $panel.find('[data-component="gallery"]'),
                $quiz = $panel.find('[data-component="quiz"]');

            $bg.removeAttr('style');
            $library_panel.removeAttr('style');
            $gallery.removeAttr('style');
            $quiz.removeAttr('style');

        }
    }



    function initMuteButton(muteSelector) {
        var $btn = $(muteSelector);
        $btn.css('display', 'block');
        $btn.unbind('click');
        $btn.on('click', function(e) {
            // active == muted
            if ($(this).hasClass('active')) {
                setPathwaysMuted(false);
            } else {
                setPathwaysMuted(true);
            }

            updateButtonView();

            e.preventDefault();
            return false;
        });

        return $btn;
    }


    function setPathwaysMuted(value) {
        isMuted = value;

        $('video, audio').each(function() {
            this.muted = isMuted;
        });

    }


    function initPanelVideo(panels, videoSelector) {

        var videos = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _video = _panel.querySelector(videoSelector);

            if (_video) {

                _video.addEventListener('volumechange', function(e) {
                    if (this.muted == isMuted) return;
                    setPathwaysMuted(this.muted);
                    updateButtonView();
                });

                _video.addEventListener('error', function(e) {
                    console.warn('Video loading error for ', _video.src);
                });

                if (sys.level >= mod.MIN_SCROLL_LEVEL) {
                    _video.setAttribute('preload', 'auto');
                } else {
                    _video.setAttribute('preload', 'metadata');
                    _video.controls = true;
                }

                videos.push(_video);
            }

        }

        return videos;

    }

    function hideCaptions(videos) {
        var video;
        for (var i = 0, l = videos.length; i < l; i++) {
            video = videos[i];
            if (video) {
                var tracks = video.textTracks;
                if (tracks.length) {
                    for (var j = 0, m = tracks.length; j < m; j++) {
                        var track = tracks[j];
                        if (track) track.mode = 'hidden';
                    }
                }
            }
        }
    }

    function crossFade(fromAudio, toAudio, callback) {
        var delay = 1000;
        var onlyFrom = (fromAudio && !toAudio);

        if (fromAudio === toAudio) {
            if (callback) w.setTimeout(callback, delay);
            return;
        }

        if (fromAudio && (typeof fromAudio !== 'undefined')) {
            $(fromAudio).stop(false, true);
            $(fromAudio).animate({
                volume: 0
            }, {
                duration: delay,
                complete: function() {
                    this.pause();
                    if (onlyFrom && callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }

        // fade in
        if (toAudio && (typeof toAudio !== 'undefined')) {
            $(toAudio).stop(false, true);
            toAudio.volume = 0;
            toAudio.muted = isMuted;
            toAudio.play();
            $(toAudio).animate({
                volume: 1
            }, {
                duration: delay,
                complete: function() {
                    if (!onlyFrom && callback) {
                        callback();
                        callback = null;
                    }
                }
            });
        }
    }

    // Cross fade between panel audio and global audio
    function loadPanelAudio(panel_audio) {
        crossFade(globalAudio, panel_audio);
    }

    function unloadPanelAudio(panel_audio) {
        crossFade(panel_audio, globalAudio);
    }


    function updateButtonView() {
        if (isMuted) {
            muteButton.addClass('active');
        } else {
            muteButton.removeClass('active');
        }
    }

    function initPanelAudioTracks(panels, selector) {

        var tracks = [];

        for (var i = 0; i < panels.length; i++) {
            var _panel = panels[i].elem;
            var _track = _panel.querySelector(selector);
            if (_track) {
                tracks.push(tracks);
            }
        }

        return tracks;
    }

    function initGlobalAudio(selector) {
        var audio = $(selector).get(0);
        if (audio) {
            crossFade(null, audio);
        }

        return audio;
    }




    function getCrossFadeAudio(value, gAudio) {
        var audio = null;
        if (value || (typeof value == 'undefined')) {
            audio = gAudio;
        }
        return audio;
    }

    function autoPlayVideoOnEnter(video, initTime, stopGlobalAudio) {
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(stopGlobalAudio, globalAudio);

        if (video) {
            if (video.readyState !== 0) video.currentTime = initTime;
            crossFade(fadeAudio, video);
        }

    }

    function autoStopVideoOnLeave(video, initTime, restartGlobalAudio) {
        initTime = initTime || 0;
        var fadeAudio = getCrossFadeAudio(restartGlobalAudio, globalAudio);

        if (video) {

            crossFade(video, fadeAudio, function() {
                if (video.readyState !== 0) video.currentTime = initTime;
            });
        }

    }

    function getPanelVideoElement(panelID) {
        return _(panelID + ' video');
    }

    function getPanelAudioElement(panelID) {
        return $(panelID + ' audio').first()[0];
    }


    function initSoundControls() {
        muteButton = initMuteButton('.mute');
    }

    function initVideo(panels) {
        panelVideos = initPanelVideo(panels, 'video');
        hideCaptions(panelVideos);
    }

    function initAudio(panels) {
        globalAudio = initGlobalAudio('[data-audio="global"]');
        panelTracks = initPanelAudioTracks(panels, '[data-audio="panel"]');
    }

    var panelsUnsized = false;

    function resizeCheck() {
        if (sys.level < mod.MIN_COMPONENT_LEVEL) {
            unsizePanels(panels);
            panelsUnsized = true;
        } else if (sys.level >= mod.MIN_COMPONENT_LEVEL && sys.level < mod.MIN_SCROLL_LEVEL) {
            resizePanels(null, ratioedPanels);
            panelsUnsized = false;
        } else if (sys.level >= mod.MIN_SCROLL_LEVEL) {
            resizePanels(startPanel, panels);
            panelsUnsized = false;
        }
    }

    function loadCheck(onScrollLoad, onScrollUnload) {
        mod.panelHeight = calcPanelHeight(mod.panelHeight);

        // If it's iPad width or larger, load the components
        if (!componentsLoaded) {
            if (sys.level >= mod.MIN_COMPONENT_LEVEL) {
                loadComponents(mod.components);
                componentsLoaded = true;
            }
        } else {
            if (sys.level < mod.MIN_COMPONENT_LEVEL) {
                // unload components
            }
        }

        if (!scenesLoaded) {
            // If it's a non-touch device, load the scenes.
            if (sys.level >= mod.MIN_SCROLL_LEVEL) {
                sceneController = onScrollLoad();

                initSoundControls();
                initAudio(panels);

                scenesLoaded = true;
            }
        } else {
            if (sys.level < mod.MIN_SCROLL_LEVEL) {
                sceneController.destroy(true);
                removeScrollSceneStyling();
                onScrollUnload();

                $('audio, video').each(function() {
                    this.muted = true;
                });
                muteButton.hide();

                scenesLoaded = false;
            }
        }

    }

    function init(onLoadComplete, onScrollLoad, onScrollUnload) {

        startPanel = $('.start').get(0);
        panels = initPanels('.panel');
        ratioedPanels = initRatioedPanels(panels);

        resizeCheck();

        w.addEventListener('resize', function() {
            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);
        });

        // Now run the other logic on window load, (so scripts, images and all that jazz has now loaded)
        w.addEventListener('load', function() {

            resizeCheck();
            loadCheck(onScrollLoad, onScrollUnload);

            initVideo(panels);

            onLoadComplete();
        });

    }

    mod.init = init;

    mod.getPanelAudioElement = getPanelAudioElement;
    mod.getPanelVideoElement = getPanelVideoElement;

    mod.autoPlayVideoOnEnter = autoPlayVideoOnEnter;
    mod.autoStopVideoOnLeave = autoStopVideoOnLeave;

    mod.loadPanelAudio = loadPanelAudio;
    mod.unloadPanelAudio = unloadPanelAudio;

    mod.translatePanelElem = translatePanelElem;

    mod.Scene = {};
    mod.components = {};

    mod.Utils = {
        toTitleCase: toTitleCase,
        positionCenter: positionCenter
    };

    return mod;

}(this, _, capabilities, jQuery));

// Global Nav
(function(w, $) {
    "use strict";

    var $nav = $('.global-navigation'),
        $nav_handle = $nav.find('.handle'),
        state = 'open',
        navHeight = $nav.outerHeight(),
        handleHeight = $nav_handle.outerHeight();

    $nav.on('click', '.handle', function() {
        navHeight = $nav.outerHeight();

        if (state == 'open') {
            $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
            state = 'closed';
        } else {
            $nav.css('transform', 'translate(0, 0)');
            state = 'open';

            // add an event listener on scroll to close the nav if open.
            $(w).one('scroll', function() {
                $nav_handle.trigger('click');
            });
        }
    });

    w.addEventListener('resize', function() {
        navHeight = $nav.outerHeight();
        $nav.css('transform', 'translate(0, ' + -(navHeight - handleHeight) + 'px)');
    });

    w.setTimeout(function() {
        $nav_handle.trigger('click');
    }, 1000);


    /*
        Events
    */

    // put this here for now.
    $('.comic-quote').on('click', '.info-box', function() {
        var $this = $(this),
            $parent = $this.parent();

        if ($parent.hasClass('active')) {
            $parent.removeClass('active');
        } else {
            $parent.addClass('active');
        }
    });

    // Open links marked with rel="external" in a new window/tab
    $('.library-panel').on('click', '[rel="external"]', function(e) {
        var $this = $(this);

        w.open($this.attr('href'));

        e.preventDefault();
    });

}(window, $));




// Init Animations
(Pathways.initAnimation = function(w, doc, anim, cjs, Mod) {
    "use strict";

    return function(id) {
        var canvas = doc.getElementById(id), a = anim[id];

        if (!canvas) return console.warn('No canvas with id \''+ id +'\' found');
        if (!a) return console.warn('No animation properties with id \''+ id +'\' found');

        function initCanvas() {
            var lib = a.lib;

            var loader = new cjs.LoadQueue(false);
            loader.addEventListener("fileload", handleFileLoad);
            loader.addEventListener("complete", handleComplete);
            loader.loadManifest(lib.properties.manifest);
        }

        function handleFileLoad(evt) {
            var images = a.images;
            if (evt.item.type == "image") {
                images[evt.item.id] = evt.result;
            }
        }

        function handleComplete() {
            var lib = a.lib,
                exportRoot = new lib.tree2(),
                stage = new cjs.Stage(canvas);

            a.stage = stage;

            stage.addChild(exportRoot);
            stage.update();

            cjs.Ticker.setFPS(lib.properties.fps);

            if (Mod.touch) {
                cjs.Ticker.addEventListener("tick", stage);
            }
        }

        if (w.innerWidth >= 768) {
            initCanvas();
        }
    };


}(window, document, animations, createjs, Modernizr));
Pathways.initAnimation('magnetisedTrees');




// Init Global ScrollScenes
(function(w, $, p, Sm, Ss, Mod, Tm) {

    "use strict";

    var $parallaxContent = $('.start').find('.content').first();
    var $parallaxLady = $('.start').find('.falling-lady').first();

    function parallaxContentLoad() {
        var scrollY = w.pageYOffset,
            unit = 0.5 / (p.panelHeight / 2);

        if ($parallaxContent) {
            if (scrollY > p.panelHeight) {
                $parallaxContent.css('display', 'none');
                return;
            }

            $parallaxContent.css({
                'display': 'block',
                'opacity': 1 - (unit * scrollY),
                'transform': Mod.csstransforms3d ? 'translate3d(0,' + (scrollY / 2) + 'px,0)' : 'translate(0,' + (scrollY / 2) + 'px)'
            });
        }
    }

    function parallaxContentUnload() {
        $parallaxContent.removeAttr('style');
    }

    function parallaxLadyLoad() {
        var scrollY = w.pageYOffset,
            $parallaxLady = $('.falling-lady').first();

        if ($parallaxLady) {
            if (scrollY > p.panelHeight)
                return;

            $parallaxLady.css({
                'transform': Mod.csstransforms3d ? 'translate3d(0,' + (scrollY * 0.7) + 'px,0)' : 'translate(0,' + (scrollY * 0.7) + 'px)'
            });
        }
    }

    function parallaxLadyUnload() {
        $parallaxLady.removeAttr('style');
    }

    function onScrollUnload() {

        if ($parallaxContent) {
            parallaxContentUnload();
            w.removeEventListener('scroll', parallaxContentLoad, false);
        }

        if ($parallaxLady) {
            parallaxLadyUnload();
            w.addEventListener('scroll', parallaxLadyLoad, false);
        }
    }


    function onScrollLoad() {

        var $sequence = $('.sequence'),
            controller = new Sm({ refreshInterval: 500}),
            $blackStrip = $('.black-strip');

        function resizeBlackStrip(e) {
            $blackStrip.css({
                position: 'fixed',
                'height': p.panelHeight,
                'transform': 'translate(0,' + p.panelHeight + 'px)'
            });
        }

        resizeBlackStrip();
        w.addEventListener('resize', resizeBlackStrip);

        function getValueFromConfig(rawConfig, name) {
            var config;
            if (rawConfig) config = JSON.parse(rawConfig);
            return (config && config[name]) || null;
        }



        /**************
            Scenes
        **************/

        var scenes = [],
            idx = 0;

        // Start panel

        if ($parallaxContent) {
            w.addEventListener('scroll', parallaxContentLoad, false);
        }


        // Svengali
        if ($parallaxLady) {
            w.addEventListener('scroll', parallaxLadyLoad, false);
        }


        /**************
            Sequence
         **************/

        if ($sequence) {
            var $bgs = $sequence.find('.bg-container'),
                $first_panel = $sequence.find('.panel').first(),
                $last_panel = $sequence.find('.panel').last();

            scenes[idx++] = new Ss({
                    triggerElement: $sequence,
                    triggerHook: 'top',
                    duration: function() {
                        return ($sequence.height() - p.panelHeight);
                    }
                })
                .on('enter', function(e) {
                    $bgs.css({
                        display: 'block'
                    }); // To fix layering when reloading
                    if (e.scrollDirection == 'FORWARD') {
                        $bgs.css({
                            position: 'fixed',
                            display: 'none',
                            opacity: 0
                        });
                        $first_panel.find('.bg-container').css({
                            display: 'block',
                            opacity: 1
                        });
                    }
                    if (e.scrollDirection == 'REVERSE') {
                        $bgs.css({
                            position: 'fixed'
                        });
                    }
                })
                .on('leave', function(e) {
                    $bgs.css({
                        position: 'absolute',
                        display: 'block'
                    });
                });
        }

        // Panels & Components

        $('[data-component="gallery"]').hide();
        $('[data-component="quiz"]').hide();

        var $panels = $('.sequence .panel'),
            panel_total = $panels.length,
            panel_count = 0;

        $panels.each(function() {
            var $this = $(this),
                panelID = $this.attr('id'),
                $bg = $this.find('.bg-container'),
                $library_panel = $('[data-panel="' + panelID + '"]').first(),
                $gallery = $this.find('[data-component="gallery"]'),
                $quiz = $this.find('[data-component="quiz"]'),
                $panelAudio = $this.find('[data-audio="panel"]'),
                $panelVideo = $this.find('[data-video="panel"]'),

                tween = Tm.to($bg, 1, {
                    opacity: 1
                });

            panel_count += 1; // for tracking first and last panels (when logic needs to differ because of the lack of cross-fading)

            function getMediaDuration() {
                return $this.outerHeight();
            }

            function getTweenDuration() {
                return p.panelHeight / 4;
            }

            function getComponentDuration(offset) {
                return function() {
                    return (($this.outerHeight() * 0.75) - offset);
                };
            }

            function getLibPanelDuration() {
                var h = $this.outerHeight();
                return (panel_count == panel_total) ? (h * 0.75) : (h - 300);
            }
                /*
                    I can't entirely explain why we need to set the bg to block on both enter and leave. But it fixes
                    a layering issue when loading the page during or after a sequence. SCIENCE!
                */
                // Panels
            scenes[idx++] = new Ss({
                    triggerElement: $this,
                    duration: getTweenDuration
                })
                .on('enter', function() {
                    $bg.css('display', 'block');
                })
                .on('leave', function() {
                    $bg.css('display', 'block');
                })
                .setTween(tween);

            // Galleries
            if ($gallery.length) {
                var g_offset = getValueFromConfig($gallery.attr('data-config'), 'offset_height') || 0;
                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        triggerHook: 'top',
                        duration: getComponentDuration(g_offset),
                        offset: g_offset
                    })
                    .on('enter', function() {
                        $gallery.css({
                            position: 'fixed',
                            display: 'block'
                        });
                        setTimeout(function() {
                            $gallery.addClass('active');
                        }, 50);
                    })
                    .on('leave', function() {
                        $gallery.css({
                            position: 'absolute',
                            display: 'none'
                        });
                        setTimeout(function() {
                            $gallery.removeClass('active');
                        }, 50);
                    });
            }

            // Quiz
            if ($quiz.length) {
                var q_offset = getValueFromConfig($quiz.attr('data-config'), 'offset_height') || 0;
                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        triggerHook: 'top',
                        duration: getComponentDuration(q_offset),
                        offset: q_offset
                    })
                    .on('enter', function() {
                        $quiz.css({
                            position: 'fixed',
                            display: 'block'
                        });
                        setTimeout(function() {
                            $quiz.addClass('active');
                        }, 50);
                    })
                    .on('leave', function() {
                        $quiz.css({
                            position: 'absolute',
                            display: 'none'
                        });
                        setTimeout(function() {
                            $quiz.removeClass('active');
                        }, 50);
                    });
            }

            // Library panels
            if ($library_panel.length) {
                $library_panel.css('transform', 'translate(' + ($library_panel.outerWidth()) + 'px, ' + ($library_panel.outerHeight() - 60) + 'px)');

                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        duration: getLibPanelDuration,
                        offset: 100
                    })
                    .on('enter', function() {
                        $library_panel.css({
                            position: 'fixed',
                            display: 'block'
                        });
                    })
                    .on('leave', function() {
                        $library_panel.css({
                            position: 'absolute',
                            display: 'none'
                        });
                    });
            }


            // Audio
            //
            if ($panelAudio.length) {
                var $audio = $panelAudio.first();

                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        duration: getMediaDuration
                    })
                    .on('enter', function() {
                        p.loadPanelAudio($audio[0]);
                    })
                    .on('leave', function() {
                        p.unloadPanelAudio($audio[0]);
                    });
            }

            // Video
            //
            if ($panelVideo.length) {
                var $video = $panelVideo.first(),
                    rawConfig = $video.attr('data-config'),
                    initTime = getValueFromConfig(rawConfig, 'initTime') || 0,
                    muteGlobal = getValueFromConfig(rawConfig, 'muteGlobal') || true;

                scenes[idx++] = new Ss({
                        triggerElement: $this,
                        duration: getMediaDuration
                    })
                    .on('enter', function() {
                        p.autoPlayVideoOnEnter($video[0], initTime, muteGlobal);
                    })
                    .on('leave', function() {
                        p.autoStopVideoOnLeave($video[0], initTime, muteGlobal);
                    });
            }

            // Panel specific scene code if it has any
            var handlerClass = p.Utils.toTitleCase(panelID),
                panelMethod = p.Scene[handlerClass];

            // Check the handler exists, then load
            if (typeof panelMethod !== 'undefined') {
                controller.addScene(panelMethod('#' + panelID));
            }
        });

        controller.addScene(scenes);

        return controller;
    }

    function onPathwaysLoad() {

        function initScript(d, s, id, a) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.async = 1;
            js.src = a;
            fjs.parentNode.insertBefore(js, fjs);
        }

        w.___gcfg = {
            parsetags: 'onload'
        };

        initScript(document, 'script', 'facebook-jssdk', "//connect.facebook.net/en_GB/sdk.js#xfbml=1&appId=1494497634145827&version=v2.0");
        initScript(document, 'script', 'pth-ga-api', "//apis.google.com/js/platform.js");
        initScript(document, 'script', 'pth-pin-api', "//assets.pinterest.com/js/pinit.js");
        initScript(document, 'script', 'pth-twt-api', "//platform.twitter.com/widgets.js");
    }

    Pathways.init(onPathwaysLoad, onScrollLoad, onScrollUnload);

}(window, jQuery, Pathways, ScrollMagic, ScrollScene, Modernizr, TweenMax));


Pathways.components.audioPlayer = function(element, data) {
    var self            = this,
        $player         = $(element),
        $progress_bar   = $player.find('.progressed'),
        $time_left      = $player.find('.time-left span'),
        playing         = false;

    var src     = $player.data('src'),
        track   = new Audio(src);

    $player.on('click', '.controls', function() {
        if( playing ) {
            track.pause();
            $(this).removeClass('active');
            playing = false;
        }
        else {
            track.play();
            $(this).addClass('active');
            playing = true;
        }
    });

    track.addEventListener('timeupdate', function () {
        var remaining = parseInt(track.duration - track.currentTime);

        $progress_bar.css('width', (track.currentTime * (100 / track.duration) + '%' ));
        $time_left.html( self.secondsToMinutes(remaining) );
    });

    this.secondsToMinutes = function(seconds) {
        var mins        = Math.floor( seconds / 60 ),
            remainder   = seconds % 60;

        if( remainder < 10 )
            remainder = '0' + remainder;

        return mins + '.' + remainder;
    };
};

Pathways.components.cropZoom = function(element, data) {

    var $elem = $(element),
        $elm = $elem.find('.crop-zoom'),
        db = data,
        url = '';

    if (typeof db === 'undefined') console.warn('No data supplied to cropZoom component for' + $elem.attr('id'));

    $elm.css({
        position: 'absolute',
        opacity: Modernizr.touch ? 1 : 0,
        width: window.innerWidth,
        'z-index': 10
    });

    window.addEventListener('resize', function() {
        $elm.css({
            'width': window.innerWidth
        });
    });

    // Tap targets
    $elm.find('.tap-target').each(function() {
        var $target = $(this),
            key = $target.data('crop'),
            query = db[key];

        if (typeof query === 'undefined') return console.warn('No related info was found for this tap target');

        var image = url + query.image,
            title = query.title ? query.title : '',
            text = query.text ? query.text : '',
            position = query.position ? query.position : '',
            img = new Image(),
            content;

        img.src = image;

        // Create the text content
        content = title !== '' ? '<h2>' + title + '</h2>' : '';
        content += '<p>' + text + '</p>';

        // Set up the tap on the target.
        Hammer($target.get(0)).on('tap', function(e) {
            e.gesture.preventDefault();

            var $overlay = $('<div class="overlay"></div>'),
                $popup = $('<div class="popup"></div>'),
                $image_crop = $(img).addClass('image-crop'),
                $text = $('<div class="text"></div>'),
                $close = $('<div class="close"></div>');

            // Add in the elements
            $text.html(content);
            $popup.append($image_crop);
            $popup.append($text);

            $overlay.append($popup);
            $overlay.append($close);
            $('body').append($overlay);

            $overlay.css('height', window.outerHeight);

            $overlay.css('background-color', 'rgba(0,0,0,0.9)');

            // Set an event so that after the image transitions in, show the text
            $image_crop.get(0).addEventListener('transitionend', function() {
                $text.css({
                    top: (window.innerHeight - $text.outerHeight() - 15)
                });

                if (position == 'right')
                    $text.css('right', 40);
                else
                    $text.css('left', 40);

                $text.addClass('show');
            });

            $image_crop.css({
                top: 0,
                left: 0,
                'transform': 'translate(0, ' + (Pathways.panelHeight / 4) + 'px)',
                opacity: 0
            });

            // prevent scrolling
            $('body').addClass('modal-open');

            // Animate in the text
            setTimeout(function() {
                $image_crop.addClass('animate');

                if (window.innerHeight > window.innerWidth)
                    $image_crop.css({
                        'transform': 'translate(0, ' + ((window.innerHeight - $image_crop.height()) / 2) + 'px)',
                        opacity: 1
                    });
                else
                    $image_crop.css({
                        'transform': 'translate(0, 0)',
                        opacity: 1
                    });
            }, 50);

            $image_crop.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            $close.on('click', function() {
                $overlay.css('opacity', 0);
                $('body').removeClass('modal-open');
                setTimeout(function() {
                    $overlay.remove();
                }, 600);
            });

            window.addEventListener('resize', function() {
                $overlay.css('height', window.innerHeight);
                $text.css({
                    top: (window.innerHeight - $text.outerHeight() - 15)
                });
            });
        });
    });
};

/*
    Carousel pattern initiator followed by the component.
*/
Pathways.components.gallery = function(element, data) {
    var $elem = $(element),
        $panel = $elem.closest('.panel'),
        panelId = $panel.attr('id');

    $(element).on('click', function(e) {

        var $overlay = $('<div class="overlay"></div>'),
            $close = $('<div class="close"></div>'),
            $loading = $('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

        $overlay.css('height', window.innerHeight);

        $('body').append($overlay);

        $overlay.show();
        $overlay.css('background-color', 'rgba(0,0,0,0.8)');

        $overlay.append($loading);

        $loading.css({
            position: 'absolute',
            top: ((window.innerHeight / 2) - 12),
            left: ((window.innerWidth / 2) - 35)
        });

        // prevent scrolling
        $('body').addClass('modal-open');

        setTimeout(function() {
            // Load the carousel
            var $div = $('<div class="carousel"></div>');
            $overlay.append($div);

            var carousel = new Carousel(".carousel", data);
            carousel.init();

            $overlay.append($close);
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

    });

};

function Carousel(element, data) {

    if (typeof data === 'undefined') return console.warn('No gallery data provided');

    var self = this,
        _element = document.querySelector(element),
        $element = $(element),
        $prev = null,
        $next = null,

        $container = null,
        $panes = null,

        images = data.images,
        location = data.location,

        widths = [],
        ratios = [],

        pane_width = 0,
        pane_count = 0,
        current_pane = 0,
        total_offset = (window.innerWidth / 2);


    /**
     * initial
     */
    this.init = function() {

        // Steps to loading the carousel:
        // - Set up the carousel container
        // - Load the first image.
        // - On load, calculate dimensions of the image, update the container, set local width vars, move the container so the image is in the centre.
        // - Load the navigation
        // - Load rest of the images sequentially in the onload event of the previous one.
        // - Update the container and local variables on each load, keeping the carousel in the correct place.

        // Create the container
        $container = $('<ul/>');
        $container.height(window.innerHeight);

        $element.append($container);

        // Load the first image
        var imagesCopy = [].concat(images);
        var first = imagesCopy[0];

        loadImage(first, function() {
            loadNavigation();

            $panes = $element.find('li');
            pane_count = $panes.length;

            $container.css('transform', 'translate(' + (total_offset - (widths[0] / 2)) + 'px,0)');
            setPaneDimensions();

            imagesCopy.shift();

            // load the rest of the images
            loadImages(imagesCopy);
        });

        $(window).on("load resize orientationchange", function() {
            setPaneDimensions();
        });
    };

    /*
     * Load an image and take a function to call once the image has finished asynchronously loading
     */
    var loadImage = function(obj, callback) {
        var img = new Image(),
            $li = $('<li/>'),
            $img;

        img.src = '/_assets/img/' + location + obj.image + '.jpg';

        img.onload = function() {
            $img = $(img);
            $img.css('height', '100%');

            $li.append($img);

            // add potential text
            if (obj.text) {
                var $child = $('<div>' + obj.text + '</div>').addClass('text');

                $li.append($child);
            }

            // what is the ratio of the image?
            var w = img.naturalWidth,
                h = img.naturalHeight,
                ratio = (h / w),
                newWidth = window.innerHeight / ratio;

            // store the width and ratio for resize recalculations
            widths.push(newWidth);
            ratios.push(ratio);

            // set the panel to the image's width
            $li.width(newWidth);

            // Add it to the container
            $container.append($li);

            // calculate and set the width of the whole container
            var total = widths.reduce(function(a, b) {
                return a + b;
            });

            $container.width(total);

            if (callback)
                callback.call();
        };
    };

    /*
     * Takes an array of image objects and recursively sets up a callback chain to load in images sequentially
     */
    var loadImages = function(images) {
        if (images.length) {
            loadImage(images[0], function() {
                $panes = $element.find('li');
                pane_count = $panes.length;
                setPaneDimensions();

                images.shift();

                loadImages(images);
            });
        }
    };

    /*
     * load the navigation into the carousel
     */
    var loadNavigation = function() {
        $prev = $('<div/>'),
            $next = $('<div/>');

        $prev.addClass('prev disabled');
        $next.addClass('next');

        $prev.css({
            'left': 0,
            'height': window.innerHeight + 'px',
        });

        $next.css({
            'right': 0,
            'height': window.innerHeight + 'px',
        });

        $element.append($prev);
        $element.append($next);

        new Hammer($prev[0]).on("tap", function() {
            self.prev();
        });

        new Hammer($next[0]).on("tap", function() {
            self.next();
        });
    };

    /**
     * set the pane dimensions and scale the container
     */
    function setPaneDimensions() {
        var total_width = 0,
            wH = window.innerHeight;

        widths = [];

        for (var i = 0; i < $panes.length; i++) {
            var newWidth = wH / ratios[i];

            $panes[i].style['width'] = newWidth + 'px';

            widths.push(newWidth);

            total_width += newWidth;
        }

        $container.width(total_width);
        total_offset = (window.innerWidth / 2);

        pane_width = parseInt(total_width / $panes.length);

        // Set the container and navigation links to the height of the screen.
        $container.css('height', wH);

        $prev.height(wH);
        $next.height(wH);

        self.showPane(current_pane, false);
    }


    /**
     * show pane by index
     */
    this.showPane = function(index, animate) {
        var offset = 0,
            count = 0;

        // between the bounds
        index = Math.max(0, Math.min(index, pane_count - 1));
        current_pane = index;

        for (var i = 0; i < index; i++) {
            offset -= widths[i];
        }

        offset += (total_offset - (widths[index] / 2));

        $panes.css('opacity', 0.4);
        $panes.get(current_pane).style['opacity'] = 1;

        setContainerOffset(offset, animate);

        if (index > 0)
            $prev.removeClass('disabled');
        else {
            $prev.addClass('disabled');
        }

        if (index >= (pane_count - 1))
            $next.addClass('disabled');
        else {
            $next.removeClass('disabled');
        }
    };

    /*
     * Move the whole list of panels by x. Animation optional.
     */
    function setContainerOffset(x, animate) {
        $container.removeClass("animate");

        if (animate) {
            $container.addClass("animate");
        }

        if (Modernizr.csstransforms3d)
            $container.css("transform", "translate3d(" + x + "px,0,0)");
        else
            $container.css("transform", "translate(" + x + "px,0)");
    }

    this.next = function() {
        return this.showPane(current_pane + 1, true);
    };
    this.prev = function() {
        return this.showPane(current_pane - 1, true);
    };


    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch (ev.type) {
            case 'dragright':
            case 'dragleft':
                // stick to the finger
                var pane_offset = 0,
                    count = 0;

                for (var i = 0; i < current_pane; i++) {
                    pane_offset -= widths[i];
                }

                pane_offset += (total_offset - (widths[current_pane] / 2));

                var drag_offset = ((100 / 440) * ev.gesture.deltaX) / pane_count;

                // slow down at the first and last pane
                if ((current_pane === 0 && ev.gesture.direction == "right") ||
                    (current_pane == pane_count - 1 && ev.gesture.direction == "left")) {
                    drag_offset *= 0.4;
                }

                setContainerOffset(ev.gesture.deltaX + pane_offset);
                break;

            case 'swipeleft':
                self.next();
                ev.gesture.stopDetect();
                break;

            case 'swiperight':
                self.prev();
                ev.gesture.stopDetect();
                break;

            case 'release':
                // more then 30% moved, navigate
                if (Math.abs(ev.gesture.deltaX) > ((pane_width / 10) * 3)) {
                    if (ev.gesture.direction == 'right') {
                        self.prev();
                    } else {
                        self.next();
                    }
                } else {
                    self.showPane(current_pane, true);
                }
                break;
        }
    }

    new Hammer($element[0], {
        drag_lock_to_axis: true
    }).on("release dragleft dragright swipeleft swiperight", handleHammer);
}

Pathways.components.infiniteCanvas = function(element, data) {

    $(element).find('.infinite-canvas').each(function() {
        var infiniteCanvas = new InfiniteCanvas(this);
        infiniteCanvas.init();
    });

};

function InfiniteCanvas(element) {
    var self = this,
        _element = element,
        $element = $(element),

        totalWidth = 0,
        totalHeight = 0,
        totalOffsetX = 0,
        totalOffsetY = 0,

        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;


    this.init = function() {
        var self = this;

        totalWidth = $element.outerWidth();
        totalHeight = $element.outerHeight();

        // center the first text block.
        centerText($('[data-chapter="1"]', $element));

        // prev/next events
        $element.on('click', '.prev, .next', function(e) {
            var $this = $(this),
                $target = $(e.target),
                chapter = $this.parents('.text-panel').data('chapter'),
                $text;

            if ($target.hasClass('prev')) {
                $text = $('[data-chapter="' + (chapter - 1) + '"]', $element);

                if ($text.length) {
                    centerText($text);
                }
            }

            if ($target.hasClass('next')) {
                $text = $('[data-chapter="' + (chapter + 1) + '"]', $element);

                if ($text.length) {
                    centerText($text);
                }
            }

            e.preventDefault();
        });

        window.addEventListener('resize', function() {
            viewportWidth = window.innerWidth,
                viewportHeight = window.innerHeight;
        });

        this.loadImages();
    };

    this.loadImages = function() {
        console.log('running');
        // for now load all the images in the DB
        var images = canvasDB,
            length = images.length;

        for (var i = 0; i < length; i++) {
            var $img = $('<img/>').addClass('image-panel');

            $img.attr('src', '/_assets/img/infinite-canvas/infiniteCanvas_' + images[i].id + '.jpg');

            $img.css({
                left: images[i].pos[0],
                top: images[i].pos[1]
            });

            $element.append($img);
        }
    };

    // Try to position the text in the middle of the screen, but also keep the canvas within bounds.
    function centerText($elm) {
        var width = $elm.outerWidth(),
            height = $elm.outerHeight(),
            top = $elm.position().top,
            left = $elm.position().left,

            offsetX = (viewportWidth - width) / 2,
            offsetY = (viewportHeight - height) / 2,

            totalX = (-left + offsetX),
            totalY = (-top + offsetY);

        // Keep within the bounds of the canvas
        if (totalX > 0)
            totalX = 0;

        if (Math.abs(totalX - viewportWidth) > totalWidth) {
            totalX = -(totalWidth - viewportWidth);
        }

        if (totalY > 0)
            totalY = 0;

        if (Math.abs(totalY - viewportHeight) > totalHeight) {
            totalY = -(totalHeight - viewportHeight);
        }

        setContainerOffset(totalX, totalY, true);
        totalOffsetX = totalX;
        totalOffsetY = totalY;
    }

    function setContainerOffset(x, y, animate) {
        $element.removeClass("animate");

        if (animate) {
            $element.addClass("animate");
        }

        if (Modernizr.csstransforms3d)
            $element.css("transform", "translate3d(" + x + "px, " + y + "px ,0)");
        else
            $element.css("transform", "translate(" + x + "px," + y + "px)");
    }

    function handleHammer(ev) {
        // disable browser scrolling
        ev.gesture.preventDefault();

        switch (ev.type) {
            case 'drag':
                setContainerOffset((ev.gesture.deltaX + totalOffsetX), (ev.gesture.deltaY + totalOffsetY));
                break;

            case 'release':
                totalOffsetX += ev.gesture.deltaX;
                totalOffsetY += ev.gesture.deltaY;

                // Drag too far right
                if (totalOffsetX > 0) {
                    setContainerOffset(0, totalOffsetY, true);
                    totalOffsetX = 0;
                }

                // Drag too far left
                if (Math.abs(totalOffsetX - viewportWidth) > totalWidth) {
                    setContainerOffset(-(totalWidth - viewportWidth), totalOffsetY, true);
                    totalOffsetX = -(totalWidth - viewportWidth);
                }

                // Drag too far down
                if (totalOffsetY > 0) {
                    setContainerOffset(totalOffsetX, 0, true);
                    totalOffsetY = 0;
                }

                // Drag too far up
                if (Math.abs(totalOffsetY - viewportHeight) > totalHeight) {
                    setContainerOffset(totalOffsetX, -(totalHeight - viewportHeight), true);
                    totalOffsetY = -(totalHeight - viewportHeight);
                }

                break;
        }
    }

    new Hammer(_element, {}).on("release drag", handleHammer);
}

var canvasDB = [{
    id: '03',
    pos: [1220, 35]
}, {
    id: '05',
    pos: [1648, 35]
}, {
    id: '07',
    pos: [2075, 35]
}, {
    id: '09',
    pos: [2397, 35]
}, {
    id: '12',
    pos: [4083, 37]
}, {
    id: '15',
    pos: [3235, 38]
}, {
    id: '18',
    pos: [66, 52]
}, {
    id: '21',
    pos: [6704, 54]
}, {
    id: '24',
    pos: [5455, 68]
}, {
    id: '27',
    pos: [773, 113]
}, {
    id: '30',
    pos: [7418, 163]
}, {
    id: '33',
    pos: [2765, 165]
}, {
    id: '36',
    pos: [3704, 231]
}, {
    id: '39',
    pos: [5913, 275]
}, {
    id: '43',
    pos: [4836, 294]
}, {
    id: '46',
    pos: [1220, 366]
}, {
    id: '49',
    pos: [6704, 446]
}, {
    id: '54',
    pos: [773, 486]
}, {
    id: '56',
    pos: [3387, 511]
}, {
    id: '58',
    pos: [2765, 512]
}, {
    id: '63',
    pos: [4083, 546]
}, {
    id: '66',
    pos: [2311, 575]
}, {
    id: '69',
    pos: [2098, 576]
}, {
    id: '72',
    pos: [66, 670]
}, {
    id: '79',
    pos: [4811, 758]
}, {
    id: '81',
    pos: [5359, 758]
}, {
    id: '83',
    pos: [3387, 790]
}, {
    id: '89',
    pos: [2094, 870]
}, {
    id: '93',
    pos: [6704, 930]
}, {
    id: '96',
    pos: [773, 1078]
}, {
    id: '99',
    pos: [4083, 1271]
}, {
    id: '101',
    pos: [228, 1300]
}, {
    id: '104',
    pos: [2765, 1372]
}, {
    id: '107',
    pos: [5902, 1414]
}, {
    id: '109',
    pos: [6192, 1414]
}, {
    id: '111',
    pos: [6927, 1414]
}, {
    id: '113',
    pos: [7420, 1414]
}, {
    id: '116',
    pos: [1266, 1527]
}, {
    id: '118',
    pos: [1636, 1527]
}, {
    id: '123',
    pos: [805, 1608]
}, {
    id: '127',
    pos: [4809, 1628]
}, {
    id: '130',
    pos: [5230, 1659]
}, {
    id: '133',
    pos: [6927, 1746]
}, {
    id: '141',
    pos: [1265, 1816]
}, {
    id: '144',
    pos: [1995, 1816]
}, {
    id: '147',
    pos: [4324, 1816]
}, {
    id: '149',
    pos: [5902, 1845]
}, {
    id: '151',
    pos: [6286, 1845]
}, {
    id: '154',
    pos: [6668, 1846]
}, {
    id: '156',
    pos: [1629, 1852]
}, {
    id: '159',
    pos: [7420, 1903]
}, {
    id: '161',
    pos: [805, 1998]
}, {
    id: '168',
    pos: [5406, 2101]
}, {
    id: '170',
    pos: [6286, 2101]
}, {
    id: '171',
    pos: [6927, 2114]
}, {
    id: '172',
    pos: [1265, 2126]
}, {
    id: '175',
    pos: [315, 2135]
}, {
    id: '178',
    pos: [4984, 2178]
}, {
    id: '183',
    pos: [4226, 2212]
}, {
    id: '192',
    pos: [5902, 2371]
}, {
    id: '194',
    pos: [6414, 2371]
}, {
    id: '196',
    pos: [805, 2388]
}, {
    id: '199',
    pos: [1729, 2389]
}, {
    id: '201',
    pos: [2164, 2389]
}, {
    id: '203',
    pos: [2875, 2389]
}, {
    id: '207',
    pos: [7420, 2451]
}, {
    id: '210',
    pos: [4982, 2455]
}, {
    id: '211',
    pos: [3387, 2480]
}, {
    id: '213',
    pos: [3707, 2480]
}, {
    id: '216',
    pos: [6414, 2692]
}, {
    id: '219',
    pos: [4226, 2726]
}, {
    id: '221',
    pos: [4674, 2726]
}, {
    id: '223',
    pos: [5406, 2741]
}, {
    id: '227',
    pos: [6927, 2876]
}, {
    id: '233',
    pos: [2164, 2914]
}, {
    id: '235',
    pos: [2571, 2914]
}, {
    id: '237',
    pos: [147, 2944]
}, {
    id: '240',
    pos: [1801, 2944]
}, {
    id: '245',
    pos: [4991, 2997]
}, {
    id: '251',
    pos: [5409, 3114]
}, {
    id: '255',
    pos: [4674, 3140]
}, {
    id: '257',
    pos: [2164, 3172]
}, {
    id: '260',
    pos: [3632, 3177]
}, {
    id: '268',
    pos: [2550, 3345]
}, {
    id: '270',
    pos: [2949, 3345]
}, {
    id: '272',
    pos: [1801, 3377]
}, {
    id: '276',
    pos: [4226, 3424]
}, {
    id: '279',
    pos: [7079, 3429]
}, {
    id: '281',
    pos: [7396, 3429]
}, {
    id: '283',
    pos: [270, 3461]
}, {
    id: '285',
    pos: [533, 3461]
}, {
    id: '289',
    pos: [4990, 3537]
}, {
    id: '291',
    pos: [2550, 3618]
}, {
    id: '293',
    pos: [941, 3653]
}, {
    id: '296',
    pos: [6006, 3705]
}, {
    id: '298',
    pos: [6333, 3705]
}, {
    id: '303',
    pos: [119, 3818]
}, {
    id: '306',
    pos: [7079, 3876]
}, ];

Pathways.components.infographic = function(element, data) {

    var $svg = $(element).find('svg');
    $svg.on('click', 'circle', function() {
        var $this = $(this),
            top = $this.position().top,
            left = $this.position().left,
            radius = $this.attr('r'),

            center_x = left + (radius / 2),
            center_y = top + (radius / 2);

        $svg.css('transform-origin', center_x + 'px ' + center_y + 'px');
        $svg.css('transform', 'scale(3, 3)');
    });

};

Pathways.components.libraryPanel = function(element, data) {

    $(element).on('click', '.handle', function() {
        var $self = $(this),
            $panel = $self.parent();

        if ($panel.hasClass('active')) {
            $panel.css('transform', 'translate(' + ($panel.outerWidth()) + 'px, ' + ($panel.outerHeight() - 60) + 'px)');
            $panel.removeClass('active');
        } else {
            $panel.css('transform', 'translate(38px, 38px)');
            $panel.addClass('active');

            $(window).one('scroll', function() {
                $self.trigger('click');
            });
        }
    });
};


Pathways.components.modal = function(element, data) {

    $(element).find('.modal').on('click', function() {
        var modal = new Modal( $(this) );
        modal.init();
    });

};

function Modal(elm) {

    var self = this,
        $elm = elm,
        $overlay,
        $image_crop,
        $close;

    this.init = function() {
        console.log('init');
        var img         = new Image(),
            $overlay    = $('<div class="overlay"></div>'),
            $image_crop = $(img).css('opacity', 0),
            $close      = $('<div class="close"></div>');

        img.src = $elm.attr('data-image');

        img.onload = function() {

            var width   = this.width,
                height  = this.height,

                top     = (window.innerHeight / 2) - (height / 2),
                left    = (window.innerWidth / 2) - (width / 2);

            $image_crop.css({ position: 'absolute', top: top, left: left });

            $overlay.append( $image_crop );
            $image_crop.animate({'opacity': 1}, 500);
        };

        $overlay.append( $close );
        $('body').append( $overlay );

        //
        $overlay.css( {
            'height':           window.outerHeight,
            'background-color': 'rgba(0,0,0,0.9)',
            opacity: 1
        });

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            setTimeout(function() {
                $overlay.remove();
            }, 600);
        });
    };
}

Pathways.components.playerOverlay = function(elem) {

    var $element = $(elem),

        defaultPanelOffset = 180,
        fullScreenPanelOffset = 0,

        rootSel = 'body',
        playerSel = '.wellcomePlayer',

        activeClass = 'modal-open',
        overlayFullscreenClass = 'overlay-fullscreen',

        closeTmpl = '<div class="close"></div>',
        overlayTmpl = '<div class="overlay"></div>',
        iframeTmpl = '<iframe/>';


    function getHeightWithOffset(offset) {
        offset = offset || 0;
        return Pathways.panelHeight - offset;
    }

    function getWidthWithOffset(offset) {
        offset = offset || 0;
        return window.innerWidth - offset;
    }


    $element.on('click', function(e) {

        var $this = $(this),
            embedData = $this.data('embed'),
            isFullScreen = false;

        if (embedData) {

            var initHeight = getHeightWithOffset(defaultPanelOffset),
                initWidth = getWidthWithOffset(defaultPanelOffset),

                // Excluding the following line for now to enable player until CORS enabled
                // data-config="/player-config.js"
                playerTmpl = '<div class="wellcomePlayer" data-no-load="true" data-uri="' + embedData + '" data-assetsequenceindex="0" data-assetindex="0" data-zoom="-0.6441,0,2.2881,1.4411" data-config="/service/playerconfig" style="width:' + initWidth + 'px; height:' + initHeight + 'px; background-color: #000"></div>',

                $player,
                $overlay,
                $close;

            function getOffset() {
                if (isFullScreen) {
                    return fullScreenPanelOffset;
                } else {
                    return defaultPanelOffset;
                }
            }

            function resizePlayerToDimensions(width, height) {

                $overlay.css('height', getHeightWithOffset(0));

                $player.css('width', width);
                $player.css('height', height);

                Pathways.Utils.positionCenter($player);
            }

            function resizePlayer() {
                var offset = getOffset();
                resizePlayerToDimensions(getWidthWithOffset(offset), getHeightWithOffset(offset));
            }


            function createOverlay(tmpl, $rootEl, $closeEl) {
                var $el = $(tmpl);
                $el.append($closeEl);
                $rootEl.append($el);
                return $el;
            }

            function createPlayer(tmpl, $rootEl) {
                $el = $(tmpl);
                $rootEl.append($el);
                return $el;
            }

            function initPlayer(sel){
                window.initPlayers($(sel));
            }

            function initOverlay($el, sel) {

                $el.on('click', function() {
                    $(rootSel).removeClass(activeClass);
                    isFullScreen = false;
                    window.embedScriptIncluded = false;

                    setTimeout(function(){
                        $el.remove();
                    }, 1000); // give css transition time
                });

                setTimeout(function() {
                    // prevent scrolling
                    $(rootSel).addClass(activeClass);
                    initPlayer(sel);
                }, 50); // delay before adding class to ensure transition event will fire

            }


            function addDocListeners() {

                $(window).resize(resizePlayer);

                $(document).bind('onToggleFullScreen', function(event, goFullScreen) {

                    if (goFullScreen) {
                        isFullScreen = true;
                        $overlay.addClass(overlayFullscreenClass);
                    } else {
                        isFullScreen = false;
                        $overlay.removeClass(overlayFullscreenClass);
                    }

                    resizePlayer();
                });

                // test currentViewUri event
                //$(document).bind("onCurrentViewUri", function(event, uri) {
                    //console.log('download uri: ' + uri);
                //});
            }

            function init() {
                var $root = $(rootSel);

                $close = $(closeTmpl);
                $overlay = createOverlay(overlayTmpl, $root, $close);
                $player = createPlayer(playerTmpl, $overlay);

                addDocListeners();

                initOverlay($overlay, playerSel);
            }

            init();
            resizePlayer();

            e.preventDefault();
            return false;
        }
    });

};


Pathways.components.quiz = function(element, data) {

    if(typeof data === 'undefined') return console.warn('Quiz component not provided data');

    $(element).on('click', function(e) {
        // setup overlay
        var $overlay    = $('<div class="overlay"></div>'),
            $close      = $('<div class="close"></div>');

        $overlay.css('height', window.innerHeight );

        // append overlay
        $('body').append( $overlay );

        $overlay.show();
        $overlay.css({
            'background-color': 'rgba(0,0,0,0.9)',
            'background-image': 'url('+data.images + '/' + 'bg.jpg)'
        });

        // prevent scrolling
        $('body').addClass('modal-open');

        // append and initialize quiz
        setTimeout(function() {
            var $code           = $( _('#template-quiz').innerHTML ),
                $content        = $('<div class="content"></div>'),
                $quizContainer  = $('<div class="quiz"></div>');

            $content.append( $code );
            $quizContainer.append( $content );
            $overlay.append( $quizContainer );

            Pathways.Utils.positionCenter($quizContainer);

            var quiz = new Quiz($quizContainer, data);

            $overlay.append( $close );
        }, 800);

        $close.on('click', function() {
            $overlay.css('opacity', 0);
            $('body').removeClass('modal-open');

            setTimeout(function() {
                $overlay.remove();
            }, 800);
        });

        $(window).on('resize', function() {
            $overlay.css('height', window.innerHeight);
        });

    });
};

function Quiz(element, data) {
    var $quiz           = $(element),
        paused          = false,
        level           = 1,
        imagesLocation  = data.images,
        questions       = data.questions,
        answers         = data.questions[level].answers,
        totalQuestions  = questions.length,
        score           = 0,

        timerWait       = 5, // in seconds
        timerLength     = 5, // in seconds

        $remaining  = $quiz.find('.remaining'),
        $score      = $quiz.find('.score span'),

        $timer      = $('<div/>').addClass('timer').css('display', 'none'),
        timerID,
        timeoutWaitID;


    this.init = function() {
        var self = this;

        // load the intro image
        var $quizHeader = $quiz.find('.quiz-header-image'),
            $image      = $('<img/>').attr('src', imagesLocation + '/intro.jpg');

        $quizHeader.html($image);

        // Add the timer
        $quiz.append($timer);

        $quiz.on('click', '.quiz-start .button', function() {
            self.start();
        });

        // set up the click events
        $quiz.on('click', 'li', function(e) {
            if( !paused )
                self.validate(e);
        });
    };

    this.start = function() {

        var self = this;

        $quiz.find('.quiz-start').hide();
        $quiz.find('.status-bar').show();
        $quiz.find('.quiz-playground').show();

        // Load the level
        this.loadLevel();
    };

    this.getCurrentQuestion = function() {
        return questions[(level-1)];
    };

    this.loadLevel = function(l) {
        // image
        var self        = this,
            question    = this.getCurrentQuestion(),
            $image      = $('<img/>').attr('src', imagesLocation + '/' + question.image),
            str         = '<ul>';

        $quiz.find('.image').html($image);

        // question
        $quiz.find('.question').html(question.title);

        // answers
        for (var i = 0; i < question.answers.length; i++) {
            str += '<li>' + question.answers[i] + '</li>';
        }

        str += '</ul>';

        $quiz.find('.answers').html(str);

        this.updateScore();
        this.updateQuestionsRemaining();

        // Wait for timerWait seconds then start a timerLength countdown
        timeoutWaitID = setTimeout(function() {
            self.startTimer();
        }, (timerWait * 1000));
    };

    this.validate = function(e) {
        var self        = this,
            question    = this.getCurrentQuestion(),
            correct     = false;

        this.stopTimer();

        if( $quiz.find('li').index($(e.currentTarget)) == (question.correct - 1) )
            correct = true;

        if( correct ) {
            paused = true;
            this.showCorrect($(e.currentTarget));
            score++;
            this.updateScore();
        }
        else
            this.showError($(e.currentTarget));

        setTimeout(function() {
            paused = false;
            self.stopTimer();
            self.nextQuestion($(e.currentTarget));
        }, 2000);
    };

    this.nextQuestion = function($elm) {
        level++;

        if( level <= questions.length )
            this.loadLevel();
        else
            this.finishGame();
    };

    this.showCorrect = function($elm) {
        $elm.addClass('correct');
    };

    this.showError = function($elm) {
        $elm.addClass('wrong');
    };

    this.revealAnswers = function() {
        var self        = this,
            question    = this.getCurrentQuestion(),
            count       = 1;

        $quiz.find('.answers li').each(function() {
            if(count == question.correct)
                self.showCorrect($(this));
            else
                self.showError($(this));

            count++;
        });
    };

    this.updateScore = function() {
        $score.html(score);
    };

    this.updateQuestionsRemaining = function() {
        $remaining.html('<em>'+level+'</em> of <span>'+totalQuestions+'</span>');
    };

    this.startTimer = function() {
        var self    = this,
            counter = timerLength;

        this.stopTimer();

        var elm     = $quiz.find('.quiz-playground .image'),
            diff    = $quiz.find('.quiz-playground .image').offset().top - $quiz.find('.quiz-playground').offset().top;

        $timer.css({
            top:        (diff + elm.outerHeight() / 2) - ($timer.height() / 2),
            left:       (elm.outerWidth() / 2) - ($timer.width() / 2)
        })
        .html(counter);

        $timer.fadeIn(100);

        // Every second, count down.
        timerID = setInterval(function() {
            if(counter > 1) {
                $timer.html(--counter);
            }
            else {
                $timer.html('<span style="color:red">'+ (--counter) + '</span>');

                paused = true;
                self.stopTimer();
                self.revealAnswers();

                setTimeout(function() {
                    paused = false;
                    $timer.fadeOut(100);
                    self.nextQuestion();
                }, 2000);
            }
        }, 1000);
    };

    this.stopTimer = function() {
        clearInterval(timerID);
        clearTimeout(timeoutWaitID);

        $timer.fadeOut(100);
    };


    this.finishGame = function() {
        var self            = this,
            $quiz_finish    = $quiz.find('.quiz-finish');

        this.stopTimer();
        $timer.css('display', 'none');

        $quiz_finish.find('.quiz-finish--score').html('<span>'+score+'</span> out of ' + totalQuestions);

        $quiz.find('.quiz-playground').hide();
        $quiz_finish.show();

        $quiz_finish.on('click', '.play-again', function() {
            self.restart();
        });
    };

    this.restart = function() {
        this.stopTimer();

        score = 0;
        level = 1;

        $quiz.find('.quiz-finish').hide();

        this.start();
    };

    this.init();
}

Pathways.components.toggleSection = function(element, data) {

	var $element			= $(element),
		$target             = $($element.attr('data-toggle-section-target')),
		$scrollAnchor       = $($element.attr('data-toggle-section-anchor')),
        height              = $target.height();

    $target.css({ 'height': 0, 'transition': 'height 0.4s ease' });

    $element.on('click', function toggleOpen() {

    	$target.toggleClass('open');

    	if($target.hasClass('open')) {
    		$target.css('height', height);

    		$('html, body').animate({
                scrollTop: $scrollAnchor.offset().top - 100
            }, 400);
    	} else {
    		$target.css('height', 0);
    	}

        return false;
    });

};

window.TheCollectors = {};

$(function() {
    //Initialise the interface object with the Data object
    var SCREEN_MODE;
    if ($(window).width() > 480) {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
    } else {
        SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
    }
    TheCollectors.Interface.Init(SCREEN_MODE);


    $(window).resize(function() {
        if (($(window).width() > 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_DESKTOP;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE)
            return;
        }

        if (($(window).width() < 480) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
            SCREEN_MODE = TheCollectors.SCREEN_MODE_MOBILE;
            TheCollectors.Interface.changeScreenMode(SCREEN_MODE)
            return;
        }

    });

});


TheCollectors.SCREEN_MODE_MOBILE = 'mobile';
TheCollectors.SCREEN_MODE_DESKTOP = 'desktop';

TheCollectors.getData = function(SCREEN_MODE) {
    if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
        return TheCollectors.data
    } else if (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE) {
        var dataToReturn = []
        for (var i = 0; i < TheCollectors.data.length; i++) {
            if (TheCollectors.data[i].mobileData) dataToReturn.push(TheCollectors.data[i]);
        }
        return dataToReturn;
    }
    console.log('NO DATA FOUND')
    return 'NO DATA FOUND';

}

TheCollectors.assetRoot = '/_assets/img/infographics/death-collector/'
TheCollectors.data = [{

        name: "Abortive, and stilborn",
        description: "These figures almost certainly include both deliberate abortions, brought on by imbibing herbal concoctions, and miscarriages. Since babies who died in the womb had not received baptism, stillborns were either not buried at all, or were interred in secret, unconsecrated locations.",
        ValueLabelPos_desktop: {
            x: 20,
            y: -232
        },
        mobileData: false,
        imgID: 0,
        data: [{
            year: 1629,
            value: 499
        }, {
            year: 1630,
            value: 439
        }, {
            year: 1631,
            value: 410
        }, {
            year: 1632,
            value: 445
        }, {
            year: 1633,
            value: 500
        }, {
            year: 1634,
            value: 475
        }, {
            year: 1635,
            value: 507
        }, {
            year: 1636,
            value: 523
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 335
        }, {
            year: 1648,
            value: 329
        }, {
            year: 1649,
            value: 327
        }, {
            year: 1650,
            value: 351
        }, {
            year: 1651,
            value: 389
        }, {
            year: 1652,
            value: 381
        }, {
            year: 1653,
            value: 384
        }, {
            year: 1654,
            value: 433
        }, {
            year: 1655,
            value: 483
        }, {
            year: 1656,
            value: 419
        }, {
            year: 1657,
            value: 463
        }, {
            year: 1658,
            value: 467
        }, {
            year: 1659,
            value: 421
        }, {
            year: 1660,
            value: 544
        }]
    },

    {
        name: "Aged",
        description: "'Aged' referred to deaths when over 60, or perhaps 70, years old. Graunt calculated that only two or three of every 100 individuals born in London would live to such a ripe old age. His own father was one of these few, along with his friend Samuel Pepys. Graunt himself died at the age of 54.",
        ValueLabelPos_desktop: {
            x: 42,
            y: -110
        },
        mobileData: false,
        imgID: 1,
        data: [

            {
                year: 1629,
                value: 579
            }, {
                year: 1630,
                value: 712
            }, {
                year: 1631,
                value: 661
            }, {
                year: 1632,
                value: 671
            }, {
                year: 1633,
                value: 704
            }, {
                year: 1634,
                value: 623
            }, {
                year: 1635,
                value: 794
            }, {
                year: 1636,
                value: 714
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 916
            }, {
                year: 1648,
                value: 835
            }, {
                year: 1649,
                value: 889
            }, {
                year: 1650,
                value: 696
            }, {
                year: 1651,
                value: 780
            }, {
                year: 1652,
                value: 834
            }, {
                year: 1653,
                value: 864
            }, {
                year: 1654,
                value: 974
            }, {
                year: 1655,
                value: 743
            }, {
                year: 1656,
                value: 892
            }, {
                year: 1657,
                value: 869
            }, {
                year: 1658,
                value: 1176
            }, {
                year: 1659,
                value: 909
            }, {
                year: 1660,
                value: 1095
            }
        ]
    },

    {
        name: "Ague, and Fever",
        description: "Ague and fever are rather catch-all symptoms, which may result from any number of conditions. When William Shakespeare died on his fifty-third birthday in 1616 he had been suffering fevers for several weeks. No one is quite sure what caused his death, though syphilis, typhoid, influenza and alcoholism have all been mooted.",
        ValueLabelPos_desktop: {
            x: 110,
            y: -135
        },
        mobileData: false,
        imgID: 2,
        data: [{
            year: 1629,
            value: 956

        }, {
            year: 1630,
            value: 1091
        }, {
            year: 1631,
            value: 1115
        }, {
            year: 1632,
            value: 1108
        }, {
            year: 1633,
            value: 953
        }, {
            year: 1634,
            value: 1279
        }, {
            year: 1635,
            value: 1622
        }, {
            year: 1636,
            value: 2360
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1260
        }, {
            year: 1648,
            value: 884
        }, {
            year: 1649,
            value: 751
        }, {
            year: 1650,
            value: 970
        }, {
            year: 1651,
            value: 1038
        }, {
            year: 1652,
            value: 1212
        }, {
            year: 1653,
            value: 1282
        }, {
            year: 1654,
            value: 1371
        }, {
            year: 1655,
            value: 689
        }, {
            year: 1656,
            value: 875
        }, {
            year: 1657,
            value: 999
        }, {
            year: 1658,
            value: 1800
        }, {
            year: 1659,
            value: 2303
        }, {
            year: 1660,
            value: 2148
        }]
    },

    {
        name: "Cancer, Gangrene, and Fistula",
        description: "Cancer was only diagnosed when it could be observed externally, with most cases seen in the breast or face. Blamed on an excess of melancholic black bile, it was perceived as a fierce and ravenous evil that gnawed away the body. The grievous symptoms caused many sufferers to subject themselves to surgical treatments, which brought their own high risks of death.",
        ValueLabelPos_desktop: {
            x: 220,
            y: -130
        },
        mobileData: false,
        imgID: 3,
        data: [

            {
                year: 1629,
                value: 20
            }, {
                year: 1630,
                value: 14
            }, {
                year: 1631,
                value: 23
            }, {
                year: 1632,
                value: 28
            }, {
                year: 1633,
                value: 27
            }, {
                year: 1634,
                value: 30
            }, {
                year: 1635,
                value: 24
            }, {
                year: 1636,
                value: 30
            }, {
                year: 1637,
                value: "NO DATA"
            }, {
                year: 1638,
                value: "NO DATA"
            }, {
                year: 1639,
                value: "NO DATA"
            }, {
                year: 1640,
                value: "NO DATA"
            }, {
                year: 1641,
                value: "NO DATA"
            }, {
                year: 1642,
                value: "NO DATA"
            }, {
                year: 1643,
                value: "NO DATA"
            }, {
                year: 1644,
                value: "NO DATA"
            }, {
                year: 1645,
                value: "NO DATA"
            }, {
                year: 1646,
                value: "NO DATA"
            }, {
                year: 1647,
                value: 26
            }, {
                year: 1648,
                value: 29
            }, {
                year: 1649,
                value: 31
            }, {
                year: 1650,
                value: 19
            }, {
                year: 1651,
                value: 31
            }, {
                year: 1652,
                value: 53
            }, {
                year: 1653,
                value: 36
            }, {
                year: 1654,
                value: 37
            }, {
                year: 1655,
                value: 73
            }, {
                year: 1656,
                value: 31
            }, {
                year: 1657,
                value: 24
            }, {
                year: 1658,
                value: 35
            }, {
                year: 1659,
                value: 63
            }, {
                year: 1660,
                value: 52
            }
        ]
    },

    {
        name: "Childbed",
        description: "In the words of one seventeenth-century mother, the pain of childbirth was an 'exquisite torment' akin to the rack, but it was also a spiritual test of faith and endurance. If mothers suffered well, even those who died in the bed where they had given birth would be saved after death.",
        ValueLabelPos_desktop: {
            x: 150,
            y: -37
        },
        mobileData: false,
        imgID: 4,
        data: [{
            year: 1629,
            value: 150
        }, {
            year: 1630,
            value: 157
        }, {
            year: 1631,
            value: 112
        }, {
            year: 1632,
            value: 171
        }, {
            year: 1633,
            value: 132
        }, {
            year: 1634,
            value: 143
        }, {
            year: 1635,
            value: 163
        }, {
            year: 1636,
            value: 230
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 161
        }, {
            year: 1648,
            value: 106
        }, {
            year: 1649,
            value: 114
        }, {
            year: 1650,
            value: 117
        }, {
            year: 1651,
            value: 206
        }, {
            year: 1652,
            value: 213
        }, {
            year: 1653,
            value: 158
        }, {
            year: 1654,
            value: 192
        }, {
            year: 1655,
            value: 177
        }, {
            year: 1656,
            value: 201
        }, {
            year: 1657,
            value: 236
        }, {
            year: 1658,
            value: 225
        }, {
            year: 1659,
            value: 226
        }, {
            year: 1660,
            value: 194
        }]
    },

    {
        name: "Chrisomes, and Infants",
        description: "Almost ten per cent of babies didn't survive their first month of life. These 'chrisomes' died as a result of birth trauma, tetanus contracted when the umbilical cord was cut, low weight or inherited birth defects. Graunt's figures also include the deaths of 'infants', children who were not yet old enough to speak.",
        ValueLabelPos_desktop: {
            x: 220,
            y: 10
        },
        ValueLabelPos_mobile: {
            x: 230,
            y: -230
        },
        mobileData: true,
        imgID: 5,
        data: [{
            year: 1629,
            value: 1596

        }, {
            year: 1630,
            value: 2378
        }, {
            year: 1631,
            value: 2035
        }, {
            year: 1632,
            value: 2268
        }, {
            year: 1633,
            value: 2130
        }, {
            year: 1634,
            value: 2315
        }, {
            year: 1635,
            value: 2113
        }, {
            year: 1636,
            value: 1895
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 1369
        }, {
            year: 1648,
            value: 1254
        }, {
            year: 1649,
            value: 1065
        }, {
            year: 1650,
            value: 990
        }, {
            year: 1651,
            value: 1237
        }, {
            year: 1652,
            value: 1280
        }, {
            year: 1653,
            value: 1050
        }, {
            year: 1654,
            value: 1343
        }, {
            year: 1655,
            value: 1089
        }, {
            year: 1656,
            value: 1393
        }, {
            year: 1657,
            value: 1162
        }, {
            year: 1658,
            value: 1144
        }, {
            year: 1659,
            value: 858
        }, {
            year: 1660,
            value: 1123
        }]
    },

    {
        name: "Consumption, and Cough",
        description: "Graunt was dubious about the reliability of 'consumption' when reported as a cause of death in the Bills. The searchers, he wrote, might 'after the mist of a Cup of Ale' or a bribe apply it to any cadaver that looked in any way emaciated or lean.",
        ValueLabelPos_desktop: {
            x: 240,
            y: 75
        },
        mobileData: false,
        imgID: 6,
        data: [{
            year: 1629,
            value: 1827

        }, {
            year: 1630,
            value: 1910
        }, {
            year: 1631,
            value: 1713
        }, {
            year: 1632,
            value: 1797
        }, {
            year: 1633,
            value: 1754
        }, {
            year: 1634,
            value: 1955
        }, {
            year: 1635,
            value: 2080
        }, {
            year: 1636,
            value: 2477
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 2423
        }, {
            year: 1648,
            value: 2200
        }, {
            year: 1649,
            value: 2388
        }, {
            year: 1650,
            value: 1988
        }, {
            year: 1651,
            value: 2350
        }, {
            year: 1652,
            value: 2410
        }, {
            year: 1653,
            value: 2286
        }, {
            year: 1654,
            value: 2868
        }, {
            year: 1655,
            value: 606
        }, {
            year: 1656,
            value: 3184
        }, {
            year: 1657,
            value: 2757
        }, {
            year: 1658,
            value: 3610
        }, {
            year: 1659,
            value: 2982
        }, {
            year: 1660,
            value: 3414
        }]
    },

    {
        name: "Convulsion",
        description: "Convulsion only established itself as a reported cause of death in the seventeenth century. A symptom usually seen in young children, convulsions might be an outward sign of any number of underlying infections or diseases, including smallpox.",
        ValueLabelPos_desktop: {
            x: 135,
            y: 95
        },
        mobileData: false,
        imgID: 7,
        data: [{
            year: 1629,
            value: 52
        }, {
            year: 1630,
            value: 87
        }, {
            year: 1631,
            value: 18
        }, {
            year: 1632,
            value: 241
        }, {
            year: 1633,
            value: 221
        }, {
            year: 1634,
            value: 386
        }, {
            year: 1635,
            value: 418
        }, {
            year: 1636,
            value: 709
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 684
        }, {
            year: 1648,
            value: 491
        }, {
            year: 1649,
            value: 530
        }, {
            year: 1650,
            value: 493
        }, {
            year: 1651,
            value: 569
        }, {
            year: 1652,
            value: 653
        }, {
            year: 1653,
            value: 606
        }, {
            year: 1654,
            value: 828
        }, {
            year: 1655,
            value: 702
        }, {
            year: 1656,
            value: 1027
        }, {
            year: 1657,
            value: 807
        }, {
            year: 1658,
            value: 841
        }, {
            year: 1659,
            value: 742
        }, {
            year: 1660,
            value: 1031
        }]
    }, {
        name: "Dropsy, and Tympany",
        description: "Dropsy was an ugly, uncomfortable condition, in which the body became bloated with liquid. Usually associated with drunkenness, we now know it to be a symptom of kidney or liver problems. Sufferers, who included writers Henry Fielding and Samuel Johnson, were treated by 'tapping' and endured the added stigma of bringing their deaths upon themselves.",
        ValueLabelPos_desktop: {
            x: 165,
            y: 220
        },
        ValueLabelPos_mobile: {
            x: 250,
            y: 180
        },
        mobileData: true,
        imgID: 8,
        data: [{
            year: 1629,
            value: 235

        }, {
            year: 1630,
            value: 252
        }, {
            year: 1631,
            value: 279
        }, {
            year: 1632,
            value: 280
        }, {
            year: 1633,
            value: 266
        }, {
            year: 1634,
            value: 250
        }, {
            year: 1635,
            value: 329
        }, {
            year: 1636,
            value: 389
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 185
        }, {
            year: 1648,
            value: 434
        }, {
            year: 1649,
            value: 422
        }, {
            year: 1650,
            value: 508
        }, {
            year: 1651,
            value: 444
        }, {
            year: 1652,
            value: 556
        }, {
            year: 1653,
            value: 617
        }, {
            year: 1654,
            value: 704
        }, {
            year: 1655,
            value: 660
        }, {
            year: 1656,
            value: 706
        }, {
            year: 1657,
            value: 631
        }, {
            year: 1658,
            value: 931
        }, {
            year: 1659,
            value: 646
        }, {
            year: 1660,
            value: 872
        }]
    }, {
        name: "Drowned",
        description: "Many of the city's drownings occurred under London Bridge, then the only thoroughfare spanning the Thames. In 1641, Queen Henrietta Maria's barge overturned while navigating the hazardous rapids beneath its arches and a Woman of the Bedchamber drowned. Londoners were also known to take their own lives by deliberately jumping from boats as they passed below the bridge.",
        ValueLabelPos_desktop: {
            x: 50,
            y: 145
        },
        mobileData: false,
        imgID: 9,
        data: [{
            year: 1629,
            value: 43

        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 29
        }, {
            year: 1632,
            value: 34
        }, {
            year: 1633,
            value: 37
        }, {
            year: 1634,
            value: 32
        }, {
            year: 1635,
            value: 32
        }, {
            year: 1636,
            value: 45
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 47
        }, {
            year: 1648,
            value: 40
        }, {
            year: 1649,
            value: 30
        }, {
            year: 1650,
            value: 27
        }, {
            year: 1651,
            value: 49
        }, {
            year: 1652,
            value: 50
        }, {
            year: 1653,
            value: 53
        }, {
            year: 1654,
            value: 30
        }, {
            year: 1655,
            value: 43
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 63
        }, {
            year: 1658,
            value: 60
        }, {
            year: 1659,
            value: 57
        }, {
            year: 1660,
            value: 48
        }]
    }, {
        name: "Executed",
        description: "Criminals convicted of murder, wounding, robbery and rape all usually received the death penalty, though many were pardoned before being led to the scaffold. One convict who didn't get away was King Charles I, who was beheaded at Whitehall on January 30 1649, for 'High Treason and other high crimes'.",
        ValueLabelPos_desktop: {
            x: 10,
            y: 145
        },
        mobileData: false,
        imgID: 10,
        data: [{
            year: 1629,
            value: 19

        }, {
            year: 1630,
            value: 13
        }, {
            year: 1631,
            value: 12
        }, {
            year: 1632,
            value: 18
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 13
        }, {
            year: 1635,
            value: 13
        }, {
            year: 1636,
            value: 13
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 8
        }, {
            year: 1648,
            value: 17
        }, {
            year: 1649,
            value: 29
        }, {
            year: 1650,
            value: 43
        }, {
            year: 1651,
            value: 24
        }, {
            year: 1652,
            value: 12
        }, {
            year: 1653,
            value: 19
        }, {
            year: 1654,
            value: 21
        }, {
            year: 1655,
            value: 19
        }, {
            year: 1656,
            value: 22
        }, {
            year: 1657,
            value: 20
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 7
        }, {
            year: 1660,
            value: 18
        }]
    }, {
        name: "Fainted in a Bath",
        description: "Bathing was not only an unusual occurrence in the seventeenth century, it might also be considered dangerous. A popular pamphlet providing medical advice a century before had advised to 'use no baths or stoves' during outbreaks of plague. The publication explained that bathing opened up the skin's pores, so that 'venomous' air might infect the body.",
        ValueLabelPos_desktop: {
            x: -27,
            y: 195
        },
        mobileData: false,
        imgID: 11,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 0
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 0
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 0
        }, {
            year: 1648,
            value: 0
        }, {
            year: 1649,
            value: 0
        }, {
            year: 1650,
            value: 0
        }, {
            year: 1651,
            value: 0
        }, {
            year: 1652,
            value: 1
        }, {
            year: 1653,
            value: 0
        }, {
            year: 1654,
            value: 0
        }, {
            year: 1655,
            value: 0
        }, {
            year: 1656,
            value: 0
        }, {
            year: 1657,
            value: 0
        }, {
            year: 1658,
            value: 0
        }, {
            year: 1659,
            value: 0
        }, {
            year: 1660,
            value: 0
        }]
    }, {
        name: "Flox, and Small Pox",
        description: "Smallpox deaths are probably under-reported in the Bills, since the most severe form of the disease killed its victims so quickly the distinctive pustules had not yet erupted. Those who survived the feverish horror of the disease might, however, end up blinded, deafened or grossly disfigured by pits and holes.",
        ValueLabelPos_desktop: {
            x: -100,
            y: 195
        },
        mobileData: false,
        imgID: 12,
        data: [{
            year: 1629,
            value: 72

        }, {
            year: 1630,
            value: 40
        }, {
            year: 1631,
            value: 58
        }, {
            year: 1632,
            value: 531
        }, {
            year: 1633,
            value: 72
        }, {
            year: 1634,
            value: 1354
        }, {
            year: 1635,
            value: 293
        }, {
            year: 1636,
            value: 127
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 139
        }, {
            year: 1648,
            value: 400
        }, {
            year: 1649,
            value: 1190
        }, {
            year: 1650,
            value: 184
        }, {
            year: 1651,
            value: 525
        }, {
            year: 1652,
            value: 1279
        }, {
            year: 1653,
            value: 239
        }, {
            year: 1654,
            value: 812
        }, {
            year: 1655,
            value: 1294
        }, {
            year: 1656,
            value: 823
        }, {
            year: 1657,
            value: 835
        }, {
            year: 1658,
            value: 409
        }, {
            year: 1659,
            value: 1523
        }, {
            year: 1660,
            value: 354
        }]
    }, {
        name: "Found dead in the Streets",
        description: "Seventeenth-century dramatist Nathaniel Lee, known as the 'Mad Poet', was found dead in the street after a night of riot and extravagance. In his play Caesar Borgia, Lee had described death as unwelcome, but only because it delivered 'an eternal laziness'.",
        ValueLabelPos_desktop: {
            x: -160,
            y: 185
        },
        mobileData: false,
        imgID: 13,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 33
        }, {
            year: 1631,
            value: 26
        }, {
            year: 1632,
            value: 6
        }, {
            year: 1633,
            value: 13
        }, {
            year: 1634,
            value: 8
        }, {
            year: 1635,
            value: 24
        }, {
            year: 1636,
            value: 24
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 6
        }, {
            year: 1648,
            value: 6
        }, {
            year: 1649,
            value: 9
        }, {
            year: 1650,
            value: 8
        }, {
            year: 1651,
            value: 7
        }, {
            year: 1652,
            value: 9
        }, {
            year: 1653,
            value: 14
        }, {
            year: 1654,
            value: 4
        }, {
            year: 1655,
            value: 3
        }, {
            year: 1656,
            value: 4
        }, {
            year: 1657,
            value: 9
        }, {
            year: 1658,
            value: 11
        }, {
            year: 1659,
            value: 2
        }, {
            year: 1660,
            value: 6
        }]
    }, {
        name: "Grief",
        description: "The intense sorrow brought on by another's demise was an accepted cause of death in the Bills. When King Charles I was executed, the deaths of Scottish poet William Drummond, the Vice-Chancellor of the University of Oxford Dr Samuel Fell and Charles's second daughter Elizabeth were all attributed to grief.",
        ValueLabelPos_desktop: {
            x: -110,
            y: 70
        },
        ValueLabelPos_mobile: {
            x: 0,
            y: 140
        },
        mobileData: true,
        imgID: 14,
        data: [{
            year: 1629,
            value: 18
        }, {
            year: 1630,
            value: 20
        }, {
            year: 1631,
            value: 22
        }, {
            year: 1632,
            value: 11
        }, {
            year: 1633,
            value: 14
        }, {
            year: 1634,
            value: 17
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 20
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 12
        }, {
            year: 1648,
            value: 13
        }, {
            year: 1649,
            value: 16
        }, {
            year: 1650,
            value: 7
        }, {
            year: 1651,
            value: 17
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 11
        }, {
            year: 1654,
            value: 17
        }, {
            year: 1655,
            value: 10
        }, {
            year: 1656,
            value: 13
        }, {
            year: 1657,
            value: 10
        }, {
            year: 1658,
            value: 12
        }, {
            year: 1659,
            value: 13
        }, {
            year: 1660,
            value: 4
        }]
    }, {
        name: "Hanged, and made-away themselves",
        description: "Graunt described those who took their own lives as 'Mad-men' who committed 'the greatest sin', and suicide was, at the time, both a civil and religious crime. Families would be keen to avoid such a report, so they might be allowed to bury their deceased relative in a churchyard and keep custody of their otherwise impounded belongings.",
        ValueLabelPos_desktop: {
            x: -290,
            y: 99
        },
        mobileData: false,
        imgID: 15,
        data: [{
            year: 1629,
            value: 8
        }, {
            year: 1630,
            value: 8
        }, {
            year: 1631,
            value: 6
        }, {
            year: 1632,
            value: 15
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 3
        }, {
            year: 1635,
            value: 8
        }, {
            year: 1636,
            value: 7
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 11
        }, {
            year: 1648,
            value: 10
        }, {
            year: 1649,
            value: 13
        }, {
            year: 1650,
            value: 14
        }, {
            year: 1651,
            value: 9
        }, {
            year: 1652,
            value: 14
        }, {
            year: 1653,
            value: 15
        }, {
            year: 1654,
            value: 9
        }, {
            year: 1655,
            value: 14
        }, {
            year: 1656,
            value: 16
        }, {
            year: 1657,
            value: 24
        }, {
            year: 1658,
            value: 18
        }, {
            year: 1659,
            value: 11
        }, {
            year: 1660,
            value: 36
        }]
    }, {
        name: "Killed by several Accidents",
        description: "In bustling seventeenth-century London, there were fatal risks at every turn. Inhabitants might tumble down a flight of stairs in an unlit home, experience a workplace accident or fall under one of the two thousand or so carts and coaches that traversed the city's crowded streets.",
        ValueLabelPos_desktop: {
            x: -260,
            y: 10
        },
        mobileData: false,
        imgID: 16,
        data: [{
            year: 1629,
            value: 54
        }, {
            year: 1630,
            value: 55
        }, {
            year: 1631,
            value: 47
        }, {
            year: 1632,
            value: 46
        }, {
            year: 1633,
            value: 49
        }, {
            year: 1634,
            value: 41
        }, {
            year: 1635,
            value: 51
        }, {
            year: 1636,
            value: 60
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 27
        }, {
            year: 1648,
            value: 57
        }, {
            year: 1649,
            value: 39
        }, {
            year: 1650,
            value: 94
        }, {
            year: 1651,
            value: 47
        }, {
            year: 1652,
            value: 45
        }, {
            year: 1653,
            value: 57
        }, {
            year: 1654,
            value: 58
        }, {
            year: 1655,
            value: 52
        }, {
            year: 1656,
            value: 43
        }, {
            year: 1657,
            value: 52
        }, {
            year: 1658,
            value: 47
        }, {
            year: 1659,
            value: 55
        }, {
            year: 1660,
            value: 47
        }]
    }, {
        name: "Murdered",
        description: "The city's murder rate may seem low, but Londoners could still be a brutal bunch. In the summer of 1628, a riotous mob of young men pursued the notorious quack 'Dr' John Lambe through the city's streets before beating him with stones and cudgels. A convicted witch and rapist who had escaped the gallows twice, Lambe may have been a victim of public justice. His killers were never apprehended.",
        ValueLabelPos_desktop: {
            x: -140,
            y: -35
        },
        ValueLabelPos_mobile: {
            x: -180,
            y: 80
        },
        mobileData: true,
        imgID: 17,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 3
        }, {
            year: 1632,
            value: 7
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 6
        }, {
            year: 1635,
            value: 5
        }, {
            year: 1636,
            value: 8
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3
        }, {
            year: 1648,
            value: 2
        }, {
            year: 1649,
            value: 7
        }, {
            year: 1650,
            value: 5
        }, {
            year: 1651,
            value: 4
        }, {
            year: 1652,
            value: 3
        }, {
            year: 1653,
            value: 3
        }, {
            year: 1654,
            value: 3
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 5
        }, {
            year: 1658,
            value: 7
        }, {
            year: 1659,
            value: 70
        }, {
            year: 1660,
            value: 20
        }]
    }, {
        name: "Plague",
        description: "Graunt concluded that the searchers had underreported plague deaths during the Great Plague of 1625, but who could blame them? The distinctive swellings or 'buboes' didn't always appear before a victim died, families were desperate not to be quarantined in an infected house for forty days and the public feared contamination from anyone who might have been in contact with the disease.",
        ValueLabelPos_desktop: {
            x: -133,
            y: -64
        },
        ValueLabelPos_mobile: {
            x: -120,
            y: -105
        },
        mobileData: true,
        imgID: 18,
        data: [{
            year: 1629,
            value: 0

        }, {
            year: 1630,
            value: 1317
        }, {
            year: 1631,
            value: 274
        }, {
            year: 1632,
            value: 8
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 1
        }, {
            year: 1635,
            value: 0
        }, {
            year: 1636,
            value: 10400
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 3597
        }, {
            year: 1648,
            value: 611
        }, {
            year: 1649,
            value: 67
        }, {
            year: 1650,
            value: 15
        }, {
            year: 1651,
            value: 23
        }, {
            year: 1652,
            value: 16
        }, {
            year: 1653,
            value: 6
        }, {
            year: 1654,
            value: 16
        }, {
            year: 1655,
            value: 9
        }, {
            year: 1656,
            value: 6
        }, {
            year: 1657,
            value: 4
        }, {
            year: 1658,
            value: 14
        }, {
            year: 1659,
            value: 36
        }, {
            year: 1660,
            value: 14
        }]
    }, {
        name: "Rickets",
        description: "Rickets, a softening of the bones now linked with vitamin D deficiency, was the principal disease of infancy in the 1600s. Surprisingly, the aristocracy – including King Charles I – were often the worst affected, due to a diet rich in meat and low in milk. The only treatment was swaddling children so tightly that they might not stand or walk on their malleable bones.",
        ValueLabelPos_desktop: {
            x: -180,
            y: -180
        },
        mobileData: false,
        imgID: 19,
        data: [{
            year: 1629,
            value: 0
        }, {
            year: 1630,
            value: 0
        }, {
            year: 1631,
            value: 0
        }, {
            year: 1632,
            value: 0
        }, {
            year: 1633,
            value: 0
        }, {
            year: 1634,
            value: 14
        }, {
            year: 1635,
            value: 49
        }, {
            year: 1636,
            value: 50
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 224
        }, {
            year: 1649,
            value: 216
        }, {
            year: 1650,
            value: 190
        }, {
            year: 1651,
            value: 260
        }, {
            year: 1652,
            value: 379
        }, {
            year: 1653,
            value: 229
        }, {
            year: 1654,
            value: 372
        }, {
            year: 1655,
            value: 347
        }, {
            year: 1656,
            value: 458
        }, {
            year: 1657,
            value: 317
        }, {
            year: 1658,
            value: 476
        }, {
            year: 1659,
            value: 441
        }, {
            year: 1660,
            value: 521
        }]
    }, {
        name: "Mother, rising of the Lights",
        description: "These mysterious-sounding diseases both led to breathing difficulties. The movement of either the uterus (known as 'mother') or the lungs (known as 'lights') was blamed for conditions we might now describe as croup, asthma, pleurisy or bronchitis.",
        ValueLabelPos_desktop: {
            x: -110,
            y: -220
        },
        mobileData: false,
        imgID: 20,
        data: [{
            year: 1629,
            value: 44
        }, {
            year: 1630,
            value: 72
        }, {
            year: 1631,
            value: 99
        }, {
            year: 1632,
            value: 98
        }, {
            year: 1633,
            value: 60
        }, {
            year: 1634,
            value: 84
        }, {
            year: 1635,
            value: 72
        }, {
            year: 1636,
            value: 104
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 150
        }, {
            year: 1648,
            value: 92
        }, {
            year: 1649,
            value: 215
        }, {
            year: 1650,
            value: 120
        }, {
            year: 1651,
            value: 134
        }, {
            year: 1652,
            value: 138
        }, {
            year: 1653,
            value: 135
        }, {
            year: 1654,
            value: 178
        }, {
            year: 1655,
            value: 166
        }, {
            year: 1656,
            value: 212
        }, {
            year: 1657,
            value: 203
        }, {
            year: 1658,
            value: 228
        }, {
            year: 1659,
            value: 210
        }, {
            year: 1660,
            value: 249
        }]
    }, {
        name: "Teeth, and Worms",
        description: "Although 'teeth' or 'breeding of the teeth' were commonly listed as causes of death, they say more about the age of the victim than the condition they died from. The terms relate to the developmental stage when children are teething, at which point they might succumb to a broad range of afflictions.",
        ValueLabelPos_desktop: {
            x: -45,
            y: -247
        },
        mobileData: false,
        imgID: 21,
        data: [{
            year: 1629,
            value: 440
        }, {
            year: 1630,
            value: 506
        }, {
            year: 1631,
            value: 335
        }, {
            year: 1632,
            value: 470
        }, {
            year: 1633,
            value: 432
        }, {
            year: 1634,
            value: 454
        }, {
            year: 1635,
            value: 539
        }, {
            year: 1636,
            value: 1207
        }, {
            year: 1637,
            value: "NO DATA"
        }, {
            year: 1638,
            value: "NO DATA"
        }, {
            year: 1639,
            value: "NO DATA"
        }, {
            year: 1640,
            value: "NO DATA"
        }, {
            year: 1641,
            value: "NO DATA"
        }, {
            year: 1642,
            value: "NO DATA"
        }, {
            year: 1643,
            value: "NO DATA"
        }, {
            year: 1644,
            value: "NO DATA"
        }, {
            year: 1645,
            value: "NO DATA"
        }, {
            year: 1646,
            value: "NO DATA"
        }, {
            year: 1647,
            value: 767
        }, {
            year: 1648,
            value: 597
        }, {
            year: 1649,
            value: 540
        }, {
            year: 1650,
            value: 598
        }, {
            year: 1651,
            value: 709
        }, {
            year: 1652,
            value: 905
        }, {
            year: 1653,
            value: 691
        }, {
            year: 1654,
            value: 1131
        }, {
            year: 1655,
            value: 803
        }, {
            year: 1656,
            value: 1198
        }, {
            year: 1657,
            value: 878
        }, {
            year: 1658,
            value: 1036
        }, {
            year: 1659,
            value: 839
        }, {
            year: 1660,
            value: 1008

        }]
    },
];


TheCollectors.Interface = function() {
    var self = {},
        dom = {};
    var DATA = [];
    var SCREEN_MODE;
    self.Init = function(screenMode) {

        SCREEN_MODE = screenMode;
        $('.dragger').append('<div class=\'currentYear\'></div>');
        dom = {
            chart: $('#radial'),
            yearSelector: $('#yearSelector'),
            infoBox: $('#info-box-1'),
            infoBoxImg: $('#info-box-1>img'),
            infoBoxHeader: $('#info-box-1 h1'),
            infoBoxCopy: $('#info-box-1 p'),
            infoBoxBtn: $('#info-box-1 .btn'),
            noData: $('.no-data'),
            currentYear: $('.currentYear'),
            infoBoxYear: $('.info-box .year'),
            infoBoxDeaths: $('.info-box .number-of-deaths'),
            hideGlossaryBtn: $('header .hide-gloassary-btn'),
            showGlossaryBtn: $('header .show-gloassary-btn'),
        };

        dom.noData.css('opacity', 0);
        dom.currentYear.text(dom.yearSelector[0].value);



        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        globalEventListeners();
        eventListeners();
        updateInfoBoxValues();
    };

    self.changeScreenMode = function(screenMode) {
        SCREEN_MODE = screenMode;
        viz.selectAll("*").remove();
        viz.remove();
        //console.log("changing view to : ",SCREEN_MODE);
        getInitialData(SCREEN_MODE);
        updateData();
        dom.infoBox.hide();
        dom.hideGlossaryBtn.hide();
        loadData();
        buildBase();
        setScales();
        drawBars();
        addCircleAxes();
        addLineAxes();
        addOverlayBtns();
        eventListeners();
        updateInfoBoxValues();


    }

    var getInitialData = function(SCREEN_MODE) {
        DATA = TheCollectors.getData(SCREEN_MODE);
        axis = DATA.length;
        maxVal = Number(Math.sqrt(2500 * DATA.length / Math.PI));
    }

    var currentData = [];

    var timeseries, sdat, series, minVal = 0,
        radius, radiusLength;
    var maxVal;
    var w = 1500,
        h = 1000,
        axis, ruleColor = '#fff';
    var vizPadding = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    var innerRadiusVal = 8;
    var numticks = 5;
    var viz, vizBody, maxs, keys;
    var oldRadius = [];
    var newRadius = [];
    var labelWidth = [];
    var valueHolders;
    var SELECTED_ITEM = -1;
    var NO_DATA_YEAR = false;

    var updateInfoBoxValues = function() {
        dom.infoBoxYear.text(dom.yearSelector[0].value);
        if (SELECTED_ITEM > -1) dom.infoBoxDeaths.text(DATA[SELECTED_ITEM].data[dom.yearSelector[0].value - 1629].value);
    }
    var loadData = function() {
        sdat = [];
        keys = [];
        for (var j = 0; j < DATA.length; j++) {
            keys[j] = DATA[j].name;
        }
        for (i = 0; i <= numticks; i++) {
            sdat[i] = maxVal / numticks * i;
        }
    };
    var buildBase = function() {
        viz = d3.select('#radial').append('svg:svg').attr('viewBox', '0,0,' + w + ',' + h).attr("width", w + "px").attr("height", h + "px");
        viz.append('svg:rect').attr('x', 0).attr('y', 0).attr('height', 0).attr('width', 0).attr('height', 0);
        vizBody = viz.append('svg:g').attr('id', 'body');
    };
    var setScales = function() {
        var heightCircleConstraint, widthCircleConstraint, circleConstraint, centerXPos, centerYPos;
        heightCircleConstraint = h - vizPadding.top - vizPadding.bottom;
        widthCircleConstraint = w - vizPadding.left - vizPadding.right;
        circleConstraint = d3.min([
            heightCircleConstraint,
            widthCircleConstraint
        ]);
        radius = d3.scale.linear().domain([
            0,
            maxVal
        ]).range([
            0,
            circleConstraint / 2
        ]);
        radiusLength = radius(maxVal);
        centerXPos = widthCircleConstraint / 2 + vizPadding.left;
        centerYPos = heightCircleConstraint / 2 + vizPadding.top;
        vizBody.attr('transform', 'translate(' + centerXPos + ', ' + centerYPos + ')');
    };
    addCircleAxes = function() {
        var radialTicks = radius.ticks(numticks),
            circleAxes, i;
        vizBody.selectAll('.circle-ticks').remove();
        circleAxes = vizBody.selectAll('.circle-ticks').data(sdat).enter().append('svg:g').attr('class', 'circle-ticks');
        circleAxes.append('svg:circle').attr('r', function(d, i) {
            return radius(d);
        }).attr('class', 'circle').style('stroke', ruleColor).style('stroke-opacity', '0.7').style('opacity', 0.7).style('fill', 'none');
    };
    addLineAxes = function() {
        var radialTicks = radius.ticks(numticks),
            lineAxes;
        vizBody.selectAll('.line-ticks').remove();
        lineAxes = vizBody.selectAll('.line-ticks').data(keys).enter().append('svg:g').attr('transform', function(d, i) {
            var angle = i / axis * 360 - 90 + 360 / axis / 1.5;
            if (i > DATA.length / 2 - 1) {
                angle = i / axis * 360 - 90 + 360 / axis / 2.8;
            }
            var radiusForTextToStart
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                radiusForTextToStart = 20
            } else {
                radiusForTextToStart = 5
            }
            return 'rotate( ' + angle + ')translate(' + radius(radiusForTextToStart) + ')';
        }).attr('class', 'line-ticks');
        lineAxes.append('svg:text').text(function(d, i) {
            return keys[i];
        }).attr('text-anchor', 'right').attr('fill', '#e5254e').attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 14
            } else {
                return 30
            }
        }).attr('class', 'label').attr('transform', function(d, i) {
            labelWidth[i] = $(this)[0].getBBox().width;
            if (i > DATA.length / 2 - 1) {
                return ' rotate(180,' + labelWidth[i] / 2 + ',' + 0 + ')';
            }
        });
        vizBody.selectAll('.value-label-holders').remove();

        valueHolders = vizBody.selectAll('.value-label-holders').data(keys).enter().append('svg:text').text(function(d, i) {
            return currentData[i].realValue;
        }).attr('class', 'value-label-holders opacity-transition display-opacity-0').attr('fill', function(d, i) {
            value = radius(currentData[i].y);
            value2 = Math.sqrt(Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[i]["ValueLabelPos_" + SCREEN_MODE].y, 2));
            if (value > value2 + 6) {
                return 'white';
            } else {
                return 'black';
            }
        }).attr('x', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].x;
        }).attr('y', function(d, i) {
            return DATA[i]["ValueLabelPos_" + SCREEN_MODE].y;
        }).attr('font-size', function() {
            if (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP) {
                return 16
            } else {
                return 30
            }
        })
    };
    var drawBars = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series').data([d]);
        groups.enter().append('svg:g').attr('class', 'series').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            oldRadius[i] = radius(currentData[i].y);
            return radius(currentData[i].y);
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'black').attr('stroke', 'white').attr('stroke-opacity', '0.3').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var addOverlayBtns = function() {
        var groups, bar;
        pie = d3.layout.pie().value(function(d) {
            return d;
        }).sort(null);
        d = [];
        for (i = 0; i < currentData.length; i++) {
            d.push(1);
        }
        groups = vizBody.selectAll('.series2').data([d]);
        groups.enter().append('svg:g').attr('class', 'series2').style('fill', 'blue').style('stroke', 'black');
        groups.exit().remove();
        bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return 500;
        });
        arcs = groups.selectAll('.series g.arc').data(pie).enter().append('g').attr('class', 'attr');
        arcs.append('path').attr('fill', 'yellow').attr('stroke', 'white').attr('fill-opacity', '0').attr('stroke-opacity', '0').attr('d', bar).style('opacity', 1).style('cursor', 'pointer');
    };
    var transition = function(val) {
        var bar = d3.svg.arc().innerRadius(innerRadiusVal).outerRadius(function(d, i) {
            return radius(currentData[i].y);
        });
        newRadius = [];
        for (i = 0; i < currentData.length; i++) {
            newRadius.push(radius(currentData[i].y));
        }
        path = d3.selectAll('#radial svg g.series path');
        path.each(function(dat, s) {
            d3.select(this).transition().duration(800).attrTween('d', function(a) {
                var k = d3.interpolate(oldRadius[s], newRadius[s]);
                return function(t) {

                    oldRadius[s] = k(t);

                    return bar.outerRadius(k(t))(a);;
                };
            }).each('end', function() {
                oldRadius[s] = newRadius[s];
            });
        });
        valueHolders.each(function(dat, s) {
            d3.select(this).transition().duration(800).tween('text', function(d, id) {
                var i = d3.interpolate(this.textContent, currentData[s].realValue);
                return function(t, id) {
                    value = radius(currentData[s].y);
                    value2 = Math.sqrt(Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].x, 2) + Math.pow(DATA[s]["ValueLabelPos_" + SCREEN_MODE].y, 2));
                    if (value > value2 + 6) {
                        d3.select(this).attr('fill', 'white');
                    } else {
                        d3.select(this).attr('fill', 'black');
                    }
                    this.textContent = Math.round(i(t));
                };
            });
        });
    };
    var updateData = function() {
        if ((dom.yearSelector, dom.yearSelector[0].value > 1636) && (dom.yearSelector, dom.yearSelector[0].value < 1647)) {

            if (!NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 0);
                dom.noData.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 0);
            }
            NO_DATA_YEAR = true;
            var yearIndex = 1636 - 1629;
        } else {

            if (NO_DATA_YEAR) {
                dom.chart.fadeTo(400, 1);
                if (SELECTED_ITEM > -1)
                    dom.infoBox.fadeTo(200, 1);
                dom.noData.fadeTo(400, 0);
            }
            NO_DATA_YEAR = false;
            var yearIndex = dom.yearSelector[0].value - 1629;

        }
        currentData = [];
        for (var i = 0; i < DATA.length; i++) {

            if (!isNaN(DATA[i].data[yearIndex].value)) {
                var value = DATA[i].data[yearIndex].value;
                var chartValue = Number(Math.sqrt(value * DATA.length / Math.PI));

                if ((chartValue <= innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_DESKTOP)) {
                    //console.log('????',SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = innerRadiusVal * 1.2;
                }

                if ((chartValue < innerRadiusVal) && (SCREEN_MODE == TheCollectors.SCREEN_MODE_MOBILE)) {
                    //console.log('????',chartValue,SCREEN_MODE==TheCollectors.SCREEN_MODE_DESKTOP,SCREEN_MODE)
                    chartValue = chartValue + innerRadiusVal;
                }


                var name = DATA[i].name;
                currentData.push({
                    y: chartValue,
                    realValue: value,
                    name: name,
                    id: i,
                    borderwidth: 0
                });
            }
        }
    };


    var globalEventListeners = function() {
        $('.dragger').on('mousedown touchstart', function() {
            dom.currentYear.addClass('currentYear-dragging');
        });
        $('body').on('mouseup touchend', function() {
            dom.currentYear.removeClass('currentYear-dragging');
        });

        dom.yearSelector.on('slider:changed', function(ev, d) {
            dom.currentYear.text(d.value);

            updateInfoBoxValues();
            updateData();
            transition();
        });


        dom.infoBoxBtn.on('click', function() {

            updateDisplayInfo(SELECTED_ITEM + 1);
        });
        dom.hideGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.show();
                dom.hideGlossaryBtn.hide();
                updateDisplayInfo(SELECTED_ITEM);
            }
        });


        dom.showGlossaryBtn.on('click', function() {
            if (!NO_DATA_YEAR) {
                dom.showGlossaryBtn.hide();
                dom.hideGlossaryBtn.show();
                updateDisplayInfo(0);
            }
        });
    }


    var eventListeners = function() {
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('click', function(a, index) {

            if (!NO_DATA_YEAR) {
                updateDisplayInfo(index);
                updateInfoBoxValues();
            }

        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseover', function(a, index) {
            if (index >= DATA.length) {
                var id = index - DATA.length;
            }
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        });
        viz.selectAll('#radial svg g.series path, #radial svg g.series2 path').on('mouseout', function(a, index) {
            if (index >= DATA.length) {
                var id = index - DATA.length;
            }
            if (id == SELECTED_ITEM) return;
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
        });
    };

    var updateDisplayInfo = function(index) {
        var paths = viz.selectAll('#radial svg g.series path');
        var labels = viz.selectAll('.line-ticks .label');
        id = index;
        if (index >= DATA.length) {
            var id = index - DATA.length;
        }

        d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-1");
        if (SELECTED_ITEM == id) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][id]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            SELECTED_ITEM = -1;
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.hide();
                dom.showGlossaryBtn.show();
            }
            updateBox();
            return;
        }
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', 'black');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(valueHolders[0][SELECTED_ITEM]).attr('class', "value-label-holders opacity-transition display-opacity-0");
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }

        }
        SELECTED_ITEM = id;
        if (SELECTED_ITEM > -1) {
            d3.select(paths[0][SELECTED_ITEM]).attr('fill', '#e5254e');
            d3.select(labels[0][SELECTED_ITEM]).attr('fill', 'white');
            if ($(window).width() <= 768) {
                dom.hideGlossaryBtn.show();
                dom.showGlossaryBtn.hide();
            }
        }
        updateBox();
    };
    var updateBox = function() {
        updateInfoBoxValues();
        var ar = TheCollectors.assetRoot;
        if (SELECTED_ITEM > -1) {
            dom.infoBox.fadeOut('fast', function() {
                dom.infoBoxImg.css('opacity', 0)
                dom.infoBoxImg.bind('load', function() {
                    dom.infoBoxImg.css('opacity', 1)
                });
                dom.infoBoxImg.attr('src', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg');
                dom.infoBoxImg.attr('srcset', ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '.jpg 1x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 2x, ' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 3x,' +
                    ar + 'death_reason_' + (DATA[SELECTED_ITEM].imgID + 1) + '_x2.jpg 4x,'
                );
                dom.infoBoxHeader.text(DATA[SELECTED_ITEM].name);
                dom.infoBoxCopy.text(DATA[SELECTED_ITEM].description);
                dom.infoBox.fadeIn();
            });
        } else {
            dom.infoBox.fadeOut('fast');
        }
    };
    return self;
}();

Pathways.Scene.MesmersSalon = function(panelID) {
    //TODO: remove absolute selector for .crop-zoom
    //TODO: add to component-level activator

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration: (Pathways.panelHeight - 100),
            offset: 100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style.position = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 1
            }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 0
            }); // Fade out

            setTimeout(function() {
                _('.crop-zoom').style.position = 'absolute';
            }, 200);
        });

     return scene;
};

Pathways.components.cropZoom.mesmersSalon = {
    data: {
        'rod': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'title': '',
            'text': 'Mesmer ‘magnetised’ rods or wands that could be used to direct the fluid to the afflicted part of the body. He would often play music on a glass harmonica that sent shivers through the patients’ nerves.',
            'position': 'right'
        },
        'woman': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'Patients would form circles, holding hands or grasping cords, to transfer the healing energies between them. Sometimes these healing circles would climax in mass convulsions.',
            'position': 'left'
        },
        'mesmer': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'Mesmer, depicted here with his wand, taught his healing skills to initiates. They were obliged to take a strict vow of secrecy and pay the large sum of 100 livres. Many French aristocrats signed up.',
            'position': 'left'
        }
    }
};


Pathways.components.gallery.toolsOfMesmerism = {
    data: {
        location: 'galleries/tools-of-mesmerism/',
        images: [{
            image: 'V0016530',
            text: '1/7: The tub, or baquet, was central to Mesmer’s treatments.'
        }, {
            image: 'L0023349',
            text: '2/7: Mesmer magnetised objects such as these to treat his patients.'
        }, {
            image: 'L0023350',
            text: '3/7: The different shaped items conducted the superfine fluid he saw as present in all living things.'
        }, {
            image: 'L0023351',
            text: '4/7: By controlling the fluid to bring a patient to a crisis point, Mesmer would ‘cure’ them.'
        }, {
            image: 'L0023352',
            text: '5/7: Magnetised objects showing their magnetic fields.'
        }, {
            image: 'M0006352',
            text: '6/7: Mesmer’s assistants blew a whistle to indicate which social class of baquet they should go to.'
        }, {
            image: 'V0011096',
            text: '7/7: Another baquet and a description of how Animal Magnetism works.'
        }, ]
    }
};


Pathways.Scene.MagnetisedTrees = function(panelID) {

    var stage = animations.magnetisedTrees.stage;
    var scene1 = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {

            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to(panelID + ' .black-strip', 0.4, { y: 0 }); // Scroll up
                createjs.Ticker.addEventListener("tick", stage);
            }
        })
        .on('leave', function(e) {

            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to(panelID + ' .black-strip', 0.2, { y: Pathways.panelHeight }); // scroll down
                createjs.Ticker.removeEventListener("tick", stage);
            }
        });

    return scene1;
};

Pathways.components.gallery.aldinisExperiments = {
    data: {
        location: 'galleries/aldinis-experiments/',
        images: [{
            image: 'L0001964',
            text: '1/11: Animal electricity produced on frog legs.'
        }, {
            image: 'L0011096',
            text: '2/11: Galvanism experiments on people&hellip;'
        }, {
            image: 'L0023892',
            text: '3/11: &hellip;and animals.'
        }, {
            image: 'L0023893',
            text: '4/11: And animals’ heads.'
        }, {
            image: 'L0023894',
            text: '5/11: Human dissection without heads&hellip;'
        }, {
            image: 'L0023895',
            text: '6/11: &hellip;and with.'
        }, {
            image: 'L0023897',
            text: '7/11: Galvanism experiment with dog.'
        }, {
            image: 'L0023898',
            text: '8/11: More frogs’ legs.'
        }, {
            image: 'L0023899',
            text: '9/11: Galvanic apparatus.'
        }, {
            image: 'L0029687',
            text: '10/11: Frogs’ legs experiment - how to. Part I'
        }, {
            image: 'L0029689',
            text: '11/11: Frogs’ legs experiment - how to. Part II'
        }, ]
    }
};

Pathways.Scene.OkeySisters = function(panelID) {

    $('#okey-sisters .main-content, #okey-sisters .secondary-content').css({
        'bottom': 'auto',
        'top': Pathways.panelHeight
    });
    $('#thomas-wakley .main-content').css({
        'bottom': 'auto',
        'top': (Pathways.panelHeight / 3)
    });

    var $panel = $(panelID),
        height = $panel.outerHeight();

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration: Pathways.panelHeight
        })
        .on('enter', function(e) {
            if (e.scrollDirection == 'FORWARD')
                TweenMax.to('.black-strip', 0.5, {
                    y: 0
                }); // Scroll up
        })
        .on('leave', function(e) {
            if (e.scrollDirection == 'REVERSE')
                TweenMax.to('.black-strip', 0.2, {
                    y: Pathways.panelHeight
                }); // scroll down
        });


    return scene;
};


Pathways.components.gallery.hypnotisedWomen = {
    data: {
        location: 'galleries/hypnotised-women/',
        images: [{
            image: 'L0000476',
            text: '1/6: Most images of mesmerism and hypnotism show men treating women in manipulative or exploitative ways.'
        }, {
            image: 'L0034228',
            text: '2/6: A corrupt old man tries to seduce a woman by urging her to take a hypnotic draught.'
        }, {
            image: 'L0034922',
            text: '3/6: A mesmeric physician taking advantage of his female patient.'
        }, {
            image: 'V0006760',
            text: '4/6: Jean-Martin Charcot demonstrates hysteria in a hypnotised subject at the Salpêtrière hospital in Paris, 1888.'
        }, {
            image: 'V0011793',
            text: '5/6: An exotic doctor magnetises a young woman; her husband looks on.'
        }, {
            image: 'V0016621',
            text: '6/6: A female patient being hypnotised in front of a group of four men.'
        }, ]
    }
};

Pathways.Scene.GonadMan = function(panelID) {

    var $panel = $(panelID),
        $quiz = $panel.find('[data-component="quiz"]'),
        height = $panel.outerHeight();

    var scene1 = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration: function() {
                return $panel.outerHeight() + (Pathways.panelHeight * 0.5);
            }
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
        });

    return scene1;
};

Pathways.components.quiz.guessTheTumour = {
    data: {
        'title': 'The Esdaile Game',
        'images': '/_assets/img/quizzes/guess-the-tumour',
        'questions': [{
            'image': 'q1-300h.jpg',
            'title': 'How much did this jaw-dropping tumour weigh?',
            'answers': ['2 pounds', '5 pounds', '10 pounds', '23 pounds'],
            'correct': 2
        }, {
            'image': 'q2-300h.jpg',
            'title': 'How long did it take Esdaile to remove this whopping 103 pound tumour?',
            'answers': ['10 seconds', '1 hour', '6 and a half minutes', '6 hours'],
            'correct': 3
        }, {
            'image': 'q3-300h.jpg',
            'title': 'What was the weight of this extremely uncomfortable-looking tumour?',
            'answers': ['80 pounds', '40 pounds', '400 pounds', '60 pounds'],
            'correct': 1
        }, {
            'image': 'q4-300h.jpg',
            'title': 'How much did this tumour weigh before Esdaile got it off the patient’s chest?',
            'answers': ['10 pounds', '80 pounds', '60 pounds', '40 pounds'],
            'correct': 1
        }, {
            'image': 'q5-300h.jpg',
            'title': 'This 90 pound tumour was removed by Esdaile without anaesthetic. But how long did it take?',
            'answers': ['It never was removed', '30 minutes', '9 minutes', '3 minutes'],
            'correct': 4
        }, ]
    }
};


Pathways.Scene.India = function(panelID) {

    var $panel      = $(panelID),
        $boats      = $panel.find('.boats'),
        ratio       = 1050 / 1900,
        boat_ratio  = 322 / 1900,
        boat_height = (boat_ratio * window.innerWidth),
        offsetHeight = $(panelID).find('.main-content').outerHeight() + 100;

        var height  = $panel.outerHeight();

    $boats.css({ bottom: 0, height: boat_height });

    $(window).on('resize', function() {
        boat_height = (boat_ratio * window.innerWidth);
        $boats.css({ height: boat_height });
    });

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       function() { return $panel.outerHeight() + (Pathways.panelHeight / 4); }
        })
        .on('enter', function() {
            $boats.css('transition', 'transform 120s linear');
            $boats.css('transform', 'translate('+window.innerWidth+'px,0)');
        })
        .on('leave', function() {
            $boats.css('transition', 'none');
            $boats.css('transform', 'translate(-600px,0)');
        });

    return scene;
};


Pathways.Scene.Trilby = function(panelID) {

    var scenes = [];

    $('.comic-panel').css('opacity', 0);

    $('.comic-panel').each(function() {
        var $this   = $(this),
            tween   = TweenMax.to( $this, 1, { opacity: 1 } ),
            offset  = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement:     $this,
                duration:           200,
                offset:             offset
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
};


Pathways.Scene.AnnaO = function(panelID) {

    var positions = [
        { x: -57,   y: -107 },
        { x: 79,    y: 32 },
        { x: 178,   y: 178 },
        { x: -144,  y: 106 },
    ];

    var counter = 0;
    var $panel = $(panelID);
    var scenes = [];

    $(panelID + ' .fragmented').each(function() {
        var $this = $(this);

        var x = positions[counter].x,
            y = positions[counter].y;

        if( Modernizr.csstransforms3d )
            $this.css( { 'transform': 'translate3d('+ x +'px, '+ y +'px, 0)' } );
        else
            $this.css( { 'transform': 'translate('+ x +'px, '+ y +'px)' } );

        counter++;
    });

    $(panelID + ' .fragmented').each(function() {
        var tween = TweenMax.to( $(this), 1, { x: 0, y: -3 } );

        var scene = new ScrollScene({
                triggerElement: panelID,
                triggerHook:    'top',
                duration:       function() { return $panel.height() - 400; },
                offset:         50,
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
};


Pathways.Scene.Office = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                TweenMax.to(panelID + ' .black-strip', 0.5, { y: 0 }); // Scroll up
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' )
                TweenMax.to(panelID + ' .black-strip', 0.2, { y: Pathways.panelHeight }); // scroll down
        });

    return scene;
};


Pathways.Scene.Office2 = function(panelID) {

    var $panel = $(panelID),
        $img = $panel.find('.large-screen').first();

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       function () { return $panel.outerHeight() + (Pathways.panelHeight * 0.5); },
            offset:         100
        })
        .on('enter', function() {
            //console.log('enter couch')
            $img.css('transition', 'transform 14s ease');
            $img.css('transform', 'translate(-80%, -10%) scale(1.8, 1.8)');
        })
        .on('leave', function() {
            $img.css('transition', 'none');
            $img.css('transform', 'translate(0,0) scale(1.6, 1.6)');
        });

    return scene;
};

Pathways.Scene.JohnTradescant = function() {

    $('.sliding-panel').css({
        'opacity': 0
    });

    var translate_array = [-100, 100, -100, 100, -100, 100, -100, 100, -100, 100, -100, 100],
        count = 0,
        scenes = [];

    $('.sliding-panel').each(function() {
        var $this = $(this);

        $this.css('transform', 'translate(' + translate_array[count] + 'px,0)');

        var tween = TweenMax.to($this, 1, {
                x: 0,
                opacity: 1
            }),
            offset = $this.data('offset') ? $this.data('offset') : 0;

        var scene = new ScrollScene({
                triggerElement: $this,
                duration: 200,
                offset: offset
            })
            .setTween(tween);

        scenes.push(scene);

        count++;
    });

    return scenes;
};


Pathways.Scene.DukeOfBuckingham = function(panelID) {

    var startY;

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook:    'top',
            duration:       Pathways.panelHeight,
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' )
                startY = window.scrollY;
            else
                startY = window.scrollY - (Pathways.panelHeight - 100);
        })
        .on('progress', function(e) {
            $('.pence').css('transform', 'translate(0, '+ (window.scrollY - startY) +'px)');
        });

    // Keep the clipping mask the correct height in relation to the 'cover' background.
    var ratio = 1900 / 1050,
        $clip = $('#duke-of-buckingham .clip');

    function resizeClip() {
        if( (window.innerWidth / window.innerHeight) > ratio ) {
            var newHeight   = window.innerWidth / ratio,
                percent     = (newHeight / 100) * 87,
                difference  = newHeight - window.innerHeight;

            // console.log(newHeight, window.innerHeight, difference);

            $clip.css( { 'height': percent, 'transform': 'translate(0, '+ -difference +'px)' } );
        }
        else
            $clip.css('height', '87%');
    }

    resizeClip();

    window.addEventListener('resize', function() {
        resizeClip();
    });

    return scene;
};

Pathways.Scene.UniqueArtifacts = function(panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration: (Pathways.panelHeight - 100),
            offset: 100
        })
        .on('enter', function(e) {
            _('.crop-zoom').style['position'] = 'fixed';
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 1
            }); // Fade in
        })
        .on('leave', function(e) {
            TweenMax.to('.crop-zoom', 0.2, {
                opacity: 0
            }); // Fade out

            setTimeout(function() {
                _('.crop-zoom').style['position'] = 'absolute';
            }, 200);
        });

    return scene;
};

Pathways.components.cropZoom.uniqueArtifacts = {
    data: {
        'croc': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'title': '',
            'text': 'Tradescant was attracted by large or exotic items. His requests to British ships included pleas for ‘the biggest that canbe gotten’ and ‘any thing that is strang’.',
            'position': 'right'
        },
        'person': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'Royal apothecary John Parkinson described his friend, and self-made man, John Tradescant as ‘that worthy, curious, and diligent searcher and preserver of all natures rarities and varieties’.',
            'position': 'left'
        },
        'bird': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'One of Tradescant’s earliest documented collecting experiences occurred on a 16-week sea voyage to the Russian city of Archangel. When a strange bird, ‘whose like I yet never sawe’, flew onto the ship’s deck, it was caught and given to Tradescant.',
            'position': 'left'
        },
        'cabinet': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/rod-crop.jpg',
            'text': 'Tradescant’s rarities were ultimately acquired, in disputed circumstances, by the lawyer and alchemist Elias Ashmole. Ashmole later left the collection to the University of Oxford, where it formed the basis of the Ashmolean Museum.',
            'position': 'left'
        },
        'books': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/woman-crop.jpg',
            'text': 'New World explorer John Smith bequeathed half his library of books to Tradescant.',
            'position': 'left'
        },
        'window': {
            'image': '/pathways/1-mindcraft/_assets/1-mesmer/mesmer-crop.jpg',
            'text': 'After establishing what would become Britain’s first museum, Tradescant clocked up another first. He became the initial Keeper of the Oxford Physic Garden, England’s first botanic garden.',
            'position': 'left'
        }
    }
};


Pathways.Scene.KenVideo = function(panelID) {

    var $panel  = $(panelID),
        video   = $panel.find('video').get(0);

    var scene = new ScrollScene({
            triggerElement: $panel,
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            video.play();
        })
        .on('leave', function(e) {
            video.pause();
            video.currentTime = 0;
        });

    return scene;
};


Pathways.Scene.Example = function() {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        });

    return scene;
};


Pathways.Scene.BillsOfMortality = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#bills-of-mortality',
            triggerHook:    'top',
            duration:       Pathways.panelHeight + 150
        })
        .on('enter', function(e) {
            if( _('#bills-of-mortality video') )
                _('#bills-of-mortality video').play();
        })
        .on('leave', function(e) {
            if( _('#bills-of-mortality video') ) {
                _('#bills-of-mortality video').pause();
                _('#bills-of-mortality video').currentTime = 0;
            }
        });

    return scene1;
};


Pathways.Scene.GrauntRecords = function(panelID) {

    var $panel = $(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            triggerHook: 'top',
            duration:       Pathways.panelHeight,
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
        });

    return scene;
};

Pathways.Scene.DeathInfographic = function(panelID) {

    var $infoBox = $(panelID + ' .info-box'),
        $inputContainer = $(panelID + ' .input-container');
        //console.log(infoBox, inputContainer);

    var $panel = $(panelID);

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight
        })
        .on('enter', function() {
            $panel.addClass('active');
        }).on('leave', function() {
            $panel.removeClass('active');
            if($infoBox.css('display') === 'block') {
                $infoBox.css('display', 'none');
            }
        });

    return scene;
};


Pathways.Scene.IsaacNewton = function() {

    var scene1 = new ScrollScene({
            triggerElement: '#isaac-newton',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( e.scrollDirection == 'FORWARD' ) {
                TweenMax.to('#isaac-newton .black-strip', 0.4, { y: 0 }); // Scroll up
            }
        })
        .on('leave', function(e) {
            if( e.scrollDirection == 'REVERSE' ) {
                TweenMax.to('#isaac-newton .black-strip', 0.2, { y: Pathways.panelHeight }); // scroll down
            }
        });

    return scene1;
};


Pathways.Scene.Example = function() {

    var scene = new ScrollScene({
            triggerElement: '#example',
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        });

    return scene;
};


Pathways.Scene.SeizedAndDestroyed = function() {

    var $panel = $('#seized-and-destroyed'),
        vector = { x: -10, y: -5 },
        scenes = [];

    $panel.find('.rubbish div').each(function() {
        // random number between 5 and 25 (create a random num between 0 and 20 then add 5);
        var rand    = 5 + (Math.random() * 20),
            pos     = { x: vector.x * rand, y: vector.y * rand },
            tween   = TweenMax.to( $(this), 1, { x: pos.x, y: pos.y } );

        var scene = new ScrollScene({
                triggerElement: $panel,
                duration:       $panel.outerHeight(),
                offset:         50,
            })
            .setTween(tween);

        scenes.push(scene);
    });

    return scenes;
};

Pathways.components.gallery.quacksOfThe18thCentury = {
    data: {
        location: 'galleries/quacks-of-the-18th-century/',
        images: [{
            image: 'L0018661a',
        }, {
            image: 'M0013726',
        }, {
            image: 'V0007356a',
        }, {
            image: 'V0010929a',
        }, {
            image: 'V0011005',
        }, {
            image: 'V0016170',
        }, {
            image: 'V0016171',
        }, {
            image: 'V0016188a',
        }, {
            image: 'V0016215',
        }, {
            image: 'V0016230a',
        }]
    }
};

Pathways.components.gallery.indecentSexualImages = {
    data: {
        location: 'galleries/indecent-sexual-images/',
        images: [{
            image: 'L0038201',
        }, {
            image: 'L0038202',
        }, {
            image: 'L0038205',
        }, {
            image: 'L0038206',
        }, {
            image: 'L0038209',
        }, {
            image: 'L0060656',
        }, {
            image: 'L0074250',
        }, {
            image: 'V0009962',
        }, {
            image: 'V0009971',
        }, {
            image: 'V0010253',
        }]
    }
};


Pathways.Scene.JosephKhan = function() {
    var scene = new ScrollScene({
            triggerElement: '#joseph-khan',
            duration:       Pathways.panelHeight + 100
        })
        .on('enter', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.play();
        })
        .on('leave', function(e) {
            var ci_vid = _('#joseph-khan video');
            ci_vid.pause();
            ci_vid.currentTime = 0;
        });

    return scene;
};


Pathways.Scene.BritishMuseum = function() {

    var scene = new ScrollScene({
            triggerElement: '#british-museum',
            triggerHook:    'top'
        })
        .on('enter', function(e) {
            $('#british-museum').addClass('active');
        });

    return scene;
};

Pathways.components.gallery.madeAFilm = {
    data: {
        location: 'galleries/tools-of-mesmerism/',
        images: [{
            image: 'V0016530',
        }, {
            image: 'L0023349',
        }, {
            image: 'L0023350',
        }, {
            image: 'L0023351',
        }, {
            image: 'L0023352',
        }, {
            image: 'M0006352',
        }, {
            image: 'V0011096',
        }, ]
    }
};


Pathways.Scene.Letters = function() {

    var scene = new ScrollScene({
            triggerElement: '#letters',
            duration:       Pathways.panelHeight
        })
        .on('enter', function(e) {
            if( _('#letters audio') ) {
                _('#letters audio').play();
            }
        })
        .on('leave', function() {
            if( _('#letters audio') ) {
                _('#letters audio').pause();
            }
        });

    return scene;
};


Pathways.Scene.Example = function(panel_height, panelID) {

    var scene = new ScrollScene({
            triggerElement: panelID,
            duration:       Pathways.panelHeight,
            offset:         0
        })
        .on('enter', function(e) {
            //
        })
        .on('leave', function(e) {
            //
        });

    return scene;
};
