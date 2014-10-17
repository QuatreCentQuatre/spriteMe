(function($, window, document, undefined){
    //PARAMETERS
    //options:
    //  -*width: Width of the sprite
    //  -*height: Height of the sprite
    //  -*frameWidth: Width of one single frame
    //  -*frameHeight: Height of one single frame
    //  -*totalFrame: Number of frames in the spriteSheet
    //  -loop: -1 for infinite, 1 to xx for a defined number of plays. Default: 1.

    //FUNCTIONS
    //.play()
    //.pause()

    var SpriteMe = function($el, options){
        this.$el = $el;
        this.defaults = {
            width:null,
            height:null,
            frameWidth:null,
            frameHeight:null,
            totalFrame:null,
            loop:1,
            keyframes:null,
            framePerSeconds:33
        };

        var name = 'SpriteMe';
        var scope = this;
        var isBackgroundImg = false;
        var bgLeft = 0;
        var bgTop = 0;
        var isPause = true;
        var currentFrame = 1;
        var framePerLine = 1;
        var validate = true;

        //--------Methods--------//
        this._initialize = function($el){
            this.defaults = $.extend({}, this.defaults, options);
            if(!privateMethods.validate.call(this)){
                return;
            }
            isBackgroundImg = !this.$el.is("img");
            framePerLine = Math.floor(this.defaults.width / this.defaults.frameWidth);
            privateMethods.applyCss.call(this);
        };

        this.getCurrentFrame = function(){
            return currentFrame;
        };

        this.play = function(pFrame, pStopOnFrame){
            if(!privateMethods.validate.call(this)){
                return;
            }
            isPause = false;
            if(pFrame){
                if(isNaN(pFrame)){
                    //remove % in the string
                    pFrame = pFrame.replace('%','');
                    //make sure we do not exceed 100% or 1%;
                    if(pFrame > 100){
                        pFrame = 100;
                    }else if(pFrame < 1){
                        pFrame = 1;
                    }
                    //transform percent to frame based on totalframe
                    pFrame = Math.ceil(pFrame * this.defaults.totalFrame / 100);
                }
                if(!privateMethods.setFrame.call(this,pFrame)){
                    return;
                }
            }

            if(pStopOnFrame){
                privateMethods.applyCss.call(this);
            }else{
                privateMethods.animate.call(this);
            }
        };

        this.pause = function(pFrame){
            if(!privateMethods.validate.call(this)){
                return;
            }
            isPause = true;
            if(pFrame){
                if(!privateMethods.setFrame.call(this,pFrame)){
                    return;
                }
            }
        };

        var privateMethods = {
            validate: function(){
                if(this.$el == null || this.$el == ''){
                    console.warn(name + ': Element is not defined');
                    validate = false;
                }
                if(this.defaults.width == null){
                    console.warn(name + ': width is not defined');
                    validate = false;
                }
                if(this.defaults.height == null){
                    console.warn(name + ': height is not defined');
                    validate = false;
                }
                if(this.defaults.frameWidth == null){
                    console.warn(name + ': frameWidth is not defined');
                    validate = false;
                }
                if(this.defaults.frameHeight == null){
                    console.warn(name + ': frameHeight is not defined');
                    validate = false;
                }
                if(this.defaults.totalFrame == null){
                    console.warn(name + ': totalFrame is not defined');
                    validate = false;
                }

                if(validate == false){
                    return false;
                }else{
                    return true;
                }
            },
            setFrame: function(pFrame){
                if(pFrame > this.defaults.totalFrame){
                    console.warn(name + ': required frame to play in methods play() or pause() exceed totalFrame');
                    return false;
                }
                currentFrame = pFrame;
                return true;
            },
            applyCss: function(){
                bgLeft = -this.defaults.frameWidth * ((currentFrame-1) % framePerLine);
                bgTop = -this.defaults.frameHeight * (Math.floor((currentFrame-1) / framePerLine));
                if(isBackgroundImg){
                    this.$el.css('background-position', bgLeft + 'px' + ' ' + bgTop + 'px');
                }else{
                    this.$el.css({'left': bgLeft + 'px','top': bgTop + 'px'});
                }
            },
            animate: function(){
                if(isPause){
                    return;
                }

                currentFrame ++;
                if(currentFrame > this.defaults.totalFrame){
                    if(this.defaults.loop == 1){
                        return;
                    }
                    this.defaults.loop --;

                    currentFrame = 1;
                }
                privateMethods.applyCss.call(this);
                if(this.defaults.keyframes != null){
                    for(var i=0; i<this.defaults.keyframes.length; i++){
                        if(this.defaults.keyframes[i]+1 == currentFrame){
                            return;
                        }
                    }
                }
                setTimeout(function(){privateMethods.animate.call(scope);}, this.defaults.framePerSeconds);
            }
        };
        this._initialize($el);
    };

    if(!window.Me){
        window.Me = {};
    }
    window.Me.sprite = SpriteMe;
}(jQuery, window, document));