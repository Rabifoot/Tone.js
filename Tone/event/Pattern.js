define(["Tone/core/Tone", "Tone/event/Loop", "Tone/control/CtrlPattern"], function (Tone) {

	/**
	 *  @class Tone.Pattern arpeggiates between the given notes
	 *         in a number of patterns.
	 *  @extends {Tone.Loop}
	 *  @param {Function} callback The callback to invoke with the
	 *                             event.
	 *  @param {Array} events The events to arpeggiate over.
	 */
	Tone.Pattern = function(){

		var options = this.optionsObject(arguments, ["callback", "events", "pattern"], Tone.Pattern.defaults);

		Tone.Loop.call(this, options);

		/**
		 *  The pattern manager
		 *  @type {Tone.CtrlPattern}
		 *  @private
		 */
		this._pattern = new Tone.CtrlPattern({
			"values" : options.events, 
			"type" : options.pattern,
			"index" : options.index
		});
		
	};

	Tone.extend(Tone.Pattern, Tone.Loop);

	/**
	 *  The defaults
	 *  @const
	 *  @type  {Object}
	 */
	Tone.Pattern.defaults = {
		"pattern" : Tone.CtrlPattern.Type.Up,
		"events" : [],
	};

	/**
	 *  Internal function called when the notes should be called
	 *  @param  {Number}  time  The time the event occurs
	 *  @private
	 */
	Tone.Pattern.prototype._tick = function(time){
		this.callback(time, this._pattern.value);
		this._pattern.next();
	};

	/**
	 *  The current index in the events array.
	 *  @memberOf Tone.Pattern#
	 *  @type {Time}
	 *  @name index
	 */
	Object.defineProperty(Tone.Pattern.prototype, "index", {
		get : function(){
			return this._pattern.index;
		},
		set : function(i){
			this._pattern.index = i;
		}
	});

	/**
	 *  The array of events.
	 *  @memberOf Tone.Pattern#
	 *  @type {Time}
	 *  @name events
	 */
	Object.defineProperty(Tone.Pattern.prototype, "events", {
		get : function(){
			return this._pattern.values;
		},
		set : function(vals){
			this._pattern.values = vals;
		}
	});

	/**
	 *  The current value of the pattern.
	 *  @memberOf Tone.Pattern#
	 *  @type {Time}
	 *  @name value
	 */
	Object.defineProperty(Tone.Pattern.prototype, "value", {
		get : function(){
			return this._pattern.value;
		},
		set : function(val){
			this._pattern.value = val;
		}
	});

	/**
	 *  The pattern type. 
	 *  "up" - cycles upward
	 *  "down" - cycles downward
	 *  "upDown" - up then and down
	 *  "downUp" - cycles down then and up
	 *  "alternateUp" - jump up two and down one
	 *  "alternateDown" - jump down two and up one
	 *  "random" - randomly select an index
	 *  "randomWalk" - randomly moves one index away from the current position
	 *  "randomOnce" - randomly select an index without repeating until all values have been chosen.
	 *  @memberOf Tone.Pattern#
	 *  @type {Time}
	 *  @name pattern
	 */
	Object.defineProperty(Tone.Pattern.prototype, "pattern", {
		get : function(){
			return this._pattern.type;
		},
		set : function(pattern){
			this._pattern.type = pattern;
		}
	});

	/**
	 *  Clean up
	 *  @return  {Tone.Pattern}  this
	 */
	Tone.Pattern.prototype.dispose = function(){
		Tone.Loop.prototype.dispose.call(this);
		this._pattern.dispose();
		this._pattern = null;
	};

	return Tone.Pattern;
});