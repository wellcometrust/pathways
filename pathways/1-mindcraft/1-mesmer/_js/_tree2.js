var createjs = createjs || {},

    magnetisedTrees = {
        lib: {},
        images: {}
    };

(function(lib, img, cjs) {

    var p; // shortcut to reference prototypes

    // library properties:
    lib.properties = {
        width: 1901,
        height: 1050,
        fps: 24,
        color: "#FFFFFF",
        manifest: [{
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap1.jpg",
            id: "Bitmap1"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap2.jpg",
            id: "Bitmap2"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/Bitmap4.png",
            id: "Bitmap4"
        }, {
            src: "/pathways/1-mindcraft/1-mesmer/_assets/animations/magnetised-trees/images/treemask.png",
            id: "treemask"
        }]
    };

    // stage content:
    (lib.tree2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // ROD-1
        this.instance = new lib.ROD1();
        this.instance.setTransform(861.4, 580.5, 1, 1, 0, 0, 0, 43.2, 188.6);

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(685));

        // ROD-2
        this.instance_1 = new lib.ROD2();
        this.instance_1.setTransform(916.8, 569.5, 1, 1, 0, 0, 0, 27.6, 177.7);

        this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(685));

        // ROD-3
        this.instance_2 = new lib.ROD3();
        this.instance_2.setTransform(1041.1, 557.6, 1, 1, 0, 0, 0, 53.3, 147.8);

        this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(685));

        // ROD-4
        this.instance_3 = new lib.ROD4();
        this.instance_3.setTransform(1067.8, 565.2, 1, 1, 0, 0, 0, 41.2, 137.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(685));

        // ROD-5
        this.instance_4 = new lib.ROD5();
        this.instance_4.setTransform(1286.2, 544.2, 1, 1, 0, 0, 0, 145.2, 227.1);

        this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(685));

        // BKG
        this.instance_5 = new lib.Bitmap1();
        this.instance_5.setTransform(0, 0, 1, 1.011);

        this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(685));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(950.5, 525, 1901, 1056);


    // symbols:
    (lib.Bitmap1 = function() {
        this.initialize(img.Bitmap1);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 1901, 1044);


    (lib.Bitmap2 = function() {
        this.initialize(img.Bitmap2);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 609, 459);


    (lib.Bitmap4 = function() {
        this.initialize(img.Bitmap4);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 500, 742);


    (lib.treemask = function() {
        this.initialize(img.treemask);
    }).prototype = p = new cjs.Bitmap();
    p.nominalBounds = new cjs.Rectangle(0, 0, 623, 475);


    (lib.Symbol1 = function() {
        this.initialize();

        // Layer 1
        this.shape = new cjs.Shape();
        this.shape.graphics.bf(img.Bitmap4, null, new cjs.Matrix2D(-1.027, 0, 0, 0.814, 107.6, -302)).s().p("ArCd4MAAAg7vIWEAAMAAAA7vg");
        this.shape.setTransform(178.2, 238.3, 2.52, 1.246);

        this.addChild(this.shape);
    }).prototype = p = new cjs.Container();
    p.nominalBounds = new cjs.Rectangle(0, 0, 356.4, 476.5);


    (lib.ROD5 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_1 = new cjs.Graphics().p("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");

        this.timeline.addTween(cjs.Tween.get(mask).to({
            graphics: null,
            x: 0,
            y: 0
        }).wait(1).to({
            graphics: mask_graphics_1,
            x: 145.2,
            y: 227.1
        }).wait(45));

        // grdt
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            _off: false
        }, 0).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 272.1
        }, 0).wait(1).to({
            y: 311.2
        }, 0).wait(1).to({
            y: 350.3
        }, 0).wait(1).to({
            y: 389.4
        }, 0).wait(1).to({
            y: 428.5
        }, 0).wait(1).to({
            y: 467.6
        }, 0).wait(1).to({
            y: 506.6
        }, 0).wait(1).to({
            y: 545.7
        }, 0).wait(1).to({
            y: 584.8
        }, 0).wait(1).to({
            y: 623.9
        }, 0).wait(1).to({
            y: 663
        }, 0).wait(1).to({
            y: 702.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;


    (lib.ROD4 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AmWVSQgMgQAQgKQAXgPACgEQAKgGARgaQAPgXASgEQADgDAEgBIAOgcQgFgQAMgJIAXgOQAHghAKgTQAOgaAYgOQgGgVANgbQAUglABgGQAFgTALgZIAUgrIAQg1QAFgUADgKQAGgQAKgLIAVgyIAPgqQAKgYAOgOIAKgoIAHgLQgBgcAQgvQAPg0ACgXQASgbAPguIAYhNIAhiLQAEgyAOgeIABgKIAGglQAEgVAKgMIAbhnQAPg+AFgtQACgsADgbQAFgnALgeIACgSQgCgRALgPQAHhQAXg8QACgzAShDIAqksQgCgmATgsIABABQACgvAOgtQABgFACgFQgCgFAEgCIABgXQABgNAGgJQgDgDAEgCQABhlADglQgBgTABgKQACgQAOgIQAPgRAPAUQAXAygWA6IABABIgJAbIgBAAQASAUgFAbQgDAPgLAgQgKAHABAXQACAWgNAHQADAWgOAkQACAhgHAsIgOBMQgCAZgDAyQgDAsgMAdIgnDfQgKBUgfBpIAAAjQgBAUgIAOIgCAkQgCAUgGAOIgCATQAEA0ggA3QAAAigQAuQgXBCgDAOIAAALQgJAVgBAmIgFAlQgEAWgJAOQgIAPgHAnQgHAkgLARQgBAJACASQAAARgIAJQgHAbgbBCQgYA6gFAlQgBAIABAQQgCAOgRACQgBADgFAAQgBADABAVQAAAPgKAIIABAAIgfBTIgLATQACALgLAHQgCAHgCAQQgDAOgNAEQADAKgFALIgKASIgRAsIABACIgCACQAAAPgJAVQgLAagCAJQABAMgNAOQgPAPgBAJQABAOgHAOQgEAJgLAOIgIALQgCALgLALQgMALgFAGIgKAlQgJAUgUAFQABAVgNAIQgQAcgiAfQgUAUgFADQgWAQgFACQgGADgFAAQgKAAgHgJg");
        mask.setTransform(41.2, 137.1);

        // grdt
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 82.5, 274.3);


    (lib.ROD3 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("An8XDQgDgCgQgPQgJgIAHgKQAFgIANgHQAJgTAVgCQAJgUAFgGQAKgMAPgDIALgSQAIgKAMABIAAAAIABAAQAMg/AvgcIgBgLQACgGAGgCQAKgPAOgiQAOgcAagIIARgcIABgDQgJgTAPgSQAUgXACgGQAGgaAZggQAHgMAMgoQAJghAQgPQgEgeAXgUQgFgNAKgKIAQgSQgBgXADgJQAGgQAUgEQgIgUAIgVIATgmIAIgZQAGgOAIgJQABgaARgaIAKgTIAxiBQADgSADgJQAFgOAQgDQgIgJACgKQACgGAIgLIAKgeQAEgiAPgRIALgTQABgkASgaIAnhwQAHgHACgKIADgTQgFgPAIgLIASgWQgEgQAGgSQADgKALgUIABgPQACgHAHgFIADgJQgCgUAKgLQgCgUALgQIACgEIACgTQgCgIAJgDQAHg2AWgvQABgcAKgOIAUhYQgCgFAEgDQgBgPABgHQACgNAGgIIAHg3QAFgfAJgXIAAgZQACgOAIgKIAAgVQABgNAHgIIADAGIABgBQgCgBgBgEQAAgdAJgkQAEgSAPguIANgoQACgfANgoIAYhEQADg6ACgRQAEgqAKgfQgHgsAKhDQANhbAAgSQACgiAGgeQAEgTAGgHQAKgKATAJQARAFgDAWIgIBYQgGAzgJAkQACAFgDADQAAAlgCASQgCAfgHAYQgCAhgCBBQgFA4gSAmQgIA0gNAaQAAAVgKALIgDASIgSA+IgGApQgFAYgIAPQACAegKAVIABADIgDADQgDA4gPAqIgCAFQgJAJgCAOIAAAZQgBAMABAZQAAAWgJAOQgLAFABAUQABATgMAFQAAAFABALQAAAKgKADIgVBZQAFAbgOAQQgLAOgEAjQgDAigOAOIgKAKIgIAUIAIAHIgHADQACAxgaAwQgIArgSAkIgCAEQgEAMgFAZQgGAVgPALQAAAFgBAFQAFAagYAOQAAAFgCAEQAFAagNAcIgcAvQgDAmgUAfQgCACgEAPQgEAMgJADIgBAcQgBAQgDAGQgFAMgLAFIgVA9QACAYgTAQQgBAdgZAqQgcAwgFAVQgBAggSAWQACALgLANQgMAOAAAIQADAVgOAIIgHAdQgGAQgMAIQgEAJgBATQgDARgQAEIABAAQAEAIgGAIIgKANQAFAOgIAOIgPAXIgTAeQgGAcgSAJQAAAUgTAMQgHAagTAPIgYAnQgDAQgPAPQgJAdgXATQgFAXgQAGQgEARgYAQQgEAJgIAIIgQANIgzAyQgJAKgKAAQgFAAgFgCgAh4NuIADAAIAAgCg");
        mask.setTransform(53.3, 147.8);

        // grdt\
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -110
        }, 0).wait(1).to({
            y: -67.1
        }, 0).wait(1).to({
            y: -24.2
        }, 0).wait(1).to({
            y: 18.7
        }, 0).wait(1).to({
            y: 61.6
        }, 0).wait(1).to({
            y: 104.4
        }, 0).wait(1).to({
            y: 147.3
        }, 0).wait(1).to({
            y: 190.2
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 272
        }, 0).wait(1).to({
            y: 310.9
        }, 0).wait(1).to({
            y: 349.8
        }, 0).wait(1).to({
            y: 388.7
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 466.5
        }, 0).wait(1).to({
            y: 505.4
        }, 0).wait(1).to({
            y: 544.3
        }, 0).wait(1).to({
            y: 583.2
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(18));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 106.7, 295.6);


    (lib.ROD2 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // ROD (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        var mask_graphics_4 = new cjs.Graphics().p("Aj9bwQgJgBgIgLQgKgOAOgSIAtg3QAAgRAQgZIAHgXQAEgNAKgFIABgIIgDgHIABgDQgEgdAWgXIAJgeQAGgSAJgKQgDgOAGgOQADgKALgPIADgRIAKgqQAHgYALgQQAGg0APgbIAVhZIAGgzQAFgcAIgWIABgdQgEgMAGgKQAEgHAMgJQgNgPAHgVQAJgegBgGQgDgWAMgIIABgKIAKhhQAHg6AJglIACgmQgDgVACgLQADgRAQgJQgMgJAAgOQAAgJAGgPQADgGAIAEQAMAFADAAQAAgHgOgPQgMgNAIgNQgFgcAZgXIgCgJQgOgQAGgYQAKgaAAgNQACgXAGghIAKg4IACgpQACgWAHgRIAQiQQgBgJAEgHIAMhhQACiLAPhzIADgaQgDgeABgSQACgaAHgUIADguQgEgmAMgjIAAAAIACgSQgCgmABgTQACghASgUIgJgUIAKi0QgBglAAgTQAAggAIgYIADgbIAAgLIgBguQABgbAIgUIACgQQAIhwABidIABkOIADgVIAFgWQAGgNAKACQAGABALAJIAGAHIAAABIACADQANATgCAbQAAAHgJApIABAEQAAADgCACIgBAHIgJAWQADAFAKAJQAGAJgLAIQgLAJAGALQAHAQAAACIAEAVQABAMgFAIIgBAeQAOAMgJAWQgKAYAGAJIgHAEIAAAAIADADQADgCABgFQAIAJgFAMQgFAQABAFQAHANgCARIgFAeIAAAqQAAAYgIAQQAAAEgDADQgIAUADApQADApgHATQgBAHABAjQACAZgLAPQACADgCAFQAJATgBAWQgBARgIAXIgBAnQADB3gVB8IgLARQAAADAGAGQAFAGgCAGIAAAmQABAXgHAOQAAACgDADIABA1QgCAegGAWQAAAEgCADIgMCyIABA0QAAAegHAVQABAEgDAEIgCA6QgCAwgRBHIAAATIAAAgQgBASgIAMIgRApQgHAXAPAVQADAFgCAIQgDAIgIADIgCAUQADAggGAoQgCAUgLA0QAAAKgDAIIgKAyQADAEgEADIABAXQgBANgIAHIgCAcIABAmQAAAXgJAPIgDAiQAEAcgMAaIACADIgCADIgCAdIgEAbQgEAPgLAIQAGArgHAcIAAAaQgBAPgIAJIgKAdIADAhQgBATgKAMIgKBEQADAEgFAFQgEAJgBAbQgBAZgKALIgCgHIgCAAIADAHQACAagGAeQgEATgMAiQgBAegSAVQADAFgEADQgCAIACARQgBAPgKAIQgDAEgFgBQAEAYgIAbQgEANgPAiQgCARgEAJQgHAMgPAEQABAFgBAEQADARgHATQgEAMgLAWQACAVgPAcQABAKgGAJIgNAOIgBAPQgDAIgHAEIAAABIAAAAQgFARgPARIgdAcQgJAIgJAAIgCAAg");

        this.timeline.addTween(cjs.Tween.get(mask).to({
            graphics: null,
            x: 0,
            y: 0
        }).wait(4).to({
            graphics: mask_graphics_4,
            x: 27.6,
            y: 177.7
        }).wait(41));

        // GRDT
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);
        this.instance._off = true;

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({
            _off: false
        }, 0).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(18));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;


    (lib.ROD1 = function(mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // rod (mask)
        var mask = new cjs.Shape();
        mask._off = true;
        mask.graphics.p("AmqdWQgKgjALgjQAJgaAYgkQADgoAQgeQgCgQAGgQQADgKALgTIANgUQgDgNAIgNIAOgXQgBgDAAgGQgFgSAHgUQAFgOANgTIAAgBQAEgmAZg2QgBgEADgEQAAgNAHgRQAKgUADgKQgBgFADgEIANhIQAJgqAUgZIgCgLQACgkAMgtIAXhPIABgbQABgOAKgJQACgcACgKQAEgUAJgPQACgbADgNQAFgWAUgJQgbgeAmgQQAOgKgIgZQgHgaANgJQAEgfAFgRQAHgZAPgSQgEgSAAgIQABgOAJgLQAJh0AqiFIACgTIALhCQAIgmAKgbIAShQQACguAPglIACgGQAAgpAUg8QAEgyAQgeQgHgfARgbQgBgTABgIQACgPAIgLQgDgEAEgCQABgzASgqQAAgfALgQIABgaQACgPAHgJIABgLQgDgMAGgSQAHgXAAgGQgBg2AUglIABgWQABgNAGgIIADglIAKgnQgDgIAIgEIAEgeQACgTAIgKIAUhPQgBgYAGgeIAOg4IAHglQgBgDAEgPQgBgeABgOQACgZAHgSQgDgFAFgDIAMh4QgFgqANgdIgBAAIAAg8QACgiAHgaIADgnQADgfACgPQAFgaAJgTQACg7ARgrQgDgEAEgDIAGgtIAIgsQAEgRAGgIQAJgLAQADQAOADADANQACAJgDAQIgXBvIgGgCIAAABQADACADgBQgDA0gTA6IAAAbQgBAQgIAKQACAFgDACQgCAFACAbQACAUgLALIACA2QgBAegNAWQAHAVgCAdIgFAyQAJAcgTAhQAAAfgJAjQgIAkgKAKQgBAGAIARQAHAOgIAKIgSAfQAUAQgTANIAEAQQABAIgFAHQgNARgCAfQgEAsgCAHQgBAHgBAOQgBAMgIAHQgBAJACARQAAAQgJAJQgBAzgTAyQABAcgKAOQABAkgMAVQgFA4gNAbQAAAEgDADQAAAhgKArQgFAZgOAxQADAjgNAYIgKAeQgBA3gPAtQgBAHgEAEQACAXgOAhQgQAngCAPQAIALABAEQABAIgKAGQgFAIADAUQAEATgMAJQgCAEgFAAQABAIAGAQQADAOgNAJQgKAMACAeQACAdgNAMQACAFgEADQAEAPgMAQIgBATIgUBRIgIAKQgDAIABAcQABAWgJAMQACAIgFAIIgKANQgDBRgfBvQgDAFABAUQAAAPgMAGQgGADgBAHIgCANQgBAYgDANQgEAVgKAOIgDAcQgCAagQAYQADAcgNAPIgBAZQgBAOgIAJIgLAdQAEAKgIAPQgJAQACAIQADAlgUAkIgBARQgBAKgJAEIgBAbQABAfgUAfQACAEgEADQAEArgWAnQgBAggFAPQgHAZgSAPQgGAQgHAlQgGAjgHASQgEALgFADQgFADgKgBQADADgCAEQAIAlgNAnQgJAcgZAoQgBApgIAbQgKAjgXAaQAEASgIAXIgQAnQgDAVgKAGQgEADgFAAQgJAAgMgIgAiuPaIADACIABgCIAAgBIgDgCgAE81IIAEgDIgEgCgAGX7EgAGX7Eg");
        mask.setTransform(43.2, 188.6);

        // GRDT
        this.instance = new lib.Symbol1();
        this.instance.setTransform(43.6, -200, 1, 1, 0, 0, 0, 70.7, 191.2);

        this.instance.mask = mask;

        this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({
            regX: 178.2,
            regY: 238.3,
            x: 151.1,
            y: -117.8
        }, 0).wait(1).to({
            y: -82.7
        }, 0).wait(1).to({
            y: -47.6
        }, 0).wait(1).to({
            y: -12.5
        }, 0).wait(1).to({
            y: 22.6
        }, 0).wait(1).to({
            y: 57.6
        }, 0).wait(1).to({
            y: 92.7
        }, 0).wait(1).to({
            y: 127.8
        }, 0).wait(1).to({
            y: 162.9
        }, 0).wait(1).to({
            y: 198
        }, 0).wait(1).to({
            y: 233.1
        }, 0).wait(1).to({
            y: 265.5
        }, 0).wait(1).to({
            y: 297.9
        }, 0).wait(1).to({
            y: 330.3
        }, 0).wait(1).to({
            y: 362.7
        }, 0).wait(1).to({
            y: 395.1
        }, 0).wait(1).to({
            y: 427.6
        }, 0).wait(1).to({
            y: 460
        }, 0).wait(1).to({
            y: 492.4
        }, 0).wait(1).to({
            y: 524.8
        }, 0).wait(1).to({
            y: 557.2
        }, 0).wait(1).to({
            y: 589.6
        }, 0).wait(1).to({
            y: 622.1
        }, 0).wait(22));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = new cjs.Rectangle(0, 0, 86.5, 377.3);

})(magnetisedTrees.lib, magnetisedTrees.images, createjs);

Pathways.animation.addAnimation('magnetised-trees', magnetisedTrees);
